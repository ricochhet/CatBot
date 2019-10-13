const Discord = require('discord.js');
const monsterDatabase = require('../databases/monsterinfo.json');
const endemicDatabase = require('../databases/endemicinfo.json');
const { similarity } = require('../util.js');

const monsters = new Discord.Collection();
const endemics = new Discord.Collection();

for(const i of Object.keys(monsterDatabase)) {
  monsters.set(i, monsterDatabase[i]);
}

for(const i of Object.keys(endemicDatabase)) {
  endemics.set(i, endemicDatabase[i]);
}

module.exports = {
  name: 'mhwinfo',
  args: true,
  usage: 'mhwinfo <monstername>',
  description: 'Get monster and endemic life info',
  run (client, message, args) {
    const input = args.join('').toLowerCase();
    
    if (!monsters.has(input) && !endemics.has(input)) {     
      let msg = 'That monster/endemic life doesn\'t seem to exist!';

      const similarItems = new Array();

      for (const key of monsters.keys()) {
          if (similarity(key, input) >= 0.5){
              similarItems.push(key);
          }
      }

      for (const key of endemics.keys()) {
          if (similarity(key, input) >= 0.5){
              similarItems.push(key);
          }
      }

      if (similarItems.length) {
          msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    }
    else if(monsters.has(input)) {
      const monster = monsters.get(input);
  
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
    }
    else if(endemics.has(input)) {
        const endemic = endemics.get(input);
      
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
  }
}

/*
const monsters = new Map();
const endemics = new Map();

for(const i of Object.keys(monsterDatabase)) {
  monsters.set(i, monsterDatabase[i]);
}

for(const i of Object.keys(endemicDatabase)) {
  endemics.set(i, endemicDatabase[i]);
}

module.exports = {
  name: 'mhwinfo',
  args: true,
  usage: 'mhwinfo <monstername>',
  description: 'Get monster and endemic life info',
  run (client, message, args) {
    const input = args.join('').toLowerCase();
    const replyu = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage: ', this.usage, true)
      .setTimestamp()
      .setFooter('List Menu');

    if(!args.length) return message.channel.send(replyu);
    
    if (!monsters.has(input) && !endemics.has(input)) {      
      let msg = 'That monster/endemic life doesn\'t seem to exist!';

      const similar = new Array();

      for (const key of monsters.keys()) {
          if (similarity(key, input) >= 0.5){
              similar.push(key);
          }
      }

      for (const key of endemics.keys()) {
          if (similarity(key, input) >= 0.5){
              similar.push(key);
          }
      }

      if (similar.length) {
          msg += `\nDid you mean: \`${similar.join(', ')}\`?`;
      }

      return message.channel.send(msg);
    } else if(monsters.has(input)) {
      const monster = monsters.get(input);
  
      const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle(monster.title)
        .setURL(monster.url)
        .setDescription(monster.description)
        .setThumbnail(monster.thumbnail)
        .addField('Elements', monster.elements, true)
        .addField('Ailments', monster.ailments, true)
        .addField('Locations', monster.locations)
        .setTimestamp()
        .setFooter('Info Menu');
  
      message.channel.send(monsterEmbed);
    } else if(endemics.has(input)) {
        const endemic = endemics.get(input);
      
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

    if(monsters.has(args[0])) {
      const monster = monsters.get(args[0]);
  
      const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle(monster.title)
        .setURL(monster.url)
        .setDescription(monster.description)
        .setThumbnail(monster.thumbnail)
        .addField('Elements', monster.elements, true)
        .addField('Ailments', monster.ailments, true)
        .addField('Locations', monster.locations)
        .setTimestamp()
        .setFooter('Info Menu');
  
      message.channel.send(monsterEmbed);
    }
    else if(endemics.has(args[0])) {
      const endemic = endemics.get(args[0]);
  
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
    else {
      message.channel.send("That monster/endemic life doesn't seem to exist!");
    }
  }
}

function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) {
                costs[j] = j;
            }
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue),
                    costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) {
            costs[s2.length] = lastValue;
        }

    }
    return costs[s2.length];
}*/