const Command = require('../utils/baseCommand.js')

class Affinity extends Command {
  constructor() {
    super(
      'affinity',
      'affinity [affinity] [damage]',
      'Calculate for affinity'
    )
  }

  usageEmbed() {
    const data = [];
    data.push('affinity: base affinity value');
    data.push('damage: base damage value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return embed
  }

  run(client, message, args) {
    let calculate = ((0.25 * (args[0] / 100)) + 1) * args[1];
    let rounded = Math.round(calculate);

    if (Number.isNaN(rounded) || !args[0] || !args[1]) {
      message.channel.send( this.usageEmbed() )
    } else {
      message.channel.send("Your damage + affinity is " + "**" + rounded + "**" + " meowster!");
    }
  }
}

module.exports = Affinity
