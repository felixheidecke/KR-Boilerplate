$ document
    .ready ->
        $ "[data-h-background]"
            .each ->
                $(@)
                    .css 'backgroundImage', "url(#{$(@).data('hBackground')})"
                    .removeAttr 'data-h-background'
                    .addClass 'h-background-cover'
