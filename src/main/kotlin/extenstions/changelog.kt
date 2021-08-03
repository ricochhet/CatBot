package extenstions

import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake

@OptIn(KordPreview::class)
class Changelog: Extension() {
    override val name = "ChangeLog"

    override suspend fun setup() {
        slashCommand {
            name = "changelog"
            description = "Shows latest update log"
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