package extensions

import arguments.MhguHzv
import com.kotlindiscord.kord.extensions.commands.application.slash.publicSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import extensions.mhgu.*

class Mhgu: Extension() {
    override val name = "Mhgu"
    override suspend fun setup() {
        publicSlashCommand {
            name = "mhgu"
            description = "Monster Hunter Generations Ultimate"

            publicSubCommand(::MhguHzv, MhguHzvCommand)
        }
    }
}