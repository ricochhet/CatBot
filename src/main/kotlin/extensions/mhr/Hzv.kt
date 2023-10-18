package extensions.mhr

import arguments.MhrHzv
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



val MhrHzvCommand: suspend PublicSlashCommand<out MhrHzv, ModalForm>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster\n"

    val dir = "src/main/resources/source_files/MonsterDataImages/assets/mhr"
    action {
        val log = Logger.getLogger("Mhr")
        log.info("Received command: mhr %s (monster=%s)".format(commandName, arguments.monsterName))

        respond {
            try {
                val monsterName = arguments.monsterName.replace(" ", "_")
                val icon = File(
                    "$dir/monster/assets/icons/${monsterName}_Icon.png".replace("HR_", "")
                )
                val hzv = File("$dir/monster/${monsterName}_HZV.png")

                files.add(NamedFile("icon.png", ChannelProvider { icon.inputStream().toByteReadChannel() }))
                files.add(NamedFile("hzv.png", ChannelProvider { hzv.inputStream().toByteReadChannel() }))

                embed {
                    val humanReadableMonsterName = arguments.monsterName.lowercase().capitalizeWords().capitalizeDashes()
                    title = "__${humanReadableMonsterName}__"
                    color = Color.CatBot

                    image = "attachment://hzv.png"
                    thumbnail {
                        url = "attachment://icon.png"
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace();
                content = "not found"
            }
        }
    }
}