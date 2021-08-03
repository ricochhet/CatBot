package arguments

import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwItem: Arguments() {
    val itemName by string("item_name", "Get info for a specific item")
}