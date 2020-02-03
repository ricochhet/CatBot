const Command = require( '../utils/baseCommand.js' )

class Mhw extends Command {
  constructor(prefix) {
    super(
      'mhw',
      'mhw',
      'MHW - Monster Hunter World: Iceborne',
      {
        category: true,
        prefix : prefix
      }
    )
  }

  usageEmbed() {
    const data = [];
    data.push(`\`${this.prefix}mhw armor [armor name]\` - Get info for a specific armor set\n`);
    data.push(`\`${this.prefix}mhw deco [deco/skill name]\` - Get info for a specific decoration\n`);
    data.push(`\`${this.prefix}mhw item [item name]\` - Get info for a specific item\n`);
    data.push(`\`${this.prefix}mhw monster [monster name]\` - Get info for a specific monster\n`);
    data.push(`\`${this.prefix}mhw weapon [weapon name]\` - Get info for a specific weapon\n`);
    data.push(`\`${this.prefix}mhw skill [skill name]\` - Get info for a specific skill\n`);
    data.push(`\`${this.prefix}mhw rollhunt\` - Get a random roll of what monster you should hunt with which gear\n`);

    const usageEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField(this.description, this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('MHW Help');

    return usageEmbed;
  }

}

module.exports = Mhw
