package extensions.mhw

import arguments.MhwHzv
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.components.forms.ModalForm
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.rest.NamedFile
import dev.kord.rest.builder.message.create.embed
import io.ktor.client.request.forms.*
import io.ktor.utils.io.jvm.javaio.*
import kotlinx.datetime.Clock
import utils.CatBot
import java.io.File
import java.util.logging.Logger

val MhwHzvCommand: suspend PublicSlashCommand<out MhwHzv, ModalForm>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster"

    action {
    val log = Logger.getLogger("Mhw")
        log.info("Received command: mhw %s (monster=%s)".format(commandName, arguments.monsterName))

        val monster = ApiClient.MHW.monsters.find {
            it.name == arguments.monsterName.lowercase().replace(" ", "")
        }

        respond {
            if (monster == null) {
                content = "not found"
            } else {
                val filename = monster.details.title.replace(" ", "_") + "_HZV.png"
                files.add(
                    NamedFile("HZV.png",
                        ChannelProvider {
                            File("src/main/resources/source_files/MonsterDataImages/assets/mhw/monster/$filename").inputStream()
                                .toByteReadChannel()
                        })
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