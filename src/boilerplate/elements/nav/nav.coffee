jQuery.fn.krNav = (params) ->
  params = jQuery.extend({
    burgerClasses: ''
    closeOnResize: false
    scroll: true
    scrollOffset: 0
    scrollSpeed: 600
    slideSpeed: 'slow'
  }, params)
  $nav = $(@)
  $list = $nav.find('.nav-level-1')
  $burger = $('<button>',
    'class': 'burger ' + params.burgerClasses
    'html': '<span>Menu</span>')
  $burger.on('click', ->
    if !$nav.hasClass('is-on')
      $list.slideDown params.slideSpeed
      $nav.addClass 'is-on'
      if params.scroll
        $('html, body').animate { scrollTop: $nav.offset().top + params.scrollOffset }, params.scrollSpeed
    else
      $nav.removeClass 'is-on'
      $list.slideUp params.slideSpeed, ->
        $(this).removeAttr 'style'
  ).prependTo $nav

  $(window).on 'resize', ->
    if params.closeOnResize and $nav.is('.is-on')
      $nav.removeClass 'is-on'
      $list.slideUp 'fast', ->
        $(this).removeAttr 'style'