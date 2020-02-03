const Command = require('../utils/baseCommand.js');

class Lfg extends Command {

  constructor(prefix){
    super(
      'lfg',
      'lfg [command] [command arguments]',
      'Looking for Group',
      {
        category : true,
        prefix : prefix
      }
    )

    this.caseSensitiveArgs = true
  }

  usageEmbed() {
    const data = [];
    data.push(`\`${this.prefix}lfg post [PC, XBOX, PS4] [session] [description]\` - Posts an active session to CatBots LFG command\n`);
    data.push(`\`${this.prefix}lfg subscribe (channel name)\` - All user posted sessions will be sent to the subscribed Discord channel\n`);
    data.push(`\`${this.prefix}lfg find\` - Show a menu listing all of the current active user sessions\n`);
    data.push(`\`${this.prefix}lfg cancel\` - Cancel your current active session\n`);

    const usageEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField(this.description, this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('LFG Help');

    return usageEmbed;
  }

}

module.exports = Lfg
