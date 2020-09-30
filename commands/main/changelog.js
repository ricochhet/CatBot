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
        🔧 Various bugfixes (hzv, prefix, ignore)
        🔧 Commands now have cooldowns! Spam responsibly. 
        📖 Alatreon data added! 
        📖 You can filter events by rank (added in previous update, see ${prefix}mhw)
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = Changelog;
