const Discord = require('discord.js');
// DBs
const monsterListDatabase = require('../databases/mhw/lists/monsterlist.json');
const questListDatabase = require('../databases/mhw/lists/questlist.json');
const armorListDatabase = require('../databases/mhw/lists/armorlist.json');
const charmListDatabase = require('../databases/mhw/lists/charmlist.json');

module.exports = {
  name: 'list',
  args: true,
  usage: 'list <listname>',
  description: 'List items of various categories',
  error(message) {
    const data = [];
    data.push('Monsters: <monsters | ibmonsters| endemic>');
    data.push('Quests: <assigned | optional | special | arena | ibassigned | iboptional>');
    data.push('Armors: <lowrank | hralpha1 | hralpha2 | hrbeta1 | hrbeta2 | mralpha1 | mrbalpha2 | mrbeta1 | mrbeta2>');
    data.push('Charms: <charms1 | charms2 | charms3 | charms4 | charms5>');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d');

    switch (input) {
      case 'monsters':
          listEmbed.addField(monsterListDatabase['monsters'].title, monsterListDatabase['monsters'].monsters, true);
        break;
      case 'ibmonsters':
          listEmbed.addField(monsterListDatabase['iceborneMonsters'].title, monsterListDatabase['iceborneMonsters'].ibmonsters, true);
        break;
      case 'endemic':
          listEmbed.addField(monsterListDatabase['endemicLife'].title, monsterListDatabase['endemicLife'].endemic, true);
        break;
      case 'assigned':
          listEmbed.addField(questListDatabase['assignedQuests'].assigned1Title, questListDatabase['assignedQuests'].assigned1);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned2Title, questListDatabase['assignedQuests'].assigned2);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned3Title, questListDatabase['assignedQuests'].assigned3);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned4Title, questListDatabase['assignedQuests'].assigned4);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned5Title, questListDatabase['assignedQuests'].assigned5);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned6Title, questListDatabase['assignedQuests'].assigned6);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned7Title, questListDatabase['assignedQuests'].assigned7);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned8Title, questListDatabase['assignedQuests'].assigned8);
          listEmbed.addField(questListDatabase['assignedQuests'].assigned9Title, questListDatabase['assignedQuests'].assigned9);
        break;
      case 'optional':
          listEmbed.addField(questListDatabase['optionalQuests'].optional1Title, questListDatabase['optionalQuests'].optional1);
          listEmbed.addField(questListDatabase['optionalQuests'].optional2Title, questListDatabase['optionalQuests'].optional2);
          listEmbed.addField(questListDatabase['optionalQuests'].optional3Title, questListDatabase['optionalQuests'].optional3);
          listEmbed.addField(questListDatabase['optionalQuests'].optional4Title, questListDatabase['optionalQuests'].optional4);
          listEmbed.addField(questListDatabase['optionalQuests'].optional5Title, questListDatabase['optionalQuests'].optional5);
          listEmbed.addField(questListDatabase['optionalQuests'].optional6Title, questListDatabase['optionalQuests'].optional6);
          listEmbed.addField(questListDatabase['optionalQuests'].optional7Title, questListDatabase['optionalQuests'].optional7);
          listEmbed.addField(questListDatabase['optionalQuests'].optional8Title, questListDatabase['optionalQuests'].optional8);
          listEmbed.addField(questListDatabase['optionalQuests'].optional9Title, questListDatabase['optionalQuests'].optional9);
        break;
      case 'special':
          listEmbed.addField(questListDatabase['specialQuests'].special6Title, questListDatabase['specialQuests'].special6);
          listEmbed.addField(questListDatabase['specialQuests'].special7Title, questListDatabase['specialQuests'].special7);
          listEmbed.addField(questListDatabase['specialQuests'].special8Title, questListDatabase['specialQuests'].special8);
          listEmbed.addField(questListDatabase['specialQuests'].special9Title, questListDatabase['specialQuests'].special9);
        break;
      case 'arena':
          listEmbed.addField(questListDatabase['arenaQuests'].arena1Title, questListDatabase['arenaQuests'].arena1);
          listEmbed.addField(questListDatabase['arenaQuests'].arena2Title, questListDatabase['arenaQuests'].arena2);
          listEmbed.addField(questListDatabase['arenaQuests'].arena4Title, questListDatabase['arenaQuests'].arena4);
          listEmbed.addField(questListDatabase['arenaQuests'].arena6Title, questListDatabase['arenaQuests'].arena6);
          listEmbed.addField(questListDatabase['arenaQuests'].arena7Title, questListDatabase['arenaQuests'].arena7);
          listEmbed.addField(questListDatabase['arenaQuests'].arena8Title, questListDatabase['arenaQuests'].arena8);
        break;
      case 'ibassigned':
          listEmbed.addField(questListDatabase['iceborneAssignedQuests'].ibAssigned1Title, questListDatabase['iceborneAssignedQuests'].ibAssigned1);
          listEmbed.addField(questListDatabase['iceborneAssignedQuests'].ibAssigned2Title, questListDatabase['iceborneAssignedQuests'].ibAssigned2);
          listEmbed.addField(questListDatabase['iceborneAssignedQuests'].ibAssigned3Title, questListDatabase['iceborneAssignedQuests'].ibAssigned3);
          listEmbed.addField(questListDatabase['iceborneAssignedQuests'].ibAssigned4Title, questListDatabase['iceborneAssignedQuests'].ibAssigned4);
          listEmbed.addField(questListDatabase['iceborneAssignedQuests'].ibAssigned5Title, questListDatabase['iceborneAssignedQuests'].ibAssigned5);
          listEmbed.addField(questListDatabase['iceborneAssignedQuests'].ibAssigned6Title, questListDatabase['iceborneAssignedQuests'].ibAssigned6);
          listEmbed.addField(questListDatabase['iceborneAssignedQuests'].ibAssigned6PostTitle, questListDatabase['iceborneAssignedQuests'].ibAssigned6Post);     
        break;
      case 'iboptional':
          listEmbed.addField(questListDatabase['iceborneOptionalQuests'].ibOptional1Title, questListDatabase['iceborneAssignedQuests'].ibOptional1);
          listEmbed.addField(questListDatabase['iceborneOptionalQuests'].ibOptional2Title, questListDatabase['iceborneAssignedQuests'].ibOptional2);
          listEmbed.addField(questListDatabase['iceborneOptionalQuests'].ibOptional3Title, questListDatabase['iceborneAssignedQuests'].ibOptional3);
          listEmbed.addField(questListDatabase['iceborneOptionalQuests'].ibOptional4Title, questListDatabase['iceborneAssignedQuests'].ibOptional4);
          listEmbed.addField(questListDatabase['iceborneOptionalQuests'].ibOptional5Title, questListDatabase['iceborneAssignedQuests'].ibOptional5);
          listEmbed.addField(questListDatabase['iceborneOptionalQuests'].ibOptional6Title, questListDatabase['iceborneAssignedQuests'].ibOptional6);    
        break;
      case 'lowrank':
          listEmbed.addField(armorListDatabase['armors'].lowRankTitle, armorListDatabase['armors'].lowRank);
        break;
      case 'hralpha1':
          listEmbed.addField(armorListDatabase['armors'].highRankAlpha1Title, armorListDatabase['armors'].highRankAlpha1);
        break;
      case 'hralpha2':
          listEmbed.addField(armorListDatabase['armors'].highRankAlpha2Title, armorListDatabase['armors'].highRankAlpha2);
        break;
      case 'hrbeta1':
          listEmbed.addField(armorListDatabase['armors'].highRankBeta1Title, armorListDatabase['armors'].highRankBeta1);
        break;
      case 'hrbeta2':
          listEmbed.addField(armorListDatabase['armors'].highRankBeta2Title, armorListDatabase['armors'].highRankBeta2);
        break;
      case 'mralpha1':
          listEmbed.addField(armorListDatabase['armors'].masterRankRankAlpha1Title, armorListDatabase['armors'].masterRankRankAlpha1);
        break;
      case 'mralpha2':
          listEmbed.addField(armorListDatabase['armors'].masterRankRankAlpha2Title, armorListDatabase['armors'].masterRankRankAlpha2);
        break;
      case 'mrbeta1':
          listEmbed.addField(armorListDatabase['armors'].masterRankRankBeta1Title, armorListDatabase['armors'].masterRankRankBeta1);
        break;
      case 'mrbeta2':
          listEmbed.addField(armorListDatabase['armors'].masterRankRankBeta2Title, armorListDatabase['armors'].masterRankRankBeta2);
        break;
      case 'charms1':
          listEmbed.addField(charmListDatabase['charms'].charms1Title, charmListDatabase['charms'].charms1);
        break;
      case 'charms2':
          listEmbed.addField(charmListDatabase['charms'].charms2Title, charmListDatabase['charms'].charms2);
        break;
      case 'charms3':
          listEmbed.addField(charmListDatabase['charms'].charms3Title, charmListDatabase['charms'].charms3);
        break;
      case 'charms4':
          listEmbed.addField(charmListDatabase['charms'].charms4Title, charmListDatabase['charms'].charms4);
        break;
      case 'charms5':
          listEmbed.addField(charmListDatabase['charms'].charms5Title, charmListDatabase['charms'].charms5);
        break;
      default:
          this.error(message);
        break;
    }

    listEmbed.setTimestamp().setFooter('List Menu');
    message.channel.send(listEmbed);
  },
};