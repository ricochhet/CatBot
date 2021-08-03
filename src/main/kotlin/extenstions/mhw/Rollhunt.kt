package extenstions.mhw

import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwRollHuntCommand: suspend SlashCommand<out Arguments>.() -> Unit = {
    name = "rollhunt"
    description = "Get a random roll of what monster you should hunt with which gear"
    autoAck = AutoAckType.PUBLIC

    action {
        publicFollowUp { content = "ping" }
    }
}