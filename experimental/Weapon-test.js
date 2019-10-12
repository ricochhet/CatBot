const Discord = require('discord.js');

module.exports = {
    name: 'Weapontree',
    args: true,
    description: 'Weapontrees',
    run (client, message, args) {
      const listEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setImage("Iron CB.png")
      .setTimestamp()
      .setFooter('Gottem');

      message.channel.send(listEmbed);
    }
}