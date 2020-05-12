const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

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
    client.apiClient
      .getLfgPosts()
      .then(lfgPosts => {
        if (Object.keys(lfgPosts).length == 0) {
          return message.reply(
            'Sorry meowster but there are no sessions posted right now!'
          );
        }

        const postsArray = [];

        for (const sessionID in lfgPosts) {
          const post = {};
          post[sessionID] = lfgPosts[sessionID];
          postsArray.push(post);
        }

        const tChunks = this.Chunk(postsArray, 5);
        const embeds = [];
        let tEmbed;

        for (const outer of tChunks) {
          tEmbed = this.MessageEmbed();

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
        this.menu(message, embeds, 120000, reactions);
      })
      .catch(err => {
        logger.error(err);
        message.channel.send(this.serverErrorEmbed());
      });
  }
}

module.exports = Find;
