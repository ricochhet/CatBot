package arguments

import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.converters.ChoiceEnum
import com.kotlindiscord.kord.extensions.commands.slash.converters.impl.enumChoice

import dev.kord.common.annotation.KordPreview

enum class MhwLocaleChoice( override val readableName: String ): ChoiceEnum {
    forest("forest"),
    wildspire("wildspire"),
    coral("coral"),
    rotted("rotted"),
    volcanic("volcanic"),
    tundra("tundra")
}

@KordPreview
class MhwLocale: Arguments() {
    val localeName by enumChoice<MhwLocaleChoice>("locale_name", "Available regions", typeName = "test")
}