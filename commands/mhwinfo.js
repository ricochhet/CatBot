const Discord = require('discord.js');
const monsterDatabase = require('../databases/monsterinfo.json');
const endemicDatabase = require('../databases/endemicinfo.json')

const monsters = new Map();
const endemics = new Map();

for(const i of Object.keys(monsterDatabase)) {
  monsters.set(i, monsterDatabase[i]);
}

for(const i of Object.keys(endemicDatabase)) {
  endemics.set(i, endemicDatabase[i]);
}

exports.run = (client, message, args) => {
  const usageEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Usage: ', "```+mhwinfo monstername```", true)
  .setTimestamp()
  .setFooter('List Menu');

  if(!args.length) return message.channel.send(usageEmbed);

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
  } else if(endemics.has(args[0])) {
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
  } else {
    message.channel.send("That monster/endemic life doesn't seem to exist!");
  }
}