const { Client, Collection, Constants } = require('discord.js');
const DBL = require('dblapi.js');
const glob = require('glob');
const { parse } = require('path');

const logger = require('./log.js');
const DisabledHandler = require('./disabledHandler.js');
const db = require('./libraries/client');
const config = require('../config.json');

let server_conf = {
  server_clientid: config['server']['client_id'],
  server_url: config['server']['url_base'],
  server_key: config['api_keys']['catbotserver_key'],
  server_port: config['server']['port'],
  server_hostname: config['server']['hostname'],
  server_apipath: config['server']['api_path']
};

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
      logger.info(
        'Logged in as %s! (running version %s)',
        client.user.tag,
        client.version
      );

      this.shard.broadcastEval(
        `this.user.setActivity('for ${this.prefix}help', { type: 'WATCHING' });`
      );
      //this.user.setActivity(`for ${this.prefix}help`, { type: 'WATCHING' });

      if (config['api_keys']['dbl_token']) {
        const dbl = this.dblSetup(config['api_keys']['dbl_token']);

        this.setInterval(() => {
          this.shard.fetchClientValues('guilds.cache').then(results => {
            let size = 0;
            results.forEach(shard => {
              size += shard.length;
            });
            dbl.postStats(size);
          });
        }, 1800000);
      }
    });
  }

  buildCollection() {
    return new Collection();
  }

  dblSetup(token) {
    return new DBL(token, this);
  }

  setupDB(collection, jsonDir) {
    let json = require(jsonDir);
    for (const i of Object.keys(json)) {
      collection.set(i, json[i]);
    }
  }

  buildCommands(parentDir, collectionNameOverides) {
    glob(`${parentDir}/**/*.js`, async (_, files) => {
      files.forEach(file => {
        let { dir, name } = parse(file);
        let collectionName = dir.split('/').pop();
        if (collectionNameOverides[collectionName])
          collectionName = collectionNameOverides[collectionName];
        if (!this[collectionName]) this[collectionName] = new Collection();
        let cmd = require(file);
        this[collectionName].set(name, new cmd(this.prefix));
      });

      this.on('message', this.listenForCommands);
    });
  }

  isDev(id) {
    let devs = [
      config['user_ids']['rico_id'],
      config['user_ids']['yofou_id'],
      config['user_ids']['chad_id']
    ];
    return devs.includes(id);
  }

  buildDBs(dbCollection) {
    Object.entries(dbCollection).forEach(([collectionName, dbDir]) => {
      this[collectionName] = new Collection();
      this.setupDB(this[collectionName], dbDir);
    });
  }

  async listenForCommands(message) {
    // Ignores message if message doesn't exist (kek)
    if (!message) {
      logger.error(
        'listenForCommands triggered with an empty message %s',
        message
      );
      return;
    }

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

    // Check if the channel should be ignored (bypassed for ADMINS)
    db.get(
      `${server_conf.server_url}database/${server_conf.server_clientid}/server/ignoredChannels?key=${server_conf.server_key}`
    ).then(function(data) {
      let ignored = JSON.parse(data);
      //let ignored = require('./databases/server/ignoredChannels.json');
      if (ignored.channels) {
        if (
          ignored.channels.includes(message.channel.id) &&
          !message.member.hasPermission('ADMINISTRATOR')
        )
          return;
      }
    });

    // show help if bot gets mentioned (different syntax if mobile vs desktop)
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

    const command = this.commands.find(
      cmd => cmdName == cmd.name || cmd.alias.includes(cmdName)
    );

    logger.info("received '%s'", content, { rawArgs: rawArgs });

    if (!command) return;

    // Ignores Secret Commands if Not Owner
    if (command.secret && message.author.id != config['user_ids']['rico_id'])
      return;

    // Ignore admin only commands
    if (
      command.admin &&
      !message.member.hasPermission('ADMINISTRATOR') &&
      !this.isDev(message.author.id)
    ) {
      return message.channel.send(
        'Sorry meowster, this command is for admins only!'
      );
    }

    // Check if command is disabled (bypass for ADMINS)
    let handler = new DisabledHandler();
    if (
      !message.member.hasPermission('ADMINISTRATOR') &&
      handler.isGuildInDB(message.guild.id)
    ) {
      let category, name;
      if (command.category) {
        category = command.name;

        // find subcommand (by name or alias)
        let subCmd = client[category].find(
          cmd => cmd.name == args[0] || cmd.alias.includes(args[0])
        );
        if (!subCmd) subCmd = { name: args[0] };
        name = subCmd.name;
      } else {
        category = 'main';
        name = command.name;
      }

      if (await handler.isCommandDisabled(message.guild.id, category, name)) {
        return message.channel.send(
          'Sorry meowster, but the admins of this server have disabled this command!'
        );
      }
    }

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
          .catch(err => logger.error(err, { where: 'bot.js 171' }));
      } else {
        command
          .run(this, message, args)
          .catch(err => logger.error(err, { where: 'bot.js 173' }));
      }
    } catch (err) {
      logger.error(err, { where: 'bot.js 176' });
    }
  }
}


module.exports = Bot;
