const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const helpEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Monster Hunter World', "mhwinfo [monstername] - Get monster and endemic life info\n mhwitem [itemname]- Get item info\n mhwquests [pagename]- List quests\n mhwlist [pagename] - Lists monsters and endemic life\n mhwarmor [pagename] - Lists all armors\n mhwcharmlist [pagenumber] - List all charms\n icebornechecklist - Checklist for Iceborne")
  .addField("Monster Hunter Math", "calchelp - Get help for attack calculations\n +affinitycalc [affinity] [damage]\n +rawcalc [damage] [weapontype] [sharpness] [monsterpartmultiplier]\n +elementalcalc [damage] [sharpness] [monsterpartmultiplier]")
  .addField('Other', "help - List all commands\n support - Recieve support server invite\n about - Shows extra information\n catfact - Shows a fact about cats")
  .addBlankField()
  .addField('Experiencing Issues? ', "```Contact Ricochet#7498 | Do +invite```")
  .setTimestamp()
  .setFooter('Help Menu', client.user.avatarURL);

  message.channel.send(helpEmbed);
};