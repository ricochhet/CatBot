package arguments

import com.kotlindiscord.kord.extensions.commands.converters.impl.int
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import dev.kord.common.annotation.KordPreview

@KordPreview
class CalcTElem: Arguments() {
    val attack by int("attack", "in-game attack value")
}