cdn.require(['jquery', 'font-awesome']).then( () => {
  
  $('[data-icon]').each(function() {
    let iconClass = $(this).data('icon')
    let iconNode  = $(`<i class="${iconClass}"></i>`)
    let nodeName  = $(this)[0].nodeName

    $(this).removeAttr('data-icon')

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
  })
})
