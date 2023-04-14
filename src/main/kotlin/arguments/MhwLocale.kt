package arguments

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.application.slash.converters.ChoiceEnum
import com.kotlindiscord.kord.extensions.commands.application.slash.converters.impl.enumChoice

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
    val localeName by enumChoice<MhwLocaleChoice>{
        name = "locale_name"
        description = "Available regions"
        typeName = "test"
    }
}