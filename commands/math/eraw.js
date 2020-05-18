const Command = require('../../utils/command.js');

class Eraw extends Command {
  constructor() {
    super(
      'eraw',
      'eraw [sharpness] [true raw] [critical boost level] (monster hitzone)',
      'Effective raw attack (average damage over time)'
    );
  }

  usageEmbed() {
    const data = [];
    data.push(
      'weapon type: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns'
    );
    data.push(
      'sharpness: none, red, orange, yellow, green, blue, white, purple'
    );
    data.push('true raw: true raw damage value');
    data.push(
      'critical boost level: current level of critical boost used (use "none" for no crit boost)'
    );
    data.push('monster hitzone: monster part hitzone value');

    const embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  erawEmbed(amount) {
    const embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField(
        'Formula ',
        `*True Attack x Monster Hitzone x Sharpness Modifier x Crit Boost*`
      )
      .addField('Answer', `**${amount}**`)
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Menu`);

    return embed;
  }

  async run(client, message, args) {
    let monsterHitzone = args[3];
    if (monsterHitzone == undefined || Number.isNaN(monsterHitzone)) {
      monsterHitzone = 1;
    }
    let calculate =
      args[1] *
      monsterHitzone *
      this.rawSharpRatio.get(args[0]) *
      this.critBoostLvl.get(args[2]);
    let rounded = Math.round(calculate);

    if (
      Number.isNaN(rounded) ||
      !args[0] ||
      !args[1] ||
      !args[2] ||
      !this.rawSharpRatio.has(args[0]) ||
      !this.critBoostLvl.has(args[2])
    ) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(this.erawEmbed(rounded));
    }
  }
}

module.exports = Eraw;
