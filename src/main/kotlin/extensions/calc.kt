package extensions

import arguments.CalcTElem
import arguments.CalcTRaw
import com.kotlindiscord.kord.extensions.commands.application.slash.publicSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import extensions.calc.*
class Calc: Extension() {
    override val name = "Calc"

    override suspend fun setup() {
        publicSlashCommand {
            name = "calc"
            description = "Math/Calculation (MHWI)"

            publicSubCommand(::CalcTElem, CalcTElemCommand)
            publicSubCommand(::CalcTRaw, CalcTRawCommand)
        }
    }
}