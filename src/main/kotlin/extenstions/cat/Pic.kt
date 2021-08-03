package extenstions.cat

import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val CatPicCommand: suspend SlashCommand<out Arguments>.() -> Unit = {
    name = "pic"
    description = "Shows a random cat pictures"
    autoAck = AutoAckType.PUBLIC


    action {
        publicFollowUp { content = "ping" }
    }
}