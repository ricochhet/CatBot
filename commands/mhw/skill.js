const Command = require('../../utils/baseCommand.js');

class Skill extends Command {
  constructor(prefix) {
    super('skill', 'skill [skill name]', 'Get info for a specific skill');
  }

  skillEmbed(client, name, rawEmbed = this.RichEmbed()) {
    const skill = client.skills.get(name);

    const embed = rawEmbed
      .setColor('#8fde5d')
      .setTitle(skill.name)
      .setDescription(skill.description)
      .addField('Levels', skill.ranks, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (!client.skills.has(input)) {
      let msg = "That skill doesn't seem to exist!";

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true
      }

      let similarItems = this.findAllMatching(client.skills, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.skillEmbed);
      }

      message.channel.send(msg);
    } else if (client.skills.has(input)) {
      const embed = this.skillEmbed(client, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Skill;
