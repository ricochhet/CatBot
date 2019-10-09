const Discord = require('discord.js');

module.exports = {
  name: 'mhwlist',
  args: true,
  usage: 'mhwlist <monsters | ibmonsters | endemic>',
  description: 'List monsters and endemic life',
  run (client, message, args) {
    const listEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');

    switch (args[0]) {
      case 'monsters':
        listEmbed.addField('Large Monsters (World): ', "Anjanath\nBarroth\nBazelgeuse\nBehemoth\nDeviljho\nDiablos\nBlack Diablos\nDodogama\nGreat Girros\nGreat Jagras\nJyuratodus\nKirin\nKulu-Ya-Ku\nKulve Taroth\nKushala Daora\nLavasioth\nLegiana\nLunastra\nNergigante\nOdogaron\nPaolumu\nPukei-Pukei\nRadobaan\nRathalos\nAzure Rathalos\nRathian\nPink Rathian\nTeostra\nTobi-Kadachi\nTzitzi-Ya-Ku\nUragaan\nVaal Hazak\nXeno'Jiiva\nZorah Magdaros\nAncient Leshen\nLeshen", true);
        break;
      case 'ibmonsters':
        listEmbed.addField('Large Monsters (Iceborne): ' , "Banbaro\nBeotodus\nNargacuga\nVelkhana\nTigrex\nShrieking Legiana\nBarioth\nGlavenus\nBrachydios\nFulgur Anjanath\nEbony Odogaron\nAcidic Glavenus\nViper Tobi-Kadachi\nCoral Pukei-Pukei\nNightshade Paolumu\nNamielle\nYian Garuga\nShara Ishvalda\nSavage Deviljho\nBlackveil Vaal Hazak\nSeething Bazelgeuse\nScarred Yian Garuga\nGold Rathian\nSilver Rathalos\nBrute Tigrex\nZinogre", true);
        break;
      case 'endemic':
        listEmbed.addField('Rare Endemic Life (World): ', "Moonlight-Gecko\nPilot-Hare\nDapper-Coralbird\nWiggler-Queen\nForest-Pteryx\nEmerald-Helmcrab\nAugurfly\nPhantom-Flutterfly\nPrism-Hercudrome\nGold-Hercudrome\nDowny-Crake\nBristly-Crake\nGiant Vigorwasp\nPetricanth\nPlatinumfish\nKing-Marlin\nGold-Calappa", true);
        break;
      default:
        break;
    }

    listEmbed.setTimestamp().setFooter('List Menu');

    message.channel.send(listEmbed);
  }
}

/*
exports.run = (client, message, args) => {
  if(args[0] == "monsters") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Large Monsters (World): ', "Anjanath\nBarroth\nBazelgeuse\nBehemoth\nDeviljho\nDiablos\nBlack-Diablos\nDodogama\nGreat-Girros\nGreat-Jagras\nJyuratodus\nKirin\nKulu-Ya-Ku\nKulve-Taroth\nKushala-Daora\nLavasioth\nLegiana\nLunastra\nNergigante\nOdogaron\nPaolumu\nPukei-Pukei\nRadobaan\nRathalos\nAzure-Rathalos\nRathian\nPink-Rathian\nTeostra\nTobi-Kadachi\nTzitzi-Ya-Ku\nUragaan\nVaal Hazak\nXeno'Jiiva\nZorah-Magdaros\nAncient-Leshen\nLeshen", true)
    .addField('Usage', "```+mhwinfo monstername```")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "ibmonsters") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Large Monsters (Iceborne): ' , "Banbaro\nBeotodus\nNargacuga\nVelkhana\nTigrex\nShrieking-Legiana\nBarioth\nGlavenus\nBrachydios\nFulgur-Anjanath\nEbony-Odogaron\nAcidic-Glavenus\nViper-Tobi-Kadachi\nCoral-Pukei-Pukei\nNightshade-Paolumu\nNamielle\nYian-Garuga\nShara-Ishvalda\nSavage-Deviljho\nBlackveil-Vaal-Hazak\nSeething-Bazelgeuse\nScarred-Yian-Garuga\nGold-Rathian\nSilver-Rathalos\nBrute-Tigrex\nZinogre", true)
    .addField('Usage', "```+mhwinfo monstername```")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "endemic") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Rare Endemic Life (World): ', "Moonlight-Gecko\nPilot-Hare\nDapper-Coralbird\nWiggler-Queen\nForest-Pteryx\nEmerald-Helmcrab\nAugurfly\nPhantom-Flutterfly\nPrism-Hercudrome\nGold-Hercudrome\nDowny-Crake\nBristly-Crake\nGiant Vigorwasp\nPetricanth\nPlatinumfish\nKing-Marlin\nGold-Calappa", true)
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
};*/