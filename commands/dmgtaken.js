const Discord = require('discord.js');


module.exports = {
  name: 'dmgtaken',
  args: false,
  usage: 'Calculates the percentage of the damage you take per hit',
  description: 'dmgtaken <defense>',
  error (message) {
    const data = [];
    data.push('defense: current defense value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed)
  },
  run (client, message, args) {

    // Makes sure that user passes in an input
    if (args.length < 1) return this.error(message)

    // Checks if input is a number
    defense = Number(args[0])
    if (isNaN(defense)) return this.error(message)

    // Creates a step progress
    step1 = defense + 80
    step2 = 80 / step1
    step3 = step2 * 100

    // Creates the embed
    const dmgProccess = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle("Defense Calculation")
      .setDescription("Shows how to calculate the percentage of damage taken")
      .addField('Process of calculating damage taken', `\`\`\`Forumla : 80 + Defense x 100\n\nDamageTaken = 80 + ${defense}\n            = ${step1.toFixed(2)}\n            = 80 / ${step1.toFixed(2)}\n            = ${step2.toFixed(2)}\n            = ${step2.toFixed(2)} * 100\n            = ${step3.toFixed(2)}%\`\`\``)

    // Smacks that embed into the message channel
    message.channel.send(dmgProccess)
  }
}
