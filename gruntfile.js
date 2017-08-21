let vendor = {

    // --- http://jquery.com/ --------------------------------------------------

    'jquery' : [
        'jquery.min.js'
    ],

    // --- http://purecss.io/ --------------------------------------------------

    'pure' : [
        'base-min.css',
        'grids-min.css',
        'grids-responsive-min.css'
    ],

    // --- http://fontawesome.io/ ----------------------------------------------

    'font-awesome' : [
        'css/font-awesome.min.css',
        'fonts/fontawesome-webfont.eot',
        'fonts/fontawesome-webfont.svg',
        'fonts/fontawesome-webfont.ttf',
        'fonts/fontawesome-webfont.woff',
        'fonts/fontawesome-webfont.woff2'
    ],

    // --- http://vuejs.org/ ---------------------------------------------------

/*
  'vue' : [
        'vue.min.js'
    ],
*/

    // --- http://hgoebl.github.io/mobile-detect.js/ ---------------------------

/*
    'mobile-detect' : [
        'mobile-detect.min.js'
    ],
*/

    // --- http://andreknieriem.de/simple-lightbox/ ----------------------------

/*
    'simplelightbox' : [
        'simple-lightbox.min.js',
        'simplelightbox.min.css'
    ],
*/

    // --- http://lokeshdhakar.com/projects/lightbox2/ -------------------------
/*
    'lightbox2' : [
        'js/lightbox.min.js',
        'css/lightbox.min.css',
        'images/close.png',
        'images/loading.gif',
        'images/next.png',
        'images/prev.png'
    ],
*/
};

const fetch = require('node-fetch');

timestamp = function () {

    let d = new Date();
    let date = [];
    let time = [];

    date.push( d.getFullYear() );
    date.push( d.getMonth() );
    date.push( d.getDate() );
    time.push( d.getHours() );
    time.push( d.getMinutes() );

    return date.join('.') + '_' + time.join('') + 'h';
};

module.exports = function(grunt) {
    grunt.initConfig({

        cdnjs : {
            libs : vendor
        },

        // --- Concat Vendor files ---------------------------------------------

        'curl-dir' : {},

        concat : {
            vendorJs : {
                src: ['vendor/**/*.js'],
                dest: 'htdocs/js/vendor.min.js'
            },
            vendorCss : {
                src: ['vendor/**/*.css'],
                dest: 'htdocs/css/vendor.min.css'
            }
        },

        // --- Copy vendor assets to htdocs  -----------------------------------

        copy: {
            vendorFonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        'vendor/**/*.otf',
                        'vendor/**/*.eot',
                        'vendor/**/*-webfont.svg', // special for fontawesome
                        'vendor/**/*.ttf',
                        'vendor/**/*.woff',
                        'vendor/**/*.woff2'],
                    dest: 'htdocs/fonts/'
                }],
            },

            vendorImages: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        'vendor/**/*.jpg',
                        'vendor/**/*.png',
                        'vendor/**/*.gif'],
                    dest: 'htdocs/images/'
                }],
            },
        },

        // --- Compile Sass and Coffee -----------------------------------------

        sass: {
            css: {
                options: {
                    style : "expanded",
                    noCache: true,
                    cacheLocation : '.cache/'
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
                        'src/scaffold/**/*.coffee',
                        'src/coffee/**/*.coffee' ]
                }
            }
        },

        // --- Create backups  -------------------------------------------------

        compress: {
            backup: {
                options: {
                    archive: 'backup/' + timestamp() + '.zip'
                },
                files: [{
                    src: ['src/**', 'htdocs/**'],
                    dest: '/',
                    filter: 'isFile'
                }]
            }
        },

        // --- The cleaning lady is in -----------------------------------------

        clean : {
            all: [
                '.gitignore',
                'vendor',
                'node_modules'
            ],

            git: [
                '.gitignore'
            ],
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
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerMultiTask('cdnjs', 'Fetch JSON from CDN', function() {

        let done    = this.async(),
            libs    = grunt.config.get().cdnjs.libs,
            apiUrl  = 'https://api.cdnjs.com/libraries/',
            baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/',
            curlDir = {};

        for (let lib in libs) {
            grunt.log.writeln('Fetching ' + lib.cyan);
        }

        for (let lib in libs) {
            let files = (libs[lib].length > 0) ? libs[lib] : false;

            fetch(apiUrl + lib + '/')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    let version = data.assets[0].version,
                        assets = (files) ? files : data.assets[0].files;

                    // Prepend the base url to each file
                    let filesFullUri = assets.map(function(file) { return baseUrl + lib + "/" + version + "/" + file });

                    // push to curlDir
                    curlDir['vendor/' + lib] = filesFullUri;

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

    grunt.registerMultiTask('cdnjs', 'Fetch JSON from CDN', function() {

        let done    = this.async(),
            libs    = grunt.config.get().cdnjs.libs,
            apiUrl  = 'https://api.cdnjs.com/libraries/',
            baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/',
            curlDir = {};

        for (let lib in libs) {
            grunt.log.writeln('Fetching ' + lib.cyan);
        }

        for (let lib in libs) {
            let files = (libs[lib].length > 0) ? libs[lib] : false;

            fetch(apiUrl + lib + '/')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    let version = data.assets[0].version,
                        assets = (files) ? files : data.assets[0].files;

                    // Prepend the base url to each file
                    let filesFullUri = assets.map(function(file) { return baseUrl + lib + "/" + version + "/" + file });

                    // push to curlDir
                    curlDir['vendor/' + lib] = filesFullUri;

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

    grunt.registerTask("init", ['compress:backup', 'cdnjs', 'curl-dir', 'copy', 'concat']);
    grunt.registerTask("dev", ['clean:git','compress:backup', 'cdnjs', 'curl-dir', 'copy', 'concat', 'coffee', 'sass', 'watch']);

};