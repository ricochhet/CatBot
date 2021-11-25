package extensions.calc

import arguments.CalcTRaw
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import kotlin.math.round

@KordPreview
val CalcTRawCommand: suspend PublicSlashCommand<out CalcTRaw>.() -> Unit = {
    name = "traw"
    description = "True attack value (removed bloat modifier)"

    action {
        val result = round(arguments.attack / arguments.weaponType.bloat)
        respond {
            embed {
                color = Color.CatBot

                field {
                    name = "Formula"
                    value = "*Attack / Bloat Modifier*"
                }

                field {
                    name = "Answer"
                    value = "**$result**"
                }

                timestamp = Clock.System.now()
                footer {
                    text = commandName.uppercase() + " Menu"
                }
            }
        }
    }
}