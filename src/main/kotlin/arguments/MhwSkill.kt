package arguments

import autocomplete.MhwSkillAutoComplete
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwSkill: Arguments() {
    val skillName by string{
        name = "skill_name"
        description = "Get info for a specific skill"

        autoComplete(MhwSkillAutoComplete)
    }
}