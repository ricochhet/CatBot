package extensions.cat


import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.application.slash.EphemeralSlashCommand
import com.kotlindiscord.kord.extensions.components.forms.ModalForm
import com.kotlindiscord.kord.extensions.types.respond
import serializers.CatImageResponse
import httpClient
import io.ktor.client.call.*
import io.ktor.client.request.*
import java.util.logging.Logger

val CatPicCommand: suspend EphemeralSlashCommand<out Arguments, ModalForm>.() -> Unit = {
    name = "pic"
    description = "Shows a random cat pictures"

    action {
        val log = Logger.getLogger("Cat")
        log.info("Received command: cat %s ".format(commandName))

        val pic: List<CatImageResponse> = httpClient.get {
            url("https://api.thecatapi.com/v1/images/search")
        }.body()
        respond {
            content = pic.firstOrNull()?.url ?: ""
        }
    }
}