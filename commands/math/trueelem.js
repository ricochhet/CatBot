const Command = require('../../utils/baseCommand.js');

class Trueelem extends Command {
  constructor(prefix) {
    super(
      'trueelem',
      'trueelem [attack]',
      'True elemental value (removed bloat modifier)'
    );
  }

  usageEmbed() {
    const data = [];
    data.push('attack: in-game attack value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  trueelemEmbed(amount) {
    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Formula ', `*Elemental / 10*`)
      .addField('Answer', `**${amount}**`)
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Menu`);

    return embed;
  }

  async run(client, message, args) {
    let calculate = args[0] / 10;
    let rounded = Math.round(calculate);

    if (Number.isNaN(rounded) || !args[0]) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(this.trueelemEmbed(rounded));
    }
  }
}

module.exports = Trueelem;
