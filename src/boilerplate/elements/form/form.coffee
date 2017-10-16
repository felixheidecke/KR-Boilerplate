jQuery.fn.krForm = (params) ->
  params = jQuery.extend({
    alertDuration : 5000
    text: {
      notFound : "<strong>Fehler 404</strong><br>Bitte versuchen Sie es später erneut!"
      error    : "<strong>Ein Fehler ist aufgetreten!</strong><br>Bitte füllen Sie alle mit einem * markierten Felder aus!"
      success  : "<strong>Vielen Dank für Ihre Nachricht.</strong>"
    }
  }, params)

  if $(@).length == 0
    return false

  $form     = $ @
  makeAlert = (cssClass, message) ->
    $el = $ '<p>',
      'class'   : 'kr-form-alert'
      'style'   : "animation-duration:#{params.alertDuration / 1000 / 2}s"

    return $el
      .addClass cssClass
      .html message

  removeAlert = ($el) ->
    setTimeout ->
      $el.remove()
    , params.alertDuration + 100
    return true

  $form.on 'submit', (e) ->
    e.preventDefault();

    $.ajax
      url : $form.attr 'action'
      type: $form.attr 'method'
      data: $form.serialize()
      statusCode:
        200: ->
          $alert = makeAlert '-error', params.text.error
          $('body').append $alert
          removeAlert $alert

        404: ->
          $alert = makeAlert '-error', params.text.notFound
          $('body').append $alert
          removeAlert $alert

        302: ->
          $alert = makeAlert '-success', params.text.success
          $('body').append $alert
          removeAlert $alert

          $form
            .find 'input, select, textarea'
            .attr 'disabled', true

  return @