const Command = require('../../bot/command.js');

class RollHunt extends Command {
  constructor() {
    super(
      'rollhunt',
      'rollhunt (weapon type)',
      'Get a random roll of what monster you should hunt with which gear. You can optionally choose a weapon type - use random roll to see all types.',
      { args: false }
    );
  }

  rollEmbed(message, input, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const monster = message.client.mhwMonsters.get(
      [...client.mhwMonsters.keys()][
        Math.floor(Math.random() * client.mhwMonsters.size)
      ]
    );
    const armor = client.mhwArmors.get(
      [...client.mhwArmors.keys()][
        Math.floor(Math.random() * client.mhwArmors.size)
      ]
    );

    let weapons = client.mhwWeapons;

    // Filter if valid weapon type was specified
    if (input) {
      const weaponTypes = new Set(weapons.map(weapon => weapon.type));

      if (weaponTypes.has(input)) {
        weapons = weapons.filter(function(weapon) {
          return weapon.type === input;
        });
      }
    }

    const weapon = weapons.get(
      [...weapons.keys()][Math.floor(Math.random() * weapons.size)]
    );

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle('Roll Hunt')
      .setThumbnail(monster.thumbnail)
      .addField('Monster', monster.title)
      .addField('Armor', armor.name)
      .addField('Weapon', `${weapon.type}: ${weapon.name}`)
      .setTimestamp()
      .setFooter('RollHunt');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (
      client.mhwArmors == null ||
      client.mhwMonsters == null ||
      client.mhwWeapons == null
    ) {
      return message.channel.send(this.serverErrorEmbed());
    }

    const embed = this.rollEmbed(message, input);
    message.channel.send(embed);
  }
}

module.exports = RollHunt;
