const Discord = require('discord.js');


module.exports = {
  name: 'affinitycalc',
  args: true,
  calc: true,
  usage: 'affinitycalc <affinity> <damage>',
  description: 'Affinity calculator',
  run (client, message, args) {
    if(!args[0] == null || !args[0] == "" && !args[1] == null || !args[1] == "" ) {
      var addToAffinity = (0.25 * (args[0] / 100)) + 1;
      var addDamage = addToAffinity * args[1];
      let rounded = addDamage.toString().split(".")[0];
  
      if(Number.isNaN(rounded)) {
        message.channel.send("Sorry meowster, I can't calculate that!");
      } else {
        message.channel.send("Your damange + affinity is " + "**" + rounded + "**" + " meowster!");
      }
    } else {
      message.channel.send("Sorry meowster, I can't calculate that!");
    }
  }
} 