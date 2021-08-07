package extenstions.mhw

import Serializers.MHWMonsterResponse
import arguments.MhwLocale
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.interaction.embed
import utils.CatBotColor

// TODO: 07/08/2021 Add Locale thumbnail from resource (if possible)

@KordPreview
val MhwLocaleCommand: suspend SlashCommand<out MhwLocale>.() -> Unit = {
    name = "locale"
    description = "Get info for a guiding lands locale"
    autoAck = AutoAckType.PUBLIC

    action {
        val region = arguments.localeName.name.replace("_", " ")

        val monsters = ApiClient.MHW.monsters.filter { monster ->
            val location = monster.details.locations
                .find { location ->
                    location.name == region
                }

            location != null && monster.details.threat_level != null
        }

        val threatlevels = Triple(
            first = monsters.filter { it.details.threat_level == "🔥" },
            second = monsters.filter { it.details.threat_level == "🔥🔥" },
            third = monsters.filter { it.details.threat_level == "🔥🔥🔥" }
        )

        fun transformer (monster: MHWMonsterResponse): CharSequence {
            val location = monster.details.locations
                .find { location ->
                    location.name == region
                }

            return if ( location?.tempered == true ) {
                "**${monster.details.title}**"
            } else {
                monster.details.title
            }
        }

        publicFollowUp {
            embed {
                title = region
                color = when (region) {
                    "Forest Region" -> Color(30, 158, 71)
                    "Wildspire Region" -> Color(242, 162, 44)
                    "Coral Region" -> Color(134, 224, 212)
                    "Rotted Region" -> Color(191, 87, 38)
                    "Volcanic Region" -> Color(237, 81, 47)
                    "Tundra Region" -> Color(138, 190, 235)
                    else -> CatBotColor
                }

                field {
                    name = "Threat Level 🔥🔥🔥:"
                    value = threatlevels.third.joinToString(", ", transform = ::transformer)
                }

                field {
                    name = "Threat Level 🔥🔥:"
                    value = threatlevels.second.joinToString(", ", transform = ::transformer)
                }

                field {
                    name = "Threat Level 🔥:"
                    value = threatlevels.first.joinToString(", ", transform = ::transformer)
                }

                footer {
                    text = "*Bold names can only be tempered in that area"
                }
            }
        }
    }
}