const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(args[0] == "lowrank") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Low Rank Armor", "Alloy Armor Set\nAnja Armor Set\nBaan Armor Set\nBarroth Armor Set\nBlossom Armor Set\nBone Armor Set\nButterfly Armor Set\nChainmail Armor Set\nDeath Stench Armor Set\nDiablos Armor Set\nDiver Armor Set\nGala Suit Armor Set\nGajau Armor Set\nGirros Armor Set\nGuardian Armor Set\nHigh Metal Armor Set\nHarvest Armor Set\nHornetaur Armor Set\nHunter's Armor Set\nIngot Armor Set\nJagras Armor Set\nJyura Armor Set\nKadachi Armor Set\nKestodon Armor Set\nKing Beetle Armor Set\nKirin Armor Set\nKulu Armor Set\nLeather Armor Set\nLegiana Armor Set\nLumu Armor Set\nOdogaron Armor Set\nOrigin Armor Set\nPukei Armor Set\nRathalos Armor Set\nRathian Armor Set\nRyu's Armor Set\nShamos Armor Set\nTzitzi Armor Set\nVespoid Armor Set")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "hralpha1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha High Rank Armor 1", "Alloy Alpha Armor Set\nAnja Alpha Armor Set\nAzure Starlord Alpha Armor Set\nBaan Alpha Armor Set\nBarnos Alpha Armor Set\nBarroth Alpha Armor Set\nBazel Alpha Armor Set\nBlossom Alpha Armor Set\nBone Alpha Armor Set\nButterfly Alpha Armor Set\nBrigade Alpha Armor Set\nChainmail Alpha Armor Set\nCommision Alpha Armor Set\nDamascus Alpha Armor Set\nDante Alpha Armor Set\nDeath Stench Alpha Armor Set\nDeviljho Alpha Armor Set\nDiablos Alpha Armor Set\nDiablos Nero Alpha Armor Set\nDiver Alpa Armor Set\nDrachen Alpha Armor Set\nDragonking Alpha Armor Set\nDodogama Alpha Armor Set\nDober Alpha Armor Set\nFaux Felyne Alpha Armor Set\nGala Suit Alpha Armor Set\nGajau Alpha Armor Set\nGastadon Alpha Armor Set\nGirros Alpha Armor Set\nGuild Cross Alpha Armor Set\nHigh metal Alpha Armor Set\nHarvest Armor Set Alpha\nHornetaur Alpha Armor Set\nHunter's Alpha Armor Set\nIngot Alpha Armor Set\nJagras Alpha Armor Set\nJyura Alpha Armor Set\nKadachi Alpha Armor Set")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "hralpha2"){
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha High Rank Armor 2", "Kestodon Alpha Armor Set\nKing Beetle Alpha Armor Set\nKirin Alpha Armor Set\nKulu Alpha Armor Set\nKulu Ya Ku Head Alpha\nKulve Taroth Alpha Armor Set\nKushala Alpha Armor Set\nLavasioth Alpha Armor Set\nLeather Alpha Armor Set\nLegiana Alpha Armor Set\nLunastra Alpha Armor Set\nLumu Alpha Armor Set\nMosswine Alpha Armor Set\nNergigante Alpha Armor Set\nOdogaron Alpha Armor Set\nOrion Armor Alpha Set\nPukei Alpha Armor Set\nRath Heart Alpha Armor Set\nRath soul Alpha Armor Set\nRathalos Alpha Armor Set\nRathian Alpha Armor Set\nRyu's Alpha Armor Set\nSakura's Alpha Armor Set\nShamos Alpha Armor Set\nStrategist Alpha Armor Set\nTeostra Alpha Armor Set\nTzitzi Alpha Armor Set\nUragaan Alpha Armor Set\nVaal Hazak Alpha Armor Set\nVespoid Alpha Armor Set\nXeno'jiiva Alpha Armor Set\nZorah Alpha Armor Set")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "hrbeta1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta High Rank Armor 1", "Alloy Beta Armor Set\nAnja Beta Armor Set\nBaan Beta Armor Set\nBarnos Beta Armor Set\nBarroth Beta Armor Set\nBazel Beta Armor Set\nBone Beta Armor Set\nButterfly Beta Armor Set\nBrigade Beta Armor Set\nChainmail Beta Armor Set\nCommission Beta Armor Set\nDamascus Beta Armor Set\nDeath Stench Beta Armor Set\nDeviljho Beta Armor Set\nDiablos Beta Armor Set\nDiablos Nero Beta Armor Set\nDodogama Beta Armor Set\nDober Beta Armor Set\nGajau Beta Armor Set\nGastodon Beta Armor Set\nGirros Beta Armor Set\nGuild Cross Beta Armor Set\nHigh Metal Beta Armor Set\nHornetaur Beta Armor Set\nHunter's Beta Armor Set\nIngot Beta Armor Set\nJagras Beta Armor Set\nJyura Beta Armor Set\nKadachi Beta Armor Set\nKestodon Beta Armor Set\nKing Beetle Beta Armor Set\nKirin Beta Armor Set\nKulu Beta Armor Set\nKulve Taroth Beta Armor Set\nKushala Beta Armor Set\nLavasioth Beta Armor Set\nLeather Beta Armor Set\nLegiana Beta Armor Set\nLunastra Beta Armor Set\nLumu Beta Armor Set")
    .setTimestamp()
    .setFooter('List Menu');
    
    message.channel.send(listEmbed);
  } else if(args[0] == "hrbeta2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta High Rank Armor 2", "Nergigante Beta Armor Set\nOdogaron Beta Armor Set\nPukei Beta Armor Set\nRath Heart Beta Armor Set\nRath Soul Beta Armor Set\nRathalos Beta Armor Set\nRathian Beta Armor Set\nShamos Beta Armor Set\nTeostra Beta Armor Set\nTzitzi Beta Armor Set\nUragaan Beta Armor Set\nVaal Hazak Beta Armor Set\nVespoid Beta Armor Set\nXeno'jiiva Beta Armor Set\nZorah Beta Armor Set\nNergigante Gamma Armor Set\nKirin Gamma Armor Set\nTeostra Gamma Armor Set\nLunastra Gamma Armor Set\nXeno'jiiva Gamma Armor Set\nZorah Gamma Armor Set\nKushala Gamma Armor Set\nVaal Hazak Gamma Armor Set\nKulve Taroth Gamma Armor Set")
    .setTimestamp()
    .setFooter('List Menu');
    
    message.channel.send(listEmbed);
  } else if(args[0] == "mralpha1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha Master Rank Armor 1", "Alloy Alpha+\nAnja Alpha+\nBaan Alpha+\nBanbaro Alpha+\nBarroth Alpha+\nBeo Alpha+\nBone Alpha+\nDodogama Alpha+\nGirros Alpha+\nHigh Metal Alpha+\nHornetaur Alpha+\nJagras Alpha+\nJyura Alpha+\nKadachi Alpha+\nViper Kadachi Alpha+\nKulu Alpha+\nLumu Alpha+\nLumu Phamtasm Alpha+\nPukei Alpha+\nCoral Pukei Alpha+\nRath Heart Alpha+\nRathian Alpha+\nTzitzi Alpha+\nVespoid Alpha+\nKestodon Alpha+\nGajau Alpha+\nShamos Alpha+\nGastodon+\nBarnos Alpha+\nWulg Alpha+\nCortos Alpha+\nArtian Alpha+\nClockwork Alpha+\nIngot Alpha+\nBarioth Alpha+\nNargacuga Alpha+\nGlavenus Alpha+\nBlack Belt Alpha+\nBrachydios Alpha+\nDiablos Alpha+\nOdogaron Alpha+\nUragaan Alpha+\nRath Soul Alpha+\nTigrex Alpha+\nRathalos Alpha+\nLegiana Alpha+\nShrieking Legia Alpha+\nAcidic Glavenus Alpha+\nDamascus Alpha+\nDeath Garon Alpha+\nBlackveil Hazak Alpha+\nDiablos Nero Alpha+\nDober Alpha+\nFulgur Anja Alpha+\nKirin Alpha+\nKushala Alpha+\nLavasioth Alpha+") 
    .setTimestamp()
    .setFooter('List Menu');
  
    message.channel.send(listEmbed);
  } else if(args[0] == "mralpha2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha Master Rank Armor 2", " Namielle Alpha+\nSavage Jho Alpha+\nSeething Bazel Alpha+\nShara Ishvalda Alpha+\nTeostra Alpha+\nVelkhana Alpha+\nZorah Alpha+\nPearlspring Alpha+\nLunastra Alpha+\nYian Garuga Alpha+\nZinogre Alpha+\nRuiner Nergi Alpha+\nGolden Lune Alpha+\nSilver Sol Alpha+\nGuild Palace Alpha+") 
    .setTimestamp()
    .setFooter('List Menu');
  
    message.channel.send(listEmbed);
  } else if(args[0] == "mrbeta1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta Master Rank Armor 1", "Alloy Beta+\nAnja Beta+\nBaan Beta+\nBanbaro Beta+\nBarroth Beta+\nBeo Beta+\nBone Beta+\nDodogama Beta+\nGirros Beta+\nHigh Metal Beta+\nHornetaur Beta+\nJagras Beta+\nJyura Beta+\nKadachi Beta+\nViper Kadachi Beta+\nKulu Beta+\nLumu Beta+\nLumu Phamtasm Beta+\nPukei Beta+\nCoral Pukei Beta+\nRath Heart Beta+\nRathian Beta+\nTzitzi Beta+\nVespoid Beta+\nKestodon Beta+\nGajau Beta+\nShamos Beta+\nGastodon Beta+\nBarnos Beta+\nWulg Beta+\nCortos Beta+\nArtian Beta+\nClockwork Beta+\nIngot Beta+\nBarioth Beta+\nNargacuga Beta+\nGlavenus Beta+\nBlack Belt Beta+\nBrachydios Beta+\nDiablos Beta+\nOdogaron Beta+\nUragaan Beta+\nRath Soul Beta+\nTigrex Beta+\nRathalos Beta+\nLegiana Beta+\nShrieking Legia Beta+\nAcidic Glavenus Beta+\nDamascus Beta+\nDeath Garon Beta+\nBlackveil Hazak Beta+\nDiablos Nero Beta+\nDober Beta+\nFulgur Anja Beta+\nKirin Beta+\nKushala Beta+\nLavasioth Beta+\nNamielle Betan+\nSavage Jho Beta+\nSeething Bazel Beta+")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "mrbeta2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta Master Rank Armor 2", "Shara Ishvalda Beta+\nTeostra Beta+\nVelkhana Beta+\nZorah Beta+\nLunastra Beta+\nYian Garuga Beta+\nZinogre Beta+\nRuiner Nergi Beta+\nGolden LUne Beta+\nSilver Sol Beta+\nGuild Palace Beta+")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Usage: ', "```+mhwarmor pagename```", true)
    .addField('Pages: ', "lowrank, hralpha1, hralpha2, hrbeta1, hrbeta2, mralpha1, mralpha2, mrbeta1, mrbeta2")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  }
};