const Command = require('../../utils/baseCommand.js');

class List extends Command {
  constructor(prefix) {
    super('list', 'list', 'List all monsters in MHW & Iceborne', {
      args: false
    });
  }

  listEmbed(client, name, rawEmbed = this.RichEmbed()) {
    const embed = rawEmbed
      .setColor('#8fde5d')
      .addField('Monster List', client.monsterList.get('monsters'))
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    const embed = this.listEmbed(client, input);
    message.channel.send(embed);
  }
}

module.exports = List;
