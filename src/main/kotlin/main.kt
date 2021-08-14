import com.kotlindiscord.kord.extensions.ExtensibleBot
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import io.github.cdimascio.dotenv.dotenv
import org.reflections.Reflections

@OptIn(PrivilegedIntent::class)
suspend fun main() {
    val env = dotenv()
    val client = ExtensibleBot(env["token"]) {
        intents { +Intents.all }
        slashCommands { enabled = true }

        extensions {
            val reflections = Reflections("extensions")
            for ( extension in reflections.getSubTypesOf( Extension::class.java ) ) {
                val extenPrimeConstructor = extension.constructors.first()
                add({ extenPrimeConstructor.newInstance() } as () -> Extension )
            }
        }
    }

    client.start()
}