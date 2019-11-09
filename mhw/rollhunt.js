const Discord = require('discord.js');
const monsterDatabase = require('../databases/mhw/monsterinfo.json');
const weaponDatabase = require('../databases/mhw/weaponinfo.json');
const armorDatabase = require('../databases/mhw/armorinfo.json');
const { similarity } = require('../util.js');

const armors = new Discord.Collection();

for (const i of Object.keys(armorDatabase)) {
  armors.set(i, armorDatabase[i]);
}

module.exports = {
  name: 'rollhunt',
  args: true,
  usage: 'rollhunt',
  description: 'Hunt a random monster using random equipment',
  run(client, message, args) {
    let input = args.join('').toLowerCase();
    
    const mhMonsterKeys = Object.values(monsterDatabase);
    const mhWeaponKeys = Object.values(weaponDatabase);
    const mhArmorKeys = Object.values(armorDatabase);

    const monster = mhMonsterKeys[Math.floor(Math.random() * mhMonsterKeys.length)].details.title;
    const weapon = mhWeaponKeys[Math.floor(Math.random() * mhWeaponKeys.length)].title;
    const armor = mhArmorKeys[Math.floor(Math.random() * mhArmorKeys.length)].title;
    
    message.channel.send("Fight " + "**" + monster + "**" + " with a " + "**" + weapon + "**" + " using " + "**" + armor + "**");
  },
};