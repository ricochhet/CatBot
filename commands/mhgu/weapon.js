const Command = require('../../bot/command.js');

class Weapon extends Command {
  constructor() {
    super('weapon', 'weapon [weapon name]', 'Get info for a specific weapon');
  }

  weaponEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const weapon = message.client.mhguWeapons.get(name);

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(weapon.name)
      .addField('Type', weapon.type)
      .addField('Raw', weapon.Raw, true);

    if (weapon.ElementStatus)
      embed.addField('Element/Status', weapon.ElementStatus, true);
    if (weapon.ElementDmg)
      embed.addField('Elemental Damage', weapon.ElementDmg, true);
    if (weapon.StatusDmg)
      embed.addField('Status Damage', weapon.StatusDmg, true);

    if (weapon.Affinity) embed.addField('Affinity', weapon.Affinity, true);
    if (weapon.Defence) embed.addField('Defense', weapon.Defence, true);
    if (weapon.Slots) embed.addField('Slots', weapon.Slots, true);
    if (weapon.EFR) embed.addField('EFR', weapon.EFR, true);

    if (weapon.Sharpness) embed.addField('Sharpness', weapon.Sharpness, true);
    if (weapon.Sharpness2)
      embed.addField('Sharpness +2', weapon.Sharpness2, true);
    if (weapon.Sharpness1)
      embed.addField('Sharpness +1', weapon.Sharpness1, true);
    if (weapon.NoHandicraft)
      embed.addField('No Handicraft', weapon.NoHandicraft, true);

    if (weapon.ArcShot) embed.addField('Arc Shot', weapon.ArcShot, true);
    if (weapon.Coatingavailable)
      embed.addField('Coating Available', weapon.Coatingavailable, true);
    if (weapon.BoostedCoating)
      embed.addField('Boosted Coating', weapon.BoostedCoating, true);

    embed.setTimestamp();
    embed.setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhguWeapons == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!client.mhguWeapons.has(input)) {
      let msg = "That weapon doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      const similarItems = this.findAllMatching(client.mhguWeapons, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.weaponEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhguWeapons.has(input)) {
      const embed = this.weaponEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Weapon;
