package extensions.mhgu

import arguments.MhguHzv
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
val MhguHzvCommand: suspend PublicSlashCommand<out MhguHzv>.() -> Unit = {
    name = "hzv"
    description = "Get hzv info for a specific monster\n"

    val dir = "./src/main/resources/source_files/MonsterDataImages/assets/mhgu"
    action {
        respond {
            try {
                val monsterName = arguments.monsterName.lowercase().capitalizeWords().capitalizeDashes()
                val icon = File("$dir/monster_icons/${monsterName}.webp")
                val hzv = File("$dir/monster_hzv/${monsterName}.PNG")

                files.add(NamedFile("icon.webp", icon.inputStream()))
                files.add(NamedFile("hzv.PNG", hzv.inputStream()))

                embed {
                    title = "__${monsterName}__"
                    color = Color.CatBot

                    image = "attachment://hzv.PNG"
                    thumbnail {
                        url = "attachment://icon.webp"
                    }
                }
            } catch (e: Exception) {
                content = "not found"
            }
        }
    }
}