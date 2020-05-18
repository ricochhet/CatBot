const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Feedback extends Command {
  constructor() {
    super(
      'feedback',
      'feedback (description)',
      'Send us some feedback about CatBot!',
      {
        args: true
      }
    );
  }

  usageEmbed(prefix, error = '') {
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
          `\n\nIf you want to follow up or discuss more you can do ${prefix}support instead and join the support server`
      )
      .setTimestamp();

    return embed;
  }

  async run(client, message, args) {
    let description = args.join(' ');

    if (description.length > 512)
      return message.channel.send(
        this.usageEmbed('Description must be less than 512 characters')
      );

    let embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Feedback message', `\`\`\`${description}\`\`\``)
      .setFooter(`Sent by ${message.author.tag} in ${message.guild.name}`)
      .setTimestamp();

    client.shard
      .broadcastEval(
        `
    	let channel = this.channels.cache.get('${
        client.config.channel_ids.feedback_channel
      }');

      if ( channel ) {
        channel.send( { embed : ${JSON.stringify(embed.toJSON())} } )
        true
      } else {
        false
      }
    `
      )
      .then(results => {
        if (results.includes(true)) {
          message.react('✅');
        } else {
          message.react('❌');
        }
      })
      .catch(err =>
        logger.error(err, {
          where: 'feedback.js 73 (client.shard.broadcastEval)'
        })
      );
  }
}

module.exports = Feedback;
