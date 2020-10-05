const Command = require('../../bot/command.js');

class Invite extends Command {
  constructor() {
    super('invite', 'invite', 'Invite CatBot to your Server', {
      args: false
    });
  }

  async run(client, message, args) {
    const inviteEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .setTitle('CatBot Invite')
      .setDescription(
        '[Invite the bot to your server](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)'
      )
      .setTimestamp()
      .setFooter('Invite Link Request', client.user.avatarURL());

    message.channel.send(inviteEmbed);
  }
}

module.exports = Invite;
