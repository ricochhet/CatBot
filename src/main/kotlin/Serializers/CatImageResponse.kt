package Serializers

import kotlinx.serialization.Serializable

@Serializable
data class CatImageResponse (
    val url: String
)