const Discord = require('discord.js');
const weaponDatabase = require('../databases/mhw/weaponinfo.json');
const { similarity } = require('../util.js');

const weapons = new Discord.Collection();

for (const i of Object.keys(weaponDatabase)) {
  weapons.set(i, weaponDatabase[i]);
}

module.exports = {
  name: 'weapon',
  args: true,
  usage: 'weapon [weapon name]',
  description: 'Get info for a specific weapon',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!weapons.has(input)) {
      let msg = 'That weapon doesn\'t seem to exist!';

      const similarItems = new Array();

      /*for (const key of weapons.keys()) {
        if (similarity(key, input) >= 0.5) {
          similarItems.push(key);
        }
      }*/
      
      for (let [key, value] of weapons.entries()) {
        if (similarity(key, input) >= 0.5) {
            similarItems.push(value['title']);
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

      message.channel.send(weaponEmbed);
    }
  },
};