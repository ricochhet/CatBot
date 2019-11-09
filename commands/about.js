const Discord = require('discord.js');

module.exports = {
  name: 'about',
  args: false,
  description: 'Shows extra information about the bot',
  run(client, message, args) {
    const aboutEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Author: ', 'Ricochet#7498', true)
      .addField('Contributors', 'Chad#0389\nYofou#0420', true)
      .addField('Bot Version: ', 'v1.6.22', true)
      .addField('Changelog: ', 'v1.6.22 | Shortened `+help`, no commands have been removed, the help command was just rearranged.')
      .addField('Feedback/Requests: ', 'Do `+support` to go to the support server.')
      .setTimestamp()
      .setFooter('About Menu', client.user.avatarURL);

    message.channel.send(aboutEmbed);
  },
};