package Serializers

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.KSerializer
import kotlinx.serialization.builtins.nullable
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.nullable
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

@OptIn(ExperimentalSerializationApi::class)
open class NullableSerializer <T> (private val serialName: String, private val delegate: KSerializer<T>) : KSerializer<T> {
    override val descriptor: SerialDescriptor = SerialDescriptor(serialName, delegate.descriptor.nullable)
    private val stringDelegate = String.serializer().nullable

    override fun deserialize(decoder: Decoder): T {
        val res = try {
            delegate.deserialize(decoder)
        } catch (e: Exception) {
            stringDelegate.deserialize(decoder)
        }

        return if ( res is String ) {
            null as T
        } else {
            res as T
        }
    }

    override fun serialize(encoder: Encoder, value: T) = TODO("Not yet implemented")
}