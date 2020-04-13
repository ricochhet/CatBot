const Command = require('../../utils/baseCommand.js');

class About extends Command {
  constructor(prefix) {
    super('changelog', 'changelog', 'Shows latest update log', {
      args: false,
      prefix: prefix
    });
  }

  async run(client, message, args) {
    const changelogEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField(
        `Changelog: v${client.version}`,
        `
        📖 Furious Rajang & Raging Brachydios data added!
        📖 Tenderized values now also shown in \`${this.prefix}mhw hzv\`
        🆙 \`${this.prefix}lfg subscribe\` now supports channels by name, #mention or ID.
        🆕 Use \`${this.prefix}toggle\` to disable a command or category!
        🤖 \`${this.prefix}ignore\` is now admin only. So is \`${this.prefix}toggle\` 
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = About;
