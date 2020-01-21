const Discord = require('discord.js');
const weaponDatabase = require('../databases/mhgu/weapons.json');
const { getSimilarArray, reactions } = require('../util.js');

const weapons = new Discord.Collection();

for (const i of Object.keys(weaponDatabase)) {
  weapons.set(i, weaponDatabase[i]);
}

module.exports = {
  name: 'weapon',
  args: true,
  usage: 'weapon [weapon name]',
  description: 'Get info for a specific weapon',
  weaponEmbed(name) {
    const weapon = weapons.get(name);

    const embed = new Discord.RichEmbed()
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
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!weapons.has(input)) {
      let msg = 'That weapon doesn\'t seem to exist!';

      const similarItems = getSimilarArray(weapons, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'title',
        'pushSim' : true
      });

      if (similarItems.length) {
        return reactions(message, similarItems, this.weaponEmbed);
      }

      message.channel.send(msg);
    } 
    else if (weapons.has(input)) {
      const embed = this.weaponEmbed(input);
      message.channel.send(embed);
    }
  },
};