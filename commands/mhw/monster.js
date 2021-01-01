const { MessageAttachment } = require('discord.js');
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

    const locales = monster.locations.map(location => location.name);
    let title = `__**${monster.title}**__`;

    const weaknessFilter = stars => (acc, wk) => {
      const target = wk.split(' ');
      if (target[1] === stars) acc.push(target[0]);

      return acc;
    };

    const weakness3 = monster.weakness.reduce(weaknessFilter('(⭐⭐⭐)'), []);
    const weakness2 = monster.weakness.reduce(weaknessFilter('(⭐⭐)'), []);

    if (monster.threat_level !== 'none') {
      title += `  ${monster.threat_level}`;
    }

    let attachment = new MessageAttachment(monster.icon, monster.filename);
    let thumbnail = `attachment://${monster.filename}`;

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(title)
      .attachFiles(attachment)
      .setThumbnail(thumbnail)
      .addField('Classification:', `${monster.species}`)
      .addField('Characteristics:', monster.description)
      .addField('Elements', monster.elements.join(', '), true)
      .addField('Ailments', monster.ailments.join(', '), true)
      .addField('Resistances', monster.resistances.join(', '), true)
      .addField('**Weaknesses** ⭐⭐⭐', weakness3.join(', '))
      .addField('**Weaknesses** ⭐⭐', weakness2.join(', '))
      .addField('Locations', locales, true)
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
