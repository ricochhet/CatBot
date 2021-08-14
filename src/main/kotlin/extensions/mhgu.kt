package extensions

import arguments.MhguHzv
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extensions.mhgu.*

@KordPreview
class Mhgu: Extension() {
    override val name = "Mhgu"
    override suspend fun setup() {
        slashCommand {
            name = "mhgu"
            description = "Monster Hunter Generations Ultimate"
            autoAck = AutoAckType.PUBLIC
            guild( Snowflake("638517240475549736") )

            subCommand(::MhguHzv, MhguHzvCommand)
        }
    }
}