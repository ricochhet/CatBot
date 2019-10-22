const Discord = require('discord.js');
const { similarity } = require('../util.js');

// Databases
const weaponDatabase = require('../databases/weaponinfo.json');
const itemDatabase = require('../databases/iteminfo.json');
const monsterDatabase = require('../databases/monsterinfo.json');
const endemicDatabase = require('../databases/endemicinfo.json');

const weapons = new Discord.Collection();
const items = new Discord.Collection();

const monsters = new Discord.Collection();
const endemics = new Discord.Collection();

for(const i of Object.keys(weaponDatabase)) {
  weapons.set(i, weaponDatabase[i]);
}

for(const i of Object.keys(itemDatabase)) {
  items.set(i, itemDatabase[i]);
}

for(const i of Object.keys(monsterDatabase)) {
  monsters.set(monsterDatabase[i].name, monsterDatabase[i].details);
}

for(const i of Object.keys(endemicDatabase)) {
  endemics.set(i, endemicDatabase[i]);
}

module.exports = {
  name: 'mhw',
  args: true,
  secret: true,
  usage: 'mhw <monster | item | weapon> <monster/item/weapon name>',
  description: 'Get Monster Hunter World info',
  run (client, message, args) {
    //let input = args.join('').toLowerCase();
    let getSubArg = args[0];
    let getLastArgs = args.slice(1, args.length);
    let finalizedLastArgs = getLastArgs.join('').toLowerCase();
    
    if(getSubArg == "monster") {
      //
      // MONSTERS
      //
      // If input matches the alias of a monster, change input to that monster name
      for (let [name, monster] of monsters.entries()) {
        if (monster.aliases && monster.aliases.includes(finalizedLastArgs) && finalizedLastArgs.length > 0) {
          finalizedLastArgs = name;
          break;
        }
      }
      
      if (!monsters.has(finalizedLastArgs) && !endemics.has(finalizedLastArgs)) {
        console.log("Hi");
        let msg = 'That monster/endemic life doesn\'t seem to exist!';

        const similarItems = new Array();

        for (const key of monsters.keys()) {
            if (similarity(key, finalizedLastArgs) >= 0.5){
                similarItems.push(key);
            }
        }

        for (const key of endemics.keys()) {
            if (similarity(key, finalizedLastArgs) >= 0.5){
                similarItems.push(key);
            }
        }

        if (similarItems.length) {
            msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
        }

        message.channel.send(msg);
      }
      else if(monsters.has(finalizedLastArgs)) {
        const monster = monsters.get(finalizedLastArgs);

        const monsterEmbed = new Discord.RichEmbed()
          .setColor('#8fde5d')
          .setTitle(monster.title)
          .setURL(monster.url)
          .setDescription(monster.description)
          .setThumbnail(monster.thumbnail)
          .addField('Elements', monster.elements, true)
          .addField('Ailments', monster.ailments, true)
          .addField('Blights', monster.blights, true)
          .addField('Locations', monster.locations, true)
          .setTimestamp()
          .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(endemics.has(finalizedLastArgs)) {
          const endemic = endemics.get(finalizedLastArgs);

          const endemicEmbed = new Discord.RichEmbed()
          .setColor('#8fde5d')
          .setTitle(endemic.title)
          .setURL(endemic.url)
          .setDescription(endemic.description)
          .addField('Description', endemic.quote, true)
          .addField('Locations', endemic.locations)
          .setTimestamp()
          .setFooter('Info Menu');

        message.channel.send(endemicEmbed);
      }
    } else if(getSubArg == "item") {
      // ITEMS
      if (!items.has(finalizedLastArgs)) {     
        let msg = 'That item doesn\'t seem to exist!';

        const similarItems = new Array();

        for (const key of items.keys()) {
            if (similarity(key, finalizedLastArgs) >= 0.5){
                similarItems.push(key);
            }
        }

        if (similarItems.length) {
            msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
        }

        message.channel.send(msg);
      } else if(items.has(finalizedLastArgs)) {
          const item = items.get(finalizedLastArgs);

          const itemEmbed = new Discord.RichEmbed()
          .setColor('#8fde5d')
          .setTitle(item.title)
          .setURL(item.url)
          .setThumbnail(item.thumbnail)
          .setDescription(item.description)
          .addField('Rarity', item.rarity, true)
          .addField('Max', item.max, true)
          .addField('Buy', item.buy, true)
          .addField('Sell', item.sell, true)
          .setTimestamp()
          .setFooter('Items');


        message.channel.send(itemEmbed);
      }
    } else if(getSubArg == "weapon") {
      // WEAPONS
      if (!weapons.has(finalizedLastArgs)) {     
        let msg = 'That weapon doesn\'t seem to exist!';

        const similarItems = new Array();

        for (const key of weapons.keys()) {
            if (similarity(key, finalizedLastArgs) >= 0.5){
                similarItems.push(key);
            }
        }

        if (similarItems.length) {
            msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
        }

        message.channel.send(msg);
      } else if(weapons.has(finalizedLastArgs)) {
          const weapon = weapons.get(finalizedLastArgs);

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
          .addField('Gem Slots', weapon.gemslots)
          .addField('Wyvern Type', weapon.wyvernheart)
          .addField('Phials', weapon.phials)
          .addField('Notes', weapon.notes)
          .setTimestamp()
          .setFooter('Info Menu');

        message.channel.send(weaponEmbed);
      }
    } else {
      message.channel.send("Sorry meowster, I don't know the category " + getSubArg);
    }
  }
}