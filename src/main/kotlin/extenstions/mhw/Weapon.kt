package extenstions.mhw


import arguments.MhwWeapon
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val MhwWeaponCommand: suspend SlashCommand<out MhwWeapon>.() -> Unit = {
    name = "weapon"
    description = "Get info for a specific weapon\n"
    autoAck = AutoAckType.PUBLIC

    action {
        val searchTerm = arguments.weaponName.lowercase().replace(" ", "")
        val weapon = ApiClient.MHW.weapons[searchTerm]

        publicFollowUp {
            content = if (weapon == null) {
                "not found"
            } else {
                println( weapon )
                "found"
            }
        }
    }
}