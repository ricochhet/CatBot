const Command = require('../../utils/baseCommand.js');

class Elemental extends Command {
  constructor(prefix) {
    super(
      'elemental',
      'elemental [damage] [sharpness] [monster part multiplier]',
      'Calculate for elemental`'
    );
  }

  usageEmbed() {
    const data = [];
    data.push('damage: base damage value');
    data.push(
      'sharpness (elemental): none, red, orange, yellow, green, blue, white, purple'
    );
    data.push('monsterpartmultiplier: multiplier value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return embed;
  }

  run(client, message, args) {
    const sharpMult = (args[0] / 10) * this.elemSharpRatio.get(args[1]);

    let calculate = sharpMult * args[2];
    let rounded = Math.round(calculate);

    if (Number.isNaN(rounded) || !args[0] || !args[1] || !args[2]) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(
        'Your elemental damage is ' + '**' + rounded + '**' + ' meowster!'
      );
    }
  }
}

module.exports = Elemental;
