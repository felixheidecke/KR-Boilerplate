jQuery.fn.krForm = (params) ->
  params = jQuery.extend({
    resetOnLoad: true
    hideLabels: false
  }, params)

  if $(@).length == 0
    return false

  if params.resetOnLoad
    $(@)[0].reset()

  if params.hideLabels
    $(@).find('label').hide()

  $self = $(@)
  $self.find('input, textarea').on 'keyup focus blur', ->
    $label = $self.find('label[for=' + $(@).attr('id') + ']:not(.is-visible)')
    if $(@).val().trim().length > 0
      $label.slideDown()
    else
      $label.slideUp()

  $self.find('select').on 'keyup focus click', ->
    $fo = $(@).find('option:first-child')
    if $fo.hasClass('label')
      $fo.attr 'disabled', 'disabled'

  return @