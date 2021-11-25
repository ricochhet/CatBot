package arguments

import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwWeapon: Arguments() {
    val weaponName by string("weapon_name", "Get info for a specific weapon")
}