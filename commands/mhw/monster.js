const Command = require('../../bot/command.js');
const logger = require('../../bot/log.js');

class Monster extends Command {
  constructor() {
    super(
      'monster',
      'monster [monster name]',
      'Get info for a specific monster'
    );
  }

  monsterEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const monster = message.client.mhwMonsters.get(name);

    logger.debug('monster log', { type: 'monsterRead', name: name });

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(`__**${monster.title}**__`)
      .setThumbnail(monster.thumbnail)
      .addField('Classification:', monster.description)
      .addField('Characteristics:', monster.info)
      .addField('Elements', monster.elements, true)
      .addField('Ailments', monster.ailments, true)
      .addField('Blights', monster.blights, true)
      .addField('Locations', monster.locations, true)
      .setTimestamp()
      .setFooter(monster.title);

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwMonsters == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    for (let [name, monster] of client.mhwMonsters.entries()) {
      if (
        monster.aliases &&
        monster.aliases.includes(input) &&
        input.length > 0
      ) {
        input = name;
        break;
      }
    }

    if (!client.mhwMonsters.has(input)) {
      let msg = `That monster doesn't seem to exist! Check out \`${await client.prefix(
        message
      )}mhw list\` for the full list.`;

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'title',
        includeScore: true,
        reloop: true
      };

      let similarItems = this.findAllMatching(client.mhwMonsters, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.monsterEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhwMonsters.has(input)) {
      const embed = this.monsterEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Monster;
