jQuery.fn.krForm = (params) ->
    params = jQuery.extend(
        alertDuration : 5000
        textOnLoading : "Sendet"
        textOnError   : "<strong>Ein Fehler ist aufgetreten!</strong><br>Bitte füllen Sie alle mit einem * markierten Felder aus!"
        textOnSuccess : "<strong>Vielen Dank für Ihre Nachricht.</strong><br>Wir setzen uns in Kürze mit Ihnen in Verbindung"
    , params)

    if $(@).length == 0
        return false

    $form       = $ @
    $submit     = $form.find 'button[type="submit"]'
    submitLabel = $submit
        .text()
    required    = $form
        .find 'input[name="required"]'
        .val()
        .split ','

    for i, val of required
      $form.find("label[for='#{val.trim()}']").append('*')


    setButtonState = (state) ->
        if state == 'loading'
            $submit
                .addClass 'kr-button-loading'
                .text 'Sendet'
                .prop 'disabled', true

        else if state == 'reset'
            $submit
                .removeClass 'kr-button-loading'
                .text submitLabel
                .removeAttr 'disabled'

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

    setToSuccess = ->
        setButtonState 'reset'
        $alert = makeAlert '-success', params.textOnSuccess
        $('body').append $alert
        removeAlert $alert
        $form
            .find 'input, select, textarea, button'
            .attr 'disabled', true

    setToError = ->
        setButtonState 'reset'
        $alert = makeAlert '-error', params.textOnError
        $('body').append $alert
        removeAlert $alert

    $form.on 'submit', (e) ->
        e.preventDefault()

        $.ajax
            url : $form.attr 'action'
            type: $form.attr 'method'
            data: $form.serialize()
            beforeSend: ->
                setButtonState 'loading'

            statusCode:
                302: ->
                    setToSuccess()
            success : ->
                setToSuccess()

            error : ->
                setToError()

    return @