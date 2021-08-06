package extenstions.mhw

import arguments.MhwItem
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwItemCommand: suspend SlashCommand<out MhwItem>.() -> Unit = {
    name = "item"
    description = "Get info for a specific item"
    autoAck = AutoAckType.PUBLIC

    action {
        val searchTerm = arguments.itemName.lowercase().replace("", "")
        val res = ApiClient.MHW.items[searchTerm]
        publicFollowUp {
            content = if (res == null) {
                "not found"
            } else {
                println(res)
                "found"
            }
        }
    }
}