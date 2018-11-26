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
    "kr-xioni-news",
    "kr-background-image",
    "kr-mobile-detect",
    // "kr-scroll-to",
];

requirejs(deps, function() {

    $('body')
        .krLinkExternal()
        .krFileExternal()
        .krMailto()
        .krTopLink()
        .krXioniNews()
        .krMobileDetect()
        .krBackgroundImage()
        .prop('hidden', false);


    // Beispiel:
    // $('#mein-akkordeon').krAkkordeon()
    // $('#hauptnavi').krNav()
});




























requirejs(["jquery", "swiper"], function($, Swiper) {

    if ( !$('.swiper-main').length )
        return;

    new Swiper ('.swiper-main', {
        loop       : true,
        speed      : 2000,
        effect     : 'fade',
        navigation : {
            nextEl : '.swiper-main-button.chevron-right',
            prevEl : '.swiper-main-button.chevron-left',
        },
        autoplay   : {
            delay  : 5000
        }
    });

    // --- Add Stylesheet ----------
    $('[data-requiremodule="swiper"]').after($('<link>', {
        'rel'  : 'stylesheet',
        'href' : config.baseUrl + config.paths.swiper.replace('/js/', '/css/') + '.css'
    }));
})