const Command = require('../../bot/command.js');

class About extends Command {
  constructor() {
    super('about', 'about', 'Shows extra information about the bot', {
      args: false
    });
  }

  async run(client, message, args) {
    const prefix = await client.prefix(message);
    const rico = client.users.cache.get(client.config['user_ids']['rico_id']);
    const yofou = client.users.cache.get(client.config['user_ids']['yofou_id']);
    const chad = client.users.cache.get(client.config['user_ids']['chad_id']);
    const jesse = client.users.cache.get(client.config['user_ids']['jesse_id']);

    const aboutEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Owner: ', `${rico.tag}`)
      .addField('Devs', `${chad.tag}\n${yofou.tag}\n${jesse.tag}`)
      .addField('Contributors', `MechE\nMoonBunnie\nDeathcream`)
      .addField('Version: ', `v${client.version}`)
      .addField(
        'Changelog: ',
        `Use \`${prefix}changelog\` to see the latest version changes.`
      )
      .addField(
        'Feedback / Requests: ',
        `Use \`${prefix}support\` to go to the support server.`
      )
      .setTimestamp()
      .setFooter('About Menu', client.user.avatarURL());

    message.channel.send(aboutEmbed);
  }
}

module.exports = About;
