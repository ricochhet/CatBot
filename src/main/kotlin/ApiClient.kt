import io.ktor.client.call.body
import serializers.*
import io.ktor.client.request.*
import kotlinx.coroutines.runBlocking

object ApiClient {
    val baseHost = env["bot_api_url"]

    object CAT {
        val facts: List<String> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/cats/facts")
                }.body()
            }
        }
    }

    object MHW {
        val armors: Map<String, MHWArmorsResponse> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/mhw/armors")
                }.body()
            }
        }

        val decorations: Map<String, MHWDecorationResponse> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/mhw/decorations")
                }.body()
            }
        }

        val items: Map<String, MHWItemsResponse> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/mhw/items")
                }.body()
            }
        }

        val monsters: List<MHWMonsterResponse> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/mhw/monsters")
                }.body()
            }
        }

        val skills: Map<String, MHWSkillsResponse> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/mhw/skills")
                }.body()
            }
        }

        val weapons: Map<String, MHWWeaponResponse> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/mhw/weapons")
                }.body()
            }
        }

        val monsterRewards: Map<String, List<MHWMonsterRewardsResponse>> by lazy {
            runBlocking {
                httpClient.get {
                    url("$baseHost/api/mhw/monsters/rewards")
                }.body()
            }
        }
    }
}