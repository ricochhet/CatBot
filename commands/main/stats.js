const Command = require('../../utils/baseCommand.js');

const logger = require('../../utils/log.js');

class Stats extends Command {
  constructor(prefix) {
    super('stats', 'stats', 'Usage stats', {
      args: false,
      prefix: prefix,
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

    // Retrieve logs from past week
    let weekly = [];
    logger.query(options, (err, results) => {
      if (err) throw err;

      logger.debug('log count: %s', results.file.length);

      weekly = results.file;

      // filter out specific logs we're looking for
      const errors = weekly.filter(log => log.level === 'error').length;
      const warnings = weekly.filter(log => log.level === 'warn').length;
      const total = weekly.filter(log => log.type === 'commandRun');

      const commands = total.map(log => log.cmd);

      // count occurrences of each command (from logs)
      let counts = {};
      for (let i = 0; i < commands.length; i++) {
        let name = commands[i];
        counts[name] = counts[name] ? counts[name] + 1 : 1;
      }

      // sort by value (highest count first)
      const sorted = Object.keys(counts)
        .sort((a, b) => counts[a] - counts[b])
        .reverse();

      const first = sorted[0] || 'n/a';
      const second = sorted[1] || 'n/a';
      const third = sorted[2] || 'n/a';

      const inviteEmbed = this.RichEmbed()
        .setColor('#8fde5d')
        .setTitle('Statistics')
        .addField(
          'Weekly totals',
          `${total.length} commands\n${errors} errors\n${warnings} warnings`,
          true
        )
        .addField(
          'Top commands',
          `${first} - ${counts[first] || 0}\n${second} - ${counts[second] ||
            0}\n${third} - ${counts[third] || 0}\n`,
          true
        )
        .setTimestamp()
        .setFooter('Support Link Request', client.user.avatarURL);

      message.channel.send(inviteEmbed);
    });
  }
}

module.exports = Stats;
