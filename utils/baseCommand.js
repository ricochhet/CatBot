const { MessageEmbed, TextChannel, version } = require('discord.js');
const Pages = require('./pagers.js');
const similarity = require('./similarity.js');
const logger = require('./log.js');
const fs = require('fs');
// const { Attachment } = require('discord.js'); // This is to send the image via discord.

const defaultOptions = {
  args: true,
  secret: false,
  category: false,
  subTree: null,
  alias: [],
  prefix: ''
};

class Command {
  constructor(name, usage, description, customOptions) {
    // Merge options (custom will override default if given)
    const options = { ...defaultOptions, ...customOptions };
    this.name = name;
    this.usage = `${options['prefix']}${usage}`;
    this.description = description;
    this.args = options['args'];
    this.secret = options['secret'];
    this.category = options['category'];
    this.subTree = options['subTree'];
    this.prefix = options['prefix'];
    this.version = version;
    this.alias = options['alias'];

    this.score = similarity.score;
    this.findAllMatching = similarity.findAllMatching;

    // Weapons multiplier
    this.weaponsRatio = new Map([
      ['hammer', 5.2],
      ['gs', 4.8],
      ['hh', 4.2],
      ['cb', 3.6],
      ['sa', 3.5],
      ['ls', 3.3],
      ['ig', 3.1],
      ['lance', 2.3],
      ['gl', 2.3],
      ['hbg', 1.5],
      ['sns', 1.4],
      ['db', 1.4],
      ['lbg', 1.3],
      ['bow', 1.2]
    ]);

    this.rawSharpRatio = new Map([
      ['red', 0.5],
      ['orange', 0.75],
      ['yellow', 1.0],
      ['green', 1.05],
      ['blue', 1.2],
      ['white', 1.32],
      ['purple', 1.39],
      ['none', 1.0]
    ]);

    this.elemSharpRatio = new Map([
      ['red', 0.25],
      ['orange', 0.5],
      ['yellow', 0.75],
      ['green', 1.0],
      ['blue', 1.0625],
      ['white', 1.125],
      ['purple', 1.3],
      ['none', 1.0]
    ]);

    this.critBoostLvl = new Map([
      ['none', 1],
      ['1', 1.25],
      ['2', 1.3],
      ['3', 1.35],
      ['4', 1.4]
    ]);

    if (!this.category && this.subTree != null) {
      logger.warn('Non-category command %s has set a sub tree', this.name);
    } else if (this.category && this.subTree == null) {
      this.subTree = this.name;
    }
  }

  async run(client, message, args) {
    const subCommand = args[0];
    args = args.slice(1, args.length);
    const commandFound = client[this.subTree].find(
      cmd =>
        (cmd.name === subCommand || cmd.alias.includes(subCommand)) &&
        !cmd.secret
    );

    if (!commandFound) return message.channel.send(this.usageEmbed());

    if (commandFound.args && args.length == 0)
      return message.channel.send(commandFound.usageEmbed());

    try {
      commandFound
        .run(client, message, args)
        .catch(err => logger.error(err, { where: 'baseCommand.js 105' }));
    } catch (err) {
      if (err.message.includes("Cannot read property 'catch'"))
        return logger.warn(
          "Command '%s' does not have async run() method",
          commandFound.name
        );
      return logger.error(err, { where: 'baseCommand.js 112' });
    }
  }

  MessageEmbed() {
    return new MessageEmbed();
  }

  saveJsonFile(filePath, jsonObj) {
    fs.writeFile(filePath, jsonObj, 'utf8', err => {
      if (err)
        return logger.error(
          'An error occured while writing JSON Object to file.',
          err
        );
    });
  }

  menu(
    channel = new TextChannel(),
    uid,
    pages = [],
    time = 120000,
    reactions = { first: '⏪', back: '◀', next: '▶', last: '⏩', stop: '⏹' },
    pageFooter = false
  ) {
    return new Pages(channel, uid, pages, time, reactions, pageFooter);
  }

  usageEmbed() {
    let embed = this.MessageEmbed();

    if (this.category) {
      // Get all commands in sub command
      const data = [];

      client[this.subTree].each(cmd => {
        data.push(
          `**${this.prefix}${this.name} ${cmd.usage}** - ${cmd.description}`
        );
      });

      embed
        .setColor('#8fde5d')
        .addField(this.description, `**${this.usage}**`)
        .addField('Parameters Help', data.join('\n\n'))
        .setTimestamp()
        .setFooter(`${this.name.toUpperCase()} Help`);
    } else {
      embed
        .setColor('#8fde5d')
        .addField('Usage: ', this.usage)
        .addField('Description: ', this.description)
        .setTimestamp();
    }

    return embed;
  }

  reactions(message, similarArray, embedTemplate, attachment = false) {
    const author = message.author.id;

    similarArray.sort(function(a, b) {
      return b[1] - a[1];
    });

    let msg = this.MessageEmbed()
      .setColor('#8fde5d')
      .setAuthor('Did you mean?')
      .setTimestamp()
      .setFooter('Did you mean?');

    let counter = 0;
    for (let item of similarArray) {
      if (counter >= 8) {
        break;
      }
      msg.addField(`${counter + 1} : ${item[0]}`, '\n\u200B');
      counter++;
    }

    let missingPermissions = false;
    if (
      !message.member.guild.me.hasPermission('MANAGE_MESSAGES') ||
      !message.member.guild.me.hasPermission('ADD_REACTIONS')
    ) {
      let checkPermissions = `💡 *The bot doesn't have* **MANAGE_MESSAGES** *or* **ADD_REACTIONS** *permission!*`;
      missingPermissions = true;
      msg.setDescription(checkPermissions);
      msg.setFooter(
        'Permission Issue: The bot needs MANAGE_MESSAGES & ADD_REACTIONS to work properly'
      );
    }

    message.channel.send({ embed: msg, files: null }).then(async message => {
      if (missingPermissions) return;

      let emojis = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣'].slice(
        0,
        counter
      );
      for (let emoji of emojis) {
        // shuold be 'await' to guarantee order, but this seems just slow enough to be in order every time (slightly faster now)
        message.react(emoji);
      }

      const filter = (reaction, user) => {
        return emojis.includes(reaction.emoji.name) && user.id === author;
      };

      message
        .awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
          const reaction = collected.first();
          let name = similarArray[emojis.indexOf(reaction.emoji.name)][0]
            .split(' ')
            .join('')
            .toLowerCase();

          logger.info('user selected %s', name);

          const embed = await embedTemplate(
            message.client,
            name,
            this.MessageEmbed()
          );
          let channel = message.channel;
          await message.delete();
          channel.send(embed);
        })
        .catch(async err => {
          logger.error(err, { where: 'baseCommand.js 243' });
          await message.reactions
            .removeAll()
            .catch(err => logger.error('Failed to remove reactions %s', err));
          await message.react('❌');
        });
    });
  }
}


module.exports = Command
