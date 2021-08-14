package extensions.mhw

import arguments.MhwItem
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot

@KordPreview
val MhwItemCommand: suspend SlashCommand<out MhwItem>.() -> Unit = {
    name = "item"
    description = "Get info for a specific item"
    autoAck = AutoAckType.PUBLIC

    action {
        val searchTerm = arguments.itemName.lowercase().replace("", "")
        val item = ApiClient.MHW.items[searchTerm]
        publicFollowUp {
            if (item == null) {
                content = "not found"
            } else {
                embed {
                    title = item.name
                    description = item.description
                    color = Color.CatBot

                    field {
                        name = "Rarity"
                        value = item.rarity.toString()
                        inline = true
                    }

                    field {
                        name = "Max"
                        value = item.carryLimit.toString()
                        inline = true
                    }

                    field {
                        name = "Sell"
                        value = item.value.toString()
                        inline = true
                    }

                    footer {
                        text = item.name
                    }

                    timestamp = Clock.System.now()
                }
            }
        }
    }
}