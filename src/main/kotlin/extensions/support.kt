package extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.ephemeralSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import java.util.logging.Logger

class Support: Extension() {

    companion object {
        val LOG = Logger.getLogger(Support::class.java.name)
    }

    override val name = "Support"

    override suspend fun setup() {
        ephemeralSlashCommand {
            name = "support"
            description = "Support server for CatBot"

            val invite = "https://discord.gg/FugAFKzTMw"
            action {

                LOG.info("Received command: support")

                val kord = this@ephemeralSlashCommand.kord
                respond {
                    embed {
                        color = Color.CatBot
                        title = "CatBot Support"
                        description = "[Join the Discord]($invite)"

                        timestamp = Clock.System.now()
                        footer { text = "Support Link Request"; icon = kord.getSelf().avatar?.cdnUrl?.toUrl()  }
                    }
                }
            }
        }
    }
}