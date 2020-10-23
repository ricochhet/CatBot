const { MessageAttachment } = require('discord.js');
const Command = require('../../bot/command.js');
const logger = require('../../bot/log.js');
const Utils = require('../../bot/utils');

const imageJSON = require('../../source_files/MonsterDataImages/mhgu_monster_map.json');
const imageMap = Utils.getDataAsMap(imageJSON);

class Hzv extends Command {
  constructor() {
    super('hzv', 'hzv [monster name]', 'Get hzv info for a specific monster');
  }

  monsterEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const image = imageMap.get(name);

    logger.debug('hzv log', { type: 'hzvRead', name: name });

    const filename = image.fileName
      .split("'")
      .join('')
      .split('-')
      .join('');

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(`__**${image.title}**__`)
      .attachFiles([new MessageAttachment(image.imagePath, filename)])
      .setImage(`attachment://${filename}`)
      .setTimestamp()
      .setFooter(image.title);

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (imageMap == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!imageMap.has(input)) {
      let msg = "That monster doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'title',
        includeScore: true
      };

      let similarItems = this.findAllMatching(imageMap, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.monsterEmbed);
      }

      message.channel.send(msg);
    } else if (imageMap.has(input)) {
      const embed = this.monsterEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Hzv;
