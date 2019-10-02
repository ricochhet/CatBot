const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(args[0] == "1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 1: ', "Poison Charm 1\n Poison Charm 2\n Poison Charm 3\n Attack Charm 1\n Attack Charm 2\n Attack Charm 3\n Defense Charm 1\n Defense Charm 2\n Defense Charm 3\n Paralysis Charm 1\n Paralysis Charm 2\n Paralysis Charm 3\n Sleep Charm 1\n Sleep Charm 2\n Sleep Charm 3\n Stun Charm 1\n Stun Charm 2\n Stun Charm 3\n Windproof Charm 1\n Windproof Charm 2\n Windproof Charm 3\n Health Charm 1\n Health Charm 2\n Health Charm 3\n Recovery Charm 1\n Recovery Charm 2\n Recovery Charm 3\n Fire Charm 1\n Fire Charm 2\n Fire Charm 3\n Water Charm 1\n Water Charm 2\n Water Charm 3\n Thunder Charm 1\n Thunder Charm 2\n Thunder Charm 3\n Blaze Charm 1\n Blaze Charm 2\n Blaze Charm 3\n Flood Charm 1\n Flood Charm 2\n Flood Charm 3\n Shock Charm 1\n Shock Charm 2\n Shock Charm 3\n Venom Charm 1\n Venom Charm 2\n Venom Charm 3\n Immobilize Charm 1\n Immobilize Charm 2\n Immobilize 3\n Tranq Charm 1\n Tranq Charm 2\n Tranq Charm 3\n KO Charm 1\n KO Charm 2\n KO Charm 3\n Enervate Charm 1\n Enervate Charm 2", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 2: ', "Enervate Charm 3\n Artillery Charm 1\n Artillery Charm 2\n Artillery Charm 3\n Hungerless Charm 1\n Hungerless Charm 2\n Hungerless Charm 3\n Ironside Charm 1\n Ironside Charm 2\n Ironside Charm 3\n Friendship Charm 1\n Friendship Charm 2\n Friendship Charm 3\n Extension Charm 1\n Extension Charm 2\n Extension Charm 3\n Glutton's Charm 1\n Glutton's Charm 2\n Glutton's Charm 3\n Blessing Charm 1\n Blessing Charm 2\n Blessing Charm 3\n Rally Charm 1\n Rally Charm 2\n Rally Charm 3\n Botany Charm 1\n Botany Charm 2\n Botany Charm 3\n Geology Charm 1\n Geology Charm 2\n Geology Charm 3\n Slinger Charm 1\n Slinger Charm 2\n Slinger Charm 3\n Stealth Charm 1\n Stealth Charm 2\n Stealth Charm 3\n Smoke Charm 1\n Smoke Charm 2\n Smoke Charm 3\n Mirewalker Charm 1\n Mirewalker Charm 2\n Mirewalker Charm 3\n Insect Charm 1\n Insect Charm 2\n Insect Charm 3\n Intimidator Charm 1\n Intimidator Charm 2\n Intimidator Charm 3\n Heavy Artillery Charm 1\n Heavy Artillery Charm 2\n Light Eater's Charm", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "3") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 3: ', "Tracker Charm\n Fortification Charm\n Performer's Charm\n Bleed Charm 1\n Bleed Charm 2\n Bleed Charm 3\n Speed Heal Charm 1\n Speed Heal Charm 2\n Speed Heal Charm 3\n Ice Charm 1\n Ice Charm 2\n Ice Charm 3\n Blight Charm 1\n Blight Charm 2\n Blight Charm 3\n Frost Charm 1\n Frost Charm 2\n Frost Charm 3\n Master's Charm 1\n Master's Charm 2\n Master's Charm 3\n Evasion Charm 1\n Evasion Charm 2\n Evasion Charm 3\n Sheath Charm 1\n Seath Charm 2\n Sheath Charm 3\n Whetstone Charm 1\n Whetstone Charm 2\n Whetstone Charm 3\n Blast Charm 1\n Blast Charm 2\n Blast Charm 3\n Dragon Charm 1\n Dragon Charm 2\n Dragon Charm 3\n Wyrmsbane Charm 1\n Wyrmsbane Charm 2\n Wyrmsbane Charm 3\n Demolition Charm 1\n Demolition Charm 2\n Demolition Charm 3\n Draw Charm 1\n Draw Charm 2\n Draw Charm 3\n Trickshot Charm 1\n Trickshot Charm 2\n Marathon Charm 1\n Marathon Charm 2\n Fitness Charm 1\n Fitness Charm 2\n Fitness Charm 3\n Surge Charm 1\n Surge Charm 2\n Leaping Charm 1\n Leaping Charm 2", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "4") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 4: ', "Bombardier Charm 1\n Bombardier Charm 2\n Bombardier Charm 3\n Mushroom Charm 1\n Mushroom Charm 2\n Awakening Charm 1\n Awakening Charm 2\n Handicraft Charm 1\n Handicraft Charm 2\n Handicraft Charm 3\n Mud Puppy Charm\n Trickshot Charm\n Hunter's Life Charm\n Procurer's Charm\n Gatherer's Charm\n Guard Charm 1\n Guard Charm 2\n Gaurd Charm 3\n Earplugs Charm 1\n Earplugs Charm 2\n Earplugs Charm 3\n Tremor Charm 1\n Tremor Charm 2\n Exploiter Charm 1\n Exploiter Charm 2\n Focus Charm 1\n Focus Charm 2\n Breaker Charm 1\n Breaker Charm 2\n Fury Charm 1\n Fury Charm 2\n Grit Charm 1\n Grit Charm 2\n Maintainance Charm 1\n Maintainance Charm 2\n Maintainance Charm 3\n Power Charm 1\n Challenger Charm 1\n Challenger Charm 2\n Unscathed Charm 1\n Unscatched Charm 2\n Mighty Charm 1\n Mighty Charm 2\n Impact Charm 1\n Impact Charm 2\n Miasma Charm 1\n Miasma Charm 2\n Miasma Charm 3\n Normal Shots Charm\n Clearmind Charm\n Rider's Charm\n Surveyor's Charm\n Critical Charm 1", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "5") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 5: ', "Invigorate Charm 1\n Invigorate Charm 2\n Penetration Charm\n Dispersal Charm\n Poison Coating Charm\n Para Coating Charm\n Sleep Coating Charm\n Blast Coating Charm\n Geomacy Charm\n Gale Charm\n Wyrmslayer Charm\n Bulwark Charm\n Fair Wind Charm", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Usage: ', "```+mhwcharmlist pagenumber```", true)
    .addField('Pages: ', "1-5")
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  }
};