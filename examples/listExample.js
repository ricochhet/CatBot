if(command === "gamenamelistnamelist") {
  const listEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d') /* Color must stay as is unless it's a special case */
  .addField('List Name: ', "Item1\n Item1\n Item3", true)
  .addField('Usage', "```+commandname optionalargs```")
  .setTimestamp()
  .setFooter('MenuName Menu');

  message.channel.send(listEmbed);
}
