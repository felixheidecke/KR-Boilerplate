const version = require('./package.json').version;
const moment = require('moment');
const sass = require('node-sass');

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
							presets: 'env'
						}]
					],
					browserifyOptions: {
						debug: true
					}
				}
			}
		},

		uglify: {
			boilerplate: {
				files: [{
					expand: true,
					cwd: 'src/boilerplate/src/js/',
					src: '**/*.js',
					dest: `src/boilerplate/build/${version}/js/`,
					rename: function (dst, src) {
						// To keep the source js files and make new files as `*.min.js`:
						return dst + '/' + src.replace('.js', '.min.js');
						// Or to override to src:
						// return src;
					}
				}]
			}
		},

		// --- Boilerplate Update -----------------------------------------

		clean: {
			afterUpdate: ['temp'],
			bp_build: ['src/boilerplate/build'],
			beforeUpdate: ['src/boilerplate']
		},

		curl: {
			update: {
				src: 'https://github.com/felixheidecke/KR-Boilerplate/archive/feature-cdn.zip',
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
					src: 'temp/KR-Boilerplate-feature-cdn/src/boilerplate/',
					dest: 'src/boilerplate'
				}, {
					src: [
						'temp/KR-Boilerplate-feature-cdn/.gitignore',
						'temp/KR-Boilerplate-feature-cdn/gruntfile.js',
						'temp/KR-Boilerplate-feature-cdn/header.js',
						'temp/KR-Boilerplate-feature-cdn/package.json',
						'temp/KR-Boilerplate-feature-cdn/package-lock.json',
						'temp/KR-Boilerplate-feature-cdn/README.md',
						'temp/KR-Boilerplate-feature-cdn/KR-Boilerplate.bat'
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
					"sass",
					'browserify'
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
		'watch'
	]);

	grunt.registerTask("_build", [
		'sass',
		'browserify',
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