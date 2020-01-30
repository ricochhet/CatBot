const Command = require('../utils/baseCommand.js')

class Weapon extends Command {
  constructor() {
    super(
      'weapon',
      'weapon [weapon name]',
      'Get info for a specific weapon'
    )
  }

  weaponEmbed(client,name,rawEmbed) {
    const weapon = client.mhguWeapons.get(name);

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle(weapon.name)
      .addField('Type', weapon.type)
      .addField('Raw', weapon.Raw, true)
      .addField('Element/Status', weapon.ElementStatus, true)
      .addField('Elemental Damage', weapon.ElementDmg, true)
      .addField('Status Damage', weapon.StatusDmg, true)
      .addField('Affinity', weapon.Affinity, true)
      .addField('Defense', weapon.Defence, true)
      .addField('Slots', weapon.Slots, true)
      .addField('EFR', weapon.EFR, true)

    if(weapon.ArcShot == null || weapon.ArcShot == "" || weapon.Coatingavailable == null || weapon.Coatingavailable == "" || weapon.BoostedCoating == null | weapon.BoostedCoating == "") {
      embed.addField('Sharpness', weapon.Sharpness, true)
      embed.addField('Sharpness +2', weapon.Sharpness2, true)
      embed.addField('Sharpness +1', weapon.Sharpness1, true)
      embed.addField('No Handicraft', weapon.NoHandicraft, true)
    } else {
      embed.addField('Arc Shot', weapon.ArcShot, true)
      embed.addField('Coating Available', weapon.Coatingavailable, true)
      embed.addField('Boosted Coating', weapon.BoostedCoating, true)
    }

    embed.setTimestamp()
    embed.setFooter('Info Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.mhguWeapons.has(input)) {
      let msg = 'That weapon doesn\'t seem to exist!';

      const similarItems = this.getSimilarArray(client.mhguWeapons, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'name',
        'pushSim' : true
      });

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.weaponEmbed);
      }

      message.channel.send(msg);
    }
    else if (client.mhguWeapons.has(input)) {
      const embed = this.weaponEmbed(client,input,this.RichEmbed());
      message.channel.send(embed);
    }
  }
}

module.exports = Weapon
