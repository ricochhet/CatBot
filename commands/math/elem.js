const Command = require('../../utils/baseCommand.js');

class Elem extends Command {
  constructor(prefix) {
    super(
      'elem',
      'elem [sharpness] [true elem] (monster hitzone)',
      'Effective elemental attack (average damage over time)'
    );
  }

  usageEmbed() {
    const data = [];
    data.push(
      'sharpness: none, red, orange, yellow, green, blue, white, purple'
    );
    data.push('true elem: true elem damage value');
    data.push('monster hitzone: monster part hitzone value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  elemEmbed(amount) {
    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField(
        'Formula ',
        `*True Attack x Monster Hitzone x Sharpness Modifier*`
      )
      .addField('Answer', `**${amount}**`)
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Menu`);

    return embed;
  }

  run(client, message, args) {
    let monsterHitzone = args[2];
    if (monsterHitzone == undefined || Number.isNaN(monsterHitzone)) {
      monsterHitzone = 1;
    }
    let calculate = args[1] * monsterHitzone * this.elemSharpRatio.get(args[0]);
    let rounded = Math.round(calculate);

    if (
      Number.isNaN(rounded) ||
      !args[0] ||
      !args[1] ||
      !this.elemSharpRatio.has(args[0])
    ) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(this.elemEmbed(rounded));
    }
  }
}

module.exports = Elem;
