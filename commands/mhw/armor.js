const Command = require('../../utils/baseCommand.js');
const logger = require('../../utils/log.js');

class Armor extends Command {
  constructor(prefix) {
    super('armor', 'armor [armor name]', 'Get info for a specific armor set');
  }

  armorEmbed(client, name, rawEmbed = this.MessageEmbed()) {
    const armor = client.armors.get(name);

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
      .addField('Resistances', formatted, true)
      .addField('Defenses', armor.defenses, true)
      .addField('Skills', armor.skills, true)
      .addField('Slots', armor.slots)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.armors.has(input)) {
      let msg = "That armor doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.armors, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.armorEmbed);
      }

      message.channel.send(msg);
    } else if (client.armors.has(input)) {
      const embed = this.armorEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Armor;
