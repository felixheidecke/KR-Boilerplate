/* ------------------- *
 * Konfiguration laden *
 * ------------------- */

import config from 'config.js';
requirejs.config(config);


/* ------------------ *
 * Skripte aktivieren *
 * ------------------ */

require('scripts/js/external.js');
require('scripts/js/mailto.js');
require('scripts/js/toplink.js');
require('scripts/js/mobile-detect.js');
//require('scripts/js/xioni-news.js');
// require('scripts/js/shop.js');
// require('scripts/js/akkordeon.js');

/* --------------------------------- *
 * Skript Instanzen starten wo nötig *
 * Bspw.: krNav, krAkkordeon, ect.   *
 * --------------------------------- */

require('scripts/js/nav.js');
requirejs(['jquery'], $ => {
	$('.kr-nav-main').krNav();
});