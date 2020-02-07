const Command = require('../../utils/baseCommand.js');

class Weapon extends Command {
  constructor(prefix) {
    super(
      'weapon',
      'weapon [weapon name]',
      'Get info for a specific weapon'
    )
  }

  weaponEmbed(client,name,rawEmbed) {
    const weapon = client.weapons.get(name);

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle(weapon.title)
      .setURL(weapon.url)
      .setThumbnail(weapon.thumbnail)
      .addField('Type', weapon.type, true)
      .addField('Attack', weapon.attack, true)
      .addField('Defense', weapon.defense, true)
      .addField('Sharpness', weapon.sharpness, true)
      .addField('Affinity', weapon.affinity, true)
      .addField('Elemental Attack', weapon.elementalattack, true)
      .addField('Rarity', weapon.rarity, true)
      .addField('Gem Slots', weapon.gemslots, true)
      .addField('Wyvern Type', weapon.wyvernheart, true)
      .addField('Phials', weapon.phials, true)
      .addField('Notes', weapon.notes)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.weapons.has(input)) {
      let msg = 'That weapon doesn\'t seem to exist!';

      const similarItems = this.getSimilarArray(client.weapons, {
        input : input,
        threshold : 0.8,
        key : 'title',
        pushSim : true
      });

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.weaponEmbed);
      }

      message.channel.send(msg);
    }
    else if (client.weapons.has(input)) {
      const embed = this.weaponEmbed(client,input,this.RichEmbed());
      message.channel.send(embed);
    }
  }

}


module.exports = Weapon
