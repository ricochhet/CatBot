package extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake

@OptIn(KordPreview::class)
class Changelog: Extension() {
    override val name = "ChangeLog"

    override suspend fun setup() {
        publicSlashCommand {
            name = "changelog"
            description = "Shows latest update log"
            guild( Snowflake("638517240475549736") )

            action {
                respond {
                    content = "ping"
                }
            }
        }
    }
}