package extenstions.mhw

import arguments.MhwArmor
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import com.kotlindiscord.kord.extensions.pagination.pages.Page
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwArmorCommand: suspend SlashCommand<out MhwArmor>.() -> Unit = {
    name = "armor"
    description = "Get info for a specific armor set"
    autoAck = AutoAckType.PUBLIC

    action {
        val searchTerm = arguments.armorName.lowercase().replace(" ", "")
        val armor = ApiClient.MHW.armors[searchTerm]

        if (armor == null) {
            publicFollowUp { content = "not found" }
        } else {
            val paginator = paginator {
                page(
                    Page {

                    }
                )
            }
        }
    }
}