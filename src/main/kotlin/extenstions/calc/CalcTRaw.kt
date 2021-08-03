package extenstions.calc


import arguments.CalcTRaw
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val CalcTRawCommand: suspend SlashCommand<out CalcTRaw>.() -> Unit = {
    name = "traw"
    description = "True attack value (removed bloat modifier)"
    autoAck = AutoAckType.PUBLIC

    action {
        publicFollowUp { content = "test 1" }
    }
}