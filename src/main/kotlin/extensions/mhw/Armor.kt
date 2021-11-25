package extensions.mhw

import arguments.MhwArmor
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.pagination.pages.Page
import com.kotlindiscord.kord.extensions.types.editingPaginator
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.Clock
import utils.CatBot

@KordPreview
val MhwArmorCommand: suspend PublicSlashCommand<out MhwArmor>.() -> Unit = {
    name = "armor"
    description = "Get info for a specific armor set"

    val id = kord.selfId
    action {
        val botUser = guild?.members?.first { it.id == id }
        val searchTerm = arguments.armorName.lowercase().replace(" ", "")
        val armor = ApiClient.MHW.armors[searchTerm]

        if (armor == null) {
            respond { content = "not found" }
        } else {
            val paginator = editingPaginator {
                runBlocking {
                    owner = user.asUserOrNull()
                }

                page(
                    Page {
                        title = armor.name
                        color = Color.CatBot

                        field {
                            name = "Set Bonus"
                            value = armor.setBonus.joinToString("\n") {
                                "${it.name}: ${it.description} (${it.pieces} pieces)"
                            }
                        }

                        field {
                            name = "Pieces"
                            value = armor.pieces.joinToString("\n") {
                                "${it.name} (${it.type})"
                            }
                        }

                        field {
                            name = "Resistances"
                            value = """
                                🔥 ${armor.resistances.fire}
                                💧 ${armor.resistances.water}
                                ⚡ ${armor.resistances.thunder}
                                ❄ ${armor.resistances.ice}
                                🐉 ${armor.resistances.dragon}
                            """.trimIndent()
                            inline = true
                        }

                        field {
                            name = "Defenses"
                            value = """
                                Base: ${armor.defenses.base}
                                Max: ${armor.defenses.max}
                                Augmented: ${armor.defenses.augmented}
                            """.trimIndent()
                            inline = true
                        }

                        footer {
                            text = ""
                            icon = botUser?.avatar?.url
                        }

                        timestamp = Clock.System.now()
                    }
                )

                page(
                    Page {
                        title = armor.name
                        color = Color.CatBot

                        field {
                            name = "Slots"
                            value = armor.slots.joinToString("\n") {
                                "${it.name}: Slot LV${it.rank}"
                            }
                            inline = true
                        }

                        field {
                            name = "Skills"
                            value = armor.skills.joinToString("\n") {
                                "${it.name} LV${it.rank} (${it.piece})"
                            }
                            inline = true
                        }

                        footer {
                            text = ""
                            icon = botUser?.avatar?.url
                        }

                        timestamp = Clock.System.now()
                    }
                )
            }

            paginator.send()
        }
    }
}