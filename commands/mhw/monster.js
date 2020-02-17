const Command = require('../../utils/baseCommand.js');
const { Canvas } = require('canvas-constructor');
const { loadImage } = require('canvas');
const { Attachment } = require('discord.js'); // This is to send the image via discord.
const hzvDB = require('../../utils/databases/mhw/hzv.json');

class Monster extends Command {
  constructor(prefix) {
    super(
      'monster',
      'monster [monster name]',
      'Get info for a specific monster'
    );
  }

  async monsterEmbed(client, name, rawEmbed = this.RichEmbed()) {
    const monster = client.monsters.get(name);

    async function hitzoneValues(monsterName) {
      let monster = hzvDB[monsterName.toLowerCase().replace(' ', '')];

      let monsterKeys = Object.keys(monster);
      monsterKeys.shift();
      let canvasHeight = monsterKeys.length * 30;

      let maxMonsterTextSize = 0;
      for (let key in monster) {
        new Canvas()
          .setTextFont('30px Tahoma')
          .measureText(key, (size, inst) => {
            if (size.width > maxMonsterTextSize)
              maxMonsterTextSize = size.width;
          });
      }

      let hzvImage = new Canvas(maxMonsterTextSize + 680, 180 + canvasHeight)
        .setColor('#FFFFFF')
        .setTextFont('30px Tahoma')
        .setTextAlign('center')
        .addResponsiveText('Hitzone Values', (maxMonsterTextSize + 680) / 2, 20)
        .setTextAlign('start');
      let y = 0;
      let x = maxMonsterTextSize;

      for (let iconName of [
        'sever',
        'blunt',
        'ranged',
        'fire',
        'water',
        'thunder',
        'ice',
        'dragon',
        'stun',
        'stamina'
      ]) {
        try {
          let pic = await loadImage(
            `${__dirname.replace(
              'commands',
              'utils\\databases'
            )}\\element\\${iconName.toLowerCase()}.png`
          );
          hzvImage.addImage(pic, x + 15, 23, 50, 50);
          x += 60;
        } catch (e) {
          console.log(e);
        }
      }

      // Calculate max text width and place all monster parts vertically
      for (let key in monster) {
        if (key == 'name') continue;
        hzvImage.addResponsiveText(key, 0, y + 100);
        y += 35;
      }

      y = 0;
      for (let key in monster) {
        if (key == 'name') continue;
        let value = monster[key];

        x = maxMonsterTextSize;
        for (let hitzone in value) {
          let hzv = value[hitzone];
          hzvImage.addResponsiveText(hzv, x + 20, y + 100);
          x += 60;
        }
        y += 35;
      }

      return new Attachment(hzvImage.toBuffer(), 'hzv.png');
    }

    const embed = rawEmbed.setColor('#8fde5d').setTitle(monster.title);

    if (!monster.url == null || !monster.url == '') {
      embed.setURL(monster.url);
    }

    embed.setDescription(`${monster.description}\n\n${monster.info}`);
    embed.setThumbnail(monster.thumbnail);
    embed.addField(
      `Slash: **${monster.hzv.slash}** Blunt: **${monster.hzv.blunt}** Shot: **${monster.hzv.shot}**`,
      `🔥 **${monster.hzv.fire}** 💧 **${monster.hzv.water}** ⚡ **${monster.hzv.thunder}** ❄ **${monster.hzv.ice}** 🐉 **${monster.hzv.dragon}**`
    );
    embed.attachFile(
      await hitzoneValues(name).catch(e =>
        console.log(`Failed to load ${monster.title} hitzone value image`)
      )
    );
    embed.setImage('attachment://hzv.png');
    embed.addField('Elements', monster.elements, true);
    embed.addField('Ailments', monster.ailments, true);
    embed.addField('Blights', monster.blights, true);
    embed.addField('Locations', monster.locations, true);
    embed.setTimestamp();
    embed.setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
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
      let msg = `That monster doesn't seem to exist! Check out \`${this.prefix}mhw list\` for the full list.`;

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
      const embed = await this.monsterEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Monster;
