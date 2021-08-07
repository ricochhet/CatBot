package extenstions.mhw

import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.interaction.embed
import kotlinx.datetime.Clock
import utils.CatBotColor

@KordPreview
val MhwRollHuntCommand: suspend SlashCommand<out Arguments>.() -> Unit = {
    name = "rollhunt"
    description = "Get a random roll of what monster you should hunt with which gear"
    autoAck = AutoAckType.EPHEMERAL

    action {
        val monster = ApiClient.MHW.monsters.random()
        val armor = ApiClient.MHW.armors.values.random()
        val weapon = ApiClient.MHW.weapons.values.random()

        ephemeralFollowUp {
            embed {
                title = "Roll Hunt"
                color = CatBotColor

                field {
                    name = "Monster"
                    value = monster.details.title
                }

                field {
                    name = "Armor"
                    value = armor.name
                }

                field {
                    name = "Weapon"
                    value = "${weapon.type}: ${weapon.name}"
                }

                timestamp = Clock.System.now()

                thumbnail {
                    url = monster.details.thumbnail
                }

                footer { text = "RollHunt" }
            }
        }
    }
}