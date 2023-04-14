package arguments

import autocomplete.MhwWeaponAutoComplete
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwWeapon: Arguments() {
    val weaponName by string {
        name = "weapon_name"
        description = "Get info for a specific weapon"

        autoComplete(MhwWeaponAutoComplete)
    }
}