package extensions.cat


import com.kotlindiscord.kord.extensions.commands.Arguments
import com.kotlindiscord.kord.extensions.commands.application.slash.EphemeralSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import serializers.CatImageResponse
import httpClient
import dev.kord.common.annotation.KordPreview
import io.ktor.client.request.*

@KordPreview
val CatPicCommand: suspend EphemeralSlashCommand<out Arguments>.() -> Unit = {
    name = "pic"
    description = "Shows a random cat pictures"

    action {
        val pic: List<CatImageResponse> = httpClient.get("https://api.thecatapi.com/v1/images/search")
        respond {
            content = pic.firstOrNull()?.url ?: ""
        }
    }
}