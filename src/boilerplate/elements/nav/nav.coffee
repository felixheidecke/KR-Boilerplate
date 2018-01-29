jQuery.fn.krNav = (params) ->
    params = jQuery.extend({
        closeOnResize: true
        scroll       : true
        scrollOffset : 0
        scrollSpeed  : 600
        slideSpeed   : 'slow'
        activeClass  : '-is-active'
        expandedClass: '-is-expanded'
        breakpoint   : 768
    }, params)

    if $(@).length == 0
        return false

    $nav = $ @
    $1ul = $nav.find '> ul'
    $1li = $nav.find '> ul > li'
    $1a  = $nav.find '> ul > li > a'

    $2ul = $nav.find '> ul > li > ul'
    $2li = $nav.find '> ul > li > ul > li'
    $2a  = $nav.find '> ul > li > ul > li > a'

    $3ul = $nav.find '> ul > li > ul > li > ul'
    $3li = $nav.find '> ul > li > ul > li > ul > li'
    $3a  = $nav.find '> ul > li > ul > li > ul > li > a'

    $trigger = $ '<span>',
        'class' : 'kr-nav-main-trigger'
        'aria-hidden': 'true'

    $burger = $ '<button>',
        'class': 'kr-nav-main-burger'
        'html' : '<span>Menu</span>'

    $1ul.addClass 'kr-nav-main-1-ul'
    $1li.addClass 'kr-nav-main-1-li'
    $1a.addClass  'kr-nav-main-1-a'

    $2ul.addClass 'kr-nav-main-2-ul'
    $2li.addClass 'kr-nav-main-2-li'
    $2a.addClass  'kr-nav-main-2-a'

    $3ul.addClass 'kr-nav-main-3-ul'
    $3li.addClass 'kr-nav-main-3-li'
    $3a.addClass  'kr-nav-main-3-a'

    # Add trigger for touch devices
    $nav.find(".kr-nav-main-1-a + ul").before $trigger
    $3ul.prev('.kr-nav-main-2-a').addClass '-is-sub-parent'

    # Show after classes are attached to prevent flickering
    $nav.show()

    # bubble up and active parent nodes
    setTimeout ->
        $nav.find("a.#{params.activeClass}").parents('li').each ->
            _activate $(@)
            _activate $(@).children "a:not(.#{params.activeClass})"
    , 0

    $nav.find("a.#{params.activeClass}").parents('li').each( ->
        $(@).addClass params.activeClass
        $(@).children("a:not(.#{params.activeClass})").addClass params.activeClass
    )

    $burger.on('click', ->
        if !_isActive $nav
            _activate $nav
            $1ul.slideDown params.slideSpeed
            if params.scroll
                $('html, body').animate { scrollTop: $nav.offset().top + params.scrollOffset }, params.scrollSpeed
            else
                $('html, body').scrollTop(0)
        else
            _deactivate $nav
            $1ul.slideUp params.slideSpeed, ->
                $(this).removeAttr 'style'
    ).prependTo $nav

    $('.kr-nav-main-trigger').on 'click', ->
        $el = $ @

        _deactivate $('.kr-nav-main-trigger').not $ @
        _collapse $nav.find(".#{params.expandedClass}").not $el

        if !_isActive($el)
            _activate $el
            _expand $el.parent 'li'

        else
            _deactivate $el
            _collapse $nav.find ".#{params.expandedClass}"

    $(window).on 'resize', ->
        _collapse $nav.find ".#{params.expandedClass}"

        if params.closeOnResize and $nav.is('.' + params.activeClass) and $(window).width() >= params.breakpoint
            _deactivate $nav
            $1ul.removeAttr 'style'


    _expand = ($el) ->
        $el.addClass params.expandedClass

    _collapse = ($el) ->
        $el.removeClass params.expandedClass

    _activate = ($el) ->
        $el.addClass params.activeClass

    _deactivate = ($el) ->
        $el.removeClass params.activeClass

    _isActive = ($el) ->
        if $el.hasClass(params.activeClass)
            return true

        return false

    _isExpanded = ($el) ->
        if $el.hasClass(params.expandedClass)
            return true

        return false

    return @
