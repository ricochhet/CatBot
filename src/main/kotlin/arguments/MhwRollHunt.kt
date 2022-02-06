package arguments

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.application.slash.converters.ChoiceEnum
import com.kotlindiscord.kord.extensions.commands.application.slash.converters.impl.optionalEnumChoice

enum class RollHuntWeaponChoice( override val readableName: String ): ChoiceEnum {
    bow("bow"),
    cb("charge-blade"),
    db("dual-blades"),
    gs("great-sword"),
    gl("gunlance"),
    hammer("hammer"),
    hgb("heavy-bowgun"),
    hh("hunting-horn"),
    ig("insect-glaive"),
    lance("lance"),
    lgb("light-bowgun"),
    ls("long-sword"),
    sa("switch-axe"),
    sns("sword-and-shield");
}

class MhwRollHunt: Arguments() {
    val weaponType by optionalEnumChoice<RollHuntWeaponChoice> {
        name = "weapon_type"
        description = "Monster hunter world, weapon types"
        typeName = "weapon"
    }
}