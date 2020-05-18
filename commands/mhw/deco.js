const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Deco extends Command {
  constructor() {
    super('deco', 'deco [deco name]', 'Get info for a specific decoration');
  }

  decorationEmbed(
    message,
    name,
    rawEmbed = this.MessageEmbed,
    menu = this.menu
  ) {
    const decoration = message.client.mhwDecorations.get(name);

    logger.debug('deco log', { type: 'decoRead', name: name });

    const embed = rawEmbed()
      .setColor('#8fde5d')
      .setTitle(decoration.name)
      .addField('Skills', decoration.skills)
      .addField('Rarity', decoration.rarity, true)
      .addField('Slot Level', decoration.slot, true)
      .setTimestamp()
      .setFooter('Info Menu');

    return embed;
  }

  findDecosBySkill(input) {
    let arr = [];
    for (let [name, deco] of client.mhwDecorations.entries()) {
      for (let skill of deco.skills) {
        let skillname = skill
          .split('-')[0]
          .toLowerCase()
          .split(' ')
          .join('');
        let sim = this.score(input, skillname);
        if (sim > 0.8 && !arr.includes(skillname) && input.length > 0) {
          arr.push([deco.name, sim]);
        }
      }
    }

    return arr;
  }

  async run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.mhwDecorations == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    if (!client.mhwDecorations.has(input)) {
      let msg = "That decoration doesn't seem to exist!";

      let decosMatchingSkill = this.findDecosBySkill(input);

      const options = {
        input: input,
        threshold: 0.8,
        innerKey: 'name',
        includeScore: true,
        initial: decosMatchingSkill
      };

      let similarItems = this.findAllMatching(client.mhwDecorations, options);

      if (similarItems.length) {
        return this.reactions(message, similarItems, this.decorationEmbed);
      }

      message.channel.send(msg);
    } else if (client.mhwDecorations.has(input)) {
      const embed = this.decorationEmbed(message, input);
      message.channel.send(embed);
    }
  }
}

module.exports = Deco;
