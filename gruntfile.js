const config   = require('./config.json');
const moment   = require('moment');
const testPort = Math.floor(Math.random() * (8900 - 8100) + 8100);
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

    "in-view" : {
        "install" : config.vendor['in-view'],
        "js" : [
            "dist/in-view.min.js"
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

        collect : {
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
                    src: [
                        'temp/KR-Boilerplate-master/gruntfile.js',
                        'temp/KR-Boilerplate-master/header.js',
                        'temp/KR-Boilerplate-master/package.json',
                        'temp/KR-Boilerplate-master/README.md',
                        'temp/KR-Boilerplate-master/KR-Boilerplate.bat'],
                    dest: './'
                }]
            },
            test: {
                files: [{
                    src: 'temp/src/boilerplate/**/*.html',
                    dest: 'test/'
                }]
            }
        },

        // --- Compile Sass and Coffee -----------------------------------------

        sass: {
            default: {
                options: {
                    style : "expanded",
                    noCache: true
                },
                files: {
                    'htdocs/css/style.css': 'src/sass/style.scss'
                }
            },
            test: {
                options: {
                    style : "expanded",
                    sourcemap: "none",
                    noCache: true
                },
                files: {
                    'test/assets/boilerplate.css': 'src/boilerplate/boilerplate.scss'
                }
            },
        },

        coffee: {
            default: {
                files: {
                    'htdocs/js/default.js' : [
                        'src/boilerplate/**/*.coffee',
                        'src/coffee/**/*.coffee' ]
                }
            },
            test: {
                files: {
                    'test/assets/boilerplate.js' : ['src/boilerplate/**/*.coffee']
                }
            }
        },

        clean: {
            tempFiles: ['temp'],
            test: ['test'],
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
                    'header.js',
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
        
        // --- Pug ------------------------------------------------------------

        pug: {
            html: {
                options: {
                    client: false,
                    pretty: "    ",
                    data: {
                        debug: false
                    }
                },
                files: [{
                    src: ["src/boilerplate/elements/**/*.pug"],
                    dest: "temp/",
                    expand: true,
                    ext: ".html"
                }]
            }
        },

        // --- Server ---------------------------------------------------------

        connect: {
            testServer: {
                options: {
                    hostname: 'localhost',
                    port: testPort,
                    base: "test",
                    keepalive: true,
                    open: true
                }
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-move');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerMultiTask('collect', 'Collect, concat & copy libraries', function() {

        const libs    = grunt.config.get().collect.libs;
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

    grunt.registerTask("setup",   ['collect', 'copy', 'concat', 'clean:images', 'clean:fonts']);
    grunt.registerTask("watcher", ['coffee:default', 'sass:default', 'watch']);
    grunt.registerTask("build",   ['coffee:default', 'sass:default']);
    grunt.registerTask("backup",  ['zip:backup']);
    grunt.registerTask("test",    ['clean:test', 'pug', 'coffee:test', 'sass:test', 'move:test', 'clean:tempFiles', 'connect:testServer']);
    grunt.registerTask("update",  ['curl:update', 'unzip:update', 'clean:update', 'move:update', 'clean:tempFiles']);
};