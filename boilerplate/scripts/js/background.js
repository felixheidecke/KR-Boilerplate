(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for "background"');
		return;
	}

	$("[data-background-image]").each(function() {
		$(this).css('backgroundImage', "url(" + ($(this).data('backgroundImage')) + ")").removeAttr('data-background-image');
	});
})();