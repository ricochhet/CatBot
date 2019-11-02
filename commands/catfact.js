const Discord = require('discord.js');
const catFactsDatabase = require('../databases/other/catfacts.json');

module.exports = {
  name: 'catfact',
  args: false,
  description: 'Shows a random cat fact',
  run(client, message, args) {
    const catFactKeys = Object.values(catFactsDatabase);
    message.channel.send(catFactKeys[Math.floor(Math.random()*catFactKeys.length)]);
  },
};