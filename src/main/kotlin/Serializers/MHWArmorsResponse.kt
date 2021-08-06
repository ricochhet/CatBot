package Serializers

import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonTransformingSerializer

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

object ArmorSetBonusSerializer : JsonTransformingSerializer<List<ArmorBonus>>(ListSerializer(ArmorBonus.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

object ArmorSlotsSerializer : JsonTransformingSerializer<List<ArmorSlot>>(ListSerializer(ArmorSlot.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

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