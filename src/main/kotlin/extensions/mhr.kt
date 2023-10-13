package extensions

import arguments.MhrHzv
import com.kotlindiscord.kord.extensions.commands.application.slash.publicSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extensions.mhr.*

@KordPreview
class Mhr: Extension() {
    override val name = "Mhr"
    override suspend fun setup() {
        publicSlashCommand {
            name = "mhr"
            description = "Monster Hunter Rise"

            publicSubCommand(::MhrHzv, MhrHzvCommand)
        }
    }
}