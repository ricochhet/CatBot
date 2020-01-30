const Command = require('../utils/baseCommand.js')

class Ping extends Command {

  constructor(){

    super(
      "ping",
      "+ping",
      "Too check if the bot is online"
    )

  }

  run(client,message,args) {

    message.channel.send( "Pong" )

  }

}

module.exports = Ping
