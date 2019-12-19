const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'cancel',
  args: false,
  usage : 'cancel',
  description : 'Cancels your current session advertisement',
  error(message) {
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .setTimestamp();
  },
  run(client, message, args) {
    const lfg = require('../databases/lfg/lfg.json');
    
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
      return message.reply('Sorry meowster but you have no sessions posted right now!');
    }
    
    delete lfg[sessionId];
    const jsonObj = JSON.stringify(lfg,null,4)
    fs.writeFile(`${__dirname.replace('lfg', 'databases')}/lfg/lfg.json`, jsonObj, 'utf8', function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to file.');
        return console.log(err);
      }
    });
    message.reply(`Meowster, your previous session advertisement was cancelled! \`${sessionId}\``);
  },
};