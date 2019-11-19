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
        .addField('Arc Shot', weapon.ArcShot, true)
        .addField('Coating Available', weapon.Coatingavailable, true)
        .addField('Boosted Coating', weapon.BoostedCoating, true)
        .setTimestamp()
        .setFooter('Info Menu');

      message.channel.send(weaponEmbed);
    }
  },
};