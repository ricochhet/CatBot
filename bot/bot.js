const { Client, Collection, Constants } = require('discord.js');
const DBL = require('dblapi.js');
const glob = require('glob');
const { parse } = require('path');

const logger = require('./log.js');
const DisableCmdHandler = require('./disableCmdHandler.js');
const config = require('../config.json');
const ms = require('ms');

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
  constructor(customOptions) {
    // Merge options (custom will override base or default if given)
    const options = { ...baseOptions, ...customOptions };
    super(options);
    this.Constants = Constants;

    this.on('ready', async () => {
      logger.info(
        'Logged in as %s! (running version %s)',
        client.user.tag,
        client.version
      );

      this.shard.broadcastEval(
        `this.user.setActivity('for ${await this.prefix()}help or @CatBot', { type: 'WATCHING' });`
      );

      const dbl_token = config['bot']['dbl_token'];
      if (dbl_token) {
        const dbl = new DBL(dbl_token);

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

  async prefix(message = undefined) {
    // API version
    let prefixes = await client.apiClient.getCustomPrefixes();

    let prefix = this.config['bot']['defaultPrefix'];
    if (!prefix) prefix = '+';
    if (!message) return prefix;
    return prefixes[message.guild.id] ? prefixes[message.guild.id] : prefix;
  }

  buildCollection() {
    return new Collection();
  }

  setupDB(collection, jsonDir) {
    let json = require(jsonDir);
    for (const i of Object.keys(json)) {
      collection.set(i, json[i]);
    }
  }

  async buildCommands(parentDir, collectionNameOverides) {
    glob(`${parentDir}/**/*.js`, async (_, files) => {
      files.forEach(file => {
        let { dir, name } = parse(file);
        let collectionName = dir.split('/').pop();
        if (collectionNameOverides[collectionName])
          collectionName = collectionNameOverides[collectionName];
        if (!this[collectionName]) this[collectionName] = new Collection();
        let cmd = require(file);
        this[collectionName].set(name, new cmd());
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
    const ignored = await client.apiClient.getIgnoredChannels();

    if (ignored.channels) {
      if (
        ignored.channels.includes(message.channel.id) &&
        !message.member.hasPermission('ADMINISTRATOR')
      )
        return;
    }

    const prefix = await this.prefix(message);
    let content;
    if (message.content.startsWith(prefix)) {
      content = message.content.slice(prefix.length).trim();
    } else if (message.content.startsWith(`<@!${this.user.id}>`)) {
      return message.reply(`Use ${prefix}help to get started!`);
    } else if (message.content.startsWith(this.user.toString())) {
      return message.reply(`Use ${prefix}help to get started!`);
    } else {
      return;
    }

    const rawArgs = content.split(/ +/g);

    const args = content.toLowerCase().split(/ +/g);

    const cmdName = args.shift();

    const command = this.commands.find(
      cmd => cmdName == cmd.name || cmd.alias.includes(cmdName)
    );

    logger.info("received '%s'", content, { rawArgs: rawArgs });

    if (!command) return;

    // Ignores Secret Commands if Not Dev
    if (command.secret && !this.isDev(message.author.id)) return;

    // Ignore admin only commands, unless user is dev
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
    let handler = new DisableCmdHandler(client.apiClient);

    await handler.initDb().catch(async err => {
      logger.error(err);
      return message.channel.send(await command.serverErrorEmbed());
    });

    if (
      !message.member.hasPermission('ADMINISTRATOR') &&
      handler.isGuildInDB(message.guild.id)
    ) {
      let category, name;
      if (command.category) {
        category = command.subTree;
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

      if (handler.isCommandDisabled(message.guild.id, category, name)) {
        return message.channel.send(
          'Sorry meowster, but the admins of this server have disabled this command!'
        );
      }
    }

    if (command.args && !args.length) {
      if (command.usage) {
        message.channel.send(command.usageEmbed(prefix));
      }
      return;
    }

    const log = command.category ? `${cmdName} ${args[0]}` : cmdName;

    if (!command.secret)
      logger.debug('command log', { type: 'commandRun', cmd: log });

    const cooldownTimer = command.cooldowns.get(message.author.id);
    if (cooldownTimer && !command.category) {
      if (Date.now() < cooldownTimer) {
        const timeDifference = cooldownTimer - Date.now();
        return message.channel.send(
          `You still have **${ms(timeDifference, {
            long: true
          })}** until you can do the \`${command.name}\` command again.`
        );
      } else {
        command.cooldowns.delete(message.author.id);
      }
    }

    if (!command.category)
      command.cooldowns.set(message.author.id, Date.now() + command.cooldown);

    try {
      if (command.caseSensitiveArgs) {
        rawArgs.shift();
        return command
          .run(this, message, rawArgs)
          .catch(err => logger.error(err, { where: 'bot.js 207' }));
      } else {
        command
          .run(this, message, args)
          .catch(err => logger.error(err, { where: 'bot.js 211' }));
      }
    } catch (err) {
      logger.error(err, { where: 'bot.js 214' });
    }
  }
}


module.exports = Bot;
