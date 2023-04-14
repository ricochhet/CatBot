package extensions.mhw

import arguments.MhwMonster
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import java.util.logging.Logger

@KordPreview
val MhwMonsterCommand: suspend PublicSlashCommand<out MhwMonster>.() -> Unit = {
    name = "monster"
    description = "Get info for a specific monster"

    action {
        val log = Logger.getLogger("Mhw")
        log.info("Received command: mhw %s (monster=%s)".format(commandName, arguments.monsterName))

        val monster = ApiClient.MHW.monsters.find {
            it.name.lowercase() == arguments.monsterName.lowercase()
        }

        respond {
            if (monster === null) {
                content = "Not found"
            } else {
                embed {
                    val monsterTitle = monster.details.title.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
                    title = "__**${monsterTitle}**__ ${monster.details.threat_level ?: ""}"
                    color = Color.CatBot

                    thumbnail { url = monster.details.thumbnail }

                    field {
                        name = "Classification:"
                        value = monster.details.species
                    }

                    field {
                        name = "Characteristics:"
                        value = monster.details.description
                    }

                    field {
                        name = "Elements"
                        value = monster.details.elements.joinToString(", ")
                        inline = true
                    }

                    field {
                        name = "Ailments"
                        value = monster.details.ailments.joinToString(", ")
                        inline = true
                    }

                    field {
                        name = "Resistances"
                        value = monster.details.resistances.joinToString(", ")
                        inline = true
                    }

                    field {
                        name = "Weaknesses ⭐⭐⭐"
                        value = monster.details.weakness
                            .filter { it.contains("(⭐⭐⭐)") }
                            .joinToString(", ") {
                                it.split(" ")[0]
                            }
                    }

                    field {
                        name = "Weaknesses ⭐⭐"
                        value = monster.details.weakness
                            .filter { it.contains("(⭐⭐)") }
                            .joinToString(", ") {
                                it.split(" ")[0]
                            }
                    }

                    field {
                        name = "Locations"
                        value = monster.details.locations.joinToString("\n") { it.name }
                    }

                    footer {
                        text = monsterTitle
                    }

                    timestamp = Clock.System.now()
                }
            }
        }
    }
}