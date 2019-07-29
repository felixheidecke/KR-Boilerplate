(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for "external');
		return;
	}

	// Links to external
	$('a[href*="://"]:not([class*="kr-stop"])').each(function() {
		const $ref = $(this);
		if ($ref.children('img').length === 0) {
			$ref.attr('target', '_blank');
			$ref.addClass('kr-link-external');
		}
	});
})();
