package extensions.mhw

import arguments.MhwWeapon
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.components.forms.ModalForm
import com.kotlindiscord.kord.extensions.pagination.pages.Page
import com.kotlindiscord.kord.extensions.types.editingPaginator
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.Clock
import utils.CatBot
import java.util.*
import java.util.logging.Logger
import kotlin.math.round

val MhwWeaponCommand: suspend PublicSlashCommand<out MhwWeapon, ModalForm>.() -> Unit = {
    name = "weapon"
    description = "Get info for a specific weapon\n"

    val id = kord.selfId
    action {
        val log = Logger.getLogger("Mhw")
        log.info("Received command: mhw %s (weapon=%s)".format(commandName, arguments.weaponName))

        val botUser = guild?.members?.first { it.id == id }
        val searchTerm = arguments.weaponName.lowercase().replace(" ", "")
        val weapon = ApiClient.MHW.weapons[searchTerm]

        if (weapon == null) {
            respond { content = "not found" }
        } else {
            val paginator = editingPaginator {
                runBlocking {
                    owner = user.asUserOrNull()
                }

                page(
                    Page {
                        title = weapon.name
                        color = Color.CatBot

                        field { name = "Type"; value = weapon.type; inline = true }
                        field { name = "Rarity"; value = weapon.rarity.toString(); inline = true }
                        field { name = "Displayed Attack"; value = weapon.displayAttack.toString(); inline = true }
                        field { name = "Raw Attack"; value = round(weapon.rawAttack).toString(); inline = true }
                        field { name = "Damage Type"; value = weapon.damageType; inline = true }
                        field { name = "Affinity"; value = (weapon.affinity ?: "-").toString(); inline = true }
                        field { name = "Defense"; value = (weapon.defense ?: "-").toString(); inline = true }
                        field { name = "Elderseal"; value = weapon.elderseal; inline = true }
                        field {
                            name = "Shelling";
                            value = when (weapon.shelling) {
                                null -> "-"
                                else -> "${weapon.shelling.type} LV${weapon.shelling.level}"
                            };
                            inline = true
                        }
                        field { name = "Special Ammo"; value = weapon.specialAmmo; inline = true }
                        field { name = "Deviation"; value = weapon.deviation; inline = true }

                        field {
                            name = "Elements"
                            value = when (weapon.elements.size) {
                                0 -> "-"
                                else -> weapon.elements.joinToString("\n") {
                                    "${it.type}: ${it.damage} damage"
                                }
                            }
                            inline = true
                        }

                        field {
                            name = "Slots"
                            value = when (weapon.slots.size) {
                                0 -> "-"
                                else -> weapon.slots.joinToString("\n") {
                                    "Rank: ${it.rank}"
                                }
                            }
                            inline = true
                        }

                        field {
                            name = "Coatings"
                            value = when (weapon.coatings.size) {
                                0 -> "-"
                                else -> weapon.coatings.joinToString("\n")
                            }
                            inline = true
                        }

                        field {
                            name = "Sharpness (Handicraft 5)"
                            value = when (weapon.sharpness.base) {
                                null -> "-"
                                else -> """
                                    Red: ${weapon.sharpness.base.red}
                                    Orange: ${weapon.sharpness.base.orange}
                                    Yellow: ${weapon.sharpness.base.yellow}
                                    Green: ${weapon.sharpness.base.green}
                                    Blue: ${weapon.sharpness.base.blue}
                                    White: ${weapon.sharpness.base.white}
                                    Purple: ${weapon.sharpness.base.purple}
                                """.trimIndent()
                            }
                            inline = true
                        }

                        field {
                            name = "Forge"
                            value = when (weapon.crafting.size) {
                                0 -> "-"
                                else -> weapon.crafting.joinToString("\n") {
                                    "${it.name} (x${it.quantity})"
                                }
                            }
                            inline = true
                        }

                        field {
                            name = "Upgrade"
                            value = when (weapon.upgrade.size) {
                                0 -> "-"
                                else -> weapon.upgrade.joinToString ("\n") {
                                    "${it.name} (x${it.quantity})"
                                }
                            }
                            inline = true
                        }

                        footer {
                            text = ""
                            icon = botUser?.avatar?.cdnUrl?.toUrl()
                        }

                        timestamp = Clock.System.now()
                    }
                )

                page (
                    Page {
                        title = "${weapon.name} Ammos"
                        color = Color.CatBot

                        when (weapon.ammos.size) {
                            0 -> description = "Weapon has no ammo"
                            else -> weapon.ammos.forEach { ammo ->
                                field {
                                    name = ammo.type.replaceFirstChar {
                                        if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString()
                                    }
                                    value = """
                                        LV1: ${ammo.lv1}
                                        LV2: ${ammo.lv2}
                                        LV3: ${ammo.lv3}
                                    """.trimIndent()

                                    inline = true
                                }
                            }
                        }

                        timestamp = Clock.System.now()
                        footer {
                            text = ""
                            icon = botUser?.avatar?.cdnUrl?.toUrl()
                        }
                    }
                )
            }

            paginator.send()
        }
    }
}