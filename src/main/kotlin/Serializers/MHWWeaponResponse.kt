package Serializers

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.nullable
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.nullable
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonTransformingSerializer

@OptIn(ExperimentalSerializationApi::class)
class EmptyInt : KSerializer<Int?> {
    override val descriptor = PrimitiveSerialDescriptor("EmptyInt", PrimitiveKind.INT).nullable

    private val intDelegate = Int.serializer().nullable
    private val stringDelegate = String.serializer().nullable

    override fun deserialize(decoder: Decoder): Int? {
        val res = try {
            intDelegate.deserialize(decoder)
        } catch (e: Exception) {
            stringDelegate.deserialize(decoder)
        }

        return if ( res is String ) {
            null
        } else {
            res as Int?
        }
    }

    override fun serialize(encoder: Encoder, value: Int?) = TODO("Not yet implemented")
}

@OptIn(ExperimentalSerializationApi::class)
class NullableWeaponShelling: KSerializer<WeaponShelling?> {
    override val descriptor: SerialDescriptor =
        SerialDescriptor("NullableWeaponShelling", WeaponShelling.serializer().nullable.descriptor)

    private val shellingDelegate = WeaponShelling.serializer().nullable
    private val stringDelegate = String.serializer().nullable

    override fun deserialize(decoder: Decoder): WeaponShelling? {
        val res = try {
            shellingDelegate.deserialize(decoder)
        } catch (e: Exception) {
            stringDelegate.deserialize(decoder)
        }

        return if ( res is String ) {
            null
        } else {
            res as WeaponShelling?
        }
    }

    override fun serialize(encoder: Encoder, value: WeaponShelling?) = TODO("Not yet implemented")
}

@OptIn(ExperimentalSerializationApi::class)
class NullableWeaponSharpness: KSerializer<WeaponSharpness?> {
    override val descriptor: SerialDescriptor =
        SerialDescriptor("NullableWeaponSharpness", WeaponSharpness.serializer().nullable.descriptor)

    private val sharpnessDelegate = WeaponSharpness.serializer().nullable
    private val stringDelegate = String.serializer().nullable

    override fun deserialize(decoder: Decoder): WeaponSharpness? {
        val res = try {
            sharpnessDelegate.deserialize(decoder)
        } catch (e: Exception) {
            stringDelegate.deserialize(decoder)
        }

        return if ( res is String ) {
            null
        } else {
            res as WeaponSharpness?
        }
    }

    override fun serialize(encoder: Encoder, value: WeaponSharpness?) = TODO("Not yet implemented")
}

@Serializable
data class WeaponSharpness (
    val red: Int,
    val orange: Int,
    val yellow: Int,
    val green: Int,
    val blue: Int,
    val white: Int,
    val purple: Int
)

@Serializable
data class WeaponSharpnessBase (
    @Serializable(with=NullableWeaponSharpness::class)
    val base: WeaponSharpness?
)

@Serializable
data class WeaponShelling (
    val type: String,
    val level: Int
)

@Serializable
data class WeaponAmmo (
    val type: String,
    val lv1: Int,
    val lv2: Int,
    val lv3: Int
)

object WeaponAmmosSerializer : JsonTransformingSerializer<List<WeaponAmmo>>(ListSerializer(WeaponAmmo.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

@Serializable
data class WeaponElement (
    val type: String,
    val damage: Int,
)

object WeaponElementsSerializer : JsonTransformingSerializer<List<WeaponElement>>(ListSerializer(WeaponElement.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

@Serializable
data class WeaponMaterial (
    val name: String,
    val quantity: Int,
)

object WeaponMaterialSerializer : JsonTransformingSerializer<List<WeaponMaterial>>(ListSerializer(WeaponMaterial.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

@Serializable
data class WeaponSlotRanked (
    val rank: Int
)

object WeaponSlotsSerializer : JsonTransformingSerializer<List<WeaponSlotRanked>>(ListSerializer(WeaponSlotRanked.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

@Serializable
data class WeaponUpgrade(
    val name: String,
    val quantity: Int
)

object WeaponUpgradeSerializer: JsonTransformingSerializer<List<WeaponUpgrade>>(ListSerializer(WeaponUpgrade.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

object WeaponCoatingSerializer: JsonTransformingSerializer<List<String>>(ListSerializer(String.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element !is JsonArray) JsonArray(listOf()) else element
}

@Serializable
data class MHWWeaponResponse(
    val name: String,
    val type: String,
    val rarity: Int,
    val displayAttack: Int,
    val rawAttack: Double,
    val damageType: String,
    @Serializable(with=EmptyInt::class)
    val affinity: Int? = null,
    @Serializable(with=EmptyInt::class)
    val defense: Int? = null,
    val sharpness: WeaponSharpnessBase,
    val elderseal: String,
    @Serializable(with=NullableWeaponShelling::class)
    val shelling: WeaponShelling? = null,
    val specialAmmo: String,
    val deviation: String,
    @Serializable(with=WeaponAmmosSerializer::class)
    val ammos: List<WeaponAmmo>,
    @Serializable(with=WeaponElementsSerializer::class)
    val elements: List<WeaponElement>,
    @Serializable(with=WeaponSlotsSerializer::class)
    val slots: List<WeaponSlotRanked>,
    @Serializable(with=WeaponCoatingSerializer::class)
    val coatings: List<String>,
    @Serializable(with=WeaponMaterialSerializer::class)
    val crafting: List<WeaponMaterial>,
    @Serializable(with=WeaponUpgradeSerializer::class)
    val upgrade: List<WeaponUpgrade>
)