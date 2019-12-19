const Discord = require('discord.js');
const monsterDatabase = require('../databases/mhw/monsterinfo.json');
const endemicDatabase = require('../databases/mhw/endemicinfo.json');
const { similarity } = require('../util.js');

const monsters = new Discord.Collection();
const endemics = new Discord.Collection();

for (const i of Object.keys(monsterDatabase)) {
  monsters.set(monsterDatabase[i].name, monsterDatabase[i].details);
}

for (const i of Object.keys(endemicDatabase)) {
  endemics.set(i, endemicDatabase[i]);
}

module.exports = {
  name: 'monster',
  args: true,
  usage: 'monster <monstername>',
  description: 'Get monster and endemic life info',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    for (let [name, monster] of monsters.entries()) {
      if (monster.aliases && monster.aliases.includes(input) && input.length > 0) {
        input = name;
        break;
      }
    }

    if (!monsters.has(input) && !endemics.has(input)) {
      let msg = 'That monster/endemic life doesn\'t seem to exist!';

      const similarItems = new Array();

      for (const key of monsters.keys()) {
        if (similarity(key, input) >= 0.5) {
          similarItems.push(key);
        }
      }

      for (const key of endemics.keys()) {
        if (similarity(key, input) >= 0.5) {
          similarItems.push(key);
        }
      }

      if (similarItems.length) {
        msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    } else if(monsters.has(input)) {
      const monster = monsters.get(input);

      const monsterEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle(monster.title)
      
      if(!monster.url == null || !monster.url == "") {
        monsterEmbed.setURL(monster.url);
      }
      
      monsterEmbed.setDescription(monster.description)
      monsterEmbed.setThumbnail(monster.thumbnail)
      monsterEmbed.addField('Elements', monster.elements, true)
      monsterEmbed.addField('Ailments', monster.ailments, true)
      monsterEmbed.addField('Blights', monster.blights, true)
      monsterEmbed.addField('Locations', monster.locations, true)
      monsterEmbed.setTimestamp()
      monsterEmbed.setFooter('Info Menu');

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
  },
};