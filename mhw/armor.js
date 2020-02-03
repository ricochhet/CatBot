const Command = require('../utils/baseCommand.js');

class Armor extends Command {
  constructor(prefix) {
    super(
      'armor',
      'armor [armor name]',
      'Get info for a specific armor set'
    )
  }

  armorEmbed(client,name,rawEmbed) {
    const armor = client.armors.get(name);

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle(armor.name)
      .setURL(armor.url)
      .addField('Resistances', armor.resistances, true)
      .addField('Skills', armor.skills, true)
      .addField('Set Bonus', armor.setBonus)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.armors.has(input)) {
      let msg = 'That armor doesn\'t seem to exist!';

      const similarItems = this.getSimilarArray(client.armors, {
        'input' : input,
        'threshold' : 0.8,
        'key' : 'name',
        'pushSim' : true
      });

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.armorEmbed);
      }

      message.channel.send(msg);
    }
    else if (client.armors.has(input)) {
      const embed = this.armorEmbed(client,input,this.RichEmbed());
      message.channel.send(embed);
    }
  }
}

module.exports = Armor
