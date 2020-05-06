const Command = require('../../utils/command.js');
const db = require('../../utils/libraries/client');

class Cancel extends Command {
  constructor(prefix) {
    super('cancel', 'cancel', 'Cancel your current active session', {
      args: false
    });
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

      const posts = JSON.parse(data);
      const userId = message.author.id;
      console.log(posts);

      // Checks if the user has already posted or not
      let userFound = false;
      let sessionId;
      for (const postId in posts) {
        if (posts[postId]['userID'] == userId) {
          userFound = true;
          sessionId = postId;
          break;
        }
      }

      if (!userFound) {
        return message.reply(
          'Sorry meowster but you have no sessions posted right now!'
        );
      }

      delete posts[sessionId];

      db.request(
        { message: posts },
        {
          hostname: client.server_conf.server_hostname,
          port: client.server_conf.server_port,
          path: `${client.server_conf.server_apipath}database/${client.server_conf.server_clientid}/lfg/posts?key=${client.server_conf.server_key}`,
          method: 'POST'
        }
      );
      message.reply(
        `Meowster, your previous session advertisement was cancelled! \`${sessionId}\``
      );
    });
  }
}

module.exports = Cancel;
