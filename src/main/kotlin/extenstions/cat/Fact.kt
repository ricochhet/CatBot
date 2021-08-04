package extenstions.cat


import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview

@KordPreview
val CatFactCommand: suspend SlashCommand<out Arguments>.() -> Unit = {
    name = "fact"
    description = "Shows random cat facts"
    autoAck = AutoAckType.EPHEMERAL

    action {
        val facts = ApiClient.CAT.facts
        ephemeralFollowUp { content = facts.random() }
    }
}