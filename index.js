const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require("dblapi.js");
const auth = require('./auth.json');

const dbl = new DBL(auth.DBLTOKEN, client);
const fs = require('fs');
const http = require('http');

client.commands = new Discord.Collection();
client.math = new Discord.Collection();
client.mhgu = new Discord.Collection();
client.mhw = new Discord.Collection();
client.lfg = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const props = require(`./commands/${file}`);
    const commandName = file.split('.')[0];
    client.commands.set(commandName, props);
  });
});

fs.readdir("./mhgu/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const props = require(`./mhgu/${file}`);
    const commandName = file.split('.')[0];
    client.mhgu.set(commandName, props);
  });
});

fs.readdir("./mhw/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const props = require(`./mhw/${file}`);
    const commandName = file.split('.')[0];
    client.mhw.set(commandName, props);
  });
});

fs.readdir('./lfg/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const props = require(`./lfg/${file}`);
    const commandName = file.split('.')[0];
    client.lfg.set(commandName, props);
  });
});

fs.readdir('./math/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const props = require(`./math/${file}`);
    const commandName = file.split('.')[0];
    client.math.set(commandName, props);
  });
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

dbl.on('posted', () => {
  console.log('Server count posted!');
});

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('for +help', { type: 'WATCHING' });
  
  // Check every minute and delete lfg sessions older than 2 hours
  client.setInterval(() => {
    const lfg = require('./databases/lfg/lfg.json');
    let rewrite = false;

    for (const sessionID in lfg) {
      const duration = Date.now() - lfg[sessionID]['time'];

      if (duration >= 7200000) {
        delete lfg[sessionID];
        rewrite = true;
      }
    }

    if (rewrite) {
      const jsonObj = JSON.stringify(lfg, null, 4);
      fs.writeFile(`${__dirname}/databases/lfg/lfg.json`, jsonObj, 'utf8', function(err) {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        }
      });
    }
  }, 60000);
  
  setInterval(() => {
        dbl.postStats(client.guilds.size);
  }, 1800000);
});

client.on('guildCreate', guild => {
    console.log('Joined a new guild: ' + guild.name);
});

client.on('guildDelete', guild => {
    console.log('Left a guild: ' + guild.name);
});

client.login(auth.TOKEN);