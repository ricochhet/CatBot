package extenstions.mhw

import arguments.MhwMonster
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwMonsterCommand: suspend SlashCommand<out MhwMonster>.() -> Unit = {
    name = "monster"
    description = "Get info for a specific monster"
    autoAck = AutoAckType.PUBLIC

    action {
        publicFollowUp { content = "ping" }
    }
}