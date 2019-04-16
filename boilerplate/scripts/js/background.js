export default function(params, callback) {
	// determine, if we need to find elements
	// in the DOM or if it's attaced directly
	// to the element(s) in question
	var $el = ( $(this).attr('data-background-image') != undefined) ? $(this) : $(this).find("[data-background-image]");

	$el.each(function() {
		$(this).css('backgroundImage', "url(" + ($(this).data('backgroundImage')) + ")").removeAttr('data-background-image');
	});

	if (typeof callback === "function") {
		callback();
	}

	return this;
};