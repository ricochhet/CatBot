const Command = require('../../bot/command.js');
const logger = require('../../bot/log.js');

class Armor extends Command {
  constructor() {
    super('armor', 'armor [armor name]', 'Get info for a specific armor set', {
      alias: ['armour']
    });
  }

  async armorEmbed(
    message,
    name,
    rawEmbed = this.MessageEmbed,
    menu = this.menu
  ) {
    const armor = message.client.mhwArmors.get(name);

    // Align the icons + resistance values
    let formatted = '';
    armor.resistances.split('\n').forEach(elem => {
      let icon = elem.split(' ')[0];
      let value = elem.split(' ')[1];
      formatted += icon + value.padStart(6, ' ') + '\n';
    });

    // console.log(formatted); // aligns OK on console but not discord for some reason

    logger.debug('armor log', { type: 'armorRead', name: name });

    const page1 = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(armor.name);

    const page2 = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(armor.name);

    page1
      .addField('Set Bonus', armor.setBonus)
      .addField('Pieces', armor.pieces)
      .addField('Resistances', formatted, true)
      .addField('Defenses', armor.defenses, true)
      .setTimestamp()
      .setFooter(armor.name);

    page2
      .addField('Slots', armor.slots, true)
      .addField('Skills', armor.skills, true)
      .setTimestamp()
      .setFooter(armor.name);

    let embeds = [page1, page2];

    let reactions = {};
    menu(
      message,
      embeds,
      120000,
      (reactions = {
        first: '⏪',
        back: '◀',
        next: '▶',
        last: '⏩',
        stop: '⏹'
      }),
      true // override embed footers (with page number)
    );
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
      await this.armorEmbed(message, input);
    }
  }
}

module.exports = Armor;
