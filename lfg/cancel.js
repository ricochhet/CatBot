const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'cancel',
  args: false,
  usage : 'cancel',
  description : 'Cancels your current advertisement',
  error (message) {
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run (client, message, args) {
    let lfg = require("../databases/lfg.json")

    const userID = message.author.id

    // Checks if the user has already posted or not
    let userfound = false;
    let sessionID;
    for (group in lfg) {
      if (userfound) break
      if (lfg[group]['userID'] == userID) {
        userfound = true;
        sessionID = group
      }
    }

    if (!userfound) return message.reply("Sorry Meowster but their are no current ad's by you right now")

    delete lfg[sessionID]

    var jsonObj = JSON.stringify(lfg,null,4)
    fs.writeFile(`${__dirname.replace("lfg","databases")}/lfg.json`, jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });



    message.reply(`Meowster we cancled your prevoius advertisement \`${sessionID}\``)
  }
}
