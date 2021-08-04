import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.json.*
import io.ktor.client.features.json.serializer.*

private val clientConfig: HttpClientConfig<CIOEngineConfig>.() -> Unit = {
    install(JsonFeature) {
        serializer = KotlinxSerializer(kotlinx.serialization.json.Json {
            ignoreUnknownKeys = true
        })
    }
}

val httpClient = HttpClient(CIO, clientConfig)