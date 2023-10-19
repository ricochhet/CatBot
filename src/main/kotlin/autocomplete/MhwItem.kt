package autocomplete

import ApiClient
import com.kotlindiscord.kord.extensions.utils.FilterStrategy
import com.kotlindiscord.kord.extensions.utils.suggestStringMap
import dev.kord.core.entity.interaction.AutoCompleteInteraction
import dev.kord.core.event.interaction.AutoCompleteInteractionCreateEvent

val MhwItemAutoComplete: suspend AutoCompleteInteraction.(AutoCompleteInteractionCreateEvent) -> Unit = {
    val search = data.data.options.value?.get(0)?.values?.value?.get(0)?.value as String
    if (search.isNotEmpty()) {
        val results = findSimilarElements(
            ApiClient.MHW.items.entries,
            JaroOptions(
                input = search,
                matchEntryKey = { it.key },
            )
        )

        suggestStringMap(
            results.associate { item -> Pair(item.value.name, item.value.name) },
            FilterStrategy { _, _ -> true }
        )
    } else {
        val results = ApiClient.MHW.items.entries.take(25)

        suggestStringMap(
            results.associate { item -> Pair(item.value.name, item.value.name) },
            FilterStrategy { _, _ -> true }
        )
    }
}