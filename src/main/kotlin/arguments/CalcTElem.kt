package arguments

import com.kotlindiscord.kord.extensions.commands.converters.impl.decimal
import com.kotlindiscord.kord.extensions.commands.converters.impl.int
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class CalcTElem: Arguments() {
    val attack by decimal("attack", "in-game attack value")
}