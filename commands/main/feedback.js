const Command = require('../../utils/baseCommand.js');

class Feedback extends Command {
  constructor(prefix) {
    super(
      'feedback',
      'feedback (description)',
      'Send us some feedback about CatBot!',
      {
        args: true,
        prefix: prefix
      }
    );
  }

  usageEmbed(error = '') {
    let embed = this.MessageEmbed();

    if (error) {
      embed.addField('An error has occurred!', error);
    }

    embed
      .setColor('#8fde5d')
      .addField('Usage: ', this.usage)
      .addField(
        'Description: ',
        this.description +
          '\n\nIf you want to follow up or discuss more you can do +support instead and join the support server'
      )
      .setTimestamp();

    return embed;
  }

  async run(client, message, args) {
    let description = args.join(' ');
    const channel = client.channels.cache.get(
      client.config.get('feedbackChannel')
    );

    if (description.length > 512)
      return message.channel.send(
        this.usageEmbed('description can only be 512 characters or less')
      );

    let embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Feedback message', `\`\`\`${description}\`\`\``)
      .setFooter(`Sent by ${message.author.tag} in ${message.guild.name}`)
      .setTimestamp();

    channel.send(embed);
  }
}

module.exports = Feedback;
