const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require("dblapi.js");
const auth = require('./auth.json');
const fs = require('fs');

client.commands = new Discord.Collection();
client.math = new Discord.Collection();
client.mhw = new Discord.Collection();

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
});

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
})

client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
});

client.login(auth.token);

/* Main code, this is what is ran on startup */
