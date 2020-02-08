const Command = require('../../utils/baseCommand.js');

class Invite extends Command {
  constructor(prefix) {
    super('invite', 'invite', 'Invite CatBot to your Server', {
      args: false,
      prefix: prefix
    });
  }

  run(client, message, args) {
    const inviteEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .setTitle('Invite CatBot to your Server')
      .setDescription(
        '[Invite](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)'
      )
      .addField(
        'About: ',
        'CatBot is dedicated to providing Monster Hunter World information so you can always be prepared for your hunts ahead.'
      )
      .setTimestamp()
      .setFooter('Invite Link Request', client.user.avatarURL);

    message.channel.send(inviteEmbed);
  }
}

module.exports = Invite;
