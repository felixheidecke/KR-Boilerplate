let _bp_version   = require('../../package.json').version;
let _dep_versions = require('./dependencies.json').dependencies;

module.exports = {
	"baseUrl": "https://cdn.klickrhein.de",
	"paths": {
		"vue"                 : `libs/vue/${_dep_versions.vue}/vue.min` ,
		"textile-js"          : `libs/textile-js/${_dep_versions["textile-js"]}/textile.min` ,
		"swiper"              : `libs/Swiper/${_dep_versions.swiper}/js/swiper.min` ,
		"simplelightbox"      : `libs/simplelightbox/${_dep_versions.simplelightbox}/simple-lightbox.min` ,
		"moment"              : `libs/moment.js/${_dep_versions.moment}/moment.min` ,
		"mobile-detect"       : `libs/mobile-detect/${_dep_versions["mobile-detect"]}/mobile-detect.min` ,
		"lodash"              : `libs/lodash.js/${_dep_versions.lodash}/lodash.min` ,
		"jquery"              : `libs/jquery/${_dep_versions.jquery}/jquery.min` ,
		"lightbox2"           : `libs/lightbox2/${_dep_versions.jquery}/lightbox.min` ,

        "kr-akkordeon"        : `boilerplate/${_bp_version}/js/akkordeon`,
        "kr-form"             : `boilerplate/${_bp_version}/js/form`,
        "kr-link-external"    : `boilerplate/${_bp_version}/js/link-external`,
        "kr-nav"              : `boilerplate/${_bp_version}/js/nav`,
        "kr-shop"             : `boilerplate/${_bp_version}/js/shop`,
        "kr-xioni-news"       : `boilerplate/${_bp_version}/js/xioni-news`,

        "kr-background-image" : `boilerplate/${_bp_version}/js/background-image`,
        "kr-file-external"    : `boilerplate/${_bp_version}/js/file-external`,
        "kr-mailto"           : `boilerplate/${_bp_version}/js/mailto`,
        "kr-mobile-detect"    : `boilerplate/${_bp_version}/js/mobile-detect`,
        "kr-scroll-to"        : `boilerplate/${_bp_version}/js/scroll-to`,
        "kr-toplink"          : `boilerplate/${_bp_version}/js/toplink`
    }
}