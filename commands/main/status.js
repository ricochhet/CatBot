const Command = require('../../utils/baseCommand.js');
const logger = require('../../utils/log.js');

class Status extends Command {
  constructor(prefix) {
    super('status', 'status', 'Gives the CatBot status', {
      args: false,
      secret: true,
      prefix: prefix
    });
  }

  async run(client, message, args) {
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
      .catch(err => logger.error(err, { where: 'status.js 50' }));

    let memory = process.memoryUsage().heapUsed / 1024 / 1024;

    const statusEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
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

    logger.info('Guild names: %s', guildNames);
  }
}

module.exports = Status;
