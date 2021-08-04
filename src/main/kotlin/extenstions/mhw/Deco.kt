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
        val searchTerm = arguments.decoName.lowercase().replace(" ", "")
        val decoration = ApiClient.MHW.decorations[searchTerm]

        publicFollowUp {
            content = if (decoration == null) {
                "not found"
            } else {
                "found"
            }
        }
    }
}