const version = require('./package.json').version;
const moment  = require('moment');
const sass    = require('node-sass');

module.exports = function (grunt) {
	grunt.initConfig({

		// --- Compile Sass -----------------------------------------

		sass: {
			options: {
				implementation: sass,
				sourcemap: true
			},
			dist: {
				files: {
					'htdocs/css/style.css': 'src/sass/style.scss'
				}
			}
		},

		browserify: {
			default: {
				files: {
					'htdocs/js/default.js': 'src/script/default.js'
				},
				options: {
					transform: [
						['babelify', {
							presets: ['@babel/env']
						}]
					],
					browserifyOptions: {
						debug: false,
						paths: ["./boilerplate", "./node_modules"]
					}
				}
			}
		},

		uglify: {
			options: {
				mangle: true
			},
			boilerplate: {
				files: {
					'htdocs/js/default.min.js': ['htdocs/js/default.js']
				}
			}
		},

		// --- Boilerplate Update -----------------------------------------

		clean: {
			afterUpdate: ['temp'],
			beforeUpdate: ['boilerplate']
		},

		curl: {
			update: {
				src: 'https://github.com/felixheidecke/KR-Boilerplate/archive/stable_1.zip',
				dest: 'temp/master.zip'
			}
		},

		unzip: {
			update: {
				src: 'temp/master.zip',
				dest: "temp/"
			}
		},

		move: {
			update: {
				files: [{
					src: 'temp/KR-Boilerplate-stable_1/boilerplate/',
					dest: 'boilerplate'
				}, {
					src: [
						'temp/KR-Boilerplate-stable_1/.gitignore',
						'temp/KR-Boilerplate-stable_1/gruntfile.js',
						'temp/KR-Boilerplate-stable_1/header.js',
						'temp/KR-Boilerplate-stable_1/package.json',
						'temp/KR-Boilerplate-stable_1/package-lock.json',
						'temp/KR-Boilerplate-stable_1/README.md',
						'temp/KR-Boilerplate-stable_1/KR-Boilerplate.bat'
					],
					dest: './'
				}]
			}
		},

		// --- Write Backup ---------------------------------------------------------

		zip: {
			backup: {
				src: [
					'htdocs/**/*',
					'src/**/*',
					'gruntfile.js',
					'boilerplate/*',
					'package.json',
					'header.js',
					'KR-Boilerplate.bat'
				],
				dest: 'backup/project-' + moment().format('DD-MM-YYYY_HH[h]-mm[m]-ss[s]') + '.zip'
			}
		},



		// --- Watcher ---------------------------------------------------------

		watch: {
			default: {
				options: {
					spawn: false
				},
				files: [
					"src/**/*.js",
					"src/**/*.scss"
				],
				tasks: [
					'_build'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-move');

	grunt.registerTask("_watch", [
		'sass',
		'browserify',
		'uglify',
		'watch'
	]);

	grunt.registerTask("_build", [
		'sass',
		'browserify',
		'uglify'
	]);

	grunt.registerTask("_backup", [
		'zip'
	]);

	grunt.registerTask("_update", [
		'clean:beforeUpdate',
		'curl',
		'unzip',
		'move',
		'clean:afterUpdate'
	]);
};