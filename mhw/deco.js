const Command = require('../utils/baseCommand.js');

class Deco extends Command {
  constructor() {
    super(
      'deco',
      'deco [deco name]',
      'Get info for a specific decoration'
    )
  }

  decorationEmbed(client,name,rawEmbed) {
    const decoration = client.decorations.get(name);

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle(decoration.name)
      .addField('Skills', decoration.skills)
      .addField('Rarity', decoration.rarity, true)
      .addField('Slot Level', decoration.slot, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.decorations.has(input)) {
      let msg = 'That decoration doesn\'t seem to exist!';

      const similarItems = this.getSimilarArray(client.decorations, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'name',
        'pushSim' : true
      });

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.decorationEmbed);
      }

      message.channel.send(msg);
    }
    else if (client.decorations.has(input)) {
      const embed = this.decorationEmbed(client,input,this.RichEmbed());
      message.channel.send(embed);
    }
  }

}

module.exports = Deco
