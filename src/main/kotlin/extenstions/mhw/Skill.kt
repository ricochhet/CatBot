package extenstions.mhw

import arguments.MhwSkill
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.interaction.embed
import kotlinx.datetime.Clock
import utils.CatBotColor

@KordPreview
val MhwSkillCommand: suspend SlashCommand<out MhwSkill>.() -> Unit = {
    name = "skill"
    description = "Get info for a specific skill"
    autoAck = AutoAckType.PUBLIC

    action {
        val searchTerm = arguments.skillName.lowercase().replace(" ", "")
        val skill = ApiClient.MHW.skills[searchTerm]
        publicFollowUp {
            if (skill == null) {
                content = "not found"
            } else {
                embed {
                    title = skill.name
                    description = skill.description
                    color = CatBotColor

                    field {
                        name = "Levels"
                        value = skill.ranks.joinToString("\n") { rank ->
                            val index = skill.ranks.indexOf(rank)
                            "LV${index + 1}: ${rank.description}"
                        }
                    }

                    footer {
                        text = skill.name
                    }

                    timestamp = Clock.System.now()
                }
            }
        }
    }
}