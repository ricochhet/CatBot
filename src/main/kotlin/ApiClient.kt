
import serializers.*
import io.ktor.client.request.*
import kotlinx.coroutines.runBlocking

object ApiClient {
    val host = env["bot_api_url"]

    object CAT {
        val facts: List<String> by lazy {
            runBlocking {
                httpClient.get("$host/api/cats/facts")
            }
        }
    }

    object MHW {
        val armors: Map<String, MHWArmorsResponse> by lazy {
            runBlocking {
                httpClient.get("$host/api/mhw/armors")
            }
        }

        val decorations: Map<String, MHWDecorationResponse> by lazy {
            runBlocking {
                httpClient.get("$host/api/mhw/decorations")
            }
        }

        val items: Map<String, MHWItemsResponse> by lazy {
            runBlocking {
                httpClient.get("$host/api/mhw/items")
            }
        }

        val monsters: List<MHWMonsterResponse> by lazy {
            runBlocking {
                httpClient.get("$host/api/mhw/monsters")
            }
        }

        val skills: Map<String, MHWSkillsResponse> by lazy {
            runBlocking {
                httpClient.get("$host/api/mhw/skills")
            }
        }

        val weapons: Map<String, MHWWeaponResponse> by lazy {
            runBlocking {
                httpClient.get("$host/api/mhw/weapons")
            }
        }

        val monsterRewards: Map<String, List<MHWMonsterRewardsResponse>> by lazy {
            runBlocking {
                httpClient.get("$host/api/mhw/monsters/rewards")
            }
        }
    }
}