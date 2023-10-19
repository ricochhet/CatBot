import com.kotlindiscord.kord.extensions.ExtensibleBot
import dev.kord.common.Color
import dev.kord.gateway.Intents
import dev.kord.gateway.NON_PRIVILEGED
import dev.kord.rest.builder.message.create.embed
import extensions.*
import io.github.cdimascio.dotenv.dotenv
import kotlinx.datetime.Clock
import utils.CatBot
import utils.CatBotError
import java.util.logging.Logger

val env = dotenv()

suspend fun main() {

    val log = Logger.getLogger("Main")

    var avatarUrl: String? = null;
    val client = ExtensibleBot(env["bot_token"]) {
        intents {
            +Intents.NON_PRIVILEGED
        }

        presence {
            playing("Type / and click CatBot to get started")
        }

        extensions {
            add( ::About )
            add( ::Calc )
            add( ::Cat )
            add( ::Changelog )
            add( ::Invite )
            add( ::Mhgu )
            add( ::Mhr )
            add( ::Mhw )
            add( ::Support )
        }

        errorResponse { message, type ->
            val invite = "https://discord.gg/FugAFKzTMw"
            embed {
                color = Color.CatBotError
                title = "CatBot Error"
                description = "Looks like we couldn't handle that request right now, try again later. if this keeps on happening [Join the Discord]($invite) for support"

                timestamp = Clock.System.now()
                footer {
                    text = "Support Link Request";
                    if (avatarUrl != null) {
                        icon = avatarUrl
                    }
                }
            }
        }

        hooks {
            kordShutdownHook = true

            afterExtensionsAdded {
                log.info("Done adding all extensions.")
            }

            beforeStart {
                log.info("About to try connecting to Discord...")
            }

            created {
                log.info("Bot has been created.")
            }

            setup {
                log.info("Bot has been created and fully setup.")
            }
        }
    }

    avatarUrl = client.kordRef.getSelf().avatar?.cdnUrl?.toUrl()
    client.start()
}