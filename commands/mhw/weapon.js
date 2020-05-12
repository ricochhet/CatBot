const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Weapon extends Command {
  constructor(prefix) {
    super('weapon', 'weapon [weapon name]', 'Get info for a specific weapon');
  }

  weaponEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const weapon = message.client.mhwWeapons.get(name);

    logger.debug('weapon log', { type: 'weaponRead', name: name });

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(weapon.name)
      .addField('Type', weapon.type, true)
      .addField('Rarity', weapon.rarity, true)
      .addField('Displayed Attack', weapon.displayAttack, true)
      .addField('Raw Attack', weapon.rawAttack, true)
      .addField('Damage Type', weapon.damageType, true)
      .addField('Affinity', weapon.affinity, true)
      .addField('Defense', weapon.defense, true)
      .addField('Elderseal', weapon.elderseal, true)
      .addField('Shelling', weapon.shelling, true)
      .addField('Special Ammo', weapon.specialAmmo, true)
      .addField('Deviation', weapon.deviation, true)
      .addField('Elements', weapon.elements, true)
      .addField('Slots', weapon.slots, true)
      .addField('Coatings', weapon.coatings, true)
      .addField('Sharpness', weapon.sharpness.base, true)
      .addField('Forge', weapon.crafting, true)
      .addField('Upgrade', weapon.upgrade, true)
      .addField('Ammos', weapon.ammos)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwWeapons == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!client.mhwWeapons.has(input)) {
      let msg = "That weapon doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.mhwWeapons, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.weaponEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhwWeapons.has(input)) {
      let embed = this.weaponEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Weapon;
