const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Monster extends Command {
  constructor(prefix) {
    super(
      'monster',
      'monster [monster name]',
      'Get info for a specific monster'
    );
  }

  async monsterEmbed(client, name, rawEmbed = this.MessageEmbed()) {
    const monster = client.mhwMonsters.get(name);
    const embed = rawEmbed.setColor('#8fde5d').setTitle(monster.title);

    logger.debug('monster log', { type: 'monsterRead', name: name });

    embed
      .setURL(`https://mhdb.catbot.xyz/monsters/${name}`)
      .setDescription(`${monster.description}\n\n${monster.info}`)
      .setThumbnail(monster.thumbnail)
      .addField(
        `Slash: **${monster.hzv.slash}** Blunt: **${monster.hzv.blunt}** Shot: **${monster.hzv.shot}**`,
        `🔥 **${monster.hzv.fire}** 💧 **${monster.hzv.water}** ⚡ **${monster.hzv.thunder}** ❄ **${monster.hzv.ice}** 🐉 **${monster.hzv.dragon}**`
      )
      .addField('Elements', monster.elements, true)
      .addField('Ailments', monster.ailments, true)
      .addField('Blights', monster.blights, true)
      .addField('Locations', monster.locations, true)
      .setTimestamp()
      .setFooter('Monster Info');

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
      const embed = await this.monsterEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Monster;
