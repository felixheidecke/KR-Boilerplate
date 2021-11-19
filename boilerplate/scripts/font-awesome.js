cdn.require(['jquery', 'font-awesome']).then(() => {

  $('[data-icon], [data-icon-right]').each(function () {

    let iconClass = $(this).data('icon') || $(this).data('iconRight')
    let iconNode = $(`<i class="${iconClass}"></i>`)
    let nodeName = $(this)[0].nodeName

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
        .addClass('-has-icon')
        .removeAttr('data-icon')
    }

    else if ($(this).data('iconRight')) {
      $(this)
        .addClass('-has-icon-right')
        .removeAttr('data-icon-right')
    }
  })

  $('.kr-link-external').each(function () {
    $(this).prepend(`<i class="fas fa-external-link-alt"></i>`)
  })
})
