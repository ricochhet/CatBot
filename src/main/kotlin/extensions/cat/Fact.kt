package extensions.cat

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.application.slash.EphemeralSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import dev.kord.common.annotation.KordPreview

@KordPreview
val CatFactCommand: suspend EphemeralSlashCommand<out Arguments>.() -> Unit = {
    name = "fact"
    description = "Shows random cat facts"

    action {
        val facts = ApiClient.CAT.facts
        respond { content = facts.random() }
    }
}