package arguments

import autocomplete.MhwItemAutoComplete
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.Arguments

class MhwItem: Arguments() {
    val itemName by string{
        name = "item_name"
        description = "Get info for a specific item"

        autoComplete(MhwItemAutoComplete)
    }
}