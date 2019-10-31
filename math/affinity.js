const Discord = require('discord.js');

module.exports = {
  name: 'affinity',
  args: true,
  calc: true,
  usage: 'affinity <affinity> <damage>',
  description: 'Affinity calculator',
  secret: false,
  error (message) {
    const data = [];
    data.push('affinity: base affinity value');
    data.push('damage: base damage value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run (client, message, args) {
    if (!args[0] || !args[1]) {
      return this.error(message);
    }

    let step1 = (args[0] / 100);
    let step2 = (0.25 * step1) + 1;
    let step3 = step2 * args[1];

    if(Number.isNaN(step3)) {
      return this.error(message);
    } else {
      const dmgProccess = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle("Affinity Calculation")
        .setDescription("Shows how to calculate the affinity")
        .addField('Process of calculating affinity on a weapon', `\`\`\`Formula: 1/4 x (Affinity / 100) + 1\nDamage Formula: Affinty Formula * Damage\n\nAffinity Calc = ${args[0]} / 100\n             = ${step1.toFixed(2)}\n             = (1/4 * ${step1.toFixed(2)}) + 1\n             = ${step2.toFixed(2)}\n             = ${step2.toFixed(2)} * ${args[1]}\n             = ${step3.toFixed(2)}\`\`\``);

      message.channel.send(dmgProccess);
    }
  }
}
