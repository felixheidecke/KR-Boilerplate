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
    
    /**
    * Die oben aktivierten Skripte müssen nun noch initialisiert werden.
    * Dabei werden solche, die an mehrere Elememente angeheftet werden
    * (krLinkExternal, krFileExternal, krMailto, ect.) an das 'body'-Element
    * angehäftet.
    */
    
    $('body')
        .krLinkExternal()
        .krFileExternal()
        .krMailto()
        .krTopLink()
        // .krXioniNews()
        // .krMobileDetect()
        // .krBackgroundImage()
        .prop('hidden', false);

    /**
    * Skripte, die an individuelle Elemente angehäftet werden müssen,
    * werden an eine Id oder Klasse geheftet.
    */

    // Beispiel:
    // $('#mein-akkordeon').krAkkordeon()
    // $('#hauptnavi').krNav()
});

requirejs(["jquery", "swiper"], function($, Swiper) {

    // --- Add Stylesheet ----------
    $('[data-requiremodule="swiper"]').after($('<link>', {
        'rel'  : 'stylesheet',
        'href' : config.baseUrl + config.paths.swiper.replace('/js/', '/css/') + '.css'
    }));
})