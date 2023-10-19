package utils

import java.util.*

// this is so we can handle cases like Ahtal-Ka
fun String.capitalizeDashes(locale: Locale? = null): String {
    return split("-").joinToString("-") { word ->
        word.replaceFirstChar {
            if (it.isLowerCase()) {
                it.titlecase(locale ?: Locale.getDefault())
            } else {
                it.toString()
            }
        }
    }
}