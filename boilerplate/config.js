let version = require('./dependencies.json').dependencies;

module.exports = {
    baseUrl: "https://cdn.klickrhein.de/libs",
    paths: {
        vue       : `vue/${version.vue}/vue.min.js`,
        textile   : `textile-js/${version["textile-js"]}/textile.min.js`,
        moment    : `moment.js/${version.moment}/moment-with-locales.min.js`,
        lodash    : `lodash.js/${version.lodash}/lodash.min.js`,
        jquery    : `jquery/${version.jquery}/jquery.min.js`,
        lightbox2 : `lightbox2/${version.lightbox2}`,
        swiper    : [
          `Swiper/${version.swiper}/js/swiper.min.js`,
          `Swiper/${version.swiper}/css/swiper.min.css`,
        ],
        'in-view' : 'in-view/0.6.1/in-view.min.js',
        simplelightbox : [
          `simplelightbox/${version.simplelightbox}/simple-lightbox.min.js`,
          `simplelightbox/${version.simplelightbox}/simple-lightbox.min.css`,
        ],
    }
}
