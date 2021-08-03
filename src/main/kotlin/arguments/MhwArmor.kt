package arguments

import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwArmor: Arguments() {
    val armorName by string("armor_name", "Get info for a specific armor set")
}