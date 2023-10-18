package autocomplete

import com.kotlindiscord.kord.extensions.utils.FilterStrategy
import com.kotlindiscord.kord.extensions.utils.suggestStringMap
import dev.kord.core.entity.interaction.AutoCompleteInteraction
import dev.kord.core.event.interaction.AutoCompleteInteractionCreateEvent
import java.io.File

object MhrAutoCache {
    private const val dir = "src/main/resources/source_files/MonsterDataImages/assets/mhr"
    private val folder = File("$dir/monster/")
    val monsters = folder.walkBottomUp().maxDepth(1).toSet().map { 
        val name = File(it.toURI()).nameWithoutExtension
        name.replace("_HZV", "").replace("_", " ")
    }
}

val MhrMonsterAutoComplete: suspend AutoCompleteInteraction.(AutoCompleteInteractionCreateEvent) -> Unit = {
    val search = data.data.options.value?.get(0)?.values?.value?.get(0)?.value as String
    if (search.isNotEmpty()) {
        val results = findSimilarElements(
            MhrAutoCache.monsters,
            JaroOptions(
                input = search,
                matchEntryKey = { it },
                reloop = true
            )
        )

        suggestStringMap(
            results.associateWith { monster -> monster },
            FilterStrategy { _, _ -> true }
        )
    }
}