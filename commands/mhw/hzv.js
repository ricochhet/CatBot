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

    let title = `__**${monster.title}**__`;
    if (monster.threat_level !== 'none') {
      title += `  ${monster.threat_level}`;
    }

    const thumbnail = new MessageAttachment(
      monster.icon,
      monster.filename.replace(/[',\s,-]/g, '')
    );
    const embedImage = new MessageAttachment(
      image.imagePath,
      image.fileName.replace(/[',\s,-]/g, '')
    );
    const attachUrl = name => `attachment://${name}`;

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(title)
      .attachFiles([thumbnail, embedImage])
      .setThumbnail(attachUrl(thumbnail.name))
      .addField('Classification:', monster.species)
      .addField('Characteristics:', monster.description)
      .addField(
        `Slash: **${monster.hzv.slash}** Blunt: **${monster.hzv.blunt}** Shot: **${monster.hzv.shot}**`,
        `🔥 **${monster.hzv.fire}** 💧 **${monster.hzv.water}** ⚡ **${monster.hzv.thunder}** ❄ **${monster.hzv.ice}** 🐉 **${monster.hzv.dragon}**`
      )
      .setImage(attachUrl(embedImage.name))
      .setTimestamp()
      .setFooter(monster.title);

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwMonsters == null || imageMap == null) {
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
