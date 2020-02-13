const Command = require('../../utils/baseCommand.js');

class Elemental extends Command {
  constructor(prefix) {
    super(
      'elemental',
      'elemental [damage] [sharpness] (monster part multiplier)',
      'Calculate for elemental'
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
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  elementalEmbed(amount) {
    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField(
        'Formula ',
        `*((Damage / 10) x Elemental Sharpness) x Monster Part Multiplier*`
      )
      .addField('Answer', `**${amount}**`)
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Menu`);

    return embed;
  }

  run(client, message, args) {
    const sharpMult = (args[0] / 10) * this.elemSharpRatio.get(args[1]);
    let partMult = args[2];

    if (Number.isNaN(args[2]) || args[2] == null) {
      partMult = 1;
    }

    let calculate = sharpMult * partMult;
    let rounded = Math.round(calculate);

    if (Number.isNaN(rounded) || !args[0] || !args[1]) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(this.elementalEmbed(rounded));
    }
  }
}

module.exports = Elemental;
