package extensions

import com.kotlindiscord.kord.extensions.commands.application.slash.ephemeralSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.ephemeralSlashCommand
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extensions.cat.*

@KordPreview
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