package arguments

import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhguHzv: Arguments() {
    val monsterName by string("monster_name", "Get hzv info for a specific monster")
}