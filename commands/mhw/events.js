const Command = require('../../utils/baseCommand.js');
const fetch = require('node-fetch');

class Events extends Command {
  constructor() {
    super('events', 'events', 'Get all current events info', { args: false });
  }

  Chunk(arr, len) {
    let chunks = [],
      i = 0,
      n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
  }

  async run(client, message, args) {
    let events = [];

    // Get all of the info from mhw api and casts it too a json format
    fetch('https://mhw-db.com/events')
      .then(response => response.json())
      .then(ailments => {
        ailments.forEach(event => {
          events.push(event);
        });

        // Chuncks create a 2D array that lets us control how many events we want on one embed
        let tChunks = this.Chunk(events, 2);
        let embeds = [],
          tEmbed;

        // Start to use nested arrays to iterate through the 2D chunck array we created
        for (let outer of tChunks) {
          // Start to init the embed we gonna use
          tEmbed = this.RichEmbed()
            .setTitle('Monster Hunter World Events');

          tEmbed.setDescription('Shows all the current active mhw events');
          tEmbed.setColor('#8fde5d');
          // Setup the rest of the embed here
          for (let inner of outer) {
            // Makes sure that requirements doesnt display as null
            let requirements = 'No hunter rank needed';
            if (inner['requirements'] != null)
              requirements = inner['requirements'];

            tEmbed.addField(
              inner['name'],
              `\`\`\`\n` +
                `🌎 Location: ${inner['location']['name']}\n` +
                `❓ Type: ${inner['type']}\n` +
                `📗 Requirements: ${requirements}\n` +
                `🕹️ Platform: ${inner['platform']}\n` +
                `📘 Success Condition: ${inner['successConditions']}\n` +
                `📕 Description: ${inner['description']}\n` +
                `\`\`\``
            );
          }
          // Adds to a 1D normal array of embeds for discord-paginationembed to iterate though
          embeds.push(tEmbed);
        }

        let reactions = {};
        this.menu(
          message,
          message.channel,
          message.author.id,
          embeds,
          120000,
          (reactions = {
            first: '⏪',
            back: '◀',
            next: '▶',
            last: '⏩',
            stop: '⏹'
          }),
          true // override embed footers (with page number)
        );
      });
  }
}

module.exports = Events;
