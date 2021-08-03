import com.kotlindiscord.kord.extensions.ExtensibleBot
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import org.reflections.Reflections

@OptIn(PrivilegedIntent::class)
suspend fun main() {
    val client = ExtensibleBot("NjM1OTg4MDUyMDQ0Njc3MTYw.Xa5EBw.ZE1gTdojHot--kCQpbtf5b9GYOc") {
        intents { +Intents.all }
        slashCommands { enabled = true }

        extensions {
            val reflections = Reflections("extenstions")
            for ( extension in reflections.getSubTypesOf( Extension::class.java ) ) {
                val extenPrimeConstructor = extension.constructors.first()
                add({ extenPrimeConstructor.newInstance() } as () -> Extension )
            }
        }
    }

    client.start()
}