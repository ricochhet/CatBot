package extenstions


import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.rest.builder.interaction.embed
import kotlinx.coroutines.flow.first
import kotlinx.datetime.Clock

@OptIn(KordPreview::class)
class Invite: Extension() {
    override val name = "Invite"

    override suspend fun setup() {
        slashCommand {
            name = "invite"
            description = "Invite CatBot to your Server"
            guild( Snowflake("638517240475549736") )
            autoAck = AutoAckType.PUBLIC
            val id = bot.getKoin().get<Kord>().selfId
            val invite = "https://discord.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot"

            action {
                val botUser = guild?.members?.first { it.id == id }

                publicFollowUp {
                    embed {
                        title = "CatBot Invite"
                        description = "[Invite the bot to your server]($invite)"

                        // eventually we'll make this a constant somewhere (or an extension to they embed builder)
                        // because we'll be using this color everywhere, but for now we'll just place the color manually
                        color = Color(143,222,93)

                        footer {
                            text = "Invite Link Request"
                            icon = botUser?.avatar?.url
                        }

                        timestamp = Clock.System.now()
                    }
                }
            }
        }
    }
}