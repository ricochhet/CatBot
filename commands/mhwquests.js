const Discord = require('discord.js');

module.exports = {
  name: 'mhwquests',
  args: true,
  usage: 'mhwquests <assigned | optional | special | arena | ibassigned | iboptional>',
  description: 'List quests',
  run (client, message, args) {
    let input = args.join('').toLowerCase();
    const listEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');

    switch (input) {
      case 'assigned':
        listEmbed
          .addField('Assigned Quests 1⭐', "Jagras of the Ancient Forest")
          .addField('Assigned Quests 2⭐', "A Kestadon Kerfuffle\nThe Great Jagras Hunt\nBird-Brained Bandit")
          .addField('Assigned Quests 3⭐', "Urgent: Pukei-Pukei Hunt\nThe Best Kind of Quest\nSinister Shadows in the Swamp\nFlying Sparks: Tobi-Kadachi")
          .addField('Assigned Quests 4⭐', "The Encroaching Anjanath\nOne for the History Books\nBallooning Problems\nRadobaan Roadblock")
          .addField('Assigned Quests 5⭐', "Legiana: Embodiment of Elegance\nInto the Bowels of the Vale\nA Fiery Throne Atop the Forest\nHorned Tyrant Below the Sands")
          .addField('Assigned Quests 6⭐', "A Colossal Task\nInvader in the Waste\nTickled Pink")
          .addField('Assigned Quests 7⭐', "Old World Monster in the New World")
          .addField('Assigned Quests 8⭐', "A Wound and a Thirst\nKushala Daora, Dragon of Steel\nTeostra the Infernal\nHellish Fiend Vaal Hazak")
          .addField('Assigned Quests 9⭐', "Land of Convergence\nBeyond the Blasting Scales\nThunderous Rumble in the Highlands");
        break;
      case 'optional':
        listEmbed
          .addField('Optional Quests 1⭐', "Butting Heads with Nature\nFungal Flexin' in the Ancient Forest\nA Thicket of Thugs")
          .addField('Optional Quests 2⭐', "The Great Glutton\nCamp Crasher\nSnatch the Snatcher\nThe Pain from Gains\nExterminator of the Waste")
          .addField('Optional Quests 3⭐', "Scatternut Shortage\nThe Current Situation\nMired in the Spire\nThe Piscine Problem\nGettin' Yolked in the Waste\nLanding the Landslide Wyvern\nSpecial Arena: Pukei-Pukei\nSpecial Arena: Barroth\nSpecial Arena: Tobi-Kadachi")
          .addField('Optional Quests 4⭐', "One Helluva Sinus Infection\nGettin' Yolked in the Forest\nRoyal Relocation\nIt's a Crying Shamos\nA Tzitzi for Science\nSorry You're Not Invited\nWhat a Bunch of Abalone\nWhite Monster for a White Coat\nPersistent Pests\nA Rotten Thing To Do\nA Bone to Pick\nOn Nightmare's Wings\nTroubled Troupers\nSpecial Arena: Anjanath\nSpecial Arena: Rathian\nSpecial Arena: Paolumu\nSpecial Arena: Radobaan")
          .addField('Optional Quests 5⭐', "When Desire Becomes Obsession\nRedefining the 'Power Couple'\nTwin Spires Upon the Sands\nA Humid Headache\nGone in a Flash\nScratching the Itch\nMan's Best Fiend\nThe Meat of the Matter\nSpecial Arena: Legiana\nSpecial Arena: Odogaron\nSpecial Arena: Rathalos\nSpecial Arena: Diablos")
          .addField('Optional Quests 6⭐', "Left Quite the Impression\nHard to Swallow\nGoogly-eyed Green Monster\nA Hair-Raising Experience\nIt Can't See You If You Don't Move\nThe Sleeping Sylvan Queen\nStuck in Their Ways\nKeep Your Hands to Yourself!\nA Crown of Mud and Anger\nPukei-Pukei Ambush\nUp to Your Waist in the Waste\nBrown Desert, Green Queen\nTrespassing Troublemaker\nSay Cheese!\nLoop the Paolumu\nA Tingling Taste\nStuck in a Rut\nChef Quest! Pumped to Deliver\nChef Quest! A Rotten Request\nA Meow for Help\nA Scalding Scoop\nDodogama Drama\nChef Quest! Gajalaka Lockdown\nSpecial Arena: HR Pukei-Pukei\nSpecial Arena: HR Barroth\nSpecial Arena: HR Tobi-Kadachi\nSpecial Arena: HR Anjanath\nSpecial Arena: HR Rathian\nSpecial Arena: HR Paolumu\nSpecial Arena: HR Radobaan")
          .addField('Optional Quests 7⭐', "Rathalos Rematch\nRathalos in Blue\nThe Red and Blue Crew\nPretty in Pink\nWell, That Diablos!\nTwo-horned Hostility\nRRRRRumble in the Waste!\nA Cherry Wind upon the Reefs\nLegiana: Highlands Royalty\nA Sore Site\nTalons of Ire and Ice\nOdogaron Unleashed\nLavasioth, Monster of Magma\nOre-eating Occupier\nRuler of the Azure Skys\nBazelgeuse in the Field of Fire\nA Fiery Convergence\nSpecial Arena: HR Pink Rathian\nSpecial Arena: HR Legiana\nSpecial Arena: HR Odogaron\nSpecial Arena: HR Uragaan\nSpecial Arena: HR Rathalos\nSpecial Arena: HR Azure Rathalos\nSpecial Arena: HR Diablos\nSpecial Arena: HR Black Diablos\nToday's Special: Hunter Flambe")
          .addField('Optional Quests 8⭐', "A Portent of Disaster\nA Blaze on the Sand\nLightning Strikes Twice\nStirring from the Grave\nThe Eater of Elders\nHellfire's Stronghold\nThe Winds of Wrath Bite Deep")
          .addField('Optional Quests 9⭐', "A Visitor from Eorzea\nA Light Upon the River's Gloom\nThe White Winds of the New World\nNew World Sky, New World Flower\nShowdown: the Muck and the Maul\nA Summons from Below\nThe Sapphire Star's Guidance");
        break;
      case 'special':
        listEmbed
          .addField('Special Assignment Quests 6⭐', "A Vistor from Another World")
          .addField('Special Assignment Quests 7⭐', "he Food Chain Dominator")
          .addField('Special Assignment Quests 8⭐', "The Blazing Sun\nPandora's Arena\nNo Remorse, No Surrender\n")
          .addField('Special Assignment Quests 9⭐', "The Legendary Beast\nHe Taketh It With His Eyes");
        break;
      case 'arena':
        listEmbed
          .addField('Arena Quests 1⭐', "Arena Quest 01")
          .addField('Arena Quests 2⭐', "Arena Quest 02")
          .addField('Arena Quests 4⭐', "Arena Quest 03")
          .addField('Arena Quests 6⭐', "Arena Quest 04\nArena Quest 05\nArena Quest 06")
          .addField('Arena Quests 7⭐', "Arena Quest 07")
          .addField('Arena Quests 8⭐', "Arena Quest 08\nArena Quest 09");    
        break;
      case 'ibassigned':
        listEmbed
          .addField('Assigned Quests 1⭐', "Baptism by Ice\nBanbaro Blockade")
          .addField('Assigned Quests 2⭐', "Ready to Strike\nNo Time for Naps\nPlay Both Ends")
          .addField('Assigned Quests 3⭐', "Blizzard Blitz\nEver-Present Shadow\nThe Scorching Blade\nAbsolute Power\nA Smashing Cross Counter\nA Tale of Ice and Fire")
          .addField('Assigned Quests 4⭐', "When the Mist Taketh You\nThe Thunderous Troublemaker!\nThe Disintegrating Blade\nBad Friends, Great Enemies\nThe Defense of Seliana")
          .addField('Assigned Quests 5⭐', "The Iceborne Wyvern\nThe Second Coming\nUnder the Veil of Death\nA Light From the Abyss")
          .addField('Assigned Quests 6⭐', "To The Guided, A Paean\nPaean of Guidance")
          .addField('Assigned Quests 6⭐ (Post-Credits)', "Return of the Crazy One\nSleep Now in the Fire");     
        break;
      case 'iboptional':
        listEmbed
          .addField('Optional Quests 1⭐', "Jyura In My Way\nThe Great Jagras Returns!\nGreetings from the Tundra\nCall of the Wind\nTaking Charge\nDeep Snow Diver\nCan't Bring Yourself To It\nGrinding my Girros\nAll the Wrong Signals\nDragged Through the Mud\nTaster's Tour\nWildspire Treasure Hunt\nTrapping The Tree Trasher\nBeating Around the Bush\nNew World Problems\nLiterary Thief\nIce Catch!\nSpecial Arena: MR Banbaro\nSpecial Arena: MR Pukei-Pukei\nSpecial Arena: MR Barroth\nThis Here's Big Horn Country!")
          .addField('Optional Quests 2⭐', "Protip: Stay Hydrated\nA Face Nightmares Are Made Of\nBoaboa Constrictor\nAnalysis Creates Paralysis\nLooking For That Glimmer\nBugger Off Bugs!\nNo Laughing Matter\nThe Plight of Paolumu\nA Queen At Heart\nStick Your Nose Somewhere Else\nFool's Mate\nAnjanath Antics\nPoison and Paralysis Pinch\nBy Our Powers Combined\nPink Power Grab\nFeisty Girl Talk\nNighty Night Nightshade\nYou Scratch Our Backs...\nPut That Red Cup Away\nSpecial Arena: MR Nightshade Paolumu\nSpecial Arena: MR Viper Tobi-Kadachi\nSpecial Arena: MR Coral Pukei-Pukei\nSpecial Arena: MR Radobaan\nSpecial Arena: MR Rathian\nSpecial Arena: MR Pink Rathian\nSpecial Arena: MR Paolumu")
          .addField('Optional Quests 3⭐', "Nargacuga, Should, Woulda\nRemember That One Time?\nBegone Uragaan\nEveryone's a Critic\nThe Black Wind\nLegiana Left Behind\nA Line in the Sand\nThe Purr-fect Room: Stone\nThe Purr-fect Room: Stone\nRed and Black Aces\nRunnin', Rollin', and Weepin'\nFestival of Explosions!\nSwoop to a New Low\nThe Secret to a Good Slice\nSecret of the Ooze\nBlast Warning In Effect!\nA Roar that Shook the Vale\nDon't be a Jerk with the Jerky\nSimmer and Slice!\nA Flash of the Blade\nSpecial Arena: MR Nargacuga\nSpecial Arena: MR Barioth\nSpecial Arena: MR Glavenus\nSpecial Arena: MR Legiana\nSpecial Arena: MR Odogaron\nSpecial Arena: MR Rathalos\nSpecial Arena: MR Tigrex\nSpecial Arena: MR Brachydios\nSpecial Arena: MR Diablos")
          .addField('Optional Quests 4⭐', "These Azure Eyes See All\nMisfortune in the Forest\nBlue Rathalos Blues\nPiercing Black\nNoblefrost Hunter\nTundra Troublemaker\nTrap the Thunder Jaw\nThis Corroded Blade\nA Shadowy Offender\nIn the Heat of the Moment\nTreasure in the Steam\nDuet of Rime\nThe Purr-fect Room: Light Iron\nThe Purr-fect Room: Dark Iron\nSpecial Arena: MR Azure Rathalos\nSpecial Arena: MR Black Diablos\nSpecial Arena: MR Fulgur Anjanath\nSpecial Arena: MR Acidic Glavenus\nSpecial Arena: MR Ebony Odogaron")
          .addField('Optional Quests 5⭐', "The Harbinger of Clear Skies\nRoyal Audience on the Sand\nClashing Swords Upon The Rime\nHere Comes the Deathmaker\nMemories of the Sea Gold\nSeething with Anger\nThe Purr-fect Room: Silver")
          .addField('Optional Quests 6⭐', "Special Arena: MR Zinogre\nSpecial Arena: MR Yian Garuga");    
        break;
      default:
        break;
    }

    listEmbed.setTimestamp().setFooter('Quest Menu');

    message.channel.send(listEmbed);
  }
}