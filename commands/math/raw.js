const Command = require('../../utils/baseCommand.js');

class Raw extends Command {
  constructor(prefix) {
    super(
      'raw',
      'raw [damage] [weapon type] [sharpness] [monster part multiplier]',
      'Calculate for raw'
    );
  }

  usageEmbed() {
    const data = [];
    data.push('damage: base damage value');
    data.push(
      'weapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns'
    );
    data.push(
      'sharpness (raw): none, red, orange, yellow, green, blue, white, purple'
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
    const rawBase = this.weaponsRatio.get(args[1]);
    const sharpMult = this.rawSharpRatio.get(args[2]);

    let calculate = (args[0] / rawBase) * sharpMult * args[3];
    let rounded = Math.round(calculate);

    if (Number.isNaN(rounded) || !args[0] || !args[1] || !args[2] || !args[3]) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(
        'Your raw damage is ' + '**' + rounded + '**' + ' meowster!'
      );
    }
  }
}

module.exports = Raw;
