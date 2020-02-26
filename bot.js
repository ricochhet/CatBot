const { Client, Collection, Constants } = require('discord.js');
const DBL = require('dblapi.js');
const fs = require('fs');

apiDefault = {
  apiRequestMethod: 'sequential',
  shardId: 0,
  shardCount: 0,
  messageCacheMaxSize: 100,
  messageCacheLifetime: 300,
  messageSweepInterval: 30,
  fetchAllMembers: false,
  disableEveryone: false,
  sync: false,
  restWsBridgeTimeout: 5000,
  restTimeOffset: 500,
  retryLimit: Number.POSITIVE_INFINITY,
  disabledEvents: [
    'TYPING_START',
    'PRESENCE_UPDATE',
    'WEBHOOKS_UPDATE',
    'VOICE_STATE_UPDATE',
    'USER_NOTE_UPDATE',
    'CHANNEL_PINS_UPDATE',
    'RELATIONSHIP_ADD',
    'RELATIONSHIP_REMOVE',
    'GUILD_BAN_ADD',
    'GUILD_BAN_REMOVE',
    'USER_SETTINGS_UPDATE'
  ],
  ws: { large_threshold: 250, compress: true },
  http: {
    version: 7,
    api: 'https://discordapp.com/api',
    cdn: 'https://cdn.discordapp.com',
    invite: 'https://discord.gg'
  }
};

class Bot extends Client {
  constructor(prefix, customOptions) {
    // Merge options (custom will override default if given)
    const options = { ...apiDefault, ...customOptions };
    super(options);
    this.prefix = prefix;
    this.Constants = Constants;

    this.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
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
    // Ignore Bots
    if (message.author.bot) return;

    // Ignores message if bot cannot send messages
    if (!message.guild) return;
    if (!message.member.guild.me.hasPermission('SEND_MESSAGES')) return;
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))
      return;

    if (message.content.startsWith(`<@!${message.member.guild.me.id}>`))
      return message.channel.send(`Use \`${this.prefix}help\` to get started!`);
    if (message.content[0] != this.prefix) return;

    // Standard argument and command definitions
    const args = message.content
      .slice(this.prefix.length)
      .trim()
      .toLowerCase()
      .split(/ +/g);
    const rawArgs = message.content
      .slice(this.prefix.length)
      .trim()
      .split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const command = this.commands.get(cmdName);

    if (!command) return;

    const logObj = {
      content: message.content,
      timestamp: `${message.createdAt.toUTCString().substr(0, 16)} (${checkDays(
        message.createdAt
      )})`,
      rawArguments: rawArgs,
      arguments: args
    };

    console.log(logObj);

    // Ignores Secret Commands if Not Owner
    if (command.secret && message.author.id != this.config.get('OWNER')) return;

    if (command.args && !args.length) {
      if (command.usage) {
        message.channel.send(command.usageEmbed());
      }
      return;
    }

    if (command.caseSensitiveArgs) {
      rawArgs.shift();
      return command.run(this, message, rawArgs);
    }

    command.run(this, message, args);
  }
}

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? ' day' : ' days') + ' ago';
}

module.exports = Bot;
