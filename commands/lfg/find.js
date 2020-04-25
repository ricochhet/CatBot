const Command = require('../../utils/baseCommand.js');
const db = require('../../utils/libraries/utils/client');

class Find extends Command {
  constructor(prefix) {
    super(
      'find',
      'find',
      'Show a menu listing all of the current active user sessions',
      { args: false }
    );
  }

  Chunk(arr, len) {
    const chunks = [];

    let i = 0;
    while (i < arr.length) {
      chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
  }

  async run(client, message, args) {
    const self = this;

    db.get(
      'http:localhost:8080/api/database/573958899582107653/lfg/posts?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
    ).then(async function(data) {
      const lfg = JSON.parse(data);
      //const lfg = require('../../utils/databases/lfg/lfg.json');

      if (Object.keys(lfg).length == 0) {
        return message.reply(
          'Sorry meowster but there are no sessions posted right now!'
        );
      }

      const posts = [];

      for (const sessionID in lfg) {
        const post = {};
        post[sessionID] = lfg[sessionID];
        posts.push(post);
      }

      const tChunks = self.Chunk(posts, 5);
      const embeds = [];
      let tEmbed;

      for (const outer of tChunks) {
        tEmbed = self.MessageEmbed();

        tEmbed
          .setTitle('Session List')
          .setDescription('Find other players to hunt with!');

        for (const inner of outer) {
          const sessionID = Object.keys(inner)[0];
          let desc;
          if (!inner[sessionID]['description']) {
            desc = 'No description provided.';
          }

          desc = inner[sessionID]['description'];

          tEmbed.addField(
            '\u200B',
            '```\n' +
              `🔖 Session ID: ${sessionID}\n` +
              `🕹️ Platform: ${inner[sessionID]['platform']}\n` +
              `📝 Description: ${desc}\n` +
              '```'
          );

          tEmbed.setColor('#8fde5d');
        }

        embeds.push(tEmbed);
      }

      const reactions = {
        first: '⏪',
        back: '◀',
        next: '▶',
        last: '⏩',
        stop: '⏹'
      };
      self.menu(message, embeds, 120000, reactions);
    });
  }
}

module.exports = Find;
