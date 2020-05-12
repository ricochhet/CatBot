const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Item extends Command {
  constructor(prefix) {
    super('item', 'item [item name]', 'Get info for a specific item');
  }

  itemEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const item = message.client.mhwItems.get(name);

    logger.debug('item log', { type: 'itemRead', name: name });

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(item.name)
      .setDescription(item.description)
      .addField('Rarity', item.rarity, true)
      .addField('Max', item.carryLimit, true)
      .addField('Sell', item.value, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwItems == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!client.mhwItems.has(input)) {
      let msg = "That item doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.mhwItems, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.itemEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhwItems.has(input)) {
      const embed = this.itemEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Item;
