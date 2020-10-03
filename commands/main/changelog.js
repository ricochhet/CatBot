const Command = require('../../bot/command.js');

class Changelog extends Command {
  constructor() {
    super('changelog', 'changelog', 'Shows latest update log', {
      args: false
    });
  }

  async run(client, message, args) {
    const prefix = await client.prefix(message);
    const changelogEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField(
        `Changelog: v${client.version}`,
        `
        📖 Added better HZV data for Monster Hunter: World.
        📖 Cleaned up support and invite commands.
        📖 Added HZV data for Monster Hunter: GU.
        🚫 Removed event command for Monster Hunter: World.
        🚫 Removed unreliable math commands.
        🚫 Removed feedback command.
        🚫 Removed LFG commands.
        🔧 Minor behind-the-scenes changes. 
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = Changelog;
