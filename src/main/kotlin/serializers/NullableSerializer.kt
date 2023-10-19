package serializers

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.KSerializer
import kotlinx.serialization.builtins.nullable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.JsonTransformingSerializer

@OptIn(ExperimentalSerializationApi::class)
open class NullableSerializer <T: Any> (test: KSerializer<T>) : JsonTransformingSerializer<T>(test.nullable as KSerializer<T>) {
    @OptIn(ExperimentalSerializationApi::class)
    override fun transformDeserialize(element: JsonElement): JsonElement =
        if (element == JsonPrimitive("-")) JsonPrimitive(null) else element
}