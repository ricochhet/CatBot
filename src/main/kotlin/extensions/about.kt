package extensions
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake

@OptIn(KordPreview::class)
class About: Extension() {
    override val name = "About"

    override suspend fun setup() {
        slashCommand {
            name = "about"
            description = "Shows extra information about the bot"
            guild( Snowflake("638517240475549736") )
            autoAck = AutoAckType.PUBLIC

            action {
                publicFollowUp {
                    content = "ping"
                }
            }
        }
    }
}