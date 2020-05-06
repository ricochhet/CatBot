const Command = require('../../utils/command.js');
const db = require('../../utils/libraries/client');

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
    db.get(
      `${client.server_conf.server_url}database/${client.server_conf.server_clientid}/lfg/posts?key=${client.server_conf.server_key}`
    ).then(async data => {
      if (!data) {
        console.log(
          `Failed to request data @ ${client.server_conf.server_url}database/${client.server_conf.server_clientid}/lfg/posts?key=${client.server_conf.server_key}`
        );
        return message.channel.send(this.serverErrorEmbed());
      }

      const lfg = JSON.parse(data);

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

      const tChunks = this.Chunk(posts, 5);
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
    });
  }
}

module.exports = Find;
