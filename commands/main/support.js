const Command = require('../../utils/command.js');

class Support extends Command {
  constructor(prefix) {
    super('support', 'support', 'Support server for CatBot', {
      args: false,
      prefix: prefix
    });
  }

  async run(client, message, args) {
    const inviteEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .setTitle('CatBot Support Server')
      .setDescription('[Discord](https://discord.gg/srNyk8G)')
      .addField('About: ', 'Support Server for CatBot')
      .setTimestamp()
      .setFooter('Support Link Request', client.user.avatarURL());

    message.channel.send(inviteEmbed);
  }
}

module.exports = Support;
