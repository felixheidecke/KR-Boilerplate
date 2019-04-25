(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for "external');
		return;
	}

	// Files to external
	['.pdf', '.zip'].forEach( function(fileType) {

		let $link = $('body').find('[href$="' + fileType + '"]');

		$link.attr('target', '_blank');
		$link.addClass('kr-link-external');
	});

	// Links to external
	$('body').find('a[href*="://"]:not([class*="kr-button"])').addClass('kr-link-external');
	$('body').find('a[href*="://"]').attr('target', '_blank');
})();