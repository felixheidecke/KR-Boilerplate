jQuery.fn.krScrollTo = (params) ->

    params = jQuery.extend({
        offset : 0,
        speed  : 1
    }, params)

    $ @
        .click (e) ->
            target = $(@).attr 'data-kr-scroll-to'

            e.preventDefault()

            if $(target).length

                windowPos  = $(window).scrollTop()
                targetPos  = Math.abs $(target).offset().top
                difference = Math.abs windowPos - targetPos
                factor     = params.speed * (difference / 100 * 0.1)
                distance   = Math.floor difference / factor

                position = $(target).offset().top;
                $('body,html').animate { scrollTop: (position + params.offset) }, distance

            else
                kr.warn "'#{target}' does not exist!"
