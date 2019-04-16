let version = require('./dependencies.json').dependencies;

module.exports = {
    "baseUrl": "https://cdn.klickrhein.de/libs",
    "paths": {
        "vue"                 : `vue/${version.vue}/vue.min`,
        "textile-js"          : `textile-js/${version["textile-js"]}/textile.min`,
        "moment"              : `moment.js/${version.moment}/moment.min`,
        "mobile-detect"       : `mobile-detect/${version["mobile-detect"]}/mobile-detect.min`,
        "lodash"              : `lodash.js/${version.lodash}/lodash.min`,
        "jquery"              : `jquery/${version.jquery}/jquery.min`,
        "swiper"              : `Swiper/${version.swiper}`,
        "simplelightbox"      : `simplelightbox/${version.simplelightbox}`,
        "lightbox2"           : `lightbox2/${version.lightbox2}`,
    }
}