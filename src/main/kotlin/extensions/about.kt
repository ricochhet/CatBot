package extensions
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake

@OptIn(KordPreview::class)
class About: Extension() {
    override val name = "About"

    override suspend fun setup() {
        publicSlashCommand {
            name = "about"
            description = "Shows extra information about the bot"
            guild( Snowflake("638517240475549736") )

            action {
                respond {
                    content = "Ping"
                }
            }
        }
    }
}