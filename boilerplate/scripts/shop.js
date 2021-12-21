cdn.require(['jquery']).then(() => {
  const $form = $('.kr-shop').find('form.cart')
  const $action = $('.kr-shop').find('.js-form-action')
  const $itemCount = $('.kr-shop').find('.js-form-item-count')
  const $itemRemove = $('.kr-shop').find('.js-form-item-remove')
  const $submit = $('.kr-shop').find('.js-form-submit')
  const $update = $('.kr-shop').find('.js-form-update')

  const run = function (action) {
    $action.val(action)
    $form.submit()
  }

  $update.on('click', function (e) {
    e.preventDefault()
    return run('update')
  })

  $itemCount.on('change', function (e) {
    e.preventDefault()
    return run('update')
  })

  $submit.on('click', function (e) {
    e.preventDefault()
    return run('payment')
  })

  return $itemRemove.on('click', function (e) {
    return e.preventDefault()
  })
})
