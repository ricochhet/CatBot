const Command = require('../../bot/command.js');

class Support extends Command {
  constructor() {
    super('support', 'support', 'Support server for CatBot', {
      args: false
    });
  }

  async run(client, message, args) {
    const inviteEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .setTitle('CatBot Support')
      .setDescription('[Join the Discord](https://discord.gg/p5GRCSh)')
      .setTimestamp()
      .setFooter('Support Link Request', client.user.avatarURL());

    message.channel.send(inviteEmbed);
  }
}

module.exports = Support;
