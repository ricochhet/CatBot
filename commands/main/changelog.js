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
        🔧 CatBot has had a few more upgrades on the technical side
        🔧 Changed database to API
        📖 Tinkered mhw weapons & armor embeds so they were not so **THICC**
        📖 Added safi jiiva weapon data
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = About;
