$ document
    .ready ->
        $ '[href$=".pdf"]'
            .attr 'target', '_blank'