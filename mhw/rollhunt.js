const Command = require( '../utils/baseCommand.js' )

const monsterDatabase = require('../utils/databases/mhw/monsters.json');
const weaponDatabase = require('../utils/databases/mhw/weapons.json');
const armorDatabase = require('../utils/databases/mhw/armors.json');

class RollHunt extends Command {
  constructor() {
    super(
      'rollhunt',
      'rollhunt',
      'Get a random roll of what monster you should hunt with which gear'
    )
  }

  run(client,message,args) {

    let input = args.join('').toLowerCase();

    const mhMonsterKeys = Object.values(monsterDatabase);
    const mhWeaponKeys = Object.values(weaponDatabase);
    const mhArmorKeys = Object.values(armorDatabase);

    const monster = mhMonsterKeys[Math.floor(Math.random() * mhMonsterKeys.length)].details.title;
    const weapon = mhWeaponKeys[Math.floor(Math.random() * mhWeaponKeys.length)].title;
    const armor = mhArmorKeys[Math.floor(Math.random() * mhArmorKeys.length)].name;

    message.channel.send("Fight " + "**" + monster + "**" + " with a " + "**" + weapon + "**" + " using " + "**" + armor + "**");
  }
}

module.exports = RollHunt
