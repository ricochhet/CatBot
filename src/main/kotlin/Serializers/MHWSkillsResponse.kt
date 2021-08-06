package Serializers

import kotlinx.serialization.Serializable

@Serializable
data class SkillsRank (
    val level: Int,
    val description: String
)

@Serializable
data class MHWSkillsResponse (
    val name: String,
    val description: String,
    val ranks: List<SkillsRank>
)