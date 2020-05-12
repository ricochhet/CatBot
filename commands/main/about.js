const Command = require('../../utils/command.js');

class About extends Command {
  constructor(prefix) {
    super('about', 'about', 'Shows extra information about the bot', {
      args: false,
      prefix: prefix
    });
  }

  async run(client, message, args) {
    const rico = client.users.cache.get(client.config['user_ids']['rico_id']);
    const yofou = client.users.cache.get(client.config['user_ids']['yofou_id']);
    const chad = client.users.cache.get(client.config['user_ids']['chad_id']);

    const aboutEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Author: ', `${rico.tag}`, true)
      .addField('Contributors', `${chad.tag}\n${yofou.tag}`, true)
      .addField('Version: ', `v${client.version}`, true)
      .addField(
        'Changelog: ',
        `Do \`${this.prefix}changelog\` to see the latest version changes.`
      )
      .addField(
        'Feedback / Requests: ',
        `Do \`${this.prefix}support\` to go to the support server.`
      )
      .setTimestamp()
      .setFooter('About Menu', client.user.avatarURL());

    message.channel.send(aboutEmbed);
  }
}

module.exports = About;
