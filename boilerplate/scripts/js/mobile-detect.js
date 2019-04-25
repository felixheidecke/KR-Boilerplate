(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for "mobile-detect"');
		return;
	}

	const userAgent = window.navigator.userAgent;
	let mobile      = userAgent.match('iPad|iPhone|Android');

	if (mobile) {
		$('body').attr('data-mobile', userAgent);
		return
	}

	$('body').attr('data-agent', userAgent);
})();