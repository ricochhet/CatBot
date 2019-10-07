const Discord = require('discord.js');

module.exports = {
  name: 'mhwcharms',
  args: true,
  usage: 'mhwcharms <pagenumber> (1-5)',
  description: 'List all charms',
  run (client, message, args) {

    const listEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');
    
    switch (args[0]) {
      case '1':
        listEmbed.addField('Charms 1: ', "Poison Charm 1\nPoison Charm 2\nPoison Charm 3\nAttack Charm 1\nAttack Charm 2\nAttack Charm 3\nDefense Charm 1\nDefense Charm 2\nDefense Charm 3\nParalysis Charm 1\nParalysis Charm 2\nParalysis Charm 3\nSleep Charm 1\nSleep Charm 2\nSleep Charm 3\nStun Charm 1\nStun Charm 2\nStun Charm 3\nWindproof Charm 1\nWindproof Charm 2\nWindproof Charm 3\nHealth Charm 1\nHealth Charm 2\nHealth Charm 3\nRecovery Charm 1\nRecovery Charm 2\nRecovery Charm 3\nFire Charm 1\nFire Charm 2\nFire Charm 3\nWater Charm 1\nWater Charm 2\nWater Charm 3\nThunder Charm 1\nThunder Charm 2\nThunder Charm 3\nBlaze Charm 1\nBlaze Charm 2\nBlaze Charm 3\nFlood Charm 1\nFlood Charm 2\nFlood Charm 3\nShock Charm 1\nShock Charm 2\nShock Charm 3\nVenom Charm 1\nVenom Charm 2\nVenom Charm 3\nImmobilize Charm 1\nImmobilize Charm 2\nImmobilize 3\nTranq Charm 1\nTranq Charm 2\nTranq Charm 3\nKO Charm 1\nKO Charm 2\nKO Charm 3\nEnervate Charm 1\nEnervate Charm 2", true);
        break;
      case '2':
        listEmbed.addField('Charms 2: ', "Enervate Charm 3\nArtillery Charm 1\nArtillery Charm 2\nArtillery Charm 3\nHungerless Charm 1\nHungerless Charm 2\nHungerless Charm 3\nIronside Charm 1\nIronside Charm 2\nIronside Charm 3\nFriendship Charm 1\nFriendship Charm 2\nFriendship Charm 3\nExtension Charm 1\nExtension Charm 2\nExtension Charm 3\nGlutton's Charm 1\nGlutton's Charm 2\nGlutton's Charm 3\nBlessing Charm 1\nBlessing Charm 2\nBlessing Charm 3\nRally Charm 1\nRally Charm 2\nRally Charm 3\nBotany Charm 1\nBotany Charm 2\nBotany Charm 3\nGeology Charm 1\nGeology Charm 2\nGeology Charm 3\nSlinger Charm 1\nSlinger Charm 2\nSlinger Charm 3\nStealth Charm 1\nStealth Charm 2\nStealth Charm 3\nSmoke Charm 1\nSmoke Charm 2\nSmoke Charm 3\nMirewalker Charm 1\nMirewalker Charm 2\nMirewalker Charm 3\nInsect Charm 1\nInsect Charm 2\nInsect Charm 3\nIntimidator Charm 1\nIntimidator Charm 2\nIntimidator Charm 3\nHeavy Artillery Charm 1\nHeavy Artillery Charm 2\nLight Eater's Charm", true);
        break;
      case '3':
        listEmbed.addField('Charms 3: ', "Tracker Charm\nFortification Charm\nPerformer's Charm\nBleed Charm 1\nBleed Charm 2\nBleed Charm 3\nSpeed Heal Charm 1\nSpeed Heal Charm 2\nSpeed Heal Charm 3\nIce Charm 1\nIce Charm 2\nIce Charm 3\nBlight Charm 1\nBlight Charm 2\nBlight Charm 3\nFrost Charm 1\nFrost Charm 2\nFrost Charm 3\nMaster's Charm 1\nMaster's Charm 2\nMaster's Charm 3\nEvasion Charm 1\nEvasion Charm 2\nEvasion Charm 3\nSheath Charm 1\nSeath Charm 2\nSheath Charm 3\nWhetstone Charm 1\nWhetstone Charm 2\nWhetstone Charm 3\nBlast Charm 1\nBlast Charm 2\nBlast Charm 3\nDragon Charm 1\nDragon Charm 2\nDragon Charm 3\nWyrmsbane Charm 1\nWyrmsbane Charm 2\nWyrmsbane Charm 3\nDemolition Charm 1\nDemolition Charm 2\nDemolition Charm 3\nDraw Charm 1\nDraw Charm 2\nDraw Charm 3\nTrickshot Charm 1\nTrickshot Charm 2\nMarathon Charm 1\nMarathon Charm 2\nFitness Charm 1\nFitness Charm 2\nFitness Charm 3\nSurge Charm 1\nSurge Charm 2\nLeaping Charm 1\nLeaping Charm 2", true);
        break;
      case '4':
        listEmbed.addField('Charms 4: ', "Bombardier Charm 1\nBombardier Charm 2\nBombardier Charm 3\nMushroom Charm 1\nMushroom Charm 2\nAwakening Charm 1\nAwakening Charm 2\nHandicraft Charm 1\nHandicraft Charm 2\nHandicraft Charm 3\nMud Puppy Charm\nTrickshot Charm\nHunter's Life Charm\nProcurer's Charm\nGatherer's Charm\nGuard Charm 1\nGuard Charm 2\nGaurd Charm 3\nEarplugs Charm 1\nEarplugs Charm 2\nEarplugs Charm 3\nTremor Charm 1\nTremor Charm 2\nExploiter Charm 1\nExploiter Charm 2\nFocus Charm 1\nFocus Charm 2\nBreaker Charm 1\nBreaker Charm 2\nFury Charm 1\nFury Charm 2\nGrit Charm 1\nGrit Charm 2\nMaintainance Charm 1\nMaintainance Charm 2\nMaintainance Charm 3\nPower Charm 1\nChallenger Charm 1\nChallenger Charm 2\nUnscathed Charm 1\nUnscatched Charm 2\nMighty Charm 1\nMighty Charm 2\nImpact Charm 1\nImpact Charm 2\nMiasma Charm 1\nMiasma Charm 2\nMiasma Charm 3\nNormal Shots Charm\nClearmind Charm\nRider's Charm\nSurveyor's Charm\nCritical Charm 1", true);
        break;
      case '5':
        listEmbed.addField('Charms 5: ', "Invigorate Charm 1\nInvigorate Charm 2\nPenetration Charm\nDispersal Charm\nPoison Coating Charm\nPara Coating Charm\nSleep Coating Charm\nBlast Coating Charm\nGeomacy Charm\nGale Charm\nWyrmslayer Charm\nBulwark Charm\nFair Wind Charm", true);
        break;
      default:
        listEmbed.addField('Usage', this.usage);
        break;
    }

    listEmbed.setTimestamp().setFooter('List Menu');
    message.channel.send(listEmbed);
  }
}

