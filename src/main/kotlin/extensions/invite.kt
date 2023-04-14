package extensions


import com.kotlindiscord.kord.extensions.extensions.Extension
import com.kotlindiscord.kord.extensions.extensions.publicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.rest.builder.message.create.embed
import kotlinx.coroutines.flow.first
import kotlinx.datetime.Clock
import utils.CatBot
import java.util.logging.Logger

@OptIn(KordPreview::class)
class Invite: Extension() {
    companion object {
        val LOG = Logger.getLogger(Invite::class.java.name)
    }

    override val name = "Invite"

    override suspend fun setup() {
        publicSlashCommand {
            name = "invite"
            description = "Invite CatBot to your Server"
            val id = bot.getKoin().get<Kord>().selfId
            val invite = "https://discord.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot"

            action {

                LOG.info("Received command: invite")

                val botUser = guild?.members?.first { it.id == id }

                respond {
                    embed {
                        title = "CatBot Invite"
                        description = "[Invite the bot to your server]($invite)"
                        color = Color.CatBot

                        footer {
                            text = "Invite Link Request"
                            icon = botUser?.avatar?.url
                        }

                        timestamp = Clock.System.now()
                    }
                }
            }
        }
    }
}