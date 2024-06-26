package extensions
import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.ephemeralSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.entity.Snowflake
import dev.kord.rest.builder.message.create.embed
import kotlinx.datetime.Clock
import utils.CatBot
import utils.version
import java.util.logging.Logger

class About: Extension() {

    companion object {
        val LOG = Logger.getLogger(About::class.java.name)
    }

    override val name = "About"

    private val owner = Snowflake("838048123367456779")
    private val devs = listOf(
        Snowflake("264781399737892865"),
        Snowflake("123633666550136832"),
    )

    override suspend fun setup() {
        ephemeralSlashCommand {
            name = "about"
            description = "Shows extra information about the bot"

            action {
                LOG.info("Received command: about")

                val kord = this@ephemeralSlashCommand.kord
                val rico = kord.getUser( owner )?.tag ?: "Ricochet#9237"
                val team = devs.mapNotNull { dev -> kord.getUser(dev)?.tag }

                respond {
                    embed {
                        color = Color.CatBot
                        field {
                            name = "Owner:"
                            value = rico
                        }

                        field {
                            name = "Devs:"
                            value = team.joinToString("\n")
                        }

                        field {
                            name = "Contributors:"
                            value = """
                                MechE
                                MoonBunnie
                                Deathcream
                            """.trimIndent()
                        }

                        field {
                            name = "Version:"
                            value = version
                        }

                        field {
                            name = "Changelog:"
                            value = "Use `/changelog` to see the latest version changes."
                        }

                        field {
                            name = "Feedback / Requests:"
                            value = "Use `/support` to go to the support server."
                        }

                        timestamp = Clock.System.now()
                        footer {
                            text = "About Menu"
                            icon = kord.getSelf().avatar?.cdnUrl?.toUrl()
                        }
                    }
                }
            }
        }
    }
}