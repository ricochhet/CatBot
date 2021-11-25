package extensions.calc

import arguments.CalcTElem
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import kotlin.math.round

@KordPreview
val CalcTElemCommand: suspend PublicSlashCommand<out CalcTElem>.() -> Unit = {
    name = "telem"
    description = "True elemental value (removed bloat modifier)"

    action {
        val result = round(arguments.attack / 10)
        respond {
            embed {
                color = Color.CatBot

                field {
                    name = "Formula"
                    value = "*Elemental / 10*"
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