package extensions

import arguments.*
import com.kotlindiscord.kord.extensions.commands.application.slash.ephemeralSubCommand
import com.kotlindiscord.kord.extensions.commands.application.slash.publicSubCommand
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extensions.mhw.*

@KordPreview
class Mhw: Extension() {
    override val name = "Mhw"
    override suspend fun setup() {
        publicSlashCommand {
            name = "mhw"
            description = "Monster Hunter World: Iceborne"

            publicSubCommand(::MhwArmor, MhwArmorCommand)
            publicSubCommand(::MhwDeco, MhwDecoCommand)
            publicSubCommand(::MhwHzv, MhwHzvCommand)
            publicSubCommand(::MhwItem, MhwItemCommand)
            publicSubCommand(MhwListCommand)
            publicSubCommand(::MhwLocale, MhwLocaleCommand)
            publicSubCommand(::MhwMonster, MhwMonsterCommand)
            ephemeralSubCommand(::MhwRollHunt, MhwRollHuntCommand)
            publicSubCommand(::MhwSkill, MhwSkillCommand)
            publicSubCommand(::MhwWeapon, MhwWeaponCommand)
        }
    }
}