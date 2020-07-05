const Command = require('../../utils/command.js');

class RollHunt extends Command {
  constructor() {
    super(
      'rollhunt',
      'rollhunt',
      'Get a random roll of what monster you should hunt with which gear',
      { args: false }
    );
  }

  rollEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
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
    const weapon = client.mhwWeapons.get(
      [...client.mhwWeapons.keys()][
        Math.floor(Math.random() * client.mhwWeapons.size)
      ]
    );

    const embed = rawEmbed()
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

    if (client.mhwArmors == null) {
      return message.channel.send(this.serverErrorEmbed());
    } else if (client.mhwArmors == null) {
      return message.channel.send(this.serverErrorEmbed());
    } else if (client.mhwMonsters == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    const embed = this.rollEmbed(message, input);
    message.channel.send(embed);
  }
}

module.exports = RollHunt;
