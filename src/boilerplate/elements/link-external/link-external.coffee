jQuery.fn.krLinkExternal = (callback) ->
    $ @
        .find 'a[href*="://"]:not([class*="kr-button"])'
        .addClass 'kr-link-external'

    $ @
        .find 'a[href*="://"])'
        .addClass 'kr-link-external'

    if typeof callback == "function"
        callback()

    @