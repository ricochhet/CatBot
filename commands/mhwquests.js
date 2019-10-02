const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(args[0] == "assigned") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Assigned Quests 1⭐', "Jagras of the Ancient Forest")
    .addField('Assigned Quests 2⭐', "A Kestadon Kerfuffle\n The Great Jagras Hunt\n Bird-Brained Bandit")
    .addField('Assigned Quests 3⭐', "Urgent: Pukei-Pukei Hunt\n The Best Kind of Quest\n Sinister Shadows in the Swamp\n Flying Sparks: Tobi-Kadachi")
    .addField('Assigned Quests 4⭐', "The Encroaching Anjanath\n One for the History Books\n Ballooning Problems\n Radobaan Roadblock")
    .addField('Assigned Quests 5⭐', "Legiana: Embodiment of Elegance\n Into the Bowels of the Vale\n A Fiery Throne Atop the Forest\n Horned Tyrant Below the Sands")
    .addField('Assigned Quests 6⭐', "A Colossal Task\n Invader in the Waste\n Tickled Pink")
    .addField('Assigned Quests 7⭐', "Old World Monster in the New World")
    .addField('Assigned Quests 8⭐', "A Wound and a Thirst\n Kushala Daora, Dragon of Steel\n Teostra the Infernal\n Hellish Fiend Vaal Hazak")
    .addField('Assigned Quests 9⭐', "Land of Convergence\n Beyond the Blasting Scales\n Thunderous Rumble in the Highlands")
    .setTimestamp()
    .setFooter('Quest Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "optional") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Optional Quests 1⭐', "Butting Heads with Nature\n Fungal Flexin' in the Ancient Forest\n A Thicket of Thugs")
    .addField('Optional Quests 2⭐', "The Great Glutton\n Camp Crasher\n Snatch the Snatcher\n The Pain from Gains\n Exterminator of the Waste")
    .addField('Optional Quests 3⭐', "Scatternut Shortage\n The Current Situation\n Mired in the Spire\n The Piscine Problem\n Gettin' Yolked in the Waste\n Landing the Landslide Wyvern\n Special Arena: Pukei-Pukei\n Special Arena: Barroth\n Special Arena: Tobi-Kadachi")
    .addField('Optional Quests 4⭐', "One Helluva Sinus Infection\n Gettin' Yolked in the Forest\n Royal Relocation\n It's a Crying Shamos\n A Tzitzi for Science\n Sorry You're Not Invited\n What a Bunch of Abalone\n White Monster for a White Coat\n Persistent Pests\n A Rotten Thing To Do\n A Bone to Pick\n On Nightmare's Wings\n Troubled Troupers\n Special Arena: Anjanath\n Special Arena: Rathian\n Special Arena: Paolumu\n Special Arena: Radobaan")
    .addField('Optional Quests 5⭐', "When Desire Becomes Obsession\n Redefining the 'Power Couple'\n Twin Spires Upon the Sands\n A Humid Headache\n Gone in a Flash\n Scratching the Itch\n Man's Best Fiend\n The Meat of the Matter\n Special Arena: Legiana\n Special Arena: Odogaron\n Special Arena: Rathalos\n Special Arena: Diablos")
    .addField('Optional Quests 6⭐', "Left Quite the Impression\n Hard to Swallow\n Googly-eyed Green Monster\n A Hair-Raising Experience\n It Can't See You If You Don't Move\n The Sleeping Sylvan Queen\n Stuck in Their Ways\n Keep Your Hands to Yourself!\n A Crown of Mud and Anger\n Pukei-Pukei Ambush\n Up to Your Waist in the Waste\n Brown Desert, Green Queen\n Trespassing Troublemaker\n Say Cheese!\n Loop the Paolumu\n A Tingling Taste\n Stuck in a Rut\n Chef Quest! Pumped to Deliver\n Chef Quest! A Rotten Request\n A Meow for Help\n A Scalding Scoop\n Dodogama Drama\n Chef Quest! Gajalaka Lockdown\n Special Arena: HR Pukei-Pukei\n Special Arena: HR Barroth\n Special Arena: HR Tobi-Kadachi\n Special Arena: HR Anjanath\n Special Arena: HR Rathian\n Special Arena: HR Paolumu\n Special Arena: HR Radobaan")
    .addField('Optional Quests 7⭐', "Rathalos Rematch\n Rathalos in Blue\n The Red and Blue Crew\n Pretty in Pink\n Well, That Diablos!\n Two-horned Hostility\n RRRRRumble in the Waste!\n A Cherry Wind upon the Reefs\n Legiana: Highlands Royalty\n A Sore Site\n Talons of Ire and Ice\n Odogaron Unleashed\n Lavasioth, Monster of Magma\n Ore-eating Occupier\n Ruler of the Azure Skys\n Bazelgeuse in the Field of Fire\n A Fiery Convergence\n Special Arena: HR Pink Rathian\n Special Arena: HR Legiana\n Special Arena: HR Odogaron\n Special Arena: HR Uragaan\n Special Arena: HR Rathalos\n Special Arena: HR Azure Rathalos\n Special Arena: HR Diablos\n Special Arena: HR Black Diablos\n Today's Special: Hunter Flambe")
    .addField('Optional Quests 8⭐', "A Portent of Disaster\n A Blaze on the Sand\n Lightning Strikes Twice\n Stirring from the Grave\n The Eater of Elders\n Hellfire's Stronghold\n The Winds of Wrath Bite Deep")
    .addField('Optional Quests 9⭐', "A Visitor from Eorzea\n A Light Upon the River's Gloom\n The White Winds of the New World\n New World Sky, New World Flower\n Showdown: the Muck and the Maul\n A Summons from Below\n The Sapphire Star's Guidance")
    .setTimestamp()
    .setFooter('Quest Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "special") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Special Assignment Quests 6⭐', "A Vistor from Another World")
    .addField('Special Assignment Quests 7⭐', "he Food Chain Dominator")
    .addField('Special Assignment Quests 8⭐', "The Blazing Sun\n Pandora's Arena\n No Remorse, No Surrender\n ")
    .addField('Special Assignment Quests 9⭐', "The Legendary Beast\n He Taketh It With His Eyes")
    .setTimestamp()
    .setFooter('Quest Menu');

    message.channel.send(listEmbed);
  } else if(args[0] == "arena") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Arena Quests 1⭐', "Arena Quest 01")
    .addField('Arena Quests 2⭐', "Arena Quest 02")
    .addField('Arena Quests 4⭐', "Arena Quest 03")
    .addField('Arena Quests 6⭐', "Arena Quest 04\n Arena Quest 05\n Arena Quest 06")
    .addField('Arena Quests 7⭐', "Arena Quest 07")
    .addField('Arena Quests 8⭐', "Arena Quest 08\n Arena Quest 09")
    .setTimestamp()
    .setFooter('Quest Menu');

    message.channel.send(listEmbed);
    
  } else if(args[0] == "ibassigned") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Assigned Quests 1⭐', "Baptism by Ice\n Banbaro Blockade")
    .addField('Assigned Quests 2⭐', "Ready to Strike\n No Time for Naps\n Play Both Ends")
    .addField('Assigned Quests 3⭐', "Blizzard Blitz\n Ever-Present Shadow\n The Scorching Blade\n Absolute Power\n A Smashing Cross Counter\n A Tale of Ice and Fire")
    .addField('Assigned Quests 4⭐', "When the Mist Taketh You\n The Thunderous Troublemaker!\n The Disintegrating Blade\n Bad Friends, Great Enemies\n The Defense of Seliana")
    .addField('Assigned Quests 5⭐', "The Iceborne Wyvern\n The Second Coming\n Under the Veil of Death\n A Light From the Abyss")
    .addField('Assigned Quests 6⭐', "To The Guided, A Paean\n Paean of Guidance")
    .addField('Assigned Quests 6⭐ (Post-Credits)', "Return of the Crazy One\n Sleep Now in the Fire")
    .setTimestamp()
    .setFooter('Quest Menu');

    message.channel.send(listEmbed);
    
  } else if(args[0] == "iboptional") {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Optional Quests 1⭐', "Jyura In My Way\n The Great Jagras Returns!\n Greetings from the Tundra\n Call of the Wind\n Taking Charge\n Deep Snow Diver\n Can't Bring Yourself To It\n Grinding my Girros\n All the Wrong Signals\n Dragged Through the Mud\n Taster's Tour\n Wildspire Treasure Hunt\n Trapping The Tree Trasher\n Beating Around the Bush\n New World Problems\n Literary Thief\n Ice Catch!\n Special Arena: MR Banbaro\n Special Arena: MR Pukei-Pukei\n Special Arena: MR Barroth\n This Here's Big Horn Country!")
    .addField('Optional Quests 2⭐', "Protip: Stay Hydrated\n A Face Nightmares Are Made Of\n Boaboa Constrictor\n Analysis Creates Paralysis\n Looking For That Glimmer\n Bugger Off Bugs!\n No Laughing Matter\n The Plight of Paolumu\n A Queen At Heart\n Stick Your Nose Somewhere Else\n Fool's Mate\n Anjanath Antics\n Poison and Paralysis Pinch\n By Our Powers Combined\n Pink Power Grab\n Feisty Girl Talk\n Nighty Night Nightshade\n You Scratch Our Backs...\n Put That Red Cup Away\n Special Arena: MR Nightshade Paolumu\n Special Arena: MR Viper Tobi-Kadachi\n Special Arena: MR Coral Pukei-Pukei\n Special Arena: MR Radobaan\n Special Arena: MR Rathian\n Special Arena: MR Pink Rathian\n Special Arena: MR Paolumu")
    .addField('Optional Quests 3⭐', "Nargacuga, Should, Woulda\n Remember That One Time?\n Begone Uragaan\n Everyone's a Critic\n The Black Wind\n Legiana Left Behind\n A Line in the Sand\n The Purr-fect Room: Stone\n The Purr-fect Room: Stone\n Red and Black Aces\n Runnin', Rollin', and Weepin'\n Festival of Explosions!\n Swoop to a New Low\n The Secret to a Good Slice\n Secret of the Ooze\n Blast Warning In Effect!\n A Roar that Shook the Vale\n Don't be a Jerk with the Jerky\n Simmer and Slice!\n A Flash of the Blade\n Special Arena: MR Nargacuga\n Special Arena: MR Barioth\n Special Arena: MR Glavenus\n Special Arena: MR Legiana\n Special Arena: MR Odogaron\n Special Arena: MR Rathalos\n Special Arena: MR Tigrex\n Special Arena: MR Brachydios\n Special Arena: MR Diablos")
    .addField('Optional Quests 4⭐', "These Azure Eyes See All\n Misfortune in the Forest\n Blue Rathalos Blues\n Piercing Black\n Noblefrost Hunter\n Tundra Troublemaker\n Trap the Thunder Jaw\n This Corroded Blade\n A Shadowy Offender\n In the Heat of the Moment\n Treasure in the Steam\n Duet of Rime\n The Purr-fect Room: Light Iron\n The Purr-fect Room: Dark Iron\n Special Arena: MR Azure Rathalos\n Special Arena: MR Black Diablos\n Special Arena: MR Fulgur Anjanath\n Special Arena: MR Acidic Glavenus\n Special Arena: MR Ebony Odogaron")
    .addField('Optional Quests 5⭐', "The Harbinger of Clear Skies\n Royal Audience on the Sand\n Clashing Swords Upon The Rime\n Here Comes the Deathmaker\n Memories of the Sea Gold\n Seething with Anger\n The Purr-fect Room: Silver")
    .addField('Optional Quests 6⭐', "Special Arena: MR Zinogre\n Special Arena: MR Yian Garuga")
    .setTimestamp()
    .setFooter('Quest Menu');

    message.channel.send(listEmbed);
  } else {
  const listEmbed = new Discord.RichEmbed()
  .setColor('#8fde5d')
  .addField('Usage: ', "```+mhwquests pagename```", true)
  .addField('Pages: ', "assigned, optional, special, arena, ibassigned, iboptional")
  .setTimestamp()
  .setFooter('List Menu');

  message.channel.send(listEmbed);
  }
};