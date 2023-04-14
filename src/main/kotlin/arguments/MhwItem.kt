package arguments

import autocomplete.MhwItemAutoComplete
import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwItem: Arguments() {
    val itemName by string{
        name = "item_name"
        description = "Get info for a specific item"

        autoComplete(MhwItemAutoComplete)
    }
}