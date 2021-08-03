package extenstions.mhw

import arguments.MhwHzv
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwHzvCommand: suspend SlashCommand<out MhwHzv>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster"
    autoAck = AutoAckType.PUBLIC

    action {
        publicFollowUp { content = "ping" }
    }
}