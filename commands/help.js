const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const helpEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Monster Hunter World', "mhwinfo [monstername] - Get monster and endemic life info\nmhwitem [itemname]- Get item info\nmhwquests [pagename]- List quests\nmhwlist [pagename] - Lists monsters and endemic life\nmhwarmor [pagename] - Lists all armors\nmhwcharmlist [pagenumber] - List all charms\nicebornechecklist - Checklist for Iceborne")
  .addField("Monster Hunter Math", "calchelp - Get help for attack calculations\n+affinitycalc [affinity] [damage]\n+rawcalc [damage] [weapontype] [sharpness] [monsterpartmultiplier]\n+elementalcalc [damage] [sharpness] [monsterpartmultiplier]")
  .addField('Other', "help - List all commands\nsupport - Recieve support server invite\nabout - Shows extra information\ncatfact - Shows a fact about cats")
  .addBlankField()
  .addField('Experiencing Issues? ', "```Contact Ricochet#7498 | Do +invite```")
  .setTimestamp()
  .setFooter('Help Menu', client.user.avatarURL);

  message.channel.send(helpEmbed);
};