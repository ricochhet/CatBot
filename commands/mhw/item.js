const Command = require('../../utils/baseCommand.js');

class Item extends Command {
  constructor(prefix) {
    super('item', 'item [item name]', 'Get info for a specific item');
  }

  itemEmbed(client, name, rawEmbed = this.RichEmbed()) {
    const item = client.items.get(name);

    const embed = rawEmbed
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

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.items.has(input)) {
      let msg = "That item doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.items, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.itemEmbed);
      }

      message.channel.send(msg);
    } else if (client.items.has(input)) {
      const embed = this.itemEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Item;