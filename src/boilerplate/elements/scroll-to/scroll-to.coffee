$ document
    .ready ->
        $ "[data-kr-scroll-to]"
            .each ->
                props  = $(@).attr('data-kr-scroll-to').trim()
                data   = {
                    "offset" : 0
                    "factor" : 1
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

                            windowPos  = $(window).scrollTop()
                            targetPos  = Math.abs $(data.target).offset().top
                            difference = Math.abs windowPos - targetPos
                            factor     = data.factor + (difference / 100 * 0.1)
                            distance   = Math.floor difference / factor

                            position = $(data.target).offset().top;
                            $('body,html').animate { scrollTop: (position + data.offset) }, distance

                        else
                            kr.warn "'#{data.target}' does not exist!"
