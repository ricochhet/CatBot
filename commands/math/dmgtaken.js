const Command = require('../../utils/baseCommand.js');

class Dmgtaken extends Command {
  constructor(prefix) {
    super('dmgtaken', 'dmgtaken [defense]', 'Calculate for damage taken');
  }

  usageEmbed() {
    const data = [];
    data.push('defense: base defense value');

    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return embed;
  }

  run(client, message, args) {
    let calculate = (80 / (Number(args[0]) + 80)) * 100;
    let rounded = Math.round(calculate);

    if (Number.isNaN(calculate) || !args[0]) {
      message.channel.send(this.usageEmbed());
    } else {
      message.channel.send(
        'Your damage taken is ' + '**' + rounded + '%**' + ' meowster!'
      );
    }
  }
}

module.exports = Dmgtaken;
