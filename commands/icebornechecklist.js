const Discord = require('discord.js');

module.exports = {
  name: 'icebornechecklist',
  args: false,
  description: 'Checklist for Iceborne',
  run (client, message, args) {
    const listEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setImage("https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/mhw-iceborne-checklist-monster-hunter-world-wiki-guide.jpg")
      .setTimestamp()
      .setFooter('Quest Menu');

    message.channel.send(listEmbed);
  }
}