/*
exports.run = (client, message, args) => {
  if(args[0] == "1") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 1: ', "Poison Charm 1\nPoison Charm 2\nPoison Charm 3\nAttack Charm 1\nAttack Charm 2\nAttack Charm 3\nDefense Charm 1\nDefense Charm 2\nDefense Charm 3\nParalysis Charm 1\nParalysis Charm 2\nParalysis Charm 3\nSleep Charm 1\nSleep Charm 2\nSleep Charm 3\nStun Charm 1\nStun Charm 2\nStun Charm 3\nWindproof Charm 1\nWindproof Charm 2\nWindproof Charm 3\nHealth Charm 1\nHealth Charm 2\nHealth Charm 3\nRecovery Charm 1\nRecovery Charm 2\nRecovery Charm 3\nFire Charm 1\nFire Charm 2\nFire Charm 3\nWater Charm 1\nWater Charm 2\nWater Charm 3\nThunder Charm 1\nThunder Charm 2\nThunder Charm 3\nBlaze Charm 1\nBlaze Charm 2\nBlaze Charm 3\nFlood Charm 1\nFlood Charm 2\nFlood Charm 3\nShock Charm 1\nShock Charm 2\nShock Charm 3\nVenom Charm 1\nVenom Charm 2\nVenom Charm 3\nImmobilize Charm 1\nImmobilize Charm 2\nImmobilize 3\nTranq Charm 1\nTranq Charm 2\nTranq Charm 3\nKO Charm 1\nKO Charm 2\nKO Charm 3\nEnervate Charm 1\nEnervate Charm 2", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "2") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 2: ', "Enervate Charm 3\nArtillery Charm 1\nArtillery Charm 2\nArtillery Charm 3\nHungerless Charm 1\nHungerless Charm 2\nHungerless Charm 3\nIronside Charm 1\nIronside Charm 2\nIronside Charm 3\nFriendship Charm 1\nFriendship Charm 2\nFriendship Charm 3\nExtension Charm 1\nExtension Charm 2\nExtension Charm 3\nGlutton's Charm 1\nGlutton's Charm 2\nGlutton's Charm 3\nBlessing Charm 1\nBlessing Charm 2\nBlessing Charm 3\nRally Charm 1\nRally Charm 2\nRally Charm 3\nBotany Charm 1\nBotany Charm 2\nBotany Charm 3\nGeology Charm 1\nGeology Charm 2\nGeology Charm 3\nSlinger Charm 1\nSlinger Charm 2\nSlinger Charm 3\nStealth Charm 1\nStealth Charm 2\nStealth Charm 3\nSmoke Charm 1\nSmoke Charm 2\nSmoke Charm 3\nMirewalker Charm 1\nMirewalker Charm 2\nMirewalker Charm 3\nInsect Charm 1\nInsect Charm 2\nInsect Charm 3\nIntimidator Charm 1\nIntimidator Charm 2\nIntimidator Charm 3\nHeavy Artillery Charm 1\nHeavy Artillery Charm 2\nLight Eater's Charm", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "3") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 3: ', "Tracker Charm\nFortification Charm\nPerformer's Charm\nBleed Charm 1\nBleed Charm 2\nBleed Charm 3\nSpeed Heal Charm 1\nSpeed Heal Charm 2\nSpeed Heal Charm 3\nIce Charm 1\nIce Charm 2\nIce Charm 3\nBlight Charm 1\nBlight Charm 2\nBlight Charm 3\nFrost Charm 1\nFrost Charm 2\nFrost Charm 3\nMaster's Charm 1\nMaster's Charm 2\nMaster's Charm 3\nEvasion Charm 1\nEvasion Charm 2\nEvasion Charm 3\nSheath Charm 1\nSeath Charm 2\nSheath Charm 3\nWhetstone Charm 1\nWhetstone Charm 2\nWhetstone Charm 3\nBlast Charm 1\nBlast Charm 2\nBlast Charm 3\nDragon Charm 1\nDragon Charm 2\nDragon Charm 3\nWyrmsbane Charm 1\nWyrmsbane Charm 2\nWyrmsbane Charm 3\nDemolition Charm 1\nDemolition Charm 2\nDemolition Charm 3\nDraw Charm 1\nDraw Charm 2\nDraw Charm 3\nTrickshot Charm 1\nTrickshot Charm 2\nMarathon Charm 1\nMarathon Charm 2\nFitness Charm 1\nFitness Charm 2\nFitness Charm 3\nSurge Charm 1\nSurge Charm 2\nLeaping Charm 1\nLeaping Charm 2", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "4") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 4: ', "Bombardier Charm 1\nBombardier Charm 2\nBombardier Charm 3\nMushroom Charm 1\nMushroom Charm 2\nAwakening Charm 1\nAwakening Charm 2\nHandicraft Charm 1\nHandicraft Charm 2\nHandicraft Charm 3\nMud Puppy Charm\nTrickshot Charm\nHunter's Life Charm\nProcurer's Charm\nGatherer's Charm\nGuard Charm 1\nGuard Charm 2\nGaurd Charm 3\nEarplugs Charm 1\nEarplugs Charm 2\nEarplugs Charm 3\nTremor Charm 1\nTremor Charm 2\nExploiter Charm 1\nExploiter Charm 2\nFocus Charm 1\nFocus Charm 2\nBreaker Charm 1\nBreaker Charm 2\nFury Charm 1\nFury Charm 2\nGrit Charm 1\nGrit Charm 2\nMaintainance Charm 1\nMaintainance Charm 2\nMaintainance Charm 3\nPower Charm 1\nChallenger Charm 1\nChallenger Charm 2\nUnscathed Charm 1\nUnscatched Charm 2\nMighty Charm 1\nMighty Charm 2\nImpact Charm 1\nImpact Charm 2\nMiasma Charm 1\nMiasma Charm 2\nMiasma Charm 3\nNormal Shots Charm\nClearmind Charm\nRider's Charm\nSurveyor's Charm\nCritical Charm 1", true)
    .setTimestamp()
    .setFooter('List Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "5") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Charms 5: ', "Invigorate Charm 1\nInvigorate Charm 2\nPenetration Charm\nDispersal Charm\nPoison Coating Charm\nPara Coating Charm\nSleep Coating Charm\nBlast Coating Charm\nGeomacy Charm\nGale Charm\nWyrmslayer Charm\nBulwark Charm\nFair Wind Charm", true)
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
};*/