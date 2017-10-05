jQuery.fn.krForm = (params) ->
  params = jQuery.extend({
  }, params)

  if $(@).length == 0
    return false

  $form     = $ @
  $errorMsg = $ '<p>',
    class: 'kr-form-alert-error'
  $successMsg = $ '<p>',
    class: 'kr-form-alert-success'

  $form.on('submit', (e) ->
    e.preventDefault();

    $.ajax(
        url : $form.attr 'action'
        type: $form.attr 'method'
        data: $form.serialize()
        beforeSend: ->
          console.info "Before sending"
        statusCode:
          200: ->
            $error = $errorMsg.clone();
            $ 'body'
              .append $error
          302: ->
            $ 'body'
              .append $successMsg
    )
  )

  return @