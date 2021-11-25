import com.kotlindiscord.kord.extensions.ExtensibleBot
import dev.kord.common.annotation.KordPreview
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import extensions.*
import io.github.cdimascio.dotenv.dotenv

@OptIn(PrivilegedIntent::class, KordPreview::class)
suspend fun main() {
    val env = dotenv()
    val client = ExtensibleBot(env["token"]) {
        intents { +Intents.all }

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
    }

    client.start()
}