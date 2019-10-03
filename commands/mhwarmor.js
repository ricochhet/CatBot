const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(args[0] == "lowrank") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Low Rank Armor", "Alloy Armor Set\n Anja Armor Set\n Baan Armor Set\n Barroth Armor Set\n Blossom Armor Set\n Bone Armor Set\n Butterfly Armor Set\n Chainmail Armor Set\n Death Stench Armor Set\n Diablos Armor Set\n Diver Armor Set\n Gala Suit Armor Set\n Gajau Armor Set\n Girros Armor Set\n Guardian Armor Set\n High Metal Armor Set\n Harvest Armor Set\n Hornetaur Armor Set\n Hunter's Armor Set\n Ingot Armor Set\n Jagras Armor Set\n Jyura Armor Set\n Kadachi Armor Set\n Kestodon Armor Set\n King Beetle Armor Set\n Kirin Armor Set\n Kulu Armor Set\n Leather Armor Set\n Legiana Armor Set\n Lumu Armor Set\n Odogaron Armor Set\n Origin Armor Set\n Pukei Armor Set\n Rathalos Armor Set\n Rathian Armor Set\n Ryu's Armor Set\n Shamos Armor Set\n Tzitzi Armor Set\n Vespoid Armor Set")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "hralpha1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha High Rank Armor 1", "Alloy Alpha Armor Set\n Anja Alpha Armor Set\n Azure Starlord Alpha Armor Set\n Baan Alpha Armor Set\n Barnos Alpha Armor Set\n Barroth Alpha Armor Set\n Bazel Alpha Armor Set\n Blossom Alpha Armor Set\n Bone Alpha Armor Set\n Butterfly Alpha Armor Set\n Brigade Alpha Armor Set\n Chainmail Alpha Armor Set\n Commision Alpha Armor Set\n Damascus Alpha Armor Set\n Dante Alpha Armor Set\n Death Stench Alpha Armor Set\n Deviljho Alpha Armor Set\n Diablos Alpha Armor Set\n Diablos Nero Alpha Armor Set\n Diver Alpa Armor Set\n Drachen Alpha Armor Set\n Dragonking Alpha Armor Set\n Dodogama Alpha Armor Set\n Dober Alpha Armor Set\n Faux Felyne Alpha Armor Set\n Gala Suit Alpha Armor Set\n Gajau Alpha Armor Set\n Gastadon Alpha Armor Set\n Girros Alpha Armor Set\n Guild Cross Alpha Armor Set\n High metal Alpha Armor Set\n Harvest Armor Set Alpha\n Hornetaur Alpha Armor Set\n Hunter's Alpha Armor Set\n Ingot Alpha Armor Set\n Jagras Alpha Armor Set\n Jyura Alpha Armor Set\n Kadachi Alpha Armor Set")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "hralpha2"){
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha High Rank Armor 2", "Kestodon Alpha Armor Set\n King Beetle Alpha Armor Set\n Kirin Alpha Armor Set\n Kulu Alpha Armor Set\n Kulu Ya Ku Head Alpha\n Kulve Taroth Alpha Armor Set\n Kushala Alpha Armor Set\n Lavasioth Alpha Armor Set\n Leather Alpha Armor Set\n Legiana Alpha Armor Set\n Lunastra Alpha Armor Set\n Lumu Alpha Armor Set\n Mosswine Alpha Armor Set\n Nergigante Alpha Armor Set\n Odogaron Alpha Armor Set\n Orion Armor Alpha Set\n Pukei Alpha Armor Set\n Rath Heart Alpha Armor Set\n Rath soul Alpha Armor Set\n Rathalos Alpha Armor Set\n Rathian Alpha Armor Set\n Ryu's Alpha Armor Set\n Sakura's Alpha Armor Set\n Shamos Alpha Armor Set\n Strategist Alpha Armor Set\n Teostra Alpha Armor Set\n Tzitzi Alpha Armor Set\n Uragaan Alpha Armor Set\n Vaal Hazak Alpha Armor Set\n Vespoid Alpha Armor Set\n Xeno'jiiva Alpha Armor Set\n Zorah Alpha Armor Set")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "hrbeta1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta High Rank Armor 1", "Alloy Beta Armor Set\n Anja Beta Armor Set\n Baan Beta Armor Set\n Barnos Beta Armor Set\n Barroth Beta Armor Set\n Bazel Beta Armor Set\n Bone Beta Armor Set\n Butterfly Beta Armor Set\n Brigade Beta Armor Set\n Chainmail Beta Armor Set\n Commission Beta Armor Set\n Damascus Beta Armor Set\n Death Stench Beta Armor Set\n Deviljho Beta Armor Set\n Diablos Beta Armor Set\n Diablos Nero Beta Armor Set\n Dodogama Beta Armor Set\n Dober Beta Armor Set\n Gajau Beta Armor Set\n Gastodon Beta Armor Set\n Girros Beta Armor Set\n Guild Cross Beta Armor Set\n High Metal Beta Armor Set\n Hornetaur Beta Armor Set\n Hunter's Beta Armor Set\n Ingot Beta Armor Set\n Jagras Beta Armor Set\n Jyura Beta Armor Set\n Kadachi Beta Armor Set\n Kestodon Beta Armor Set\n King Beetle Beta Armor Set\n Kirin Beta Armor Set\n Kulu Beta Armor Set\n Kulve Taroth Beta Armor Set\n Kushala Beta Armor Set\n Lavasioth Beta Armor Set\n Leather Beta Armor Set\n Legiana Beta Armor Set\n Lunastra Beta Armor Set\n Lumu Beta Armor Set")
    .setTimestamp()
    .setFooter('List Menu');
    
    message.channel.send(listEmbed);
  } else if(args[0] == "hrbeta2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta High Rank Armor 2", "Nergigante Beta Armor Set\n Odogaron Beta Armor Set\n Pukei Beta Armor Set\n Rath Heart Beta Armor Set\n Rath Soul Beta Armor Set\n Rathalos Beta Armor Set\n Rathian Beta Armor Set\n Shamos Beta Armor Set\n Teostra Beta Armor Set\n Tzitzi Beta Armor Set\n Uragaan Beta Armor Set\n Vaal Hazak Beta Armor Set\n Vespoid Beta Armor Set\n Xeno'jiiva Beta Armor Set\n Zorah Beta Armor Set\n Nergigante Gamma Armor Set\n Kirin Gamma Armor Set\n Teostra Gamma Armor Set\n Lunastra Gamma Armor Set\n Xeno'jiiva Gamma Armor Set\n Zorah Gamma Armor Set\n Kushala Gamma Armor Set\n Vaal Hazak Gamma Armor Set\n Kulve Taroth Gamma Armor Set")
    .setTimestamp()
    .setFooter('List Menu');
    
    message.channel.send(listEmbed);
  } else if(args[0] == "mralpha1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha Master Rank Armor 1", "Alloy Alpha+\n Anja Alpha+\n Baan Alpha+\n Banbaro Alpha+\n Barroth Alpha+\n Beo Alpha+\n Bone Alpha+\n Dodogama Alpha+\n Girros Alpha+\n High Metal Alpha+\n Hornetaur Alpha+\n Jagras Alpha+\n Jyura Alpha+\n Kadachi Alpha+\n Viper Kadachi Alpha+\n Kulu Alpha+\n Lumu Alpha+\n Lumu Phamtasm Alpha+\n Pukei Alpha+\n Coral Pukei Alpha+\n Rath Heart Alpha+\n Rathian Alpha+\n Tzitzi Alpha+\n Vespoid Alpha+\n Kestodon Alpha+\n Gajau Alpha+\n Shamos Alpha+\n Gastodon+\n Barnos Alpha+\n Wulg Alpha+\n Cortos Alpha+\n Artian Alpha+\n Clockwork Alpha+\n Ingot Alpha+\n Barioth Alpha+\n Nargacuga Alpha+\n Glavenus Alpha+\n Black Belt Alpha+\n Brachydios Alpha+\n Diablos Alpha+\n Odogaron Alpha+\n Uragaan Alpha+\n Rath Soul Alpha+\n Tigrex Alpha+\n Rathalos Alpha+\n Legiana Alpha+\n Shrieking Legia Alpha+\n Acidic Glavenus Alpha+\n Damascus Alpha+\n Death Garon Alpha+\n Blackveil Hazak Alpha+\n Diablos Nero Alpha+\n Dober Alpha+\n Fulgur Anja Alpha+\n Kirin Alpha+\n Kushala Alpha+\n Lavasioth Alpha+") 
    .setTimestamp()
    .setFooter('List Menu');
  
    message.channel.send(listEmbed);
  } else if(args[0] == "mralpha2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Alpha Master Rank Armor 2", " Namielle Alpha+\n Savage Jho Alpha+\n Seething Bazel Alpha+\n Shara Ishvalda Alpha+\n Teostra Alpha+\n Velkhana Alpha+\n Zorah Alpha+\n Pearlspring Alpha+\n Lunastra Alpha+\n Yian Garuga Alpha+\n Zinogre Alpha+\n Ruiner Nergi Alpha+\n Golden Lune Alpha+\n Silver Sol Alpha+\n Guild Palace Alpha+") 
    .setTimestamp()
    .setFooter('List Menu');
  
    message.channel.send(listEmbed);
  } else if(args[0] == "mrbeta1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta Master Rank Armor 1", "Alloy Beta+\n Anja Beta+\n Baan Beta+\n Banbaro Beta+\n Barroth Beta+\n Beo Beta+\n Bone Beta+\n Dodogama Beta+\n Girros Beta+\n High Metal Beta+\n Hornetaur Beta+\n Jagras Beta+\n Jyura Beta+\n Kadachi Beta+\n Viper Kadachi Beta+\n Kulu Beta+\n Lumu Beta+\n Lumu Phamtasm Beta+\n Pukei Beta+\n Coral Pukei Beta+\n Rath Heart Beta+\n Rathian Beta+\n Tzitzi Beta+\n Vespoid Beta+\n Kestodon Beta+\n Gajau Beta+\n Shamos Beta+\n Gastodon Beta+\n Barnos Beta+\n Wulg Beta+\n Cortos Beta+\n Artian Beta+\n Clockwork Beta+\n Ingot Beta+\n Barioth Beta+\n Nargacuga Beta+\n Glavenus Beta+\n Black Belt Beta+\n Brachydios Beta+\n Diablos Beta+\n Odogaron Beta+\n Uragaan Beta+\n Rath Soul Beta+\n Tigrex Beta+\n Rathalos Beta+\n Legiana Beta+\n Shrieking Legia Beta+\n Acidic Glavenus Beta+\n Damascus Beta+\n Death Garon Beta+\n Blackveil Hazak Beta+\n Diablos Nero Beta+\n Dober Beta+\n Fulgur Anja Beta+\n Kirin Beta+\n Kushala Beta+\n Lavasioth Beta+\n Namielle Betan+\n Savage Jho Beta+\n Seething Bazel Beta+")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "mrbeta2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField("Beta Master Rank Armor 2", "Shara Ishvalda Beta+\n Teostra Beta+\n Velkhana Beta+\n Zorah Beta+\n Lunastra Beta+\n Yian Garuga Beta+\n Zinogre Beta+\n Ruiner Nergi Beta+\n Golden LUne Beta+\n Silver Sol Beta+\n Guild Palace Beta+")
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