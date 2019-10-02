const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const aboutEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Author: ', "Ricochet#7498", true)
  .addField('Contributors', "Chad#0389", true)
  .addField('Bot Version: ', "v1.5.2", true)
  .addField('Changelog: ', "v1.5.2 | Possibly the biggest changes ever, we've overhauled commands, and added some new ones, try out `+mhwiteminfo <itemname>`, and `+mhwlrarmor`")
  .addField('Schedule: ', "No Outages Expected")
  .addField('Roadmap: ', "Endemic Life Full List & Info")
  .addField('Feedback/Requests: ', "Use +invite to recieve a server invite link for CatBots support server.")
  .setTimestamp()
  .setFooter('About Menu', client.user.avatarURL);

  message.channel.send(aboutEmbed);
}