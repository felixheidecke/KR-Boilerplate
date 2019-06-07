(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for "external');
		return;
	}

	// Files to external
	['.pdf', '.zip'].forEach( function(fileType) {

		let $link = $('body').find('[href$="' + fileType + '"]:not([class*="kr-stop"])');

		$link.attr('target', '_blank');
		$link.addClass('kr-link-external');
	});

	// Links to external
	$('a[href*="://"]:not([class*="kr-stop"])').each(function() {
		const $ref = $(this);
		if ($ref.children('img').length === 0) {
			$ref.attr('target', '_blank');
			$ref.addClass('kr-link-external');
		}
	});
})();