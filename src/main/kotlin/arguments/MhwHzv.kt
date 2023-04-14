package arguments

import autocomplete.MhwMonsterAutoComplete
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwHzv: Arguments() {
    val monsterName by string{
        name = "monster_name"
        description = "Get hzv info for a specific monster"

        autoComplete( MhwMonsterAutoComplete )
    }
}