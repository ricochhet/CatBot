package Serializers

import kotlinx.serialization.Serializable

@Serializable
data class MHWItemsResponse (
    val name: String,
    val description: String,
    val rarity: Int,
    val carryLimit: Int,
    val value: Int
)