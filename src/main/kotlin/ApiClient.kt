
import serializers.*
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
        val armors: Map<String, MHWArmorsResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/armors")
            }
        }

        val decorations: Map<String, MHWDecorationResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/decorations")
            }
        }

        val items: Map<String, MHWItemsResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/items")
            }
        }

        val monsters: List<MHWMonsterResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/monsters")
            }
        }

        val skills: Map<String, MHWSkillsResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/skills")
            }
        }

        val weapons: Map<String, MHWWeaponResponse> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/weapons")
            }
        }

        val monsterRewards: Map<String, List<MHWMonsterRewardsResponse>> by lazy {
            runBlocking {
                httpClient.get("http://localhost:8080/api/mhw/monsters/rewards")
            }
        }
    }
}