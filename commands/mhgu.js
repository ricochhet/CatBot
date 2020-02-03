const Command = require('../utils/baseCommand.js')

class Mhgu extends Command {
  constructor(prefix) {
    super(
      'mhgu',
      'mhgu [command] [command arguments]',
      'MHGU - Monster Hunter Generations Ultimate',
      {
        category : true,
        prefix : prefix
      }
    )
  }

  usageEmbed(){
    const data = [];
    data.push(`\`${this.prefix}mhgu monster [monster name]\` - Get info for a specific monster\n`);
    data.push(`\`${this.prefix}mhgu weapon [weapon name]\` - Get info for a specific weapon\n`);

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField(this.description, this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('MHGU Help');

    return embed;
  }
}

module.exports = Mhgu
