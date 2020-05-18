const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

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
      .setTitle(monster.title)
      .setThumbnail(monster.thumbnail)
      .setDescription(`${monster.description}\n\n${monster.info}`)
      .addField(
        `Slash: **${monster.hzv.slash}** Blunt: **${monster.hzv.blunt}** Shot: **${monster.hzv.shot}**`,
        `🔥 **${monster.hzv.fire}** 💧 **${monster.hzv.water}** ⚡ **${monster.hzv.thunder}** ❄ **${monster.hzv.ice}** 🐉 **${monster.hzv.dragon}**`
      )
      .addField('Elements', monster.elements, true)
      .addField('Ailments', monster.ailments, true)
      .addField('Blights', monster.blights, true)
      .addField('Locations', monster.locations, true)
      .setTimestamp()
      .setFooter('Info Menu');

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
      let msg = `That monster doesn't seem to exist! Check out \`${this.prefix}mhw list\` for the full list.`;

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
