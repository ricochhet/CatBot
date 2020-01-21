const Discord = require('discord.js');
const decorationDatabase = require('../databases/mhw/decorations.json');
const { getSimilarArray, reactions } = require('../util.js');

const decorations = new Discord.Collection();

for (const i of Object.keys(decorationDatabase)) {
  decorations.set(i, decorationDatabase[i]);
}

module.exports = {
  name: 'deco',
  args: true,
  usage: 'deco [deco name]',
  description: 'Get info for a specific decoration',
  decorationEmbed(name) {
    const decoration = decorations.get(name);

    const embed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle(decoration.name)
      .addField('Skills', decoration.skills)
      .addField('Rarity', decoration.rarity, true)
      .addField('Slot Level', decoration.slot, true)
      .setTimestamp()
      .setFooter('Info Menu');
    
    return embed;
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!decorations.has(input)) {
      let msg = 'That decoration doesn\'t seem to exist!';

      const similarItems = getSimilarArray(decorations, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'name',
        'pushSim' : true
      });

      if (similarItems.length) {
        return reactions(message, similarItems, this.decorationEmbed);
      }

      message.channel.send(msg);
    } 
    else if (decorations.has(input)) {
      const embed = this.decorationEmbed(input);
      message.channel.send(embed);
    }
  },
};