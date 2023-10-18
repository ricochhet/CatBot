package serializers

import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.serializer


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

@Serializable
data class WeaponElement (
    val type: String,
    val damage: Int,
)

@Serializable
data class WeaponMaterial (
    val name: String,
    val quantity: Int,
)

@Serializable
data class WeaponSlotRanked (
    val rank: Int
)

@Serializable
data class WeaponUpgrade(
    val name: String,
    val quantity: Int
)

object WeaponUpgradeSerializer: EmptyListSerializer<WeaponUpgrade>(WeaponUpgrade.serializer())
object WeaponSlotsSerializer : EmptyListSerializer<WeaponSlotRanked>(WeaponSlotRanked.serializer())
object WeaponCoatingSerializer: EmptyListSerializer<String>(String.serializer())
object WeaponMaterialSerializer : EmptyListSerializer<WeaponMaterial>(WeaponMaterial.serializer())
object WeaponElementsSerializer : EmptyListSerializer<WeaponElement>(WeaponElement.serializer())
object WeaponAmmosSerializer : EmptyListSerializer<WeaponAmmo>(WeaponAmmo.serializer())

object NullableWeaponShelling: NullableSerializer<WeaponShelling>(WeaponShelling.serializer())
object NullableWeaponSharpness: NullableSerializer<WeaponSharpness>(WeaponSharpness.serializer())


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