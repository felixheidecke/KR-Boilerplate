jQuery.fn.krShop = ->
    $form = $(@).find('form.cart')
    $action = $(@).find('.js-form-action')
    $itemCount = $(@).find('.js-form-item-count')
    $itemRemove = $(@).find('.js-form-item-remove')
    $submit = $(@).find('.js-form-submit')
    $update = $(@).find('.js-form-update')

    callback = ->
        console.log 'itemCount: ' + $itemCount.val()
        console.log 'action: ' + $action.val()
        return

    run = (action) ->
        $action.val action
        $form.submit()
        callback()

    $update.on 'click', (e) ->
        e.preventDefault()
        run 'update'
    $itemCount.on 'change', (e) ->
        e.preventDefault()
        run 'update'
    $submit.on 'click', (e) ->
        e.preventDefault()
        run 'payment'
    $itemRemove.on 'click', (e) ->
        e.preventDefault()
