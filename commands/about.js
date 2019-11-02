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
      .addField('Bot Version: ', 'v1.6.18', true)
      .addField('Changelog: ', 'v1.6.18 | All Monster Hunter: World commands now use `+mhw` as a prefix, this means that in the future, we can start adding more Monster Hunter games :)')
      .addField('Schedule: ', 'No Outages Expected')
      .addField('Feedback/Requests: ', 'Do `+support` to go to the support server.')
      .setTimestamp()
      .setFooter('About Menu', client.user.avatarURL);

    message.channel.send(aboutEmbed);
  },
};