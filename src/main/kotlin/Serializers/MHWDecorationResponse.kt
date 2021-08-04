package Serializers

import kotlinx.serialization.Serializable

@Serializable
data class DecortationSkill (
    val name: String,
    val description: String,
    val level: Int,
)

@Serializable
data class MHWDecorationResponse (
    val name: String,
    val rarity: Int,
    val slot: Int,
    val skills: List<DecortationSkill>
)