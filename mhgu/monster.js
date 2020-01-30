const Command = require('../utils/baseCommand.js')

class Monster extends Command {
  constructor() {
    super(
      'monster',
      'monster [monster name]',
      'Get info for a specific monster'
    )
  }

  monsterEmbed(client,name,rawEmbed) {
    const monster = client.mhguMonsters.get(name);

    const embed = rawEmbed
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
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.mhguMonsters.has(input)) {
      let msg = 'That monster doesn\'t seem to exist!';

      let similarItems = this.getSimilarArray(client.mhguMonsters, {
        'input' : input,
        'threshold' : 0.5,
        'key' : 'name',
        'pushSim' : true
      });

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.monsterEmbed);
      }

      message.channel.send(msg);
    }
    else if(client.mhguMonsters.has(input)) {
      const embed = this.monsterEmbed(client,input,this.RichEmbed());
      message.channel.send(embed);
    }
  }
}

module.exports = Monster
