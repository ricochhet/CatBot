const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(message.author.id == process.env.OWNER) {
    const channel = args.shift().slice(2,-1);
    const sayMessage = args.join(` `);

    //message.delete().catch(O_o=>{});
    if(sayMessage == null || sayMessage == "") return;
    client.channels.get(channel).send(sayMessage);
  }
};