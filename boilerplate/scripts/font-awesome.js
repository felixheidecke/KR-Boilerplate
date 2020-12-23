cdn.require(['jquery', 'font-awesome']).then(() => {

  $('[data-icon], [data-icon-right]').each(function () {

    let iconClass = $(this).data('icon') || $(this).data('iconRight')
    let iconNode  = $(`<i class="${iconClass}"></i>`)
    let nodeName  = $(this)[0].nodeName

    if (nodeName === 'UL') {
      $(this)
        .addClass('kr-list')
        .find('li')
        .prepend(iconNode)
    }

    else if (nodeName === 'LI') {
      $(this)
        .prepend(iconNode)
        .parent('ul:not(.kr-list)')
        .addClass('kr-list')
    }

    else if (nodeName === 'BUTTON' || nodeName === 'A') {
      $(this)
        .prepend(iconNode)
        .addClass('kr-button')
    }

    if ($(this).data('icon')) {
      $(this)
        .css('padding-left', iconNode.width() * 2.5)
        .addClass('-has-icon')
        .removeAttr('data-icon')
    }
    
    else if ($(this).data('iconRight')) {
      $(this)
        .css('padding-right', iconNode.width() * 2.5)
        .addClass('-has-icon-right')
        .removeAttr('data-icon-right')
    }
  })
})
