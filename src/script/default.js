import config from 'config.js';
requirejs.config(config);

// +-------+
// | krNav |
// +-------+

// import krNav from 'scripts/js/nav.js';

// requirejs(['jquery'], function($) {
// 	$.fn.extend({krNav});
// 	$('nav').krNav();
// });


// +------------+
// | krScrollTo |
// +------------+

// requirejs(['jquery'], function() {
// 	$.fn.extend({krScrollTo});
// 	$('button').krScrollTo('.foo');
// });


// +--------+
// | krShop |
// +--------+

// import krShop from 'scripts/js/shop.js';

// requirejs(['jquery'], function() {
// 	$.fn.extend({krShop});
// 	$('body').krShop();
// });


// +-------------+
// | krAkkordeon |
// +-------------+

// import krAkkordeon from 'scripts/js/akkordeon.js';

// requirejs(['jquery'], function($) {
// 	$.fn.extend({krAkkordeon});
// 	$('body').krAkkordeon();
// });


// +--------+
// | krForm |
// +--------+

// import krForm from 'scripts/js/form.js';

// requirejs(['jquery'], function() {
// 	$.fn.extend({krForm});
// 	$('#demo-form').krForm();
// });


// +-------------+
// | krXioniNews |
// +-------------+

// import krXioniNews from 'scripts/js/xioni-news.js';

// requirejs(["jquery", "vue", "moment", "lodash", "textile-js"], function($, Vue, moment, _, textile) {
// 	$.fn.extend({krXioniNews});
// 	$('form').krXioniNews();
// });

// +--------+
// | Swiper |
// +--------+

// requirejs(["jquery", "swiper/js/swiper.min"], function($, Swiper) {
// 	new Swiper('.swiper');

// 	$('head').append($('<link>', {
// 		'rel'  : 'stylesheet',
// 		'href' : config.baseUrl + config.paths.swiper + '/css/swiper.min.css'
// 	}));
// })

// +------------+
// | Lightbox 2 |
// +------------+

requirejs(["jquery", "lightbox2/js/lightbox.min", 'vue'], function($, lightbox, Vue) {

	$('head').append($('<link>', {
		'rel'  : 'stylesheet',
		'href' : config.baseUrl + config.paths.lightbox2 + '/css/lightbox.min.css'
	}));

	lightbox.option({
		albumLabel : "Bild %1 von %2"
	});

	new Vue({
		el : '#galerie',
		data : {
			name : 'Ferienwohnung',
			images : [
				'Von Außen',
				'Der Wohnbereich',
				'Die Küchenzeile',
				'Mit gemütlicher Couch',
				'Das Schlafzimmer',
				'Mit gemütlichem Doppelbett',
				'Modernes Bad',
				'Nebenzimmer',
				'Gemütliche Terasse',
				'Mit kleinem Brunnen',
				'Der Blick durch die Weinberge',
				'Die Basilika']
		},
		methods : {
			path (index, big = false) {
				let type  = (big) ? big : '';
				let image = (index + 1).toString().padStart(2, '0');
				return 'images/galerie/' + image + type + '.jpg'
			}
		}
	});
})


// +-------------------+
// | Standard Elemente |
// +-------------------+

import krLinkExternal from 'scripts/js/link-external.js';
import krFileExternal from 'scripts/js/file-external.js';
import krMailTo       from 'scripts/js/mailto.js';
import krToplink      from 'scripts/js/toplink.js';
import krBackground   from 'scripts/js/background.js';

requirejs(["jquery"], function($) {

	require('scripts/js/mobile-detect.js');

	$.fn.extend({
		krLinkExternal,
		krFileExternal,
		krMailTo,
		krToplink,
		krBackground
	});

	$('body')
		.krLinkExternal()
		.krFileExternal()
		.krMailTo()
		.krToplink()
		.krBackground()
		.removeAttr('hidden');
});
