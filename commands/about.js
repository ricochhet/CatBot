const Command = require('../utils/baseCommand.js')

class About extends Command {

  constructor(){

    super(

      'about',
      '+about',
      'Shows extra information about the bot',
      {'args' : false}

    )

  }

  run(client,message,args) {
    const aboutEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Author: ', 'Ricochet#7498', true)
      .addField('Contributors', 'Chad#0389\nYofou#0420', true)
      .addField('Version: ', 'v1.10.0', true)
      .addField('Changelog: ', 'v1.10.0 | Added `+mhw deco ...`, `+mhw skill ...` command(s)')
      .addField('Feedback / Requests: ', 'Do `+support` to go to the support server.')
      .setTimestamp()
      .setFooter('About Menu', client.user.avatarURL);

    message.channel.send(aboutEmbed);

  }

}

module.exports = About
