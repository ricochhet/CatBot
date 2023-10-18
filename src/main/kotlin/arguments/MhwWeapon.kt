package arguments

import autocomplete.MhwWeaponAutoComplete
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.Arguments

class MhwWeapon: Arguments() {
    val weaponName by string {
        name = "weapon_name"
        description = "Get info for a specific weapon"

        autoComplete(MhwWeaponAutoComplete)
    }
}