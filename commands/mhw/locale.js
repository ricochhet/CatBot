const { MessageAttachment, MessageEmbed } = require('discord.js');
const Command = require('../../bot/command.js');
const logger = require('../../bot/log.js');

class Item extends Command {
  constructor() {
    super(
      'locale',
      'locale [locale name]',
      'Get info for a guiding lands locale'
    );
  }

  localeEmbed(iconSrc, areaTitle, color, monsterFields) {
    let attachment = new MessageAttachment(
      `./source_files/MonsterDataImages/assets/mhw/locale_icons/${iconSrc}`,
      iconSrc
    );
    let thumbnail = `attachment://${iconSrc}`;
    const embed = new MessageEmbed()
      .setTitle('**' + areaTitle + '**')
      .addFields(monsterFields)
      .attachFiles(attachment)
      .setThumbnail(thumbnail)
      .setColor(color)
      .setFooter('*Bold names can only be tempered in that area');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();
    let monsters = {};
    let areaTitle = '';
    let color = '';
    let iconSrc = '';
    let monsterFields = [];
    let counter = 0;

    logger.debug('locale log', { type: 'localeRead' });

    let isInArea = locale => {
      if (locale.name.toLowerCase().includes(`${input.toLowerCase()} region`)) {
        areaTitle = locale.name;
        color = locale.color;
        if (locale.icon) {
          iconSrc = locale.icon;
        }

        return true;
      }
    };

    let isTempered = locale => {
      if (
        locale.tempered &&
        locale.name.toLowerCase().includes(`${input.toLowerCase()} region`)
      ) {
        return true;
      }
      return false;
    };

    client.mhwMonsters.forEach(monster => {
      if (
        monster.locations.some(isInArea) &&
        monster['threat_level'] !== 'none'
      ) {
        let threat = monster['threat_level'];
        if (monster.locations.some(isTempered)) {
          if (!monsters[threat]) {
            monsters[threat] = [`**${monster.title}**`];
          } else {
            monsters[threat].push(`**${monster.title}**`);
          }
        } else {
          if (!monsters[threat]) {
            monsters[threat] = [monster.title];
          } else {
            monsters[threat].push(monster.title);
          }
        }
      }
    });

    let sortedMonsterKeys = Object.keys(monsters)
      .sort()
      .reverse();

    monsterFields = sortedMonsterKeys.map(key => ({
      name: `**Threat Level ${key}:**`,
      value: monsters[key].join(', ')
    }));

    if (client.mhwMonsters == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!sortedMonsterKeys.length) {
      message.reply(
        `Sorry I can\'t find any monsters in a region called **${input}**!`
      );
    } else {
      if (counter <= 7) {
        const embed = this.localeEmbed(
          iconSrc,
          areaTitle,
          color,
          monsterFields
        );
        message.channel.send(embed);
      }
    }
  }
}

module.exports = Item;
