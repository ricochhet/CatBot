const Command = require('../../utils/baseCommand.js');

class Trueraw extends Command {
  constructor(prefix) {
    super(
      'trueraw',
      'trueraw [weapon type] [attack]',
      'True attack value (removed bloat modifier)'
    );
  }

  usageEmbed() {
    const data = [];
    data.push(
      'weapon type: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns'
    );
    data.push('attack: in-game attack value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  truerawEmbed(amount) {
    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Formula ', `*Attack / Bloat Modifier*`)
      .addField('Answer', `**${amount}**`)
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Menu`);

    return embed;
  }

  async run(client, message, args) {
    let calculate = args[1] / this.weaponsRatio.get(args[0]);
    let rounded = Math.round(calculate);

    if (
      Number.isNaN(rounded) ||
      !args[0] ||
      !args[1] ||
      !this.weaponsRatio.has(args[0])
    ) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(this.truerawEmbed(rounded));
    }
  }
}

module.exports = Trueraw;
