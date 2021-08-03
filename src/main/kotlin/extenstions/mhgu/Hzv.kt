package extenstions.mhgu

import arguments.MhguHzv
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhguHzvCommand: suspend SlashCommand<out MhguHzv>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster\n"
    autoAck = AutoAckType.PUBLIC


    action {
        publicFollowUp { content = "ping" }
    }
}