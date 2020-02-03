const Command = require('../utils/baseCommand.js')

class Ping extends Command {

  constructor(prefix){

    super(
      "ping",
      "ping",
      "Too check if the bot is online",
      {prefix : prefix}
    )

  }

  run(client,message,args) {

    message.channel.send( "Pong" )

  }

}

module.exports = Ping
