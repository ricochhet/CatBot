const { RichEmbed, TextChannel, version } = require('discord.js');
const Pages = require('./pagers.js');
const similarity = require('./similarity.js');
const { Attachment } = require('discord.js'); // This is to send the image via discord.

const defaultOptions = {
  args: true,
  secret: false,
  category: false,
  subTree: null,
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
      ['1', 1.25],
      ['2', 1.3],
      ['3', 1.35],
      ['4', 1.4]
    ]);

    if (!this.category && this.subTree != null) {
      console.log(
        `Warning Non-Category Command (${this.name}) has set a subTree`
      );
    } else if (this.category && this.subTree == null) {
      this.subTree = this.name;
    }
  }

  run(client, message, args) {
    const subCommand = args[0];
    args = args.slice(1, args.length);
    const commandFound = client[this.subTree].find(
      cmd => cmd.name === subCommand && !cmd.secret
    );
    if (!commandFound) return message.channel.send(this.usageEmbed());
    if (commandFound.args && args.length == 0)
      return message.channel.send(commandFound.usageEmbed());
    commandFound.run(client, message, args);
  }

  RichEmbed() {
    return new RichEmbed();
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
    let embed;
    if (this.category) {
      // Get all commands in sub command
      const data = [];

      client[this.subTree].tap(cmd => {
        data.push(
          `**${this.prefix}${this.name} ${cmd.usage}** - ${cmd.description}`
        );
      });

      embed = this.RichEmbed()
        .setColor('#8fde5d')
        .addField(this.description, `**${this.usage}**`)
        .addField('Parameters Help', data.join('\n\n'))
        .setTimestamp()
        .setFooter(`${this.name.toUpperCase()} Help`);
    } else {
      embed = this.RichEmbed()
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

    let msg = this.RichEmbed()
      .setColor('#8fde5d')
      .setAuthor('Did you mean?')
      .setTimestamp()
      .setFooter('Did you mean?');

    let imgFiles = [];
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
        await message.react(emoji);
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
          const embed = await embedTemplate(
            message.client,
            name,
            this.RichEmbed()
          );
          let channel = message.channel;
          await message.delete();
          await channel.send(embed);
        })
        .catch(async collected => {
          console.log(collected);
          await message.clearReactions();
          await message.react('❌');
        });
    });
  }
}


module.exports = Command
