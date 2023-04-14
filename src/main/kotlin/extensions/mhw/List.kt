package extensions.mhw

import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.pagination.pages.Page
import com.kotlindiscord.kord.extensions.types.editingPaginator
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import utils.CatBot
import java.util.logging.Logger

@KordPreview
val MhwListCommand: suspend PublicSlashCommand<out Arguments>.() -> Unit = {
    name = "list"
    description = "List all monsters in MHW & Iceborne"

    val id = kord.selfId
    action {
        val log = Logger.getLogger("Mhw")
        log.info("Received command: mhw %s".format(commandName))

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


        val paginator = editingPaginator {
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