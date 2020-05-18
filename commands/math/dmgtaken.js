const Command = require('../../utils/command.js');

class Dmgtaken extends Command {
  constructor() {
    super(
      'dmgtaken',
      'dmgtaken [defense]',
      'Percentage of damage taken based on defense'
    );
  }

  usageEmbed(prefix) {
    const data = [];
    data.push('defense: base defense value');

    const embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  dmgTakenEmbed(amount) {
    const embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Formula ', `*(80 / (Defense + 80)) x 100*`)
      .addField('Answer', `**${amount}**`)
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Menu`);

    return embed;
  }

  async run(client, message, args) {
    let calculate = (80 / (Number(args[0]) + 80)) * 100;
    let rounded = Math.round(calculate);

    if (Number.isNaN(calculate) || !args[0]) {
      message.channel.send(this.usageEmbed(client.prefix(message)));
    } else {
      message.channel.send(this.dmgTakenEmbed(rounded));
    }
  }
}

module.exports = Dmgtaken;
