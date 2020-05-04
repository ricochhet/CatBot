const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Armor extends Command {
  constructor(prefix) {
    super('armor', 'armor [armor name]', 'Get info for a specific armor set', {
      alias: ['armour']
    });
  }

  armorEmbed(client, name, rawEmbed = this.MessageEmbed()) {
    const armor = client.mhwArmors.get(name);

    // Align the icons + resistance values
    let formatted = '';
    armor.resistances.split('\n').forEach(elem => {
      let icon = elem.split(' ')[0];
      let value = elem.split(' ')[1];
      formatted += icon + value.padStart(6, ' ') + '\n';
    });

    // console.log(formatted); // aligns OK on console but not discord for some reason

    logger.debug('armor log', { type: 'armorRead', name: name });

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle(armor.name)
      .addField('Set Bonus', armor.setBonus)
      .addField('Pieces', armor.pieces)
      .addField('Resistances', formatted, true)
      .addField('Defenses', armor.defenses, true)
      .addField('\u200b', '\u200b')
      .addField('Slots', armor.slots, true)
      .addField('Skills', armor.skills, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwArmors == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!client.mhwArmors.has(input)) {
      let msg = "That armor doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.mhwArmors, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.armorEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhwArmors.has(input)) {
      const embed = this.armorEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Armor;
