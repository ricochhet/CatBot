const Command = require('../../utils/command.js');

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
        🔧 CatBot has had a few upgrades on the technikal side
        📖 Moved some error messages outside the embeds
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = About;
