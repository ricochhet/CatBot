const Command = require('../../utils/command.js');

class Monster extends Command {
  constructor(prefix) {
    super(
      'monster',
      'monster [monster name]',
      'Get info for a specific monster'
    );
  }

  monsterEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const monster = message.client.mhguMonsters.get(name);

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(monster.name)
      .addField(
        'Elements',
        `Fire: ${monster.FIRE}\nWater: ${monster.WATER}\nIce: ${monster.ICE}\nThunder: ${monster.THUNDER}\nDragon: ${monster.DRAGON}\nPoison: ${monster.POISON}\nSleep: ${monster.SLEEP}\nPara: ${monster.PARA}\nBlast: ${monster.BLAST}`,
        true
      )
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
      .addField(
        'Key',
        '* > S > A > B > C > D > F Blank is ineffective. F is mostly ineffective. + = Auras reduced by one stage of severity while poisoned.\nI = Must break a wing to knock down. + = Roars can cause damage. * = Can inflict additional blights depending on location\nR = Only when enraged. N = Only when not enraged. ^ = Not with Seltas riding'
      )
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhguMonsters == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!client.mhguMonsters.has(input)) {
      let msg = "That monster doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.mhguMonsters, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.monsterEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhguMonsters.has(input)) {
      const embed = this.monsterEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Monster;
