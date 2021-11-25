package extensions

import arguments.MhguHzv
import com.kotlindiscord.kord.extensions.commands.application.slash.publicSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extensions.mhgu.*

@KordPreview
class Mhgu: Extension() {
    override val name = "Mhgu"
    override suspend fun setup() {
        publicSlashCommand {
            name = "mhgu"
            description = "Monster Hunter Generations Ultimate"
            guild( Snowflake("638517240475549736") )

            publicSubCommand(::MhguHzv, MhguHzvCommand)
        }
    }
}