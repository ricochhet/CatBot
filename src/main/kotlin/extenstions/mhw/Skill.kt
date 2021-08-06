package extenstions.mhw

import arguments.MhwSkill
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwSkillCommand: suspend SlashCommand<out MhwSkill>.() -> Unit = {
    name = "skill"
    description = "Get info for a specific skill"
    autoAck = AutoAckType.PUBLIC

    action {
        val searchTerm = arguments.skillName.lowercase().replace(" ", "")
        val res = ApiClient.MHW.skills[searchTerm]
        publicFollowUp {
            content = if (res == null) {
                "not found"
            } else {
                println( res )
                "found"
            }
        }
    }
}