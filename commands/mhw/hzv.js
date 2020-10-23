const { MessageAttachment } = require('discord.js');
const Command = require('../../bot/command.js');
const logger = require('../../bot/log.js');
const Utils = require('../../bot/utils');

const imageJSON = require('../../source_files/MonsterDataImages/mhw_monster_map.json');
const imageMap = Utils.getDataAsMap(imageJSON);

class Hzv extends Command {
  constructor() {
    super('hzv', 'hzv [monster name]', 'Get hzv info for a specific monster');
  }

  async monsterEmbed(
    message,
    name,
    rawEmbed = this.MessageEmbed,
    menu = this.menu
  ) {
    const monster = message.client.mhwMonsters.get(name);
    const image = imageMap.get(name);

    logger.debug('hzv log', { type: 'hzvRead', name: name });

    const filename = image.fileName
      .split("'")
      .join('')
      .split('-')
      .join('')
      .split(' ')
      .join('');

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(`__**${monster.title}**__`)
      .setThumbnail(monster.thumbnail)
      .addField('Classification:', monster.description)
      .addField('Characteristics:', monster.info)
      .addField(
        `Slash: **${monster.hzv.slash}** Blunt: **${monster.hzv.blunt}** Shot: **${monster.hzv.shot}**`,
        `🔥 **${monster.hzv.fire}** 💧 **${monster.hzv.water}** ⚡ **${monster.hzv.thunder}** ❄ **${monster.hzv.ice}** 🐉 **${monster.hzv.dragon}**`
      )
      .attachFiles([new MessageAttachment(image.imagePath, filename)])
      .setImage(`attachment://${filename}`)
      .setTimestamp()
      .setFooter(monster.title);

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwMonsters == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (imageMap == null) {
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
    } else if (client.mhwMonsters.has(input) && imageMap.has(input)) {
      const embed = await this.monsterEmbed(message, input);
      message.channel.send(embed).catch(err => console.log(err));
    }
  }
}

module.exports = Hzv;
