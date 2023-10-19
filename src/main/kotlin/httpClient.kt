import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json


private val clientConfig: HttpClientConfig<CIOEngineConfig>.() -> Unit = {
    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true;
        })
    }
}

val httpClient = HttpClient(CIO, clientConfig)