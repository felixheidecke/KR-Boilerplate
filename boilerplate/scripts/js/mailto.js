(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for "mailto');
		return;
	}

    $('[data-mailto]').each(function() {
        var decoded, encoded, replacement;
        encoded = $(this).text().trim();
        decoded = encoded.replace(/(\[at\])/g, "@").replace(/(\[minus\])/g, "-").replace(/(\[dot\])/g, ".");
        replacement = decoded;
        if ($(this).data('mailto').length === 0) {
            replacement = $('<a>', {
                href: "mailto:" + (decoded.toLowerCase()),
                text: decoded
            });
        }
        return $.when($(this).after(replacement).remove()).then(typeof callback === "function" ? callback() : void 0);
    });
})();