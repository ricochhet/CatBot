package arguments

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwArmor: Arguments() {
    val armorName by string("armor_name", "Get info for a specific armor set")
}