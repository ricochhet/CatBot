package extenstions.mhw

import arguments.MhwHzv
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.interaction.embed
import kotlinx.datetime.Clock
import utils.CatBot
import java.io.File

@KordPreview
val MhwHzvCommand: suspend SlashCommand<out MhwHzv>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster"
    autoAck = AutoAckType.PUBLIC

    action {
        val monster = ApiClient.MHW.monsters.find {
            it.name == arguments.monsterName.lowercase().replace(" ", "")
        }

        publicFollowUp {
            if (monster == null) {
                content = "not found"
            } else {
                val filename = monster.details.title.replace(" ", "_") + "_HZV.png"
                files.add(
                    Pair(
                        "HZV.png",
                        File("src/main/resources/source_files/MonsterDataImages/assets/mhw/monster/$filename").inputStream()
                    )
                )

                embed {
                    title = "**__${monster.details.title}__** ${monster.details.threat_level ?: ""}"
                    color = Color.CatBot

                    field {
                        name = "Classification:"
                        value = monster.details.species
                    }

                    field {
                        name = "Characteristics:"
                        value = monster.details.description
                    }

                    field {
                        val hzv = monster.details.hzv
                        name = "Slash: ${hzv.slash} Blunt: ${hzv.blunt} Shot: ${hzv.shot}"
                        value = "🔥 **${hzv.fire}** 💧 **${hzv.water}** ⚡ **${hzv.thunder}** ❄ **${hzv.ice}** 🐉 **${hzv.dragon}**"
                    }

                    image = "attachment://HZV.png"
                    thumbnail {
                        url = monster.details.thumbnail
                    }

                    footer {
                        text = monster.details.title
                    }

                    timestamp = Clock.System.now()
                }
            }
        }
    }
}