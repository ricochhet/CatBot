const Discord = require('discord.js');
const armorDatabase = require('../databases/mhw/armorinfo.json');
const { getSimlarArray,reactions } = require('../util.js');

const armors = new Discord.Collection();

for (const i of Object.keys(armorDatabase)) {
  armors.set(i, armorDatabase[i]);
}

module.exports = {
  name: 'armor',
  args: true,
  usage: 'armor [armor name]',
  description: 'Get info for a specific armor set',
  armorEmbed(name){
    const armor = armors.get(name);

    const embed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle(armor.name)
      .setURL(armor.url)
      .addField('Resistances', armor.resistances, true)
      .addField('Skills', armor.skills, true)
      .addField('Set Bonus', armor.setBonus)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!armors.has(input)) {
      let msg = 'That armor doesn\'t seem to exist!';

      const similarItems = getSimlarArray(armors,{
        'input' : input,
        'threshold' : 0.5,
        'key' : 'name',
        'pushSim' : true
      })

      if (similarItems.length) {
        return reactions(message,similarItems,this.armorEmbed)
      }

      message.channel.send(msg);
    }
    else if (armors.has(input)) {
      const armorEmbed = this.armorEmbed(input)
      message.channel.send(armorEmbed);
    }
  },
};
