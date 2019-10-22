const Discord = require('discord.js');
const weaponDatabase = require('../databases/weaponinfo.json');
const { similarity } = require('../util.js');

const weapons = new Discord.Collection();

for(const i of Object.keys(weaponDatabase)) {
  weapons.set(i, weaponDatabase[i]);
}

module.exports = {
  name: 'mhwweapons',
  args: true,
  secret: true,
  usage: 'mhwweapons <weaponname>',
  description: 'Get weapon info',
  run (client, message, args) {
    let input = args.join('').toLowerCase();

    if (!weapons.has(input)) {     
      let msg = 'That weapon doesn\'t seem to exist!';

      const similarItems = new Array();

      for (const key of weapons.keys()) {
          if (similarity(key, input) >= 0.5){
              similarItems.push(key);
          }
      }

      if (similarItems.length) {
          msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    } else if(weapons.has(input)) {
        const weapon = weapons.get(input);
      
        const weaponEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle(weapon.title)
        .setURL(weapon.url)
        .setThumbnail(weapon.thumbnail)
        .addField('Type', weapon.type)
        .addField('Attack', weapon.attack)
        .addField('Defense', weapon.defense)
        .addField('Sharpness', weapon.sharpness)
        .addField('Affinity', weapon.affinity)
        .addField('Elemental Attack', weapon.elementalattack)
        .addField('Rarity', weapon.rarity)
        .addField('gemslots', weapon.gemslots)
        .addField('Wyvern Type', weapon.wyvernheart)
        .addField('Phials', weapon.phials)
        .addField('Notes', weapon.notes)
        .setTimestamp()
        .setFooter('Info Menu');
  
      message.channel.send(weaponEmbed);
    }
  }
}