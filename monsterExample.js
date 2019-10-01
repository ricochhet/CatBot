if(input == "name") {
  const monsterEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .setTitle("name")
  .setURL('https://monsterhunterworld.wiki.fextralife.com/WhateverGoesHere')
  .setDescription("Blah Blah")
  .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/iconname') /* Use the biggest icon */
  .addField('Elements', 'Blah', true)
  .addField('Ailments', 'Blah', true)
  .addField('Locations', 'Blah')
  .setTimestamp()
  .setFooter('Info Menu');

  message.channel.send(monsterEmbed);
} else if(input == "name1") {
  const monsterEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .setTitle("name 1")
  .setURL('https://monsterhunterworld.wiki.fextralife.com/WhateverGoesHere')
  .setDescription("Blah Blah")
  .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/iconname') /* Use the biggest icon */
  .addField('Elements', 'Blah', true)
  .addField('Ailments', 'Blah', true)
  .addField('Locations', 'Blah')
  .setTimestamp()
  .setFooter('Info Menu');

  message.channel.send(monsterEmbed);
}
