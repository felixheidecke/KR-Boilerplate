define(['jquery'], function($) {
	return $.fn.krFileExternal = function(params, callback) {
		
		params = jQuery.extend({
			types: ['.pdf']
		}, params);

		params.types.forEach( (fileType) => {
			$(this).find(`[href$="${fileType}"]`).attr('target', '_blank');
		});

		if (typeof callback === "function") {
			callback();
		}

		return this;
	};
});