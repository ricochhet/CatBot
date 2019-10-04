const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const aboutEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Author: ', "Ricochet#7498", true)
  .addField('Contributors', "Chad#0389", true)
  .addField('Bot Version: ', "v1.6.7", true)
  .addField('Changelog: ', "v1.6.7 | Fixed text alignment issues")
  .addField('Schedule: ', "No Outages Expected")
  .addField('Roadmap: ', "Optimization")
  .addField('Feedback/Requests: ', "Do `+invite` to go to the support server.")
  .setTimestamp()
  .setFooter('About Menu', client.user.avatarURL);

  message.channel.send(aboutEmbed);
}