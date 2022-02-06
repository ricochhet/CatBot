package extensions.mhw

import arguments.MhwRollHunt
import com.kotlindiscord.kord.extensions.commands.application.slash.EphemeralSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot

@KordPreview
val MhwRollHuntCommand: suspend EphemeralSlashCommand<out MhwRollHunt>.() -> Unit = {
    name = "rollhunt"
    description = "Get a random roll of what monster you should hunt with which gear"

    action {
        val monster = ApiClient.MHW.monsters.random()
        val armor = ApiClient.MHW.armors.values.random()
        val weapon = ApiClient.MHW.weapons.values.filter {
            if (arguments.weaponType?.name == null) return@filter true
            it.type == arguments.weaponType?.readableName
        }.random()

        respond {
            embed {
                title = "Roll Hunt"
                color = Color.CatBot

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