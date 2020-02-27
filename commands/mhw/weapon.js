const Command = require('../../utils/baseCommand.js');

class Weapon extends Command {
  constructor(prefix) {
    super('weapon', 'weapon [weapon name]', 'Get info for a specific weapon');
  }

  weaponEmbed(client, name, rawEmbed = this.RichEmbed()) {
    const weapon = client.weapons.get(name);

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle(weapon.name)
      .addField('Type', weapon.type, true)
      .addField('Rarity', weapon.rarity, true)
      .addField('Displayed Attack', weapon.displayAttack, true)
      .addField('Raw Attack', weapon.rawAttack, true)
      .addField('damageType', weapon.damageType, true)
      .addField('Affinity', weapon.affinity, true)
      .addField('Defense', weapon.defense, true)
      .addField('Elderseal', weapon.elderseal, true)
      .addField('Shelling', weapon.shelling, true)
      .addField('Special Ammo', weapon.specialAmmo, true)
      .addField('Deviation', weapon.deviation, true)
      .addField('Ammos', weapon.ammos, true)
      .addField('Elements', weapon.elements, true)
      .addField('Slots', weapon.slots, true)
      .addField('Coatings', weapon.coatings, true)
      .addField('Sharpness (Base)', weapon.sharpness.base, true)
      .addField('Sharpness (Handicraft 1)', weapon.sharpness.h1, true)
      .addField('Sharpness (Handicraft 2)', weapon.sharpness.h2, true)
      .addField('Sharpness (Handicraft 3)', weapon.sharpness.h3, true)
      .addField('Sharpness (Handicraft 4)', weapon.sharpness.h4, true)
      .addField('Sharpness (Handicraft 5)', weapon.sharpness.h5, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.weapons.has(input)) {
      let msg = "That weapon doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.weapons, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.weaponEmbed);
      }

      message.channel.send(msg);
    } else if (client.weapons.has(input)) {
      const embed = this.weaponEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Weapon;
