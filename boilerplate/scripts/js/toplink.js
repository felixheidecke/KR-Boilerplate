(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for krXioniNews');
		return;
	}

	var $button, $style, css;

	if ($('body').find(".kr-toplink").length > 0) {
		return false;
	}

	css = ".kr-toplink {position:fixed;right:10px;bottom:10px;height:80px;width:80px;cursor:pointer;opacity:.5;transition:opacity .5s;border:0 none;background-color:gray;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA+CAYAAADd977FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNEI4RUEyOEExQzQxMUU2QkZCNkU1RTE3MTUyQjMwNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNEI4RUEyOUExQzQxMUU2QkZCNkU1RTE3MTUyQjMwNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY1ODAxOEY1QTFDMjExRTZCRkI2RTVFMTcxNTJCMzA0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1ODAxOEY2QTFDMjExRTZCRkI2RTVFMTcxNTJCMzA0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HjmzBAAAAVlJREFUeNrs28Ftw0AMRFGV4BJTgjtySSpJsQAL8SGOTWkVfJKfAPc6IN5lLzNNBWZZltu6k4PB2EYUEIYoQAxRgBiiADFEAWKIAsQQBYghChBDFCCGKEAMUYAYogAxRAFiiALEEAWIIQoQQxQgRm8UKEZPFDhGL5QkGD1QkmHURkmKURPlHzC+HisKAeMpSxQKhihADFGAGKIAMUQBYrRHIWK0RSFjtEPJgNEGJRNGeZSMGGVRMmOUQ6mAUQalEkZ6lIoYaVEqY6RD6YCRBqUTBh6lIwYWpTMGDkUMEIoYIBQxQChigFDEgKHcn1kMDMq8BlxOQimHcTLKanDZAkajlMU4CeUH4ylgFEqb9tH91uspGANR2vXzDn6KXmMMQGnbYN2J8h7jAEr7jncQ5XOMHSgW7mMocYwAihgxlP0YH6CIEUM5jvEHihgxlHEYv6CIEUMJYXwLMAD5uV2YbexVEAAAAABJRU5ErkJggg==\");background-size: 50% auto;background-position:center center;background-repeat:no-repeat;}#kr-toplink:hover {opacity : 1; }' + '@media only screen and (max-width: 500px) { #kr-toplink { height: 50px; width: 50px } }";

	$button = $('<button>', {
		class: 'kr-toplink',
		style: 'display:none'
	});

	$style = $('<style>', {
		type: 'text/css',
		html: css
	});

	$style.prependTo($('body'));
	$button.appendTo($('body'));

	$(window).scroll(function() {
		if ($(window).scrollTop() >= 200) {
			return $button.slideDown('fast');
		} else {
			return $button.slideUp('fast');
		}
	});

	$button.on('click', function(e) {
		e.preventDefault();
		return $('body,html').animate({
			scrollTop: 0
		}, 'slow');
	});

})();