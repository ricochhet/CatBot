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

  /**
   * eventFilter Object
   * @typedef {Object} eventFilter
   * @property {string} eventFilter.rankType
   * @property {integer} eventFilter.maxRank
   */

  /**
   * Parses array of commands
   * @param {array} args The command arguments
   * @returns {eventFilter} The resulting filter object
   */
  ParseArgs(args) {
    // if args are invalid, return default filter object
    if (!args || args.length < 1) return { rankType: 'all', maxRank: 999 };
    let [a, b] = args;
    // check if either argument is a valid integer
    let ac = parseInt(a),
      bc = parseInt(b);
    // if the first argument is an integer, return eventFilter that filters on rank only
    if (Number.isInteger(ac))
      return { rankType: 'all', maxRank: ac <= 999 ? ac : 999 };
    // else create eventFilter from both arguments
    else
      return {
        // if rankType is not a valid type, default to 'all'
        rankType:
          a.toLowerCase() === 'mr' || a.toLowerCase() === 'hr'
            ? a.toLowerCase()
            : 'all',
        // if maxRank is not a valid integer <= 999, default to 999
        maxRank: Number.isInteger(bc) && bc <= 999 ? bc : 999
      };
  }

  async run(client, message, args) {
    // ParseArgs should always return values, so checking if rankType or maxRank are valid should not be necessary
    let { rankType, maxRank } = this.ParseArgs(args);
    let events;

    // Get all of the info from mhw api and casts it to a json format
    fetch('https://mhw-db.com/events')
      .then(response => response.json())
      .then(eventItems => {
        events = eventItems.filter(event => {
          // if the event has null requirements, set the rankType based on the event.masterRank property
          let req = event.requirements
            ? event.requirements
            : event.masterRank
            ? 'MR'
            : 'HR';
          // parse type and rank from event requirements
          let [t, r] = req.split(' ');
          let rank = 0;
          let parsed = parseInt(r);
          if (Number.isInteger(parsed)) rank = parsed;
          // return result of condition
          return (
            (rankType === 'all' || rankType === t.toLowerCase()) &&
            rank <= maxRank
          );
        });

        // Chuncks create a 2D array that lets us control how many events we want on one embed
        let tChunks = this.Chunk(events, 2);
        let embeds = [],
          tEmbed;

        // Since we are now filtering, we need to return a message when there are 0 matching events
        if (tChunks.length < 1) {
          tEmbed = this.MessageEmbed().setTitle('Monster Hunter World Events');
          tEmbed.setDescription(
            'There are no events meeting the filter criteria'
          );
          tEmbed.setColor('#8fde5d');
          embeds.push(tEmbed);
        } else {
          // Start to use nested arrays to iterate through the 2D chunck array we created
          for (let outer of tChunks) {
            // Start to init the embed we gonna use
            tEmbed = this.MessageEmbed().setTitle(
              'Monster Hunter World Events'
            );

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
