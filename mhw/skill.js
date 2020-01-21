const Discord = require('discord.js');
const skillDatabase = require('../databases/mhw/skills.json');
const { getSimlarArray,reactions } = require('../util.js');

const skills = new Discord.Collection();

for (const i of Object.keys(skillDatabase)) {
  skills.set(i, skillDatabase[i]);
}

module.exports = {
  name: 'skill',
  args: true,
  usage: 'skill [skill name]',
  description: 'Get info for a specific skill',
  skillEmbed(name){

    const skill = skills.get(name);

    const embed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle(skill.name)
      .setDescription(skill.description)
      .addField('Levels', skill.ranks, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed

  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!skills.has(input)) {
      let msg = 'That decoration doesn\'t seem to exist!';

      const similarItems = getSimlarArray(skills,{
        'input' : input,
        'threshold' : 0.5,
        'key' : 'name',
        'pushSim' : true
      })

      if (similarItems.length) {
        return reactions(message,similarItems,this.skillEmbed)
      }

      message.channel.send(msg);
    }
    else if (skills.has(input)) {
      const embed = this.skillEmbed(input)
      message.channel.send(embed);
    }
  },
};
