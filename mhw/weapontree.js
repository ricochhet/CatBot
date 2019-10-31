const Discord = require('discord.js');
const weaponTreeDatabase = require('../databases/weapontrees.json');
const { similarity } = require('../util.js');

const weapons = new Discord.Collection();

for(const i of Object.keys(weaponTreeDatabase)) {
  weapons.set(i, weaponTreeDatabase[i]);
}

module.exports = {
  name: 'weapontree',
  args: true,
  usage: 'weapontree <iron | bone | misc> <weapontype>',
  description: 'Get weapon tree chart',
  secret: false,
  run (client, message, args) {
    let input = args.join('').toLowerCase();

    if (!weapons.has(input)) {
      let msg = 'That weapon tree doesn\'t seem to exist!';

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
        .setImage(weapon.url)
        .setTimestamp()
        .setFooter('Info Menu');

      message.channel.send(weaponEmbed);
    }
  }
}
