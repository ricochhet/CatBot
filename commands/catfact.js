const Command = require('../utils/baseCommand.js')
const catFactsDatabase = require('../utils/databases/other/catfacts.json');

class Catfacts extends Command{
  constructor(prefix) {
    super(
      'catfact',
      'catfact',
      'Shows a random cat fact',
      {
        args : false,
        prefix : prefix     
      }
    )
  }

  run(client, message, args) {
    const catFactKeys = Object.values(catFactsDatabase);
    message.channel.send(catFactKeys[Math.floor(Math.random() * catFactKeys.length)]);
  }
}

module.exports = Catfacts
