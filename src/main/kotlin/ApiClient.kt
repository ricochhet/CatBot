
import Serializers.MHWDecorationResponse
import Serializers.MHWMonsterResponse
import io.ktor.client.request.*
import kotlinx.coroutines.runBlocking

object ApiClient {
    object CAT {
        val facts: List<String> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/cats/facts")
            }
        }
    }

    object MHW {
        val armors: Nothing by lazy {
            TODO("Not implement yet")
        }

        val decorations: Map<String, MHWDecorationResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/decorations")
            }
        }

        val items: Nothing by lazy {
            TODO("Not implement yet")
        }

        val monsters: List<MHWMonsterResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/monsters")
            }
        }

        val skills: Nothing by lazy {
            TODO("Not implement yet")
        }

        val weapons: Nothing by lazy {
            TODO("Not implement yet")
        }
    }
}