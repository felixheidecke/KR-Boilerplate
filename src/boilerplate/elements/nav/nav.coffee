jQuery.fn.krNav = (params) ->
    params = jQuery.extend({
        closeOnResize: true
        scroll: true
        scrollOffset: 0
        scrollSpeed: 600
        slideSpeed: 'slow'
        breakpoint: 768
    }, params)

    if $(@).length == 0
        return false

    $nav = $ @
    $1ul = $nav.find '> ul'
    $1li = $nav.find '> ul > li'
    $1a = $nav.find '> ul > li > a'
    $2ul = $nav.find '> ul > li > ul'
    $2li = $nav.find '> ul > li > ul > li'
    $2a = $nav.find '> ul > li > ul > li > a'

    $1ul.addClass 'kr-nav-main-1-ul'
    $1li.addClass 'kr-nav-main-1-li'
    $1a.addClass 'kr-nav-main-1-a'
    $2ul.addClass 'kr-nav-main-2-ul'
    $2li.addClass 'kr-nav-main-2-li'
    $2a.addClass 'kr-nav-main-2-a'

    # Show after classes are attached to prevent flickering
    $nav.show()

    $burger = $('<button>',
        'class': 'kr-nav-main-burger'
        'html': '<span>Menu</span>')

    $burger.on('click', ->
        if !$nav.hasClass('-is-on')
            $1ul.slideDown params.slideSpeed
            $nav.addClass '-is-on'
            if params.scroll
                $('html, body').animate { scrollTop: $nav.offset().top + params.scrollOffset }, params.scrollSpeed
            else
                $('html, body').scrollTop(0)
        else
            $nav.removeClass '-is-on'
            $1ul.slideUp params.slideSpeed, ->
                $(this).removeAttr 'style'
    ).prependTo $nav

    $(window).on 'resize', ->
        if params.closeOnResize and $nav.is('.-is-on') and $(window).width() >= params.breakpoint
            $nav.removeClass '-is-on'
            $1ul.removeAttr 'style'

    return @
