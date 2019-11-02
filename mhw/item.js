const Discord = require('discord.js');
const itemDatabase = require('../databases/mhw/iteminfo.json');
const { similarity } = require('../util.js');

const items = new Discord.Collection();

for (const i of Object.keys(itemDatabase)) {
  items.set(i, itemDatabase[i]);
}

module.exports = {
  name: 'item',
  args: true,
  usage: 'item <itemname>',
  description: 'Get item info',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!items.has(input)) {
      let msg = 'That item doesn\'t seem to exist!';

      const similarItems = new Array();

      for (const key of items.keys()) {
        if (similarity(key, input) >= 0.5){
          similarItems.push(key);
        }
      }

      if (similarItems.length) {
        msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    } 
    else if (items.has(input)) {
      const item = items.get(input);

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
        .setFooter('Info Menu');

      message.channel.send(itemEmbed);
    }
  },
};