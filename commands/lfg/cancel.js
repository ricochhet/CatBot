const Command = require('../../utils/baseCommand.js');
const db = require('../../utils/libraries/utils/client');

class Cancel extends Command {
  constructor(prefix) {
    super('cancel', 'cancel', 'Cancel your current active session', {
      args: false
    });
  }

  async run(client, message, args) {
    db.get(
      'http:localhost:8080/api/database/573958899582107653/lfg/posts?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
    ).then(async function(data) {
      const posts = JSON.parse(data);
      //const posts = require('../../utils/databases/lfg/lfg.json');

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
      //const jsonObj = JSON.stringify(posts, null, 4);

      db.request(
        { message: posts },
        {
          hostname: 'localhost',
          port: 8080,
          path:
            '/api/database/573958899582107653/lfg/posts?key=5e97fa61-c93d-46dd-9f71-826a5caf0984',
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
