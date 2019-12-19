const Discord = require('discord.js');

module.exports = {
  name: 'support',
  args: false,
  description: 'Support server for CatBot',
  run (client, message, args) {
    const inviteEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle('CatBot Support Server')
      .setDescription('[Discord](https://discord.gg/srNyk8G)')
      .addField('About: ', 'Support Server for CatBot')
      .setTimestamp()
      .setFooter('Invite Link Request', client.user.avatarURL);

    message.channel.send(inviteEmbed);
  },
};