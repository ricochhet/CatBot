package extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.ephemeralSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import utils.version
import java.util.logging.Logger


class Changelog: Extension() {

    companion object {
        val LOG = Logger.getLogger(Changelog::class.java.name)
    }

    override val name = "ChangeLog"

    val changelog = """
        🆕 Rewrote Whole Ass Bot - (message commands to slash commands)
    """.trimIndent()

    override suspend fun setup() {
        ephemeralSlashCommand {
            name = "changelog"
            description = "Shows latest update log"

            action {
                LOG.info("Received command: changelog")

                val kord = this@ephemeralSlashCommand.kord
                respond {
                    embed {
                        color = Color.CatBot
                        field {
                            name = "Changelog: $version"
                            value = changelog
                        }

                        timestamp = Clock.System.now()
                        footer { text = "Changelog Menu"; icon = kord.getSelf().avatar?.cdnUrl?.toUrl() }
                    }
                }
            }
        }
    }
}