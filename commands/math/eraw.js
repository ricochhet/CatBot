const Command = require('../../utils/baseCommand.js');

class Eraw extends Command {
  constructor(prefix) {
    super('eraw', 'eraw [weapon type] [damage]', 'Calculate for effective raw');
  }

  usageEmbed() {
    const data = [];
    data.push(
      'weapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns'
    );
    data.push('damage: base damage value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return embed;
  }

  run(client, message, args) {
    const rawBase = this.weaponsRatio.get(args[0]);

    let calculate = args[1] / rawBase;
    let rounded = Math.round(calculate);

    if (
      Number.isNaN(rounded) ||
      !args[0] ||
      !args[1] ||
      !this.weaponsRatio.has(args[0])
    ) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(
        'Your effective raw is ' + '**' + rounded + '**' + ' meowster!'
      );
    }
  }
}

module.exports = Eraw;