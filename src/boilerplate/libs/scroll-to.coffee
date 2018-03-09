$ document
    .ready ->
        $ "[data-kr-scroll-to]"
            .each ->
                props  = $(@).attr('data-kr-scroll-to').trim()
                data   = {
                    "offset" : 0
                    "speed" : 500
                }

                if props.search(/^\{.*\}$/) == 0
                    raw  = props.replace /\'/g, '"'
                    json = JSON.parse raw
                    data = _.assignIn data, json

                else
                    data['target'] = props

                $(@)
                    .removeAttr 'data-kr-scroll-to'
                    .click (e) ->
                        e.preventDefault()

                        if $(data.target).length

                            position = $(data.target).offset().top;
                            $('body,html').animate { scrollTop: (position + data.offset) }, data.speed

                        else
                            kr.warn "'#{data.target}' does not exist!"
