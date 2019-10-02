const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const inviteEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .setTitle("Hunterscord Support Server")
  .setDescription("https://discord.gg/srNyk8G")
  .addField('About: ', "The Hunterscord is the server for everything Monster Hunter, and the support server of " + client.user.username + ".")
  .setTimestamp()
  .setFooter('Invite Link Request', client.user.avatarURL);

  message.channel.send(inviteEmbed);
};