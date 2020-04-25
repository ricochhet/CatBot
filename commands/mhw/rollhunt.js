const Command = require('../../utils/baseCommand.js');

class RollHunt extends Command {
  constructor(prefix) {
    super(
      'rollhunt',
      'rollhunt',
      'Get a random roll of what monster you should hunt with which gear',
      { args: false }
    );
  }

  rollEmbed(client, name, rawEmbed = this.MessageEmbed()) {
    const monster = client.monsters.get(
      [...client.monsters.keys()][
        Math.floor(Math.random() * client.monsters.size)
      ]
    );
    const armor = client.armors.get(
      [...client.armors.keys()][Math.floor(Math.random() * client.armors.size)]
    );
    const weapon = client.weapons.get(
      [...client.weapons.keys()][
        Math.floor(Math.random() * client.weapons.size)
      ]
    );

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle('Roll Hunt')
      .setThumbnail(monster.thumbnail)
      .addField('Monster', monster.title)
      .addField('Armor', armor.name)
      .addField('Weapon', `${weapon.type}: ${weapon.name}`)
      .setTimestamp()
      .setFooter('Roll Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    const embed = this.rollEmbed(client, input);
    message.channel.send(embed);
  }
}

module.exports = RollHunt;
