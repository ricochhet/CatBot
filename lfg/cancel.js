const Command = require('../utils/baseCommand.js');
const fs = require('fs');

class Cancel extends Command {
  constructor(prefix) {
    super('cancel', 'cancel', 'Cancel your current active session', {
      args: false
    });
  }

  run(client, message, args) {
    const lfg = require('../utils/databases/lfg/lfg.json');

    const userId = message.author.id;

    // Checks if the user has already posted or not
    let userFound = false;
    let sessionId;
    for (const group in lfg) {
      if (lfg[group]['userID'] == userId) {
        userFound = true;
        sessionId = group;
        break;
      }
    }

    if (!userFound) {
      return message.reply(
        'Sorry meowster but you have no sessions posted right now!'
      );
    }

    delete lfg[sessionId];
    const jsonObj = JSON.stringify(lfg, null, 4);
    fs.writeFile(`./utils/databases/lfg/lfg.json`, jsonObj, 'utf8', function(
      err
    ) {
      if (err) {
        console.log('An error occured while writing JSON Object to file.');
        return console.log(err);
      }
    });
    message.reply(
      `Meowster, your previous session advertisement was cancelled! \`${sessionId}\``
    );
  }
}

module.exports = Cancel;
