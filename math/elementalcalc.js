const Discord = require('discord.js');

module.exports = {
  name: 'elementalcalc',
  args: true,
  calc: true,
  usage: 'elementalcalc <damage> <sharpness> <monsterpartmultiplier>',
  description: 'Elemental calculator',  
  run (client, message, args) {

    const data = [];
    data.push('damage: base damage value');
    data.push('sharpness (elemental): none, red, orange, yellow, green, blue, white, purple');
    data.push('monsterpartmultiplier: multiplier value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();
  
    if(!args[0] == null || !args[0] == "" && !args[1] == null || !args[1] == "" && !args[2] == null || !args[2] == "") {
      var sharpMultiplier = 0;
  
      var elemSharpRed = 0.25;
      var elemSharpOrange = 0.50;
      var elemSharpYellow = 0.75;
      var elemSharpGreen = 1.00;
      var elemSharpBlue = 1.0625;
      var elemSharpWhite = 1.125;
      var elemSharpPurple = 1.20;

      if(args[1] == "red") {
        sharpMultiplier = (args[0] / 10) * elemSharpRed;
      } else if(args[1] == "orange") {
        sharpMultiplier = (args[0] / 10) * elemSharpOrange;
      } else if(args[1] == "yellow") {
        sharpMultiplier = (args[0] / 10) * elemSharpYellow;
      } else if(args[1] == "green") {
        sharpMultiplier = (args[0] / 10) * elemSharpGreen;
      } else if(args[1] == "blue") {
        sharpMultiplier = (args[0] / 10) * elemSharpBlue;
      } else if(args[1] == "white") {
        sharpMultiplier = (args[0] / 10) * elemSharpWhite;
      } else if(args[1] == "purple") {
        sharpMultiplier = (args[0] / 10) * elemSharpPurple;
      } else if(args[1] == "none") {
        sharpMultiplier = (args[0] / 10);
      } else {
        return message.channel.send(usageEmbed);
      }
  
      var monsterPartMultiplier = sharpMultiplier * args[2];
      let rounded = Math.round(monsterPartMultiplier);
  
      if(Number.isNaN(rounded)) {
        // message.channel.send("Sorry meowster, I can't calculate that!");
        message.channel.send(usageEmbed);
      } else {
        message.channel.send("Your elemental damage is " + "**" + rounded + "**" + " meowster!");
      }
    } else {
      // message.channel.send("Sorry meowster, I can't calculate that! Use +calchelp if you are unsure of something!");
      message.channel.send(usageEmbed);
    }
  }
}