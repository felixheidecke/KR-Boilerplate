export default function(params) {
    params = $.extend({
        textOnLoading: "Sendet",
        textOnError: "<strong>Ein Fehler ist aufgetreten!</strong><br>Bitte füllen Sie alle mit einem * markierten Felder aus!",
        textOnSuccess: "<strong>Vielen Dank für Ihre Nachricht.</strong><br>Wir setzen uns in Kürze mit Ihnen in Verbindung"
    }, params);

    let $form        = $(this);
    let $submit      = $form.find('button[type="submit"]');
    
    let submitLabel  = $submit.text();
    let required     = [];

    if ($form.find('input[name="required"]').length)
        required     = $form.find('input[name="required"]').val().split(',');
    
    for (i in required) {
        val = required[i];
        $form.find("label[for='" + (val.trim()) + "']").append('*');
    }

    const setButtonState = function(state) {
        if ($submit.length && state === 'loading') {
            return $submit.addClass('kr-button-loading').text(params.textOnLoading).prop('disabled', true);
        } else if ($submit.length && state === 'reset') {
            return $submit.removeClass('kr-button-loading').text(submitLabel).removeAttr('disabled');
        }
    };

    const makeAlert = function(cssClass, message) {
        var $el = $('<div>', {
            'class': 'kr-form-alert',
            'style': "animation-duration:" + (params.alertDuration / 1000 / 2) + "s"
        });
        
        var $x = $('<i>', {
            'class': 'fa fa-lg fa-window-close kr-form-alert-close',
            'aria-hidden': true
        }).click(function() {
            $el.remove();
        });
        
        $el.addClass(cssClass).html("<p class='h-margin-remove'>" + message + "</p>").prepend($x);
    };

    const removeAlert = function($el) {
        $el.remove();
    };

    const setToSuccess = function() {
        var $alert;
        setButtonState('reset');
        $alert = makeAlert('-success', params.textOnSuccess);
        $('body').append($alert);
        $alert.fadeIn();
        return $form.find('input, select, textarea, button').attr('disabled', true);
    };

    const setToError = function() {
        var $alert;
        setButtonState('reset');
        $alert = makeAlert('-error', params.textOnError);
        $('body').append($alert);
        return $alert.fadeIn();
    };

    $form.on('submit', function(e) {
        e.preventDefault();
        return $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize(),
            beforeSend: function() {
                return setButtonState('loading');
            },
            statusCode: {
                302: function() {
                    return setToSuccess();
                },
                200: function() {
                    return setToSuccess();
                },
                400: function() {
                    return setToError();
                }
            }
        });
    });
    return this;
};
