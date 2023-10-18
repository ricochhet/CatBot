package arguments

import autocomplete.MhwArmorAutoComplete
import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.converters.impl.string

class MhwArmor: Arguments() {
    val armorName by string {
        name = "armor_name"
        description = "Get info for a specific armor set"

        autoComplete(MhwArmorAutoComplete)
    }
}