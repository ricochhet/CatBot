const Discord = require('discord.js');

module.exports = {
  name: 'elementalcalc',
  args: true,
  calc: true,
  usage: '+elementalcalc <damage> <sharpness> <monsterpartmultiplier>',
  description: 'Elemental calculator',  
  run (client, message, args) {
    var elemSharpRed = 0.25;
    var elemSharpOrange = 0.50;
    var elemSharpYellow = 0.75;
    var elemSharpGreen = 1.00;
    var elemSharpBlue = 1.0625;
    var elemSharpWhite = 1.125;
    var elemSharpPurple = 1.20;
  
    if(!args[0] == null || !args[0] == "" && !args[1] == null || !args[1] == "" && !args[2] == null || !args[2] == "") {
      var sharpMultiplier = 0;
  
      if(args[1] == "elemred") {
        sharpMultiplier = (args[0] / 10) * elemSharpRed;
      } else if(args[1] == "elemorange") {
        sharpMultiplier = (args[0] / 10) * elemSharpOrange;
      } else if(args[1] == "elemyellow") {
        sharpMultiplier = (args[0] / 10) * elemSharpYellow;
      } else if(args[1] == "elemgreen") {
        sharpMultiplier = (args[0] / 10) * elemSharpGreen;
      } else if(args[1] == "elemblue") {
        sharpMultiplier = (args[0] / 10) * elemSharpBlue;
      } else if(args[1] == "elemwhite") {
        sharpMultiplier = (args[0] / 10) * elemSharpWhite;
      } else if(args[1] == "elempurple") {
        sharpMultiplier = (args[0] / 10) * elemSharpPurple;
      } else if(args[1] == "none") {
        sharpMultiplier = (args[0] / 10);
      }
  
      var monsterPartMultiplier = sharpMultiplier * args[2];
      let rounded = Math.round(monsterPartMultiplier);
  
      if(Number.isNaN(rounded)) {
        message.channel.send("Sorry meowster, I can't calculate that!");
      } else {
        message.channel.send("Your elemental damage is " + "**" + rounded + "**" + " meowster!");
      }
    } else {
      message.channel.send("Sorry meowster, I can't calculate that! Use +calchelp if you are unsure of something!");
    }
  }
}