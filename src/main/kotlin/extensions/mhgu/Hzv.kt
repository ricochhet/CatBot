package extensions.mhgu

import arguments.MhguHzv
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.components.forms.ModalForm
import com.kotlindiscord.kord.extensions.types.respond
import com.kotlindiscord.kord.extensions.utils.capitalizeWords
import dev.kord.common.Color
import dev.kord.rest.NamedFile
import dev.kord.rest.builder.message.create.embed
import io.ktor.client.request.forms.*
import io.ktor.utils.io.jvm.javaio.*
import utils.CatBot
import utils.capitalizeDashes
import java.io.File
import java.util.logging.Logger



val MhguHzvCommand: suspend PublicSlashCommand<out MhguHzv, ModalForm>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster\n"

    val dir = "src/main/resources/source_files/MonsterDataImages/assets/mhgu"
    action {
        val log = Logger.getLogger("Mhgu")
        log.info("Received command: mhgu %s (monster=%s)".format(commandName, arguments.monsterName))

        respond {
            try {
                val monsterName = arguments.monsterName.lowercase().capitalizeWords().capitalizeDashes()
                val icon = File("$dir/monster_icons/${monsterName}.webp")
                val hzv = File("$dir/monster_hzv/${monsterName}.PNG")

                files.add(NamedFile("icon.webp", ChannelProvider { icon.inputStream().toByteReadChannel() }))
                files.add(NamedFile("hzv.PNG", ChannelProvider { hzv.inputStream().toByteReadChannel() }))

                embed {
                    title = "__${monsterName}__"
                    color = Color.CatBot

                    image = "attachment://hzv.PNG"
                    thumbnail {
                        url = "attachment://icon.webp"
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace();
                content = "not found"
            }
        }
    }
}