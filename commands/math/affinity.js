const Command = require('../../utils/baseCommand.js');

class Affinity extends Command {
  constructor(prefix) {
    super('affinity', 'affinity [affinity] [damage]', 'Calculate for affinity');
  }

  usageEmbed() {
    const data = [];
    data.push('affinity: base affinity value');
    data.push('damage: base damage value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  affinityEmbed(amount) {
    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Formula ', `*(0.25 x (Affinity / 100) + 1) x Damage*`)
      .addField('Answer', `**${amount}**`)
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Menu`);

    return embed;
  }

  run(client, message, args) {
    let calculate = (0.25 * (args[0] / 100) + 1) * args[1];
    let rounded = Math.round(calculate);

    if (Number.isNaN(rounded) || !args[0] || !args[1]) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(this.affinityEmbed(rounded));
    }
  }
}

module.exports = Affinity;
