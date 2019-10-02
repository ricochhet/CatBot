const Discord = require('discord.js');

exports.run = (client, message, args) => {
      const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage: ', "```+mhwinfo monstername```", true)
      .setTimestamp()
      .setFooter('List Menu');
  
      if(!args.length) return message.channel.send(usageEmbed);
  
      if(args[0] == "anjanath") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Anjanath")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Anjanath')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-anjanath_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder ⭐⭐\n Ice ⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐', true)
        .addField('Locations', 'Ancient Forest\n Wildspire Waste')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "barroth") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Barroth")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Barroth')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/MHW-Barroth_Icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐(:x:)\n Water :x:(⭐⭐⭐)\n Thunder :x:\n Ice ⭐⭐\n Dragon ⭐\n () when covered in mud.', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Wildspire Waste')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "bazelgeuse") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Bazelgeuse")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Bazelgeuse')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-bazelgeuse_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐⭐⭐\n Ice ⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐', true)
        .addField('Locations', 'Ancient Forest\n Coral Highlands\n Rotten Vale\n Wildspire Waste\n Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "behemoth") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Behemoth")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Behemoth')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-behemoth_icon.png')
        .addField('Elements', 'Fire ⭐\n Water ⭐⭐\n Thunder ⭐\n Ice ⭐⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "deviljho") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Deviljho")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Deviljho')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-deviljho_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐\n Thunder ⭐⭐⭐\n Ice ⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'All Locations')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "diablos") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Diablos")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Diablos')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/mhw-diablos_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐\n Thunder ⭐\n Ice ⭐⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐⭐\n Blast ⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Wildspire Waste')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "black-diablos") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Black Diablos")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Black+Diablos')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-black_diablos_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐\n Thunder ⭐\n Ice ⭐⭐⭐\n Dragon :x:', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐⭐\n Blast ⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Wildspire Waste (High Rank)')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "dodogama") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Dodogama")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Dodogama')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-dodogama_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐\n Thunder ⭐⭐⭐\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "great-girros") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Great Girros")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Great+Girros')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-great_girros_icon2.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐⭐\n Thunder :x:\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐⭐\n Paralysis ⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Rotten Vale')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "great-jagras") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Great Jagras")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Great+Jagras')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-great_jagras_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder ⭐⭐\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐⭐\n Paralysis ⭐⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐⭐', true)
        .addField('Locations', 'Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "jyuratodus") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Jyuratodus")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Jyuratodus')
        .setDescription("Piscine Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-jyuratodus_icon2.png')
        .addField('Elements', 'Fire ⭐(:x:)\n Water :x:(⭐⭐⭐)\n Thunder ⭐⭐⭐(:x:)\n Ice ⭐\n Dragon ⭐\n () when covered in mud.', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐⭐', true)
        .addField('Locations', 'Wildspire Waste')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "kirin") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Kirin")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Kirin')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-kirin_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water ⭐⭐\n Thunder :x:\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis :x:\n Blast ⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Coral Highlands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "kulu-ya-ku") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Kulu-Ya-Ku")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Kulu-Ya-Ku')
        .setDescription("Bird Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-kulu-ya-ku_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐⭐\n Thunder ⭐⭐\n Ice ⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest\n Wildspire Waste')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "kulve-taroth") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Kulve Taroth")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Kulve+Taroth')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-kulve_taroth_icon.png')
        .addField('Elements', 'Fire :x:(⭐)\n Water ⭐⭐\n Thunder :x:(⭐⭐⭐)\n Ice ⭐⭐⭐(:x:)\n Dragon ⭐⭐(⭐)\n () when covered in gold.', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐\n Stun ⭐', true)
        .addField('Locations', 'Caverns of El Dorado')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "kushala-daora") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Kushala Daora")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Kushala+Daora')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-kushala_daora_icon.png')
        .addField('Elements', 'Fire ⭐\n Water :x:\n Thunder ⭐⭐⭐\n Ice :x:\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest\n Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "lavasioth") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Lavasioth")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Lavasioth')
        .setDescription("Piscine Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-lavasioth_icon.png')
        .addField('Elements', 'Fire :x:(⭐)\n Water ⭐⭐⭐(⭐⭐)\n Thunder ⭐⭐(:x:)\n Ice ⭐⭐(:x:)\n Dragon ⭐\n () when hardened.', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "legiana") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Legiana")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Legiana')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-legiana_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐\n Thunder ⭐⭐⭐\n Ice :x:\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Coral Highlands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "lunastra") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Lunastra")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Lunastra')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-lunastra_icon2.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐\n Ice ⭐⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "nergigante") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Nergigante")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Nergigante')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-nergigante_icon.png')
        .addField('Elements', 'Fire ⭐\n Water ⭐\n Thunder ⭐⭐⭐\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "odogaron") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Odogaron")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Odogaron')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-odogaron_icon.png')
        .addField('Elements', 'Fire ⭐\n Water ⭐\n Thunder ⭐⭐\n Ice ⭐⭐⭐\n Dragon :x:', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Coral Highlands\n Rotten Vale')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "paolumu") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Paolumu")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Paolumu')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-paolumu_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐⭐', true)
        .addField('Locations', 'Coral Highlands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "pukei-pukei") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Pukei-Pukei")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Pukei-Pukei')
        .setDescription("Bird Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-pukei-pukei_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water :x:\n Thunder ⭐⭐⭐\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐⭐\n Paralysis ⭐⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "radobaan") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Radobaan")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Radobaan')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-radobaan_icon.png')
        .addField('Elements', 'Fire ⭐\n Water ⭐\n Thunder ⭐\n Ice ⭐⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Rotten Vale')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "rathalos") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Rathalos")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Rathalos')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-rathalos_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "azure-rathalos") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Azure Rathalos")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Azure+Rathalos')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-azure_rathalos_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐\n Ice ⭐⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest\n Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "rathian") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Rathian")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Rathian')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-rathian_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐⭐', true)
        .addField('Locations', 'Ancient Forest\n Wildspire Waste')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "pink-rathian") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Pink Rathian")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Pink+Rathian')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-pink_rathian_icon2.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐⭐', true)
        .addField('Locations', 'Wildspire Waste\n Coral Highlands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "teostra") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Teostra")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Teostra')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-teostra_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder ⭐\n Ice ⭐⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Wildspire Waste\n Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "tobi-kadachi") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Tobi-Kadachi")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Tobi-Kadachi')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-tobi-kadachi_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐⭐\n Thunder :x:\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "tzitzi-ya-ku") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Tzitzi-Ya-Ku")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Tzitzi-Ya-Ku')
        .setDescription("Bird Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-tzitzi-ya-ku_icon2.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐\n Thunder ⭐⭐⭐\n Ice ⭐⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Coral Highlands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "uragaan") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Uragaan")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Uragaan')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-uragaan_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder ⭐\n Ice ⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "vaal-hazak") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Vaal Hazak")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Vaal+Hazak')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-vaal_hazak_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder ⭐\n Ice ⭐⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Rotten Vale')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "xeno'jiiva") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Xeno'Jiiva")
        .setURL("https://monsterhunterworld.wiki.fextralife.com/Xeno'jiiva")
        .setDescription("Elder Dragon")
        .setThumbnail("https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-xeno'jiiva_icon.png")
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐\n Thunder ⭐⭐\n Ice ⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep :x:\n Paralysis ⭐\n Blast ⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Confluence of Fates')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "zorah-magdaros") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Zorah Magdaros")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Zorah+Magdaros')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-zorah_magdaros_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder ⭐\n Ice ⭐⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison :x:\n Sleep :x:\n Paralysis :x:\n Blast :x:\n Stun :x:', true)
        .addField('Locations', 'n/a')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "ancient-leshen") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Ancient Leshen")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Great+Girros')
        .setDescription("Relict")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/ancient_leshen_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep :x:\n Paralysis ⭐\n Blast ⭐\n Stun ⭐', true)
        .addField('Locations', 'Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "leshen") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Leshen")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Leshen')
        .setDescription("Relict")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-leshen_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep :x:\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      }else if(args[0] == "banbaro") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Banbaro")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Banbaro')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-banbaro_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder ⭐\n Ice :x:\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐⭐', true)
        .addField('Locations', 'Hoarfrost Reach')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "beotodus") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Beotodus")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Beotodus')
        .setDescription("Piscine Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-beotodus_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water ⭐\n Thunder ⭐⭐\n Ice :x:\n Dragon :x:', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Hoarfrost Reach')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "nargacuga") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Nargacuga")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Nargacuga')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-nargacuga_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water :x:\n Thunder ⭐⭐⭐\n Ice ⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Coral Highlands\n Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "velkhana") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Elder Dragon")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Velkhana')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-velkhana_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water ⭐\n Thunder ⭐⭐\n Ice :x:\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Elders Recess\n Hoarfrost Reach')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "tigrex") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Tigrex")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Tigrex')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-tigrex_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐⭐⭐\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Rotten Vale\n Hoarfrost Reach\n Wildspire Waste\n Ancient Forest\n Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "shrieking-legiana") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Shrieking Legiana")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Shrieking+Legiana')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-shrieking_legiana_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water ⭐\n Thunder ⭐⭐\n Ice :x:\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Hoarfrost Reach')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "barioth") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Barioth")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Barioth')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-barioth_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder ⭐⭐\n Ice :x:\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Hoarfrost Reach')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "glavenus") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Glavenus")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Glavenus')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-glavenus_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder ⭐\n Ice ⭐⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest\n Wildspire Waste\n Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "brachydios") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Brachydios")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Brachydios')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-brachydios_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐\n Thunder ⭐\n Ice ⭐⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "fulgur-anjanath") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Fulgur Anjanath")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Fulgur+Anjanath')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-fulgur_anjanath_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐(⭐⭐⭐)\n Thunder :x:\n Ice ⭐⭐⭐(⭐⭐)\n Dragon ⭐ () when charged ', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'All Locations')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "ebony-odogaron") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Ebony Odogaron")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Ebony+Odogaron')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-ebony_odogaron_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐⭐\n Thunder ⭐⭐\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep :x:\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'All Locations')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "acidic-glavenus") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Acidic Glavenus")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Acidic+Glavenus')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-acidic_glavenus_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water ⭐\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐⭐(⭐) () when crystalized', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "ruiner-nergigante") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Ruiner Nergigante")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Ruiner+Nergigante')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-ruiner_nergigante_icon.png')
        .addField('Elements', 'Fire ⭐\n Water ⭐\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Guiding Lands (Level 5 or Above)')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      }  else if(args[0] == "viper-tobi-kadachi") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Viper Tobi-Kadachi")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Viper+Tobi-Kadachi')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-viper_tobi-kadachi_icon.png')
        .addField('Elements', 'Fire ⭐\n Water :x:\n Thunder ⭐⭐⭐\n Ice ⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Hoarfrost Reach')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "coral-pukei-pukei") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Cpral Pukei-Pukei")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Coral+Pukei-Pukei')
        .setDescription("Bird Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-coral_pukei-pukei_icon.png')
        .addField('Elements', 'Fire ⭐\n Water :x:\n Thunder ⭐⭐\n Ice ⭐⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Coral Highlands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "nightshade-paolumu") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Nightshade Paolumu")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Nightshade+Paolumu')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-nightshade_paolumu_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐⭐\n Thunder ⭐\n Ice ⭐\n Dragon :x:', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Wildspire Waste\n Ancient Forest')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "namielle") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Namielle")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Namielle')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-namielle_icon.png')
        .addField('Elements', 'Fire ⭐⭐⭐\n Water :x:\n Thunder :x:\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Coral Highlands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "yian-garuga") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Yian Garuga")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Yian+Garuga')
        .setDescription("Bird Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-yian_garuga_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder :x:\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Guiding Lands (Forest)')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "shara-ishvalda") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Shara Ishvalda")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Shara+Ishvalda')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-shara_ishvalda_icon.png')
        .addField('Elements', 'Fire ⭐\n Water ⭐⭐\n Thunder :x:\n Ice ⭐⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep :x:\n Paralysis ⭐\n Blast ⭐⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Origin Isle')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "savage-deviljho") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Savage Deviljho")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Savage+Deviljho')
        .setDescription("Brute Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-savage_deviljho_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water ⭐⭐\n Thunder ⭐⭐⭐\n Ice ⭐\n Dragon ⭐⭐⭐', true)
        .addField('Ailments', 'Poison ⭐⭐⭐\n Sleep ⭐⭐⭐\n Paralysis ⭐⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'All Locations')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "blackveil-vaal-hazak") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Blackveil Vaal Hazak")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Blackveil+Vaal+Hazak')
        .setDescription("Elder Dragon")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-blackveil_vaal_hazak_icon.png')
        .addField('Elements', 'Fire ⭐⭐\n Water :x:\n Thunder ⭐\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐\n Paralysis ⭐\n Blast ⭐⭐\n Stun ⭐', true)
        .addField('Locations', 'Ancient Forest\n Rotten Vale')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "seething-bazelgeuse") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Seething Bazlegeuse")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Seething+Bazelgeuse')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-seething_bazelgeuse_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐\n Thunder ⭐⭐\n Ice ⭐⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Elders Recess')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "scarred-yian-garuga") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Scarred Yian Garuga")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Scarred+Yian+Garuga')
        .setDescription("Bird Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-gajalaka_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder :x:\n Ice ⭐\n Dragon ⭐⭐', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐\n Paralysis ⭐⭐\n Blast ⭐⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Guiding Lands (Forest LV6 & Above)')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "gold-rathian") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Gold Rathian")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Gold+Rathian')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-gajalaka_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐\n Thunder ⭐⭐⭐\n Ice ⭐\n Dragon :x:', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Guiding Lands (Wildspire LV6 & Above)')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "silver-rathalos") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Silver Rathalos")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Silver+Rathalos')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-gajalaka_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder ⭐⭐\n Ice ⭐\n Dragon :x:', true)
        .addField('Ailments', 'Poison ⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Guiding Lands (Coral LV6 & Above)')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "brute-tigrex") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Brute Tigrex")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Brute+Tigrex')
        .setDescription("Flying Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhw-gajalaka_icon.png')
        .addField('Elements', 'Fire :x:\n Water ⭐⭐⭐\n Thunder ⭐⭐\n Ice ⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Guiding Lands (Rotten LV6 & Above)')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "zinogre") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Zinogre")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Zinogre')
        .setDescription("Fanged Wyvern")
        .setThumbnail('https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-zinogre_icon.png')
        .addField('Elements', 'Fire ⭐\n Water ⭐⭐\n Thunder :x:\n Ice ⭐⭐⭐\n Dragon ⭐', true)
        .addField('Ailments', 'Poison ⭐⭐\n Sleep ⭐⭐\n Paralysis ⭐\n Blast ⭐⭐\n Stun ⭐⭐', true)
        .addField('Locations', 'Guiding Lands')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      }else if(args[0] == "moonlight-gecko") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Moonlight Gecko")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Moonlight+Gekko')
        .setDescription("Endemic Life")
        .addField('Description', 'That shining tail! Its so pretty... I want to touch it... I want to be its best friend... *gasp* I almost fell for it!', true)
        .addField('Locations', 'Rotten Vale: Sector 11 and 13\n Elders Recess: Sector 7 and 8')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "pilot-hare") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Pilot Hare")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Pilot+Hare')
        .setDescription("Endemic Life")
        .addField('Description', 'Ooh, this is a rare one! Its warm to the touch like a little ball of sunshine! I bet this little guy just LOVES picnics!', true)
        .addField('Locations', 'Ancient Forest: Sector 1 and 8\n Wildspire Waste: Sector 1')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "dapper-coralbird") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Dapper coralbird")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Dapper+Coralbird')
        .setDescription("Endemic Life")
        .addField('Description', 'Coralbirds only allow one chosen male into their flock. In other words, this guys the top dog- or bird.... You know what I mean!', true)
        .addField('Locations', 'Coral Highlands: Sector 1 and 6')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "wiggler-queen") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Wiggler Queen")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Wiggler+Queen')
        .setDescription("Endemic Life")
        .addField('Description', "This empress of the night only appears when theres a full moon! Let's see if she'll deign to show us her royal feet... URRGH! Nope...", true)
        .addField('Locations', 'Coral Highlands: Sector 1, 3, 9, 10 and 11')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "forest-pteryx") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Forest Pteryx")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Forest+Pteryx')
        .setDescription("Endemic Life")
        .addField('Description', 'Im so excited my hands are shaking... Its red crown...and that blue plumage! To think it was in the Ancient Forest all along!', true)
        .addField('Locations', 'Ancient Forest: Sector 5 and 15')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "emerald-helmcrab") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Emerald Helmcrab")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Emerald+Helmcrab')
        .setDescription("Endemic Life")
        .addField('Description', 'That avant-garde shell design, that superb silhouette and color scheme... Forget research, Im getting out my sketch book!', true)
        .addField('Locations', 'Wildspire Waste: Sector 4, 9 and 10\n Rotten Vale: Sector 9')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "augurfly") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Augurfly")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Augurfly')
        .setDescription("Endemic Life")
        .addField('Description', 'They only emerge on rainy days, and its said that the day after is guaranteed to be sunny! Theyre like good weather charms!', true)
        .addField('Locations', 'Ancient Forest: Sector 3, 5, 10, 11 and 16.\n Wildspire Waste: Sector 2, 3 and 10\n Coral Highlands: Sector 8, 11 and 14\n Rotten Vale: Sector 1 and 12')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "phantom-flutterfly") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Phantom Flutterfly")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Phantom+Flutterfly')
        .setDescription("Endemic Life")
        .addField('Description', 'These magnificent wings! Their rainbow glow is so alluring... I...I cant tear my eyes away from it! What a masterpiece!', true)
        .addField('Locations', 'Ancient Forest: Sector 6 and 11')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "prism-hercudrome") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Prism Hercudrome")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Prism+Hercudrome')
        .setDescription("Endemic Life")
        .addField('Description', 'This is the... I... How in the WORLD did you manage to... Ooh, the colors... One, two... four... Its blinding me with rainbow colors!', true)
        .addField('Locations', 'Ancient Forest: Sector 1\n Wildspire Waste: Sector 10\n Coral Highlands: Sector 11\n Rotten Vale: Sector 11\n Elders Recess: Sector 3')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "gold-hercudrome") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Gold Hercudrome")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Gold+Hercudrome')
        .setDescription("Endemic Life")
        .addField('Description', 'The Bringer of Light? The Bug of Brilliant Gold? I...Im speechless! My...my heart feels like its been dipped in golden bliss!', true)
        .addField('Locations', 'Ancient Forest: Sector 6\n Wildspire Waste: Sector 5')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "downy-crake") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Downy Crake")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Downy+Crake')
        .setDescription("Endemic Life")
        .addField('Description', 'You caught a Downy Crake!? Theyve been seen on the backs of monsters before, but youre the first person EVER to catch one!', true)
        .addField('Locations', 'Ancient Forest: Sector 1 and 8\n Wildspire Waste: Sector 1, 4 and 8\n Coral Highlands: Sector 11 and 13')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "bristly-crake") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Bristly Crake")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Bristly+Crake')
        .setDescription("Endemic Life")
        .addField('Description', 'Great jumping Jagras! A Bristly Crake!? The fleet-footed bird of legend...right before my very eyes! Someone pinch me...', true)
        .addField('Locations', 'Rotten Vale: Sectors 3, 5 and 15. Rarely spawns on the back of Mosswine. In sectors 3-5 it is all the way to the left after leaving camp 1, near a crawling tunel. In sector 15 it wanders above the Goldenfish pond in the dead end tunel with the Honey gathering point. If it spots the player here, itll try to flee and get stuck at the end of the path for an easy catch.\n Elders Recess: Sectors 5 and 11. Spawns on the back of a Gastodon.\n Since it flees easily after being spotted by either the Crake itself or the host, the use of the Ghillie Mantle is highly recommended.')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "giant-vigorwasp") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Giant Vigorwasp")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Giant+Vigorwasp')
        .setDescription("Endemic Life")
        .addField('Description', 'Its nectar has stronger healing properties than average, and it even releases a healing mist when its sac is ruptured!', true)
        .addField('Locations', 'Ancient Forest: Sector 13')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "petricanth") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Petricanth")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Petricanths')
        .setDescription("Endemic Life")
        .addField('Description', 'Unbelievable... Youve managed to fish up the legendary, thought-to-have-gone-extinct Petricanths! I take my hat off to you!', true)
        .addField('Locations', 'Rotten Vale: Sector 15\n Elders Recess: Sector 8')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "platinumfish") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Platinumfish")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Platinumfish')
        .setDescription("Endemic Life")
        .addField('Description', 'Platinum-scaled cave-dwellers, theyll hightail it if you wiggle your bait! Youre going to need a lot of patience if you want to catch one.', true)
        .addField('Locations', 'Elders Recess: Sector 7 and 8')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "king-marlin") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("King Marlin")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/King+Marlin')
        .setDescription("Endemic Life")
        .addField('Description', 'I knew that these are known to approach the shore in search of prey, but great job catching it! And not losing your pole in the process!', true)
        .addField('Locations', 'Ancient Forest: Sector 4')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else if(args[0] == "gold-calappa") {
        const monsterEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Gold Calappa")
        .setURL('https://monsterhunterworld.wiki.fextralife.com/Gold+Calappa')
        .setDescription("Endemic Life")
        .addField('Description', 'Look at the shell on this thing! It makes me just wanna pick it up and scream "big gold haul coming through!"', true)
        .addField('Locations', 'Caverns of El Dorado: Sector 1')
        .setTimestamp()
        .setFooter('Info Menu');

        message.channel.send(monsterEmbed);
      } else {
        message.channel.send("That monster doesn't seem to exist!");
      }
};