package extensions

import arguments.MhrHzv
import com.kotlindiscord.kord.extensions.commands.application.slash.publicSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import extensions.mhr.*

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