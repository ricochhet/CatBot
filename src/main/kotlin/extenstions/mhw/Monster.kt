package extenstions.mhw

import arguments.MhwMonster
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.interaction.embed
import kotlinx.datetime.Clock
import utils.CatBotColor

@KordPreview
val MhwMonsterCommand: suspend SlashCommand<out MhwMonster>.() -> Unit = {
    name = "monster"
    description = "Get info for a specific monster"
    autoAck = AutoAckType.PUBLIC

    action {
        val monster = ApiClient.MHW.monsters.find {
            it.name.lowercase() == arguments.monsterName.lowercase()
        }

        publicFollowUp {
            if (monster === null) {
                content = "Not found"
            } else {
                embed {
                    val monsterTitle = monster.name.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
                    title = "__**${monsterTitle}**__ ${monster.details.threat_level ?: ""}"
                    color = CatBotColor

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