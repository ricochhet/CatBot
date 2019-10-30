const Discord = require('discord.js');
const monsterDatabase = require('../databases/monsterinfo.json');
const endemicDatabase = require('../databases/endemicinfo.json');
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
  name: 'mhwinfo',
  args: true,
  usage: 'mhwinfo <monstername>',
  description: 'Get monster and endemic life info',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    // If input matches the alias of a monster, change input to that monster name
    for (const [name, monster] of monsters.entries()) {
      if (monster.aliases && monster.aliases.includes(input)) {
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
    }
    else if (monsters.has(input)) {
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
    else if (endemics.has(input)) {
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
