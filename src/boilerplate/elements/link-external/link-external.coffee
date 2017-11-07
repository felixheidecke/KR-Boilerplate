jQuery.fn.krLinkExternal = (callback) ->
    $ @
        .find 'a[href^="http://"], a[href^="https://"]'
        .addClass 'kr-link-external'

    if typeof callback == "function"
        callback()

    @