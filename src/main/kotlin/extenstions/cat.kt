package extenstions

import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extenstions.cat.*

@KordPreview
class Cat: Extension() {
    override val name = "Cat"
    override suspend fun setup() {
        slashCommand {
            name = "cat"
            description = "Where we show our love for cats"
            autoAck = AutoAckType.PUBLIC
            guild( Snowflake("638517240475549736") )

            subCommand(CatFactCommand)
            subCommand(CatPicCommand)
        }
    }
}