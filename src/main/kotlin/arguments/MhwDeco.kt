package arguments

import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class MhwDeco: Arguments() {
    val decoName by string("deco_name", "Get info for a specific decoration")
}