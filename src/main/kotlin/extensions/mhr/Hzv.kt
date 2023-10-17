package extensions.mhr

import arguments.MhrHzv
import com.kotlindiscord.kord.extensions.commands.application.slash.PublicSlashCommand
import com.kotlindiscord.kord.extensions.types.respond
import com.kotlindiscord.kord.extensions.utils.capitalizeWords
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.NamedFile
import dev.kord.rest.builder.message.create.embed
import utils.CatBot
import java.io.File
import java.util.*
import java.util.logging.Logger

// this is so we can handle cases like Ahtal-Ka
fun String.capitalizeDashes(locale: Locale? = null): String {
    return split("-").joinToString("-") { word ->
        word.replaceFirstChar {
            if (it.isLowerCase()) {
                it.titlecase(locale ?: Locale.getDefault())
            } else {
                it.toString()
            } }
    }
}

@KordPreview
val MhrHzvCommand: suspend PublicSlashCommand<out MhrHzv>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster\n"

    val dir = "src/main/resources/source_files/MonsterDataImages/assets/mhr"
    action {
        val log = Logger.getLogger("Mhr")
        log.info("Received command: mhr %s (monster=%s)".format(commandName, arguments.monsterName))

        respond {
            try {
                val monsterName = arguments.monsterName.lowercase().capitalizeWords().capitalizeDashes()
                val icon = File("$dir/monster/assets/icons/${monsterName}_Icon.png").replace("HR_", "")
                val hzv = File("$dir/monster/${monsterName}_HZV.png")

                files.add(NamedFile("icon.png", icon.inputStream()))
                files.add(NamedFile("hzv.png", hzv.inputStream()))

                embed {
                    title = "__${monsterName}__"
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