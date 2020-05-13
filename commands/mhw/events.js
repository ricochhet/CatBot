const Command = require('../../utils/command.js');
const fetch = require('node-fetch');

class Events extends Command {
  constructor() {
    super(
      'events',
      'events ([rank-type] max-rank)',
      'Get all current events info',
      { args: false }
    );
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
    let [rankType, maxRank] = args;
    let checkRank = parseInt(maxRank);
    maxRank = Number.isInteger(checkRank) ? checkRank : 999;
    let events = [];

    // Get all of the info from mhw api and casts it too a json format
    fetch('https://mhw-db.com/events')
      .then(response => response.json())
      .then(eventItems => {
        eventItems.forEach(event => {
          // if filter arguments were passed with the command, filter the events
          if (rankType && event.requirements) {
            let [t, r] = event.requirements.split(' ');
            let rank = 0;
            let parsed = parseInt(r);
            if (Number.isInteger(parsed)) {
              rank = parsed;
            }
            if (t.toLowerCase() === rankType.toLowerCase() && rank <= maxRank) {
              events.push(event);
            }
          } else {
            events.push(event);
          }
        });

        // Chuncks create a 2D array that lets us control how many events we want on one embed
        let tChunks = this.Chunk(events, 2);
        let embeds = [],
          tEmbed;

        // Start to use nested arrays to iterate through the 2D chunck array we created
        for (let outer of tChunks) {
          // Start to init the embed we gonna use
          tEmbed = this.MessageEmbed().setTitle('Monster Hunter World Events');

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
