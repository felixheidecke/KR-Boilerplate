/* ------------------- *
 * Konfiguration laden *
 * ------------------- */

import cdn from 'cdn-buddy'
cdn.config = require('config')

require('style')

// /* ------------------ *
//  * Skripte aktivieren *
//  * ------------------ */

require('scripts/external.js');
require('scripts/mailto.js');
require('scripts/toplink.js');
require('scripts/mobile-detect.js');
// require('scripts/xioni-news.js');
// require('scripts/shop.js');
// require('scripts/akkordeon.js');

// /* --------------------------------- *
//  * Skript Instanzen starten wo nötig *
//  * Bspw.: krNav, krAkkordeon, ect.   *
//  * --------------------------------- */

require('scripts/nav.js');
cdn.require(['jquery']).then( () => {
  $('.kr-nav-main').krNav()
})
