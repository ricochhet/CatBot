package extensions.mhw

import arguments.MhwDeco
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import java.util.logging.Logger

@KordPreview
val MhwDecoCommand: suspend PublicSlashCommand<out MhwDeco>.() -> Unit = {
    name = "deco"
    description = "Get info for a specific decoration"

    // TODO: 08/08/2021 Implement searching for decoration by skill as backup if a exact match cannot be found.
    action {
        val log = Logger.getLogger("Mhw")
        log.info("Received command: mhw %s (deco=%s)".format(commandName, arguments.decoName))

        val searchTerm = arguments.decoName.lowercase().replace(" ", "")
        val decoration = ApiClient.MHW.decorations[searchTerm]

        respond {
           if (decoration == null) {
                content = "Not Found"
            } else {
                embed {
                    title = decoration.name
                    color = Color.CatBot

                    field {
                        name = "Skills"
                        value = decoration.skills.joinToString("\n") {
                            "${it.name}: ${it.description} LV${it.level}"
                        }
                    }

                    field {
                        name = "Rarity"
                        value = decoration.rarity.toString()
                        inline = true
                    }

                    field {
                        name = "Slot Level"
                        value = decoration.slot.toString()
                        inline = true
                    }

                    footer {
                        text = decoration.name
                    }

                    timestamp = Clock.System.now()
                }
            }
        }
    }
}