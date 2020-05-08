const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

const { Canvas } = require('canvas-constructor');
const { loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js'); // This is to send the image via discord.

// Canvas parameters
const CANVAS_PADDING_Y = 90;
const CANVAS_TEXT_FONT = '30px Tahoma';
const CANVAS_PART_HEIGHT = 30; // pixels
const COLUMN_COUNT = 16; // columns
const COLUMN_GAP = 35;
const COLUMN_WIDTH = 80; // Max value for a column (in terms of width) is '1000' == 4 chars, which is 64 px
const MULITIPLIED_COLUMN_WIDTH = 120; // Max value for a column (in terms of width) is '1000' == 4 chars, which is 64 px

const HEX_WHITE = '#FFFFFF';
const HEX_RED = '#FF3232';
const HEX_ORANGE = '#ffa500';
const HEX_GREEN = '#78AB46';

const ICON_SIZE_PX = 50;
const TENDERIZED_WHITELIST = [
  'slash',
  'blunt',
  'ranged',
  'fire',
  'water',
  'thunder',
  'ice',
  'dragon'
];

const HZV_FILENAME = 'hzv.png';

class Hzv extends Command {
  constructor(prefix) {
    super('hzv', 'hzv [monster name]', 'Get hzv info for a specific monster');
  }

  async monsterEmbed(
    message,
    name,
    rawEmbed = this.MessageEmbed,
    menu = this.menu
  ) {
    async function hzvImageGen(monsterName) {
      // get the monster hzv info from the db
      const monsterHzvInfo = client.mhwMonsters.get(
        monsterName.toLowerCase().replace(' ', '')
      ).hitzones;

      const monsterEnrageInfo = client.mhwMonsters.get(
        monsterName.toLowerCase().replace(' ', '')
      ).enrage;

      // store the monster parts in an array for canvas height calculation
      const parts = Object.keys(monsterHzvInfo);

      // remove the first element because its the name of the monster
      parts.shift();

      const canvasHeight = parts.length * (CANVAS_PART_HEIGHT + 5);

      // Figure out space needed (in pixels) for monster part names
      // by creating dummy canvas for each part and checking the width
      let maxPartWidth = 0;
      for (let key in monsterHzvInfo) {
        new Canvas()
          .setTextFont(CANVAS_TEXT_FONT)
          .measureText(key, (size, inst) => {
            if (size.width > maxPartWidth) {
              maxPartWidth = size.width;
            }
          });
      }

      // Compute total canvas width
      const canvasWidth =
        maxPartWidth +
        ((COLUMN_COUNT - 8) * COLUMN_WIDTH + 8 * MULITIPLIED_COLUMN_WIDTH) +
        COLUMN_COUNT * COLUMN_GAP;

      let hzvImage = new Canvas(
        canvasWidth + 40,
        CANVAS_PADDING_Y + canvasHeight
      )
        .setColor(HEX_WHITE)
        .setTextFont(CANVAS_TEXT_FONT)
        .setTextAlign('center')
        .addResponsiveText(
          'Hitzone Values - (Tenderized Values in Brackets) ',
          canvasWidth / 2,
          22.5
        ) // center title, 22.5 == y offset
        .setTextAlign('start');

      // Set base y downwards by 100px (height for table title + header/icons) and then another 20px for a gap
      // Set base x right to whatever the max monster part text size was.
      let y = 120;
      let x = maxPartWidth;

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
              'commands\\mhw',
              'utils/icons'
            )}/${iconName.toLowerCase()}.png`
          );
          hzvImage.addImage(
            pic,
            x + COLUMN_WIDTH / 2,
            33,
            ICON_SIZE_PX,
            ICON_SIZE_PX
          );

          // advance x to next icon position
          if (TENDERIZED_WHITELIST.includes(iconName)) {
            if (
              TENDERIZED_WHITELIST[TENDERIZED_WHITELIST.length - 1] == iconName
            ) {
              x += COLUMN_WIDTH + COLUMN_GAP;
            } else {
              x += MULITIPLIED_COLUMN_WIDTH + COLUMN_GAP;
            }
          } else {
            x += COLUMN_WIDTH + COLUMN_GAP;
          }
        } catch (err) {
          logger.error(err, { where: 'hzv.js 104' });
        }
      }

      // Places all the monster parts vertically
      for (let key in monsterHzvInfo) {
        if (key == 'name') continue;
        hzvImage.addResponsiveText(key, 0, y);

        y += CANVAS_PART_HEIGHT + 5; // 5 for gap
      }

      hzvImage.setTextAlign('center');

      y = 120;
      // Sets The Hitzone Values in a grid like format
      for (let key in monsterHzvInfo) {
        if (key == 'name') continue;
        let value = monsterHzvInfo[key];

        x = maxPartWidth + COLUMN_WIDTH / 2;
        for (let hitzone in value) {
          let hzv = value[hitzone];

          if (hitzone == 'ke') {
            if (hzv == 1) {
              hzvImage.setColor(HEX_RED);
            } else if (hzv == 3) {
              hzvImage.setColor(HEX_ORANGE);
            } else if (hzv == 4) {
              hzvImage.setColor(HEX_GREEN);
            }
          }

          if (TENDERIZED_WHITELIST.includes(hitzone)) {
            const tenderizeVal = Number(
              monsterEnrageInfo.tenderizeFormula.split('+')[1]
            );
            hzv = `${hzv} (${Math.round(hzv * 0.75 + tenderizeVal)})`;
            hzvImage.addResponsiveText(hzv, x + 20, y).setColor(HEX_WHITE);
            if (
              TENDERIZED_WHITELIST[TENDERIZED_WHITELIST.length - 1] == hitzone
            ) {
              x += COLUMN_WIDTH + COLUMN_GAP;
            } else {
              x += MULITIPLIED_COLUMN_WIDTH + COLUMN_GAP;
            }
          } else {
            hzvImage.addResponsiveText(hzv, x + 20, y).setColor(HEX_WHITE);
            x += COLUMN_WIDTH + COLUMN_GAP;
          }
        }

        // next part y position
        y += CANVAS_PART_HEIGHT + 5; // 5 for gap
      }

      // Creates a discord attachment object and place the image content inside
      return new MessageAttachment(hzvImage.toBuffer(), HZV_FILENAME);
    }

    const monster = message.client.mhwMonsters.get(name);
    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(monster.title);

    logger.debug('hzv log', { type: 'monsterRead', name: name });

    embed
      .setDescription(`${monster.description}\n\n${monster.info}`)
      .setThumbnail(monster.thumbnail)
      .attachFiles(
        await hzvImageGen(name).catch(err =>
          logger.error(
            `Failed to load ${monster.title} hitzone value image`,
            err
          )
        )
      )
      .addField(
        'Legend (by Order)',
        'Kinsect Extract, Slash, Blunt, Ranged, Fire, Water, Thunder, Ice, Dragon, Stun, Flinch, Trip, Timer, Wound, Sever, Notes'
      )
      .addField('Tender', monster.enrage.tender, true)
      .addField('Damage To Enrage', monster.enrage.dmgToEnrage, true)
      .addField('Enrage Duration', monster.enrage.enrageDuration, true)
      .addField('Enrage Speed', monster.enrage.enrageSpeed, true)
      .addField('Monster Damage', monster.enrage.monstrDmg, true)
      .addField('Player Damage', monster.enrage.playerDmg, true)
      .addField('Tenderize Formula', monster.enrage.tenderizeFormula, true)
      .setImage(`attachment://${HZV_FILENAME}`)
      .setTimestamp()
      .setFooter('Hitzone Values');

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
      const embed = await this.monsterEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Hzv;
