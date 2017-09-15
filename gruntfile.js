const config = require('./config.json');
const fetch  = require('node-fetch');
const moment = require('moment');

module.exports = function(grunt) {
    grunt.initConfig({

        cdnjs : {
            libs : config.vendor
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

        zip: {
            backup: {
                src: [
                    'htdocs/**/*',
                    'src/**/*',
                    'gruntfile.js',
                    'package.json',
                    'config.json',
                    'KR-Boilerplate.bat' ],
                dest: 'backup/project-' + moment().format('DD-MM-YYYY_HH[h]-mm[m]-ss[s]') + '.zip'
            }
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
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerMultiTask('cdnjs', 'Fetch JSON from CDN', function() {

        let done    = this.async(),
            libs    = grunt.config.get().cdnjs.libs,
            apiUrl  = 'https://api.cdnjs.com/libraries/',
            baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/',
            exclude = [];
            libCount = 0;
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
                exclude.push(lib);
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
            if (libs[lib].install) {
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
                        if (Object.keys(curlDir).length === Object.keys(libs).length - exclude.length) {
                            grunt.config.set('curl-dir', curlDir);
                            done(true); // async is done
                        }
                    })
                    .catch(function(error){
                        grunt.log.writeln('error:' + error.cyan);
                    });
            }
        }
    });

    grunt.registerTask("setup",   ['cdnjs', 'curl-dir', 'copy', 'concat', 'clean']);
    grunt.registerTask("watcher", ['coffee', 'sass', 'watch']);
    grunt.registerTask("build",   ['coffee', 'sass']);
    grunt.registerTask("backup",  ['zip:backup']);
};