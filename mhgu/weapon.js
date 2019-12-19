const Discord = require('discord.js');
const weaponDatabase = require('../databases/mhgu/weaponinfo.json');
const { similarity } = require('../util.js');

const weapons = new Discord.Collection();

for (const i of Object.keys(weaponDatabase)) {
  weapons.set(i, weaponDatabase[i]);
}

module.exports = {
  name: 'weapon',
  args: true,
  usage: 'weapon <weaponname>',
  description: 'Get weapon info',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!weapons.has(input)) {
      let msg = 'That weapon doesn\'t seem to exist!';

      const similarItems = new Array();

      for (const key of weapons.keys()) {
        if (similarity(key, input) >= 0.5) {
          similarItems.push(key);
        }
      }

      if (similarItems.length) {
        msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    } 
    else if (weapons.has(input)) {
      const weapon = weapons.get(input);

      const weaponEmbed = new Discord.RichEmbed()
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
        weaponEmbed.addField('Sharpness', weapon.Sharpness, true)
        weaponEmbed.addField('Sharpness +2', weapon.Sharpness2, true)
        weaponEmbed.addField('Sharpness +1', weapon.Sharpness1, true)
        weaponEmbed.addField('No Handicraft', weapon.NoHandicraft, true)
      } else {
        weaponEmbed.addField('Arc Shot', weapon.ArcShot, true)
        weaponEmbed.addField('Coating Available', weapon.Coatingavailable, true)
        weaponEmbed.addField('Boosted Coating', weapon.BoostedCoating, true)
      }
      
      weaponEmbed.setTimestamp()
      weaponEmbed.setFooter('Info Menu');

      message.channel.send(weaponEmbed);
    }
  },
};