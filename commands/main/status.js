const Command = require('../../bot/command.js');
const logger = require('../../bot/log.js');

class Status extends Command {
  constructor() {
    super('status', 'status', 'Gives the CatBot status', {
      args: false,
      secret: true
    });
  }

  async run(client, message, args) {
    const options = {
      from: new Date() - 7 * 24 * 60 * 60 * 1000, // 7 days
      until: new Date(),
      limit: Number.MAX_VALUE,
      start: 0,
      order: 'desc'
      //fields: ['cmd']
    };

    let msec = client.uptime;

    let dd = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= dd * 1000 * 60 * 60 * 24;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    let uptime = `${dd}:${hh}:${mm}:${ss}`;

    let pingTime = client.ws.ping;
    let pingRounded = Math.round(pingTime);

    let messagePing = new Date().getTime() - message.createdTimestamp;
    let messagePingRounded = Math.round(messagePing);

    let nodejsVersion = process.version;
    let discordjsVersion = this.version;

    let [userCount, serverSize, guildNames] = await client.shard
      .fetchClientValues('guilds.cache')
      .then(results => {
        let count = 0;
        let xSize = 0;
        let names = [];
        results.forEach(shard => {
          xSize += shard.length;
          shard.forEach(({ memberCount, id, name }) => {
            count += memberCount;
            names.push(`${name} | ${id}`);
          });
        });

        return [count, xSize, names.join('\n')];
      })
      .catch(err =>
        logger.error(err, {
          where: 'status.js 51 (client.shard.fetchClientValues)'
        })
      );

    let memory = process.memoryUsage().heapUsed / 1024 / 1024;

    // Retrieve all logs from past week
    let weekly = [];
    logger.query(options, (err, results) => {
      if (err) throw err;

      logger.debug('log count: %s', results.file.length);

      weekly = results.file;

      // filter out specific logs we're looking for
      const errors = weekly.filter(log => log.level === 'error').length;
      const warnings = weekly.filter(log => log.level === 'warn').length;

      const commands = weekly
        .filter(log => log.type === 'commandRun')
        .map(log => log.cmd);
      const topCmd = this.frequencyCount(commands);

      let topByCategory = '';
      const addToTop = (title, logType) => {
        let raw = weekly
          .filter(log => log.type === logType)
          .map(log => log.name);
        let top = this.frequencyCount(raw);
        topByCategory += `**${title}** - ${top[0].name}`;
        if (top[1].name !== 'n/a') topByCategory += `, ${top[1].name}`;
        if (top[2].name !== 'n/a') topByCategory += `, ${top[2].name}`;
        topByCategory += '\n';
      };

      addToTop('Armors', 'armorRead');
      addToTop('Decos', 'decoRead');
      addToTop('Items', 'itemRead');
      addToTop('Monsters', 'monsterRead');
      addToTop('Skills', 'skillRead');
      addToTop('Weapons', 'weaponRead');

      const statusEmbed = this.MessageEmbed()
        .setColor('#8fde5d')
        .setTitle('Statistics')
        .addField(
          'Weekly totals',
          `${commands.length} commands\n${errors} errors\n${warnings} warnings`,
          true
        )
        .addField(
          'Top commands',
          `${topCmd[0].name} - ${topCmd[0].count}\n${topCmd[1].name} - ${topCmd[1].count}\n${topCmd[2].name} - ${topCmd[2].count}\n`,
          true
        )
        .addField('Most searched by category', topByCategory)
        .addField('Servers: ', serverSize, true)
        .addField('Shards: ', client.shard.count, true)
        .addField('Members: ', userCount, true)
        .addField('Version: ', `v${client.version}`, true)
        .addField('Message Latency', messagePingRounded + 'ms', true)
        .addField('API Latency: ', pingRounded + 'ms', true)
        .addField('Uptime: ', uptime, true)
        .addField('NodeJS Version', nodejsVersion, true)
        .addField('DiscordJS Version', discordjsVersion, true)
        .addField('Memory Usage', `${memory.toFixed(2)} MB`, true)
        .setTimestamp()
        .setFooter('Status Menu', client.user.avatarURL());

      message.channel.send(statusEmbed);
    });
  }

  frequencyCount(collection, size = 3) {
    // count occurrences of each item
    let counts = {};
    for (let i = 0; i < collection.length; i++) {
      let name = collection[i];
      counts[name] = counts[name] ? counts[name] + 1 : 1;
    }

    // sort by value (highest count first)
    const sorted = Object.keys(counts)
      .sort((a, b) => counts[a] - counts[b])
      .reverse();

    let top = [];

    // return top elements (up to given size, default is top 3)
    for (let i = 0; i < size; i++) {
      top[i] = { name: sorted[i] || 'n/a', count: counts[sorted[i]] || 0 };
    }

    return top;
  }
}

module.exports = Status;
