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
        `Changelog: v${client.config.get('VERSION')}`,
        `
        🤖 Updated to latest version of DiscordJS.
        📖 \`+calc eraw\` now has the option to not have any critical boost.
        🆙 Iceborne weapons have been finally added to \`+mhw weapon\`!
        🆕 Want to see how the bot is doing? Use \`+stats\` to see interesting information about the bot!
        🆕 Finally, a bit of customization! Use \`+ignore [channel id / all]\` to have the bot ignore certain channels!
        🆕 Use \`+mhw hzv [monster name]\` to get monster hitzone values!
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = About;
