package autocomplete

import info.debatty.java.stringsimilarity.JaroWinkler

data class JaroOptions<T>(
    val input: String,
    val matchEntryKey: (T) -> String,
    val threshold: Double = 0.65,
    val reloop: Boolean = false,
)

fun <T> findSimilarElements(collection: Collection<T>, options: JaroOptions<T>): List<T> {
    fun mainLoop (
        collection: Collection<T>,
        results: MutableList<Pair<Double, T>>,
        input: String = options.input,
        matchedKeys: MutableList<String>?,
        isRelooped: Boolean = false
    ) {
        for ( item in collection ) {
            val key = options.matchEntryKey(item)
            val jw = JaroWinkler()
            val score = jw.similarity(key, input)
            if (score > options.threshold) {
                results.add(Pair(if (isRelooped) score / 2.0 else score, item))
                matchedKeys?.add(key)
            }
        }
    }

    val found = mutableListOf<Pair<Double, T>>()
    val matchedKeys = mutableListOf<String>()

    mainLoop(collection, found, matchedKeys = matchedKeys)
    if (options.reloop) {
        for (key in matchedKeys) {
            mainLoop(collection, found, key, null, true)
        }
    }

    return found
        .toSet()
        .sortedByDescending { it.first }
        .map { it.second }
}