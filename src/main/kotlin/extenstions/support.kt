package extenstions

import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake

@OptIn(KordPreview::class)
class Support: Extension() {
    override val name = "Support"

    override suspend fun setup() {
        slashCommand {
            name = "support"
            description = "Support server for CatBot"
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