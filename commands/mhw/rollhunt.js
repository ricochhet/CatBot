const Command = require('../../utils/baseCommand.js');

const monsterDatabase = require(`../../utils/databases/mhw/monsters.json`);
const weaponDatabase = require(`../../utils/databases/mhw/weapons.json`);
const armorDatabase = require(`../../utils/databases/mhw/armors.json`);

class RollHunt extends Command {
  constructor(prefix) {
    super(
      'rollhunt',
      'rollhunt',
      'Get a random roll of what monster you should hunt with which gear',
      { args: false }
    );
  }

  rollEmbed(client, name, rawEmbed = this.RichEmbed()) {
    const mhMonsterKeys = Object.values(monsterDatabase);
    const mhWeaponKeys = Object.values(weaponDatabase);
    const mhArmorKeys = Object.values(armorDatabase);

    const monster =
      mhMonsterKeys[Math.floor(Math.random() * mhMonsterKeys.length)];
    const weapon =
      mhWeaponKeys[Math.floor(Math.random() * mhWeaponKeys.length)];
    const armor =
      mhArmorKeys[Math.floor(Math.random() * mhArmorKeys.length)].name;

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle('Roll Hunt')
      .setThumbnail(monster.details.thumbnail)
      .addField('Monster', monster.details.title)
      .addField('Armor', armor)
      .addField('Weapon', `${weapon.type}: ${weapon.title}`)
      .setTimestamp()
      .setFooter('Roll Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    const embed = this.rollEmbed(client, input);
    message.channel.send(embed);
  }
}

module.exports = RollHunt;
