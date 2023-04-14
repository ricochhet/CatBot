package autocomplete

import ApiClient
import com.kotlindiscord.kord.extensions.utils.FilterStrategy
import com.kotlindiscord.kord.extensions.utils.suggestStringMap
import dev.kord.core.entity.interaction.AutoCompleteInteraction
import dev.kord.core.event.interaction.AutoCompleteInteractionCreateEvent
import serializers.MHWDecorationResponse

val MhwDecoAutoComplete: suspend AutoCompleteInteraction.(AutoCompleteInteractionCreateEvent) -> Unit = {
    val search = data.data.options.value?.get(0)?.values?.value?.get(0)?.value as String
    if (search.isNotEmpty()) {
        val bySkill = mutableListOf<MHWDecorationResponse>()
        for ( deco in ApiClient.MHW.decorations.values ) {
            val res = findSimilarElements(
                deco.skills,
                JaroOptions(
                    input = search,
                    matchEntryKey = { it.name }
                )
            )

            if (res.isNotEmpty()) bySkill.add(deco)
        }

        val byDeco = findSimilarElements(
            ApiClient.MHW.decorations.entries,
            JaroOptions(
                input = search,
                matchEntryKey = { it.key }
            )
        ).map { it.value }

        val results = bySkill + byDeco

        suggestStringMap(
            results.associate { deco -> Pair(deco.name, deco.name) },
            FilterStrategy { _, _ -> true }
        )
    }
}