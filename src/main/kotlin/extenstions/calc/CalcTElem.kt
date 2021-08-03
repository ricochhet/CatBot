package extenstions.calc

import arguments.CalcTElem
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val CalcTElemCommand: suspend SlashCommand<out CalcTElem>.() -> Unit = {
    name = "telem"
    description = "True elemental value (removed bloat modifier)"
    autoAck = AutoAckType.PUBLIC


    action {
        publicFollowUp { content = "test 2" }
    }
}