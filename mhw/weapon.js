const Discord = require('discord.js');
const weaponDatabase = require('../databases/mhw/weapons.json');
const { getSimilarArray, reactions } = require('../util.js');

const weapons = new Discord.Collection();

for (const i of Object.keys(weaponDatabase)) {
  weapons.set(i, weaponDatabase[i]);
}

module.exports = {
  name: 'weapon',
  args: true,
  usage: 'weapon [weapon name]',
  description: 'Get info for a specific weapon',
  weaponEmbed(name) {
    const weapon = weapons.get(name);

    const embed = new Discord.RichEmbed()
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

    return embed;
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!weapons.has(input)) {
      let msg = 'That weapon doesn\'t seem to exist!';

      const similarItems = getSimilarArray(weapons, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'title',
        'pushSim' : true
      });

      if (similarItems.length) {
        return reactions(message, similarItems, this.weaponEmbed);
      }

      message.channel.send(msg);
    } 
    else if (weapons.has(input)) {
      const embed = this.weaponEmbed(input);
      message.channel.send(embed);
    }
  },
};