const Command = require('../utils/baseCommand.js')

class Calc extends Command {
  constructor() {
    super(
      'calc',
      '+calc [category] [additional arguments]',
      'Math/Calculation (MHWI)',
      {
        category: true,
        subTree: 'math'
      }
    )
  }

  usageEmbed() {
    const data = [];
    data.push('`+calc dmgtaken [defense]` - Calculate for damage taken\n');
    data.push('`+calc elemental [damage] [sharpness: none, red, orange, yellow, green, blue, white, purple] [monster part multiplier value]` - Calculate for elemental\n');
    data.push('`+calc eraw [damage] [bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns]` - Calculate for effective raw\n');
    data.push('`+calc raw [damage] [bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns] [sharpness: none, red, orange, yellow, green, blue, white, purple] [monster part multiplier value]` - Calculate for raw\n');
    data.push('`+calc affinity [affinity] [damage]` - Calculate for affinity\n');

    const usageEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField(this.description, this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('Calc Help');

    return usageEmbed;
  }
}

module.exports = Calc
