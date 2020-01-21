const Discord = require('discord.js');
const monsterDatabase = require('../databases/mhgu/monsters.json');
const { getSimilarArray, reactions } = require('../util.js');

const monsters = new Discord.Collection();

for (const i of Object.keys(monsterDatabase)) {
  monsters.set(i, monsterDatabase[i]);
}

module.exports = {
  name: 'monster',
  args: true,
  usage: 'monster [monster name]',
  description: 'Get info for a specific monster',
  monsterEmbed(name) {
    const monster = monsters.get(name);

    const embed = new Discord.RichEmbed()
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

    return embed;
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!monsters.has(input)) {
      let msg = 'That monster doesn\'t seem to exist!';

      let similarItems = getSimilarArray(monsters, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'title',
        'pushSim' : true
      });

      if (similarItems.length) {
        return reactions(message, similarItems, this.monsterEmbed);
      }

      message.channel.send(msg);
    } 
    else if(monsters.has(input)) {
      const embed = this.monsterEmbed(input);
      message.channel.send(embed);
    }
  },
};