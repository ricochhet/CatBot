package Serializers

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MHWMonsterRewardsResponse(
    @SerialName("base_name_en") val name: String,
    val rank: String,
    @SerialName("condition_en") val condition: String,
    @SerialName("item_en") val item: String,
    val stack: String,
    val percentage: String,
    val key: String,
)