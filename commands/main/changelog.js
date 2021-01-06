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
        :new: Added locale command for Monster Hunter: Worlds. 
        📖 Threat level :fire: now displayed in mhw hzv. 
        📖 Added monster icons to mhgu hzv.
        📖 Minor tweaks to the mhw monster display. 
        🚫 Removed rollhunt command.
        🔧 Minor behind-the-scenes changes. 
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL());

    message.channel.send(changelogEmbed);
  }
}

module.exports = Changelog;
