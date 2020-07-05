const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Skill extends Command {
  constructor() {
    super('skill', 'skill [skill name]', 'Get info for a specific skill');
  }

  skillEmbed(message, name, rawEmbed = this.MessageEmbed, menu = this.menu) {
    const skill = message.client.mhwSkills.get(name);

    logger.debug('skill log', { type: 'skillRead', name: name });

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(skill.name)
      .setDescription(skill.description)
      .addField('Levels', skill.ranks, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwSkills == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!client.mhwSkills.has(input)) {
      let msg = "That skill doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      };

      let similarItems = this.findAllMatching(client.mhwSkills, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.skillEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhwSkills.has(input)) {
      const embed = this.skillEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Skill;
