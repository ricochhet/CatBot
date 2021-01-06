const Command = require('../../bot/command.js');

class About extends Command {
  constructor() {
    super('about', 'about', 'Shows extra information about the bot', {
      args: false
    });
  }

  async run(client, message, args) {
    const prefix = await client.prefix(message);
    const rico = await client.users
      .fetch(client.config.users.rico_id)
      .catch(_ => client.config.users.rico_tag);
    const yofou = await client.users
      .fetch(client.config.users.yofou_id)
      .catch(_ => client.config.users.yofou_tag);
    const chad = await client.users
      .fetch(client.config.users.chad_id)
      .catch(_ => client.config.users.chad_tag);
    const jesse = await client.users
      .fetch(client.config.users.jesse_id)
      .catch(_ => client.config.users.jesse_tag);

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
