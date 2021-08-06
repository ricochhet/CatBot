package Serializers


import kotlinx.serialization.Serializable

@Serializable
data class ArmorBonus (
    val name: String,
    val description: String,
    val pieces: Int,
)

@Serializable
data class ArmorDefenses (
    val base: Int,
    val max: Int,
    val augmented: Int,
)

@Serializable
data class ArmorResistances (
    val fire: Int,
    val water: Int,
    val thunder: Int,
    val ice: Int,
    val dragon: Int,
)

@Serializable
data class ArmorPiece (
    val name: String,
    val type: String,
)

@Serializable
data class ArmorSkill (
    val piece: String,
    val name: String,
    val rank: Int,
)

@Serializable
data class ArmorSlot (
    val name: String,
    val rank: Int,
)

object ArmorSlotsSerializer : EmptyListSerializer<ArmorSlot>(ArmorSlot.serializer())
object ArmorSetBonusSerializer : EmptyListSerializer<ArmorBonus>(ArmorBonus.serializer())

@Serializable
data class MHWArmorsResponse (
    val name: String,
    val rank: String,
    @Serializable(with=ArmorSetBonusSerializer::class)
    val setBonus: List<ArmorBonus>,
    val defenses: ArmorDefenses,
    val resistances: ArmorResistances,
    val pieces: List<ArmorPiece>,
    val skills: List<ArmorSkill>,
    @Serializable(with=ArmorSlotsSerializer::class)
    val slots: List<ArmorSlot>,
)