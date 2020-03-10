const { Client, Collection, Constants } = require('discord.js');
const DBL = require('dblapi.js');
const fs = require('fs');

const logger = require('./utils/log.js');

// params and defaults at https://discord.js.org/#/docs/main/v12/typedef/ClientOptions
// these are the only values we're customizing (using defaults otherwise)
baseOptions = {
  messageCacheMaxSize: 100, // msgs
  messageCacheLifetime: 300, // seconds
  messageSweepInterval: 30,
  disableMentions: 'everyone',
  retryLimit: Number.POSITIVE_INFINITY
};

class Bot extends Client {
  constructor(prefix, customOptions) {
    // Merge options (custom will override base or default if given)
    const options = { ...baseOptions, ...customOptions };
    super(options);
    this.prefix = prefix;
    this.Constants = Constants;

    this.on('ready', () => {
      //console.log(`Logged in as ${client.user.tag}!`);
      logger.info('Logged in as %s!', client.user.tag);
      this.user.setActivity(`for ${this.prefix}help`, { type: 'WATCHING' });
    });
  }

  buildCollection() {
    return new Collection();
  }

  dblSetup(token) {
    return new DBL(token, this);
  }

  setupCommand(dir) {
    let collectionName;
    if (typeof dir == 'object') {
      collectionName = dir[0];
      dir = dir[1];
    } else {
      collectionName = dir.split('/')[2];
    }
    this[collectionName] = new Collection();
    fs.readdir(dir, (err, files) => {
      if (err) return console.error(err);
      files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const props = require(`${dir}${file}`);
        const commandName = file.split('.')[0];
        this[collectionName].set(commandName, new props(this.prefix));
      });
    });
  }

  setupDB(collection, jsonDir) {
    let json = require(jsonDir);
    for (const i of Object.keys(json)) {
      collection.set(i, json[i]);
    }
  }

  buildCommands(dirs) {
    dirs.forEach(dir => {
      this.setupCommand(dir);
    });

    this.on('message', this.listenForCommands);
  }

  buildDBs(dbCollection) {
    Object.entries(dbCollection).forEach(([collectionName, dbDir]) => {
      this[collectionName] = new Collection();
      this.setupDB(this[collectionName], dbDir);
    });
  }

  listenForCommands(message) {
    let Channels = require('./utils/databases/server/ignoredChannels.json');

    // Ignores message if message doesn't exist
    if (!message) return;

    // Ignore dms
    if (typeof message.channel == 'DMChannel') return;

    // Ignore Bots
    if (message.author.bot) return;

    // Ignores message if bot cannot send messages
    if (!message.guild) return;

    // This here is kind of temporary fix for the below, unless this itself fixes the issue fine, which it might
    if (!message.member) return;

    // Before this would sometimes error out as a cannot find guild of null, meaning message.member is null
    if (!message.member.guild.me.hasPermission('SEND_MESSAGES')) return;
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))
      return;

    if (Channels.channels) {
      if (
        Channels.channels.includes(message.channel.id) &&
        !message.member.hasPermission('ADMINISTRATOR')
      )
        return;
    } else {
      logger.warn('Channels.channel does not exist');
    }

    if (
      message.content.startsWith(`<@!${message.member.guild.me.id}>`) ||
      message.content.startsWith(`<@${message.member.guild.me.id}>`)
    )
      return message.channel.send(`Use \`${this.prefix}help\` to get started!`);

    if (message.content[0] != this.prefix) return;

    // Standard argument and command definitions
    const content = message.content.slice(this.prefix.length).trim();

    const rawArgs = content.split(/ +/g);

    const args = content.toLowerCase().split(/ +/g);

    const cmdName = args.shift();

    const command = this.commands.get(cmdName);

    logger.info("received '%s'", content, { rawArgs: rawArgs });

    if (!command) return;

    // Ignores Secret Commands if Not Owner
    if (command.secret && message.author.id != this.config.get('OWNER')) return;

    if (command.args && !args.length) {
      if (command.usage) {
        message.channel.send(command.usageEmbed());
      }
      return;
    }

    const log = command.category ? `${cmdName} ${args[0]}` : cmdName;

    if (!command.secret)
      logger.debug('command log', { type: 'commandRun', cmd: log });

    try {
      if (command.caseSensitiveArgs) {
        rawArgs.shift();
        return command
          .run(this, message, rawArgs)
          .catch(err => logger.error(err));
      } else {
        command.run(this, message, args).catch(err => logger.error(err));
      }
    } catch (err) {
      logger.error(err);
    }
  }
}


module.exports = Bot;
