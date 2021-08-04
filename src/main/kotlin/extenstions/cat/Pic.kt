package extenstions.cat


import Serializers.CatImageResponse
import httpClient
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.commands.slash.SlashCommand
import dev.kord.common.annotation.KordPreview
import io.ktor.client.request.*

@KordPreview
val CatPicCommand: suspend SlashCommand<out Arguments>.() -> Unit = {
    name = "pic"
    description = "Shows a random cat pictures"
    autoAck = AutoAckType.EPHEMERAL


    action {
        val pic: List<CatImageResponse> = httpClient.get("https://api.thecatapi.com/v1/images/search")
        ephemeralFollowUp {
            content = pic.firstOrNull()?.url ?: ""
        }
    }
}