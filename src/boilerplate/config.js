let _bp_version = require('../../package.json').version;
let _dep_versions = require('./dependencies.json').dependencies;

module.exports = {
    "baseUrl": "https://cdn.klickrhein.de",
    "paths": {
        "vue": `libs/vue/${_dep_versions.vue}/vue.min`,
        "textile-js": `libs/textile-js/${_dep_versions["textile-js"]}/textile.min`,
        "swiper": `libs/Swiper/${_dep_versions.swiper}`,
        "simplelightbox": `libs/simplelightbox/${_dep_versions.simplelightbox}/simple-lightbox.min`,
        "moment": `libs/moment.js/${_dep_versions.moment}/moment.min`,
        "mobile-detect": `libs/mobile-detect/${_dep_versions["mobile-detect"]}/mobile-detect.min`,
        "lodash": `libs/lodash.js/${_dep_versions.lodash}/lodash.min`,
        "jquery": `libs/jquery/${_dep_versions.jquery}/jquery.min`,
        "lightbox2": `libs/lightbox2/${_dep_versions.jquery}/lightbox.min`,

        "kr-akkordeon": `boilerplate/${_bp_version}/js/elements/akkordeon.min`,
        "kr-form": `boilerplate/${_bp_version}/js/elements/form.min`,
        "kr-link-external": `boilerplate/${_bp_version}/js/elements/link-external.min`,
        "kr-nav": `boilerplate/${_bp_version}/js/elements/nav.min`,
        "kr-shop": `boilerplate/${_bp_version}/js/helpers/shop.min`,
        "kr-xioni-news": `boilerplate/${_bp_version}/js/elements/xioni-news.min`,

        "kr-background-image": `boilerplate/${_bp_version}/js/helpers/background-image.min`,
        "kr-file-external": `boilerplate/${_bp_version}/js/elements/file-external.min`,
        "kr-mailto": `boilerplate/${_bp_version}/js/helpers/mailto.min`,
        "kr-mobile-detect": `boilerplate/${_bp_version}/js/helpers/mobile-detect.min`,
        "kr-scroll-to": `boilerplate/${_bp_version}/js/elements/scroll-to.min`,
        "kr-toplink": `boilerplate/${_bp_version}/js/elements/toplink.min`
    }
}