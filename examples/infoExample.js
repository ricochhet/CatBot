if(input == "itemname") {
  const monsterEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .setTitle("ItemName Title")
  .setURL('Fextralife Wiki Link')
  .setDescription("What Kind of Object")
  .addField('Description', 'Description', true)
  .addField('Locations', 'Where can it be found?')
  .setTimestamp()
  .setFooter('Info Menu');

  message.channel.send(monsterEmbed);
} else if(input == "itemname2") {
  const monsterEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .setTitle("ItemName Title 2")
  .setURL('Fextralife Wiki Link')
  .setDescription("What Kind of Object")
  .addField('Description', 'Description', true)
  .addField('Locations', 'Where can it be found?')
  .setTimestamp()
  .setFooter('Info Menu');

  message.channel.send(monsterEmbed);
} else {
  message.channel.send("That item doesn't seem to exist!");
}

// continue with else if's like "itemname2"
// Ancient Forest: Sector 1 and 8\n Wildspire Waste: Sector 1 - Example Layout of Locations - All Locations is All Locations

// Add/remove fields as needed
