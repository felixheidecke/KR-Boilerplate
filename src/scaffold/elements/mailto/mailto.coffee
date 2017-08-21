$(document).ready ->
    $('[data-mailto]').each ->

        encoded = $(@).text().trim()
        decoded = encoded
            .replace /(\[at\])/g, "@"
            .replace /(\[minus\])/g, "-"
            .replace /(\[dot\])/g, "."

        if $(@).data('mailto').length != 0
            $(@)
                .after decoded
                .remove()
        else
            href = $('<a>',
                href : "mailto:#{decoded.toLowerCase()}"
                text : decoded )

            $(@)
                .after href
                .remove()