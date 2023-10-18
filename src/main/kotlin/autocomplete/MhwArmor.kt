package autocomplete

import com.kotlindiscord.kord.extensions.utils.FilterStrategy
import com.kotlindiscord.kord.extensions.utils.suggestStringMap
import dev.kord.core.entity.interaction.AutoCompleteInteraction
import dev.kord.core.event.interaction.AutoCompleteInteractionCreateEvent

val MhwArmorAutoComplete: suspend AutoCompleteInteraction.(AutoCompleteInteractionCreateEvent) -> Unit = {
    val search = data.data.options.value?.get(0)?.values?.value?.get(0)?.value as String
    if (search.isNotEmpty()) {
        val results = findSimilarElements(
            ApiClient.MHW.armors.values,
            JaroOptions(
                input = search,
                matchEntryKey = { it.name },
                reloop = true
            )
        )

        suggestStringMap(
            results.associate { armor -> Pair(armor.name, armor.name) },
            FilterStrategy { _, _ -> true }
        )
    } else {
        val results = ApiClient.MHW.armors.values.take(25)

        suggestStringMap(
            results.associate { armor -> Pair(armor.name, armor.name) },
            FilterStrategy { _, _ -> true }
        )
    }
}