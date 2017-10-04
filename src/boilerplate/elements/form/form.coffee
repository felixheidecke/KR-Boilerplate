jQuery.fn.krForm = (params) ->
  params = jQuery.extend({
  }, params)

  if $(@).length == 0
    return false

  $form  = $ @
  action = $(@).attr 'action'
  method = $(@).attr 'method'

  $form.on('submit', (e) ->
    e.preventDefault();

    $.ajax(
        url: action
        method: method
        accepts: "text/html"
        dataType: "jsonp"
        beforeSend: ->
          console.info "Before sending"
    ).done( ->
      console.log "Done"
    )
  )

  return @