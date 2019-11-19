const Discord = require('discord.js');
const monsterDatabase = require('../databases/mhgu/monsterinfo.json');
const { similarity } = require('../util.js');

const monsters = new Discord.Collection();

for (const i of Object.keys(monsterDatabase)) {
  monsters.set(i, monsterDatabase[i]);
}

module.exports = {
  name: 'monster',
  args: true,
  usage: 'monster <monstername>',
  description: 'Get monster info',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    /*
    for (let [name, monster] of monsters.entries()) {
      if (monster.aliases && monster.aliases.includes(input) && input.length > 0) {
        input = name;
        break;
      }
    }
    */

    if (!monsters.has(input)) {
      let msg = 'That monster doesn\'t seem to exist!';

      const similarItems = new Array();

      for (const key of monsters.keys()) {
        if (similarity(key, input) >= 0.5) {
          similarItems.push(key);
        }
      }

      if (similarItems.length) {
        msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
      }

      message.channel.send(msg);
    } else if(monsters.has(input)) {
      const monster = monsters.get(input);

      const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle(monster.name)
        .addField('Elements', `Fire: ${monster.FIRE}\nWater: ${monster.WATER}\nIce: ${monster.ICE}\nThunder: ${monster.THUNDER}\nDragon: ${monster.DRAGON}\nPoison: ${monster.POISON}\nSleep: ${monster.SLEEP}\nPara: ${monster.PARA}\nBlast: ${monster.BLAST}`, true)
        .addField('Mount', monster.MOUNT, true)
        .addField('Roar', monster.Roar, true)
        .addField('Wind', monster.Wind, true)
        .addField('Tremor', monster.Tremor, true)
        .addField('Status', monster.Status, true)
        .addField('Blights', monster.Blights, true)
        .addField('Shock Trap', monster.ShockTrap, true)
        .addField('Pitfall Trap', monster.PitfallTrap, true)
        .addField('Flash Bomb', monster.FlashBomb, true)
        .addField('Sonic Bomb', monster.SonicBomb, true)
        .addField('Meat', monster.Meat, true)
        .addField('Key', '* > S > A > B > C > D > F Blank is ineffective. F is mostly ineffective. + = Auras reduced by one stage of severity while poisoned.\nI = Must break a wing to knock down. + = Roars can cause damage. * = Can inflict additional blights depending on location\nR = Only when enraged. N = Only when not enraged. ^ = Not with Seltas riding')
        .setTimestamp()
        .setFooter('Info Menu');

      message.channel.send(monsterEmbed);
    }
  },
};