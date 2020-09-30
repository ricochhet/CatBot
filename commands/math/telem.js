const Command = require('../../bot/command.js');

class Telem extends Command {
  constructor() {
    super(
      'telem',
      'telem [attack]',
      'True elemental value (removed bloat modifier)'
    );
  }

  usageEmbed(prefix) {
    const data = [];
    data.push('attack: in-game attack value');

    const embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter(`${this.name.toUpperCase()} Help`);

    return embed;
  }

  trueelemEmbed(amount) {
    const embed = this.MessageEmbed()
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
      message.channel.send(this.usageEmbed(await client.prefix(message)));
    } else {
      message.channel.send(this.trueelemEmbed(rounded));
    }
  }
}

module.exports = Telem;
