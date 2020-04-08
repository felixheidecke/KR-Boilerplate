cdn.require(['jquery']).then(() => {

  $.fn.krScrollTo = function(params, callback) {

    callback = callback || false;
    params = $.extend({
      offset: 0,
      speed: 'slow',
      preventDefault: false
    }, params);

    $(this).click(function(e) {

      const target = $(this).attr('data-kr-scroll-to');
      if (params.preventDefault) e.preventDefault()
      if (!$(target).length) return
      const position = $(target).offset().top;

      $('body,html').animate({
        scrollTop: position
      }, params.speed);
    });
  };
});
