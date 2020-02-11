const Command = require('../../utils/baseCommand.js');

class Monster extends Command {
  constructor(prefix) {
    super(
      'monster',
      'monster [monster name]',
      'Get info for a specific monster'
    );
  }

  monsterEmbed(client, name, rawEmbed = this.RichEmbed()) {
    const monster = client.monsters.get(name);

    const embed = rawEmbed.setColor('#8fde5d').setTitle(monster.title);

    if (!monster.url == null || !monster.url == '') {
      embed.setURL(monster.url);
    }

    embed.setDescription(monster.description);
    embed.setThumbnail(monster.thumbnail);
    embed.addField('Elements', monster.elements, true);
    embed.addField('Ailments', monster.ailments, true);
    embed.addField('Blights', monster.blights, true);
    embed.addField('Locations', monster.locations, true);
    embed.setTimestamp();
    embed.setFooter('Info Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    for (let [name, monster] of client.monsters.entries()) {
      if (
        monster.aliases &&
        monster.aliases.includes(input) &&
        input.length > 0
      ) {
        input = name;
        break;
      }
    }

    if (!client.monsters.has(input)) {
      let msg = "That monster doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'title',
        includeScore: true,
        reloop: true
      };

      let similarItems = this.findAllMatching(client.monsters, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.monsterEmbed);
      }

      message.channel.send(msg);
    } else if (client.monsters.has(input)) {
      const embed = this.monsterEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Monster;
