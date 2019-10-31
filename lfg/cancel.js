const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'cancel',
  args: false,
  usage : 'cancel',
  description : 'Cancels your current lfg post',
  error(message) {
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    const lfg = require('../databases/lfg.json');

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
      return message.reply('Sorry meowster but you haven\'t posted anything yet!');
    }

    // Delete session, rewrite file
    delete lfg[sessionId];
    const jsonObj = JSON.stringify(lfg, null, 4);
    fs.writeFile(`${__dirname.replace('lfg', 'databases')}/lfg.json`, jsonObj, 'utf8', function(err) {
        if (err) {
            console.log('An error occured while writing JSON Object to file.');
            return console.log(err);
        }
    });

    message.reply(`Meowster we canceled your previous lfg post: \`${sessionId}\``);
  },
};
