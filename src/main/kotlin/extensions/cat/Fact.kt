package extensions.cat

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.application.slash.EphemeralSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.annotation.KordPreview
import java.util.logging.Logger

@KordPreview
val CatFactCommand: suspend EphemeralSlashCommand<out Arguments>.() -> Unit = {
    name = "fact"
    description = "Shows random cat facts"

    action {
        val log = Logger.getLogger("Cat")
        log.info("Received command: cat %s ".format(commandName))

        val facts = ApiClient.CAT.facts
        respond { content = facts.random() }
    }
}