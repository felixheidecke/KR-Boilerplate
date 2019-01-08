import config from '../boilerplate/config.js';

requirejs.config(config);

/**
 * Liste der Klickrhein Skripte,
 * die vom CDN geladen werden.
 */

var deps = [
	"kr-link-external",
	"kr-file-external",
	"kr-mailto",
	"kr-toplink",
	// "kr-akkordeon",
	// "kr-form",
	// "kr-nav",
	// "kr-shop",
	// "kr-xioni-news",
	// "kr-background-image",
	// "kr-mobile-detect",
	// "kr-scroll-to",
];

requirejs(deps, function() {

	$('body')
		.krLinkExternal()
		.krFileExternal()
		.krMailto()
		.krTopLink()
		// .krXioniNews()
		// .krMobileDetect()
		// .krBackgroundImage()
		.prop('hidden', false);


	// Beispiel:
	// $('#mein-akkordeon').krAkkordeon()
	// $('#hauptnavi').krNav()
});

requirejs(["jquery", "swiper/js/swiper.min"], function($, Swiper) {

	// Abbruch wernn DOM Element nicht vorhanden
	if ( !$('.swiper-main').length )
		return;

	// Neue Swiper Instanz öffnen
	new Swiper ('.swiper-main');

	// Swiper Stylesheet hinzufügen
	$('head').append($('<link>', {
		'rel'  : 'stylesheet',
		'href' : `${config.baseUrl}${config.paths.swiper}/css/swiper.min.css`
	}));
})