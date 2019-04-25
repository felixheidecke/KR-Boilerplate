import config from 'config.js';
requirejs.config(config);

// Allow to use requirejs globaly
window.requirejsConfig = config;


// +-------------------+
// | Standard Elemente |
// +-------------------+

requirejs(["jquery"], function($) {

	require('scripts/js/external.js');			// External
	require('scripts/js/mailto.js');			// Mailto
	require('scripts/js/toplink.js');			// Toplink
//	require('scripts/js/mobile-detect.js');		// Mobile detect
//	require('scripts/js/background.js');		// Background
//	require('scripts/js/shop.js'); 				// KR-Shop

	$('html').removeAttr('data-loading');
});