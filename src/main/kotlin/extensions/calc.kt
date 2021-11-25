package extensions

import arguments.CalcTElem
import arguments.CalcTRaw
import com.kotlindiscord.kord.extensions.commands.application.slash.publicSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extensions.calc.*


@OptIn(KordPreview::class)
class Calc: Extension() {
    override val name = "Calc"

    override suspend fun setup() {
        publicSlashCommand {
            name = "calc"
            description = "Math/Calculation (MHWI)"
            guild( Snowflake("638517240475549736") )

            publicSubCommand(::CalcTElem, CalcTElemCommand)
            publicSubCommand(::CalcTRaw, CalcTRawCommand)
        }
    }
}