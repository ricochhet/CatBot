package arguments

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.converters.impl.decimal
import dev.kord.common.annotation.KordPreview

@KordPreview
class CalcTElem: Arguments() {
    val attack by decimal {
        name = "attack"
        description = "in-game attack value"
    }
}