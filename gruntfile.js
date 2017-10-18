const config = require('./config.json');
const moment = require('moment');

let   libs   = {
    "jquery" : {
        "install" : config.vendor.jquery,
        "js" : [
            "dist/jquery.min.js"
        ]
    },

    "purecss" : {
        "install" : config.vendor.purecss,
        "css" : [
            "build/base-min.css",
            "build/grids-min.css",
            "build/grids-responsive-min.css"
        ]
    },

    "font-awesome" : {
        "install" : config.vendor['font-awesome'],
        "css" : [
            "css/font-awesome.min.css"
        ],
        "fonts" : [
            "fonts/fontawesome-webfont.eot",
            "fonts/fontawesome-webfont.svg",
            "fonts/fontawesome-webfont.ttf",
            "fonts/fontawesome-webfont.woff",
            "fonts/fontawesome-webfont.woff2"
        ]
    },

    "vue" : {
        "install" : config.vendor.vue,
        "js" : [
            "dist/vue.min.js"
        ]
    },

    "mobile-detect" : {
        "install" : config.vendor['mobile-detect'],
        "js" : [
            "mobile-detect.min.js"
        ]
    },

    "simplelightbox" : {
        "install" : config.vendor.simplelightbox,
        "js" : [
            "dist/simple-lightbox.min.js"
        ],
        "css" : [
            "dist/simplelightbox.min.css"
        ]
    },

    "lightbox2" : {
        "install" : config.vendor.lightbox2,
        "js" : [
            "dist/js/lightbox.min.js"
        ],
        "css" : [
            "dist/css/lightbox.min.css"
        ],
        "images" : [
            "dist/images/close.png",
            "dist/images/close.png",
            "dist/images/loading.gif",
            "dist/images/next.png",
            "dist/images/prev.png"
        ]
    },

    "swiper" : {
        "install" : config.vendor.swiper,
        "js" : [
            "dist/js/swiper.min.js"
        ],
        "css" : [
            "dist/css/swiper.min.css"
        ]
    }
};

module.exports = function(grunt) {
    grunt.initConfig({

        cdnjs : {
            libs : libs
        },

        // --- Concat Vendor files ---------------------------------------------

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
                }]
            },

            vendorImages: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [],
                    dest: 'htdocs/images/'
                }]
            }
        },

        move: {
            update: {
                files: [{
                    src: 'temp/KR-Boilerplate-master/src/boilerplate/',
                    dest: 'src/boilerplate'
                }, {
                    src: 'temp/KR-Boilerplate-master/test/',
                    dest: 'test'
                }, {
                    src: [
                        'temp/KR-Boilerplate-master/gruntfile.js',
                        'temp/KR-Boilerplate-master/package.json',
                        'temp/KR-Boilerplate-master/README.md',
                        'temp/KR-Boilerplate-master/KR-Boilerplate.bat'],
                    dest: './'
                }]
            }
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
            update: [
                'src/boilerplate',
                'test']
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

        curl: {
            update: {
                src: 'https://github.com/felixheidecke/KR-Boilerplate/archive/master.zip',
                dest: 'temp/master.zip'
            }
        },

        unzip: {
            update: {
                src: 'temp/master.zip',
                dest: "temp/"
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
    grunt.loadNpmTasks('grunt-move');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerMultiTask('cdnjs', 'Fetch JSON from CDN', function() {

        const libs    = grunt.config.get().cdnjs.libs;
        const libRoot = 'node_modules';
        const dest    = 'htdocs';

        let   purge   = { images: [], fonts: [] };
        let   files   = { js: [], css: [], images: [], fonts: [] };

        for (let lib in libs) {

            if (libs[lib].install) {
                grunt.log.writeln('Adding '.green + lib.green);

                for (let type in files) {
                    if (libs[lib][type]) {
                        files[type] = files[type].concat(libs[lib][type].map(function (e) {
                            return [libRoot, lib, e].join('/');
                        }))
                    }
                }
            }
            else {
                for (let type in purge) {
                    if (libs[lib][type]) {
                        purge[type] = purge[type].concat(libs[lib][type].map(function (e) {
                            return [dest, e].join('/')
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
            clean: purge
        });
    });

    grunt.registerTask("setup",   ['cdnjs', 'copy', 'concat', 'clean:images', 'clean:fonts']);
    grunt.registerTask("watcher", ['coffee', 'sass', 'watch']);
    grunt.registerTask("build",   ['coffee', 'sass']);
    grunt.registerTask("backup",  ['zip:backup']);
    grunt.registerTask("update",  ['curl:update', 'unzip:update', 'clean:update', 'move:update', 'clean:tempFiles']);
};