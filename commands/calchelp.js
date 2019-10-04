const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const helpEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Affinity Calculator: ', "+affinitycalc <affinity> <damage>")
  .addField('Raw Calculator: ', "+rawcalc <damage> <weapontype> <sharpness> <monsterpartmultiplier>")
  .addField('Elemental Calculator: ', "+elementalcalc <damage> <sharpness> <monsterpartmultiplier>")
  .addField('Raw Sharpness: ', "rawred\nraworange\nrawyellow\nrawgreen\nrawblue\nrawwhite\nrawpurple\nnone (use if ranged weapon)", true)
  .addField('Elemental Sharpness: ', "elemred\nelemorange\nelemyellow\nelemgreen\nelemblue\nelemwhite\nelempurple\nnone (use if ranged weapon)", true)
  .addField('Info: ', "**Use lowercase letters only**\nThese calculators simply go based off of *your* input, if something you put in doesn't make sense, the answer won't make sense.")
  .addBlankField()
  .addField('Calculations Off? ', "```Contact Ricochet#7498 | Do +invite```")
  .setTimestamp()
  .setFooter('Help Menu', client.user.avatarURL);

  message.channel.send(helpEmbed);
};