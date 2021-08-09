package extenstions.mhw

import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import com.kotlindiscord.kord.extensions.pagination.pages.Page
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import utils.CatBot

@KordPreview
val MhwListCommand: suspend SlashCommand<out Arguments>.() -> Unit = {
    name = "list"
    description = "List all monsters in MHW & Iceborne"
    autoAck = AutoAckType.PUBLIC

    val id = kord.selfId
    action {
        val botUser = guild?.members?.first { it.id == id }
        val pages = ApiClient.MHW.monsters
            .chunked(20)
            .map { monsters ->
                Page {
                    title = "Monster list"
                    description = monsters.joinToString("\n") { it.details.title }
                    color = Color.CatBot

                    footer {
                        text = ""
                        icon = botUser?.avatar?.url
                    }
                }
            }


        val paginator = paginator {
            runBlocking {
                owner = user.asUserOrNull()
            }

            pages.forEach {
                page(it)
            }
        }

        paginator.send()
    }
}