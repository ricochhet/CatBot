const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const helpEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Monster Hunter: World', "mhwinfo <monstername> - Get monster and endemic life info\n mhwiteminfo <itemname> - Get item info\n mhwquests <pagename> - List quests\n mhwlist <pagename> - Lists monsters and endemic life\n mhwlrarmor - List all low rank armors\n mhwcharmlist <pagenumber> - List all charms\n calchelp - Get help for attack calculations\n affinitycalc <affinity> <damage> - affinity calculator\n rawcalc <damage> <weapontype> <sharpness> <monsterpartmultiplier> - raw attack calculator\n elementalcalc <damage> <sharpness> <monsterpartmultiplier> - elemental attack calculator")
  .addField('MHW: Iceborne', "icebornechecklist - Checklist for Iceborne")
  .addField('Other: ', "help, support, about, catfact")
  .addBlankField()
  .addField('Experiencing Issues? ', "```Contact Ricochet#7498 | Do +invite```")
  .setTimestamp()
  .setFooter('Help Menu', client.user.avatarURL);

  message.channel.send(helpEmbed);
};