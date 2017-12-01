jQuery.fn.krLinkExternal = (callback) ->
    $ @
        .find 'a[href*="://"]:not([class*="kr-button"])'
        .addClass 'kr-link-external'

    $ @
        .find 'a[href*="://"]'
        .attr 'target', '_blank'

    if typeof callback == "function"
        callback()

    @
