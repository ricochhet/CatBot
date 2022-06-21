package extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import utils.version


@OptIn(KordPreview::class)
class Changelog: Extension() {
    override val name = "ChangeLog"

    val changelog = """
        🆕 Rewrote Whole Ass Bot - (message commands to slash commands)
    """.trimIndent()

    override suspend fun setup() {
        publicSlashCommand {
            name = "changelog"
            description = "Shows latest update log"

            action {
                val kord = this@publicSlashCommand.kord
                respond {
                    embed {
                        color = Color.CatBot
                        field {
                            name = "Changelog: $version"
                            value = changelog
                        }

                        timestamp = Clock.System.now()
                        footer { text = "Changelog Menu"; icon = kord.getSelf().avatar?.url }
                    }
                }
            }
        }
    }
}