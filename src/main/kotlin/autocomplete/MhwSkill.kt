package autocomplete

import com.kotlindiscord.kord.extensions.utils.FilterStrategy
import com.kotlindiscord.kord.extensions.utils.suggestStringMap
import dev.kord.core.entity.interaction.AutoCompleteInteraction
import dev.kord.core.event.interaction.AutoCompleteInteractionCreateEvent

val MhwSkillAutoComplete: suspend AutoCompleteInteraction.(AutoCompleteInteractionCreateEvent) -> Unit = {
    val search = data.data.options.value?.get(0)?.values?.value?.get(0)?.value as String
    if (search.isNotEmpty()) {
        val results = findSimilarElements(
            ApiClient.MHW.skills.entries,
            JaroOptions(
                input = search,
                threshold = 0.7,
                matchEntryKey = { it.key },
            )
        )

        suggestStringMap(
            results.associate { skill -> Pair(skill.value.name, skill.value.name) },
            FilterStrategy { _, _ -> true }
        )
    } else {
        val results = ApiClient.MHW.skills.entries.take(25)

        suggestStringMap(
            results.associate { skill -> Pair(skill.value.name, skill.value.name) },
            FilterStrategy { _, _ -> true }
        )
    }
}