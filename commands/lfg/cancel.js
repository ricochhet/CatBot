const Command = require('../../utils/baseCommand.js');

class Cancel extends Command {
  constructor(prefix) {
    super('cancel', 'cancel', 'Cancel your current active session', {
      args: false
    });
  }

  run(client, message, args) {
    const posts = require('../../utils/databases/lfg/lfg.json');

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
    const jsonObj = JSON.stringify(posts, null, 4);
    this.saveJsonFile(`./utils/databases/lfg/lfg.json`, jsonObj);
    message.reply(
      `Meowster, your previous session advertisement was cancelled! \`${sessionId}\``
    );
  }
}

module.exports = Cancel;
