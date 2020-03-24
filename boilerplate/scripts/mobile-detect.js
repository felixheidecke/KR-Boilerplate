import cdn from 'cdn-buddy'

cdn.require(['jquery']).then( () => {

	const userAgent = window.navigator.userAgent;
	let mobile      = userAgent.match('iPad|iPhone|Android');

	if (mobile) {
		$('body').attr('data-mobile', userAgent);
		return
	}

	$('body').attr('data-agent', userAgent);
})
