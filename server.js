const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require("dblapi.js");
const auth = require('./auth.json');
const fs = require('fs');

client.commands = new Discord.Collection();
client.math = new Discord.Collection();
client.mhw = new Discord.Collection();
client.lfg = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

// push all mhw command in the nhw collection to be used for mhw
fs.readdir("./mhw/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./mhw/${file}`);
    let commandName = file.split(".")[0];
    client.mhw.set(commandName, props);
  });
});

// push all math command in the math collection to be used for calc
fs.readdir("./math/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./math/${file}`);
    let commandName = file.split(".")[0];
    client.math.set(commandName, props);
  });
});

// push all lfg command in the math collection to be used for lfg
fs.readdir("./lfg/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./lfg/${file}`);
    let commandName = file.split(".")[0];
    client.lfg.set(commandName, props);
  });
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('for +help', { type: 'WATCHING' });

  client.setInterval(() => {

    let lfg = require("./databases/lfg.json")

    for (sessionID in lfg) {

      current = lfg[sessionID]['time']

      duration = Date.now() - current

      if (duration >= 7200000) delete lfg[sessionID]
    }

    var jsonObj = JSON.stringify(lfg,null,4)
    fs.writeFile(`${__dirname}/databases/lfg.json`, jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

  },60000)})

});

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
})

client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
});

client.login(auth.token);

/* Main code, this is what is ran on startup */
