package extenstions

import arguments.CalcTElem
import arguments.CalcTRaw
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extenstions.calc.*


@OptIn(KordPreview::class)
class Calc: Extension() {
    override val name = "Calc"

    override suspend fun setup() {
        slashCommand {
            name = "calc"
            description = "Math/Calculation (MHWI)"
            guild = Snowflake("638517240475549736")
            autoAck = AutoAckType.PUBLIC

            subCommand(::CalcTElem, CalcTElemCommand)
            subCommand(::CalcTRaw, CalcTRawCommand)
        }
    }
}