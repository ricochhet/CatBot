package Serializers

import kotlinx.serialization.Serializable

@Serializable
data class MonsterHZV (
    val slash: Int,
    val blunt: Int,
    val shot: Int,
    val fire: Int,
    val water: Int,
    val thunder: Int,
    val ice: Int,
    val dragon: Int
)

@Serializable
data class MonsterLocations (
    val name: String,
    val color: String,
)

@Serializable
data class MonsterDetails(
    val aliases: List<String>,
    val title: String,
    val url: String,
    val description: String,
    val thumbnail: String,
    val elements: List<String>,
    val ailments: List<String>,
    val locations: List<MonsterLocations>,
    val info: String,
    val hzv: MonsterHZV,
    val icon: String,
    val species: String,
    val useful_info: String,
    val resistances: List<String>,
    val weakness: List<String>,
    val filename: String,
    val threat_level: String? = null
)

@Serializable
data class MHWMonsterResponse (
    val name: String,
    val details: MonsterDetails,
)