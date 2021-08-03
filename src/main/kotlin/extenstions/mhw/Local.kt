package extenstions.mhw

import arguments.MhwLocale
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwLocaleCommand: suspend SlashCommand<out MhwLocale>.() -> Unit = {
    name = "locale"
    description = "Get info for a guiding lands locale"
    autoAck = AutoAckType.PUBLIC

    action {
        publicFollowUp { content = "ping" }
    }
}