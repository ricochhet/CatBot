package extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake

@OptIn(KordPreview::class)
class Support: Extension() {
    override val name = "Support"

    override suspend fun setup() {
        publicSlashCommand {
            name = "support"
            description = "Support server for CatBot"
            guild( Snowflake("638517240475549736") )

            action {
                respond {
                    content = "ping"
                }
            }
        }
    }
}