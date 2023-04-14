import com.kotlindiscord.kord.extensions.ExtensibleBot
import dev.kord.common.annotation.KordPreview
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import extensions.*
import io.github.cdimascio.dotenv.dotenv
import java.util.logging.Logger

val env = dotenv()

@OptIn(PrivilegedIntent::class, KordPreview::class)
suspend fun main() {

    val log = Logger.getLogger("Main")

    val client = ExtensibleBot(env["bot_token"]) {
        intents {
            +Intents.nonPrivileged
        }

        extensions {
            add( ::About )
            add( ::Calc )
            add( ::Cat )
            add( ::Changelog )
            add( ::Invite )
            add( ::Mhgu )
            add( ::Mhw )
            add( ::Support )
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

    client.start()
}