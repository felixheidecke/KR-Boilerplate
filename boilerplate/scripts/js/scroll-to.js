requirejs(["jquery"], $ => {

	$.fn.krScrollTo = function(params, callback) {
		callback = callback || false;

		params = $.extend({
			offset: 0,
			speed: 1
		}, params);
		return $(this).click(function(e) {
			var difference, distance, factor, position, target, targetPos, windowPos;
			target = $(this).attr('data-kr-scroll-to');
			if ($(target).length) {
				windowPos = $(window).scrollTop();
				targetPos = Math.abs($(target).offset().top);
				difference = Math.abs(windowPos - targetPos);
				factor = params.speed * (difference / 100 * 0.1);
				distance = Math.floor(difference / factor);
				position = $(target).offset().top;
				return $('body,html').animate({
					scrollTop: position + params.offset
				}, distance);
			} else {
				console.warn(target + " does not exist!");
			}
		});
	};
});
