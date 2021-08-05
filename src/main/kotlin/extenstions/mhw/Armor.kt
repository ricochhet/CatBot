package extenstions.mhw

import arguments.MhwArmor
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwArmorCommand: suspend SlashCommand<out MhwArmor>.() -> Unit = {
    name = "armor"
    description = "Get info for a specific armor set"
    autoAck = AutoAckType.PUBLIC

    action {
        publicFollowUp { content = "ping" }
    }
}