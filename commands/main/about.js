const Command = require('../../utils/baseCommand.js');

class About extends Command {
  constructor(prefix) {
    super('about', 'about', 'Shows extra information about the bot', {
      args: false,
      prefix: prefix
    });
  }

  run(client, message, args) {
    const rico = client.users.find(user => user.id == '381239423645515776');
    const yofou = client.users.find(user => user.id == '264781399737892865');
    const chad = client.users.find(user => user.id == '123633666550136832');

    const aboutEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Author: ', `${rico.tag}`, true)
      .addField('Contributors', `${chad.tag}\n${yofou.tag}`, true)
      .addField('Version: ', `v${client.config.get('VERSION')}`, true)
      .addField('Changelog: ', `Do \`${this.prefix}changelog\` to see the latest version changes.`)
      .addField(
        'Feedback / Requests: ',
        `Do \`${this.prefix}support\` to go to the support server.`
      )
      .setTimestamp()
      .setFooter('About Menu', client.user.avatarURL);

    message.channel.send(aboutEmbed);
  }
}

module.exports = About;
