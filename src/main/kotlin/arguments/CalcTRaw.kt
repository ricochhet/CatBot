package arguments


import com.kotlindiscord.kord.extensions.commands.converters.impl.decimal
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
    sns("sns");

    val bloat: Double get() = when (this) {
        bow -> 1.2
        cb -> 3.6
        db -> 1.4
        gs -> 4.0
        gl -> 2.3
        hammer -> 5.2
        hgb -> 1.5
        hh -> 4.2
        ig -> 3.1
        lance -> 2.3
        lgb -> 1.3
        ls -> 3.3
        sa -> 3.5
        sns -> 1.4
    }
}

@KordPreview
class CalcTRaw: Arguments() {
    val weaponType by enumChoice<CalcTRawChoice>("weapon_type", "choice of weapon", typeName = "test")
    val attack by decimal("attack", "in-game attack value")
}