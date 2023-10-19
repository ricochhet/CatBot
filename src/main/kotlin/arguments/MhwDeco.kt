package arguments

import autocomplete.MhwDecoAutoComplete
import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.converters.impl.string

class MhwDeco: Arguments() {
    val decoName by string {
        name = "deco_name"
        description = "Get info for a specific decoration"

        autoComplete(MhwDecoAutoComplete)
    }
}