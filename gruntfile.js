let vendor = {
    'jquery' : [
        'jquery.min.js'],

    'pure' : [
        'base-min.css',
        'grids-min.css',
        'grids-responsive-min.css' ],

    'vue' : [
        'vue.min.js' ],

    'mobile-detect' : [
        'mobile-detect.min.js' ],

    'simplelightbox' : [
        'simple-lightbox.min.js',
        'simplelightbox.min.css' ],

    'font-awesome' : [
        'css/font-awesome.min.css',
        'fonts/fontawesome-webfont.eot',
        'fonts/fontawesome-webfont.svg',
        'fonts/fontawesome-webfont.ttf',
        'fonts/fontawesome-webfont.woff',
        'fonts/fontawesome-webfont.woff2' ]
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

        copy: {

            // --- copy fonts to htdocs ----------------------------------------

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


            // --- copy images to htdocs ---------------------------------------

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

        /**
         * Compile SASS
         */

        sass: {
            css: {
                options: {
                    style : "expanded",
                    cacheLocation : '.cache/'
                },
                files: {
                    'htdocs/css/style.css': 'src/scss/style.scss'
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

        /* Watcher
        ========================================================================== */

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
    grunt.registerTask("dev", ['coffee', 'sass', 'watch']);

};