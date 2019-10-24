const Discord = require('discord.js');
const armorDatabase = require('../databases/armorinfo.json');
const { similarity } = require('../util.js');

const armors = new Discord.Collection();

for(const i of Object.keys(armorDatabase)) {
  armors.set(i, armorDatabase[i]);
}

module.exports = {
  name: 'armor',
  args: true,
  usage: 'armor <armorname>',
  description: 'Get armor info',
  run (client, message, args) {
    if(message.author.id == process.env.OWNER) {
      let input = args.join('').toLowerCase();

      if (!armors.has(input)) {
        let msg = 'That armor doesn\'t seem to exist!';

        const similarItems = new Array();

        for (const key of armors.keys()) {
          if (similarity(key, input) >= 0.5){
            similarItems.push(key);
          }
        }

        if (similarItems.length) {
          msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
        }

        message.channel.send(msg);
      } else if(armors.has(input)) {
        const armor = armors.get(input);

        const armorEmbed = new Discord.RichEmbed()
          .setColor('#8fde5d')
          .setTitle(armor.title)
          .setURL(armor.url)
          .setThumbnail(armor.thumbnail)
          .addField('Resistances', armor.resistances, true)
          .addField('Set Bonus', armor.setBonus, true)
          .addField('Head Skills', armor.headSkills, true)
          .addField('Chest Skills', armor.chestSkills, true)
          .addField('Arm Skills', armor.armSkills, true)
          .addField('Waist Skills', armor.waistSkills, true)
          .addField('Waist Skills', armor.legSkills, true)
          .setTimestamp()
          .setFooter('Info Menu');

        message.channel.send(armorEmbed);
      }
    }
  }
}
