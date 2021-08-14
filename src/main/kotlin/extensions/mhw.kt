package extensions

import arguments.*
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import extensions.mhw.*

@KordPreview
class Mhw: Extension() {
    override val name = "Mhw"
    override suspend fun setup() {
        slashCommand {
            name = "mhw"
            description = "Monster Hunter World: Iceborne"
            autoAck = AutoAckType.PUBLIC
            guild( Snowflake("638517240475549736") )

            subCommand(::MhwArmor, MhwArmorCommand)
            subCommand(::MhwDeco, MhwDecoCommand)
            subCommand(::MhwHzv, MhwHzvCommand)
            subCommand(::MhwItem, MhwItemCommand)
            subCommand(MhwListCommand)
            subCommand(::MhwLocale, MhwLocaleCommand)
            subCommand(::MhwMonster, MhwMonsterCommand)
            subCommand(MhwRollHuntCommand)
            subCommand(::MhwSkill, MhwSkillCommand)
            subCommand(::MhwWeapon, MhwWeaponCommand)
        }
    }
}