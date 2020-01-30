const {Client,Collection,Constants} = require( 'discord.js' )
const fs = require('fs');

api = {

  apiRequestMethod : 'sequential',
  shardId : 0,
  shardCount : 0,
  messageCacheMaxSize :  200,
  messageCacheLifetime : 0,
  messageSweepInterval : 0,
  fetchAllMembers : false,
  disableEveryone : false,
  sync : false,
  restWsBridgeTimeout : 5000,
  restTimeOffset : 500,
  retryLimit : Number.POSITIVE_INFINITY,
  disabledEvents : [],
  ws : {large_threshold : 250,compress : true},
  http : {
    version : 7,
    api : 'https://discordapp.com/api',
    cdn : 'https://cdn.discordapp.com',
    invite : 'https://discord.gg'
  }

}

class Bot extends Client {

  constructor( prefix,options = api ){
    super(options)
    this.prefix = prefix
    this.Constants = Constants

    this.on('ready', ()=> {
      console.log(`Logged in as ${client.user.tag}!`);
      this.user.setActivity('for +help', { type: 'WATCHING' });
    })
  }

  buildCollection(){
    return new Collection
  }

  setupCommand(dir){
    let collectionName = dir.split('/')[1]
    this[collectionName] = new Collection();
    fs.readdir(dir, (err, files) => {
      if (err) return console.error(err);
      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const props = require(`${dir}${file}`);
        const commandName = file.split(".")[0];
        this[collectionName].set(commandName, new props());
      });
    });
  }

  setupDB(collection,jsonDir){
    let json = require( jsonDir )
    for (const i of Object.keys(json)) {
      collection.set(i, json[i]);
    }
  }

  buildCommands(dirs) {

    dirs.forEach((dir) => {
      this.setupCommand(dir)
    });

    this.on('message',this.listenForCommands)
  }

  buildDBs(dbCollection){
    Object.entries(dbCollection).forEach(([collectionName,dbDir]) => {
        this[collectionName] = new Collection();
        this.setupDB(this[collectionName],dbDir)
    });
  }

  listenForCommands(message){

    // Ignore Bots
    if (message.author.bot) return;

    // Ignores message if bot cannot send messages
    if (!message.guild) return;
    if (!message.member.guild.me.hasPermission('SEND_MESSAGES')) return;
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

    // Standard argument and command definitions
    const args = message.content.slice(this.prefix.length).trim().toLowerCase().split(/ +/g);
    const rawArgs = message.content.slice(this.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const command = this.commands.get(cmdName);

    if (!command) return;


    // Ignores Secret Commands if Not Owner
    if (command.secret && message.author.id != process.env.OWNER) return;

    if (command.args && !args.length) {
      if (command.usage) {
        message.channel.send( command.usageEmbed() );
      }
      return;
    }

    if (command.caseSensitiveArgs){
     rawArgs.shift();
     return command.run(this, message, rawArgs);
    }

    command.run(this, message, args);


  }

}

module.exports = Bot
