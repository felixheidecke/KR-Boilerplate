jQuery.fn.krMailto = (callback) ->
    $('[data-mailto]').each ->

        encoded = $(@).text().trim()
        decoded = encoded
            .replace /(\[at\])/g, "@"
            .replace /(\[minus\])/g, "-"
            .replace /(\[dot\])/g, "."

        replacement = decoded

        if $(@).data('mailto').length == 0
            replacement = $('<a>',
                href : "mailto:#{decoded.toLowerCase()}"
                text : decoded )

        $.when(
            $(@)
                .after replacement
                .remove()
        ).then(
            if typeof callback == "function"
                callback()
        )
    return @
