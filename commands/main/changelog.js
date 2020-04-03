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
        🤖 Updated to latest version of DiscordJS.
        📖 \`${this.prefix}calc eraw\` now has the option to not have any critical boost.
        🆙 Iceborne weapons have been finally added to \`${this.prefix}mhw weapon\`! (crafting materials too)
        🆕 Want to see how the bot is doing? Use \`${this.prefix}stats\` to see interesting facts about the bot!
        🆕 Use \`${this.prefix}feedback\` to send us your feedback directly 
        🆕 Finally, a bit of customization! Use \`${this.prefix}ignore\` to have the bot ignore certain channels!
        🆕 Use \`${this.prefix}mhw hzv [monster name]\` to get monster hitzone values!
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = About;
