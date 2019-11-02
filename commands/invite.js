const Discord = require('discord.js');

module.exports = {
  name: 'invite',
  args: false,
  description: 'Invite CatBot to your Server',
  run(client, message, args) {
    const inviteEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle('Invite CatBot to your Server')
      .setDescription('https://top.gg/bot/573958899582107653')
      .addField('About: ', 'CatBot is dedicated to providing Monster Hunter World information so you can always be prepared for your hunts ahead.')
      .setTimestamp()
      .setFooter('Invite Link Request', client.user.avatarURL);

    message.channel.send(inviteEmbed);
  },
};