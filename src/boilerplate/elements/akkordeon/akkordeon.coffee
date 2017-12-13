jQuery.fn.krAkkordeon = (settings) ->

    s = jQuery.extend(
        initClosed : true
        initfirstOpen : true
        speed : 'fast'
        onlyOneCard : true

        cardItem : '.card'
        tabItem : '.tab'
        contentItem : '.content'
        activeClass : 'is-active'

    , settings)

    if $(@).length == 0
        return false

    $cards = $(@).find s.cardItem
    $tabs = $(@).find s.tabItem
    $contents = $(@).find s.contentItem

    $(@).addClass s.activeClass

    if s.initClosed
        $contents.hide()
    if s.initfirstOpen
        $(@).find(s.cardItem + ":first-of-type").addClass(s.activeClass).find(s.contentItem).show()

    $tabs.on 'click', ->
        $card = $(@).parent(s.cardItem)
        $content = $card.find(s.contentItem)
        $card.toggleClass s.activeClass
        if !$card.hasClass(s.activeClass)
            $content.slideUp s.speed
        else
            $content.slideDown s.speed
            if s.onlyOneCard
                $cards.not($card).removeClass s.activeClass
                $contents.not($content).slideUp s.speed

    return @
