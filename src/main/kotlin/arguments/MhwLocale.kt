package arguments

import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.converters.ChoiceEnum
import com.kotlindiscord.kord.extensions.commands.slash.converters.impl.enumChoice

import dev.kord.common.annotation.KordPreview

enum class MhwLocaleChoice( override val readableName: String ): ChoiceEnum {
    Forest_Region("forest"),
    Wildspire_Region("wildspire"),
    Coral_Region("coral"),
    Rotted_Region("rotted"),
    Volcanic_Region("volcanic"),
    Tundra_Region("tundra")
}

@KordPreview
class MhwLocale: Arguments() {
    val localeName by enumChoice<MhwLocaleChoice>("locale_name", "Available regions", typeName = "test")
}