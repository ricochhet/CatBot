package extensions.calc

import arguments.CalcTElem
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.components.forms.ModalForm
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import java.util.logging.Logger
import kotlin.math.round

val CalcTElemCommand: suspend PublicSlashCommand<out CalcTElem, ModalForm>.() -> Unit = {


    name = "telem"
    description = "True elemental value (removed bloat modifier)"

    action {

        val log = Logger.getLogger("Calc")
        log.info("Received command: calc %s (attack=%s)".format(commandName, arguments.attack))

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