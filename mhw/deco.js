const Discord = require('discord.js');
const decorationDatabase = require('../databases/mhw/decorations.json');
const { similarity } = require('../util.js');

const decorations = new Discord.Collection();

for (const i of Object.keys(decorationDatabase)) {
  decorations.set(i, decorationDatabase[i]);
}

module.exports = {
  name: 'deco',
  args: true,
  usage: 'deco [deco name]',
  description: 'Get info for a specific decoration',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!decorations.has(input)) {
      let msg = 'That decoration doesn\'t seem to exist!';

      const similarItems = new Array();

      /*for (const key of items.keys()) {
        if (similarity(key, input) >= 0.5){
          similarItems.push(key);
        }
      }*/
      
      for (let [key, value] of decorations.entries()) {
        if (similarity(key, input) >= 0.5) {
            similarItems.push(value['name']);
        }
      }

      if (similarItems.length) {
        msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    } 
    else if (decorations.has(input)) {
      const decoration = decorations.get(input);

      const decorationEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle(decoration.name)
        .addField('Skills', decoration.skills)
        .addField('Rarity', decoration.rarity, true)
        .addField('Slot Level', decoration.slot, true)
        .setTimestamp()
        .setFooter('Info Menu');

      message.channel.send(decorationEmbed);
    }
  },
};