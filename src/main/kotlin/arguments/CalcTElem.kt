package arguments

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.converters.impl.decimal
class CalcTElem: Arguments() {
    val attack by decimal {
        name = "attack"
        description = "in-game attack value"
    }
}