const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Cancel extends Command {
  constructor() {
    super('cancel', 'cancel', 'Cancel your current active session', {
      args: false
    });
  }

  async run(client, message, args) {
    client.apiClient
      .getLfgPosts()
      .then(posts => {
        const userId = message.author.id;

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

        client.apiClient.updateLfgPosts(posts);
        message.reply(
          `Meowster, your previous session advertisement was cancelled! \`${sessionId}\``
        );
      })
      .catch(err => {
        logger.error(err);
        message.channel.send(this.serverErrorEmbed());
      });
  }
}

module.exports = Cancel;
