const Discord = require('discord.js');
const itemDatabase = require('../databases/mhw/items.json');
const { getSimilarArray, reactions } = require('../util.js');

const items = new Discord.Collection();

for (const i of Object.keys(itemDatabase)) {
  items.set(i, itemDatabase[i]);
}

module.exports = {
  name: 'item',
  args: true,
  usage: 'item [item name]',
  description: 'Get info for a specific item',
  itemEmbed(name) {
    const item = items.get(name);

    const embed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle(item.name)
      .setDescription(item.description)
      .addField('Rarity', item.rarity, true)
      .addField('Max', item.carryLimit, true)
      .addField('Sell', item.value, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!items.has(input)) {
      let msg = 'That item doesn\'t seem to exist!';

      const similarItems = getSimilarArray(items, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'name',
        'pushSim' : true
      });

      if (similarItems.length) {
        return reactions(message, similarItems, this.itemEmbed);
      }

      message.channel.send(msg);
    }  
    else if (items.has(input)) {
      const embed = this.itemEmbed(input);
      message.channel.send(embed);
    }
  },
};