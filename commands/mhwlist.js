const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(args[0] == "monsters") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Large Monsters (World): ', "Anjanath\n Barroth\n Bazelgeuse\n Behemoth\n Deviljho\n Diablos\n Black-Diablos\n Dodogama\n Great-Girros\n Great-Jagras\n Jyuratodus\n Kirin\n Kulu-Ya-Ku\n Kulve-Taroth\n Kushala-Daora\n Lavasioth\n Legiana\n Lunastra\n Nergigante\n Odogaron\n Paolumu\n Pukei-Pukei\n Radobaan\n Rathalos\n Azure-Rathalos\n Rathian\n Pink-Rathian\n Teostra\n Tobi-Kadachi\n Tzitzi-Ya-Ku\n Uragaan\n Vaal Hazak\n Xeno'Jiiva\n Zorah-Magdaros\n Ancient-Leshen\n Leshen", true)
    .addField('Usage', "```+mhwinfo monstername```")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "ibmonsters") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Large Monsters (Iceborne): ' , "Banbaro\n Beotodus\n Nargacuga\n Velkhana\n Tigrex\n Shrieking-Legiana\n Barioth\n Glavenus\n Brachydios\n Fulgur-Anjanath\n Ebony-Odogaron\n Acidic-Glavenus\n Viper-Tobi-Kadachi\n Coral-Pukei-Pukei\n Nightshade-Paolumu\n Namielle\n Yian-Garuga\n Shara-Ishvalda\n Savage-Deviljho\n Blackveil-Vaal-Hazak\n Seething-Bazelgeuse\n Scarred-Yian-Garuga\n Gold-Rathian\n Silver-Rathalos\n Brute-Tigrex\n Zinogre", true)
    .addField('Usage', "```+mhwinfo monstername```")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "endemic") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Rare Endemic Life (World): ', "Moonlight-Gecko\n Pilot-Hare\n Dapper-Coralbird\n Wiggler-Queen\n Forest-Pteryx\n Emerald-Helmcrab\n Augurfly\n Phantom-Flutterfly\n Prism-Hercudrome\n Gold-Hercudrome\n Downy-Crake\n Bristly-Crake\n Giant Vigorwasp\n Petricanth\n Platinumfish\n King-Marlin\n Gold-Calappa", true)
    .addField('Usage', "```+mhwinfo monstername```")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Usage: ', "```+mhwlist pagename```", true)
    .addField('Pages: ', "monsters, ibmonsters, endemic")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  }
};