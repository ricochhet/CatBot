package extenstions.mhw

import arguments.MhwDeco
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwDecoCommand: suspend SlashCommand<out MhwDeco>.() -> Unit = {
    name = "deco"
    description = "Get info for a specific decoration"
    autoAck = AutoAckType.PUBLIC

    action {
        publicFollowUp { content = "ping" }
    }
}