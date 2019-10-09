const Discord = require('discord.js');

module.exports = {
  name: 'about',
  args: false,
  description: 'Shows extra information about the bot',
  run (client, message, args) {
    const aboutEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Author: ', "Ricochet#7498", true)
      .addField('Contributors', "Chad#0389", true)
      .addField('Bot Version: ', "v1.6.12", true)
      .addField('Changelog: ', "v1.6.12 | Input syntax for monsters has changed, as well as a similarity feature, most monsters don't require the '-' anymore, you can just use a space. Unless the monster has a hyphyen in their actual name, e.g tobi-kadachi")
      .addField('Schedule: ', "No Outages Expected")
      .addField('Roadmap: ', "Optimization")
      .addField('Feedback/Requests: ', "Do `+support` to go to the support server.")
      .setTimestamp()
      .setFooter('About Menu', client.user.avatarURL);
  
    message.channel.send(aboutEmbed);
  }
}

/*
exports.run = (client, message, args) => {
  const aboutEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Author: ', "Ricochet#7498", true)
  .addField('Contributors', "Chad#0389", true)
  .addField('Bot Version: ', "v1.6.10", true)
  .addField('Changelog: ', "v1.6.10 | Added `+mhwitem` similarity feature")
  .addField('Schedule: ', "No Outages Expected")
  .addField('Roadmap: ', "Optimization")
  .addField('Feedback/Support: ', "Do `+support` to go to the support server.")
  .setTimestamp()
  .setFooter('About Menu', client.user.avatarURL);

  message.channel.send(aboutEmbed);
}*/