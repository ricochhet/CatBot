const Command = require('../../bot/command.js');
const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js');

class Pic extends Command {
  constructor() {
    super('pic', 'pic', 'Shows a random cat pictures', {
      args: false,
      alias: ['pics'],
      cooldown: 5000
    });
  }

  async run(client, message, args) {
    // Get all of the info from mhw api and casts it too a json format
    fetch('https://api.thecatapi.com/v1/images/search')
      .then(response => response.json())
      .then(catStuff => {
        message.channel.send(new MessageAttachment(catStuff[0].url));
      });
  }
}

module.exports = Pic;
