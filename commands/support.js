const Discord = require('discord.js');

module.exports = {
  name: 'support',
  args: false,
  description: 'Support server for CatBot',
  run (client, message, args) {
    const inviteEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle('Hunterscord Support Server')
      .setDescription('https://discord.gg/srNyk8G')
      .addField('About: ', 'The Hunterscord is the server for everything Monster Hunter, and the support server of ' + client.user.username + ".")
      .setTimestamp()
      .setFooter('Invite Link Request', client.user.avatarURL);

    message.channel.send(inviteEmbed);
  },
};