export default function(params) {
	$(this).find('a[href*="://"]:not([class*="kr-button"])').addClass('kr-link-external');
	$(this).find('a[href*="://"]').attr('target', '_blank');

	if (typeof callback === "function") {
		callback();
	}

	return this;
};