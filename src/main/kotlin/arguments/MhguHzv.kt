package arguments

import autocomplete.MhguMonsterAutoComplete
import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhguHzv: Arguments() {
    val monsterName by string {
        name = "monster_name"
        description = "Get hzv info for a specific monster"

        autoComplete(MhguMonsterAutoComplete)
    }
}