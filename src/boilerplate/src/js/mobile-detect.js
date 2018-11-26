define(["jquery", "mobile-detect"], function($, MobileDetect) {
	return $.fn.krMobileDetect = function(callback) {
		var $base = $(this);
		var md    = new MobileDetect(window.navigator.userAgent);

		if (md.mobile()) {
			$base.attr('data-mobile', md.mobile().toLowerCase());
		}

		if (typeof callback === "function") {
			callback();
		}

		return this;
	};
});