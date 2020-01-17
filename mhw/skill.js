const Discord = require('discord.js');
const skillDatabase = require('../databases/mhw/skills.json');
const { similarity } = require('../util.js');

const skills = new Discord.Collection();

for (const i of Object.keys(skillDatabase)) {
  skills.set(i, skillDatabase[i]);
}

module.exports = {
  name: 'skill',
  args: true,
  usage: 'skill [skill name]',
  description: 'Get info for a specific skill',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!skills.has(input)) {
      let msg = 'That decoration doesn\'t seem to exist!';

      const similarItems = new Array();

      /*for (const key of items.keys()) {
        if (similarity(key, input) >= 0.5){
          similarItems.push(key);
        }
      }*/
      
      for (let [key, value] of skills.entries()) {
        if (similarity(key, input) >= 0.5) {
            similarItems.push(value['name']);
        }
      }

      if (similarItems.length) {
        msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    } 
    else if (skills.has(input)) {
      const skill = skills.get(input);

      const skillEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle(skill.name)
        .setDescription(skill.description)
        .addField('Levels', skill.ranks, true)
        .setTimestamp()
        .setFooter('Info Menu');

      message.channel.send(skillEmbed);
    }
  },
};