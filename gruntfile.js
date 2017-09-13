let vendor = {

    'jquery' : { // ------------------------------------------------- jQuery ---
        install : true,
        js : [
            'jquery.min.js'
        ]
    },

    'pure' : { // ------------------------------------------------- pure CSS ---
        install : true,
        css: [
            'base-min.css',
            'grids-min.css',
            'grids-responsive-min.css'
        ]
    },

    'font-awesome' : { // ------------------------------------- Font Awesome ---
        install : true,
        css: [
            'css/font-awesome.min.css'
        ],
        fonts: [
            'fonts/fontawesome-webfont.eot',
            'fonts/fontawesome-webfont.svg',
            'fonts/fontawesome-webfont.ttf',
            'fonts/fontawesome-webfont.woff',
            'fonts/fontawesome-webfont.woff2'
        ]
    },

   'vue' : { // ----------------------------------------------------- Vue.js ---
        install : false,
        js : [
           'vue.min.js'
        ]
   },

    'mobile-detect' : { // ----------------------------------- Mobile Detect ---
        install: false,
        js: [
            'mobile-detect.min.js'
        ]
    },

    'simplelightbox' : { // -------------------------------- Simple lightbox ---
        install: false,
        js: [
            'simple-lightbox.min.js'
        ],
        css: [
            'simplelightbox.min.css'
        ]
    },

    'lightbox2' : { // ------------------------------------------- Lightbox2 ---
        install : false,
        js: [
            'js/lightbox.min.js'
        ],
        css: [
            'css/lightbox.min.css'
        ],
        images: [
            'images/close.png',
            'images/close.png',
            'images/loading.gif',
            'images/next.png',
            'images/prev.png'
        ]
    },

    'swiper' : { // ------------------------------------- iDangero.us Swiper ---
        install : false,
        js: [
            'js/swiper.min.js'
        ],
        css: [
            'css/swiper.min.css'
        ]
    }
};

const fetch  = require('node-fetch');

module.exports = function(grunt) {
    grunt.initConfig({

        cdnjs : {
            libs : vendor
        },

        // --- Concat Vendor files ---------------------------------------------

        'curl-dir' : {},

        concat : {
            vendorJs : {
                src: [],
                dest: 'htdocs/js/vendor.min.js'
            },
            vendorCss : {
                src: [],
                dest: 'htdocs/css/vendor.min.css'
            }
        },

        // --- Copy vendor assets to htdocs  -----------------------------------

        copy: {
            vendorFonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [],
                    dest: 'htdocs/fonts/'
                }],
            },

            vendorImages: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [],
                    dest: 'htdocs/images/'
                }],
            },
        },

        // --- Compile Sass and Coffee -----------------------------------------

        sass: {
            css: {
                options: {
                    style : "expanded",
                    noCache: true
                },
                files: {
                    'htdocs/css/style.css': 'src/sass/style.scss'
                }
            }
        },

        coffee: {
            default: {
                files: {
                    'htdocs/js/default.js' : [
                        'src/boilerplate/**/*.coffee',
                        'src/coffee/**/*.coffee' ]
                }
            }
        },

        clean: {
            tempFiles: ['temp'],
        },

        // --- Watcher ---------------------------------------------------------

        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: [
                    "src/**/*.coffee",
                    "src/**/*.scss" ],

                tasks: [
                    "sass",
                    "coffee" ]
            }
        }
    }); //initConfig
    //
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerMultiTask('cdnjs', 'Fetch JSON from CDN', function() {

        let done    = this.async(),
            libs    = grunt.config.get().cdnjs.libs,
            apiUrl  = 'https://api.cdnjs.com/libraries/',
            baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/',
            curlDir = {},
            purge   = {
                images : [],
                fonts : []
            },
            files   = {
                js     : [], // to be concatenated
                css    : [], // "
                images : [], // to be copied
                fonts  : []  // "
            };

        for (let lib in libs) {

            if (libs[lib].install) {

                grunt.log.writeln('Fetching: '.green + lib.green);

                for (let type in files) {
                    if (libs[lib][type]) {
                        files[type] = files[type].concat(libs[lib][type].map(function (e) {
                            return "temp/**/" + e.replace(/js\/|css\/|images\/|fonts\//g, '')
                        }))
                    }
                }
            }
            else {
                grunt.log.writeln('Skipping: '.red + lib.red);

                for (let type in purge) {
                    if (libs[lib][type]) {
                        purge[type] = purge[type].concat(libs[lib][type].map(function (e) {
                            return "htdocs/**/" + e.replace(/js\/|css\/|images\/|fonts\//g, '')
                        }))
                    }
                }
            }
        }

        grunt.config.merge({
            copy: {
                vendorFonts: {
                    files: [{
                        src: files.fonts
                    }]
                },
                vendorImages: {
                    files: [{
                        src: files.images
                    }]
                }
            }
        });

        grunt.config.merge({
            concat: {
                vendorJs: {
                    src: files.js
                },
                vendorCss: {
                    src: files.css
                }
            }
        });

        grunt.config.merge({
            clean: {
                vendorFonts: purge.fonts,
                vendorImages: purge.images,
            }
        });

        for (let lib in libs) {
            fetch(apiUrl + lib + '/')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    let version = data.assets[0].version,
                        assets  = data.assets[0].files;

                    // Prepend the base url to each file
                    let filesFullUri = assets.map(function(file) { return baseUrl + lib + "/" + version + "/" + file });

                    // push to curlDir
                    curlDir['temp/vendor/' + lib] = filesFullUri;

                }).then(function(){
                    if (Object.keys(curlDir).length === Object.keys(libs).length) {
                        grunt.config.set('curl-dir', curlDir);
                        done(true); // async is done
                    }
                })
                .catch(function(error){
                    grunt.log.writeln('error:' + error.cyan);
                });
        }
    });

    grunt.registerTask("init", ['cdnjs', 'curl-dir', 'copy', 'concat', 'clean']);
    grunt.registerTask("dev",  ['coffee', 'sass', 'watch']);
};