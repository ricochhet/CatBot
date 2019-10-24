const Discord = require('discord.js');

module.exports = {
  name: 'affinity',
  args: true,
  calc: true,
  usage: 'affinity <affinity> <damage>',
  description: 'Affinity calculator',
  error (message) {
    const data = [];
    data.push('affinity: base affinity value');
    data.push('damage: base damage value')

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed)
  },
  run (client, message, args) {
    /*
    const data = [];
    data.push('affinity: base affinity value');
    data.push('damage: base damage value');
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();*/

    if(!args[0] == null || !args[0] == "" && !args[1] == null || !args[1] == "" ) {
      let step1 = (args[0] / 100)
      var step2 = (0.25 * step1) + 1;
      var step3 = step2 * args[1];

      if(Number.isNaN(step3)) {
        return this.error(message)
        //message.channel.send(usageEmbed);
      } else {
        // Creates the embed
        const dmgProccess = new Discord.RichEmbed()
          .setColor('#8fde5d')
          .setTitle("Affinity Calculation")
          .setDescription("Shows how to calculate the affinity")
          .addField('Process of calculating affinity on a weapon', `\`\`\`Formula: 1/4 x (affinity / 100) + 1\nDamage Formula: Affinty Formula * damage\n\nAffinity Calc = ${args[0]} / 100\n             = ${step1.toFixed(2)}\n             = (1/4 * ${step1.toFixed(2)}) + 1\n             = ${step2.toFixed(2)}\n             = ${step2.toFixed(2)} * ${args[1]}\n             = ${step3.toFixed(2)}\`\`\``)

        message.channel.send(dmgProccess)
      }
    } else {
      return this.error(message)
      //message.channel.send(usageEmbed);
    }
  }
}