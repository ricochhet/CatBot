package extensions.mhw

import serializers.MHWMonsterResponse
import arguments.MhwLocale
import arguments.MhwLocaleChoice
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import java.io.File
import java.io.InputStream

@OptIn(KordPreview::class)
fun getLocaleThumbnail(locale: MhwLocaleChoice): InputStream {
    return when (locale) {
        MhwLocaleChoice.Forest_Region -> File("src/main/resources/source_files/MonsterDataImages/assets/mhw/locale_icons/localeForest.png")
        MhwLocaleChoice.Wildspire_Region -> File("src/main/resources/source_files/MonsterDataImages/assets/mhw/locale_icons/localeWaste.png")
        MhwLocaleChoice.Coral_Region -> File("src/main/resources/source_files/MonsterDataImages/assets/mhw/locale_icons/localeCoral.png")
        MhwLocaleChoice.Rotted_Region -> File("src/main/resources/source_files/MonsterDataImages/assets/mhw/locale_icons/localeRotten.png")
        MhwLocaleChoice.Volcanic_Region -> File("src/main/resources/source_files/MonsterDataImages/assets/mhw/locale_icons/localeElder.png")
        MhwLocaleChoice.Tundra_Region -> File("src/main/resources/source_files/MonsterDataImages/assets/mhw/locale_icons/localeFrost.png")
    }.inputStream()
}

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
            files.add(
                Pair(
                    "locale.png",
                    getLocaleThumbnail(arguments.localeName)
                )
            )

            embed {
                title = region
                color = when (arguments.localeName) {
                    MhwLocaleChoice.Forest_Region -> Color(30, 158, 71)
                    MhwLocaleChoice.Wildspire_Region -> Color(242, 162, 44)
                    MhwLocaleChoice.Coral_Region -> Color(134, 224, 212)
                    MhwLocaleChoice.Rotted_Region -> Color(191, 87, 38)
                    MhwLocaleChoice.Volcanic_Region -> Color(237, 81, 47)
                    MhwLocaleChoice.Tundra_Region -> Color(138, 190, 235)
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

                thumbnail {
                    url = "attachment://locale.png"
                }

                footer {
                    text = "*Bold names can only be tempered in that area"
                }
            }
        }
    }
}