const Discord = require('discord.js');
const monsterDatabase = require('../databases/mhw/monsters.json');
const { getSimilarArray, reactions } = require('../util.js');

const monsters = new Discord.Collection();

for (const i of Object.keys(monsterDatabase)) {
  monsters.set(monsterDatabase[i].name, monsterDatabase[i].details);
}

module.exports = {
  name: 'monster',
  args: true,
  usage: 'monster [monster name]',
  description: 'Get info for a specific monster',
  monsterEmbed(name) {
    const monster = monsters.get(name);

    const embed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .setTitle(monster.title)

    if(!monster.url == null || !monster.url == "") {
      embed.setURL(monster.url);
    }

    embed.setDescription(monster.description)
    embed.setThumbnail(monster.thumbnail)
    embed.addField('Elements', monster.elements, true)
    embed.addField('Ailments', monster.ailments, true)
    embed.addField('Blights', monster.blights, true)
    embed.addField('Locations', monster.locations, true)
    embed.setTimestamp()
    embed.setFooter('Info Menu');

    return embed;
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    for (let [name, monster] of monsters.entries()) {
      if (monster.aliases && monster.aliases.includes(input) && input.length > 0) {
        input = name;
        break;
      }
    }

    if (!monsters.has(input)) {
      let msg = 'That monster doesn\'t seem to exist!';

      let similarItems = getSimilarArray(monsters, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'title',
        'pushSim' : true
      });

      if (similarItems.length) {
        return reactions(message, similarItems, this.monsterEmbed);
      }

      message.channel.send(msg);
    } 
    else if(monsters.has(input)) {
      const embed = this.monsterEmbed(input);
      message.channel.send(embed);
    }
  },
};