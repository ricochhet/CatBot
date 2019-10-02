const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBLTOKEN, client);
const fs = require('fs');
const http = require('http');
var express = require('express');
var app = express();

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
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

//client.login(auth.token);
client.login(process.env.TOKEN);

/* Main code, this is what is ran on startup */
