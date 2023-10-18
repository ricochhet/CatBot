package serializers

import kotlinx.serialization.KSerializer
import kotlinx.serialization.builtins.nullable
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.JsonTransformingSerializer
import kotlinx.serialization.json.jsonPrimitive

// Little Sketchy, We trick the compiler into allowing us to pass in a Nullable Serializer
// but seems to work, regardless :D
object EmptyInt : JsonTransformingSerializer<Int>(Int.serializer().nullable as KSerializer<Int>) {
    override fun transformDeserialize(element: JsonElement): JsonElement {
        return if (element.jsonPrimitive == JsonPrimitive("-")) JsonPrimitive(null as Number?) else element
    }
}