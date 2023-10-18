package extensions

import com.kotlindiscord.kord.extensions.commands.application.slash.ephemeralSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.ephemeralSlashCommand
import extensions.cat.*

class Cat: Extension() {
    override val name = "Cat"
    override suspend fun setup() {
        ephemeralSlashCommand {
            name = "cat"
            description = "Where we show our love for cats"

            ephemeralSubCommand(CatFactCommand)
            ephemeralSubCommand(CatPicCommand)
        }
    }
}