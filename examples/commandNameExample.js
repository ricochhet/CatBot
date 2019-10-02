if(command === "commandName") {
  const embed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .setImage("Example Embed, Don't Copy, use the other examples for correct example embeds")
  .setTimestamp()
  .setFooter('Example Menu');

  message.channel.send(embed);
}
