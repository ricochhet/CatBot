package arguments


import com.kotlindiscord.kord.extensions.commands.converters.impl.int
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.converters.ChoiceEnum
import com.kotlindiscord.kord.extensions.commands.slash.converters.impl.enumChoice
import dev.kord.common.annotation.KordPreview

enum class CalcTRawChoice( override val readableName: String ): ChoiceEnum {
    bow("bow"),
    cb("cb"),
    db("db"),
    gs("gs"),
    gl("gl"),
    hammer("hammer"),
    hgb("hgb"),
    hh("hh"),
    ig("ig"),
    lance("lance"),
    lgb("lgb"),
    ls("ls"),
    sa("sa"),
    sns("sns")
}

@KordPreview
class CalcTRaw: Arguments() {
    val weaponType by enumChoice<CalcTRawChoice>("weapon_type", "choice of weapon", typeName = "test")
    val attack by int("attack", "in-game attack value")
}