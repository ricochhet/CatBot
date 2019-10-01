if(command === "commandname") {
  if(args[0] == "1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Page 1: ', "Items\n Items1\n Items2", true)
    .setTimestamp()
    .setFooter('ItemMenuName Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Page 2: ', "Items\n Items1\n Items2", true)
    .setTimestamp()
    .setFooter('ItemMenuName Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "3") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Page 3: ', "Items\n Items1\n Items2", true)
    .setTimestamp()
    .setFooter('ItemMenuName Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "4") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Page 4: ', "Items\n Items1\n Items2", true)
    .setTimestamp()
    .setFooter('ItemMenuName Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "5") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Page 5: ', "Items\n Items1\n Items2", true)
    .setTimestamp()
    .setFooter('ItemMenuName Menu');

    message.channel.send(listEmbed);
  } else {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Usage: ', "```+commandname pagenumber```", true)
    .addField('Pages: ', "1-5")
    .setTimestamp()
    .setFooter('ItemMenuName Menu');

    message.channel.send(listEmbed);
  }
}

// Add more pages as neccessary 
