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

    // All bois this ones gonna be a messy one :)
    async function hitzoneValues(monsterName) {
      // first things first we find the monster in the json
      let monster = hzvDB[monsterName.toLowerCase().replace(' ', '')];

      // We then store the said monster parts in an array for canvas height calcution
      let monsterKeys = Object.keys(monster);
      monsterKeys.shift(); // we remove the first element because its the name of the monster
      let canvasHeight = monsterKeys.length * 30;

      // Here we find the max monster part text size in pixels for canvas base
      let maxMonsterTextSize = 0;
      for (let key in monster) {
        new Canvas()
          .setTextFont('30px Tahoma')
          .measureText(key, (size, inst) => {
            if (size.width > maxMonsterTextSize)
              maxMonsterTextSize = size.width;
          });
      }

      // 20 * 16 comes from the gap size of each hzv which is 20
      // 64 * 16 comes from the max text width (px) of the hzv (1000 text width is 64px)
      // 16 comes from 16 different type of hzv of each part
      const canvasBase = maxMonsterTextSize + 64 * 16 + 20 * 16;
      let hzvImage = new Canvas(canvasBase, 180 + canvasHeight)
        .setColor('#FFFFFF')
        .setTextFont('30px Tahoma')
        .setTextAlign('center')
        .addResponsiveText('Hitzone Values', canvasBase / 2, 22.5)
        .setTextAlign('start');

      // Set base y downwards by 100px.
      // Set base x right too what ever the max monster part text size was set.
      let y = 100;
      let x = maxMonsterTextSize;

      // places the hit zone icons horizontally
      for (let iconName of [
        'ke',
        'slash',
        'blunt',
        'ranged',
        'fire',
        'water',
        'thunder',
        'ice',
        'dragon',
        'stun',
        'flinch',
        'trip',
        'timer',
        'wound',
        'sever',
        'notes'
      ]) {
        try {
          let pic = await loadImage(
            `${__dirname.replace(
              'commands',
              'utils\\databases'
            )}\\element\\${iconName.toLowerCase()}.png`
          );
          hzvImage.addImage(pic, x + 15, 23, 50, 50);
          x += 64 + 12;
        } catch (e) {
          console.log(e);
        }
      }

      // Places all the monster parts vertically
      for (let key in monster) {
        if (key == 'name') continue;
        hzvImage.addResponsiveText(key, 0, y);
        y += 35;
      }

      y = 100;
      // Sets The Hitzone Values in a grid like format
      for (let key in monster) {
        if (key == 'name') continue;
        let value = monster[key];

        x = maxMonsterTextSize;
        for (let hitzone in value) {
          let hzv = value[hitzone];

          if (hitzone == 'ke') {
            if (hzv == 1) {
              hzvImage.setColor('#FF3232');
            } else if (hzv == 3) {
              hzvImage.setColor('#ffa500');
            } else if (hzv == 4) {
              hzvImage.setColor('#78AB46');
            }
          }

          hzvImage.addResponsiveText(hzv, x + 20, y).setColor('#FFFFFF');
          x += 64 + 12;
        }
        y += 35;
      }

      // Creates a discord attachment object and place the image content inside
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
