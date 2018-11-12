const moment = require('moment');
const sass   = require('node-sass');

module.exports = function(grunt) {
	grunt.initConfig({

		// --- Compile Sass -----------------------------------------

		sass: {
			options: {
				implementation : sass,
				sourcemap : true
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
						['babelify', { presets: 'env'}]
					],
					browserifyOptions: {
						debug: true
					}
				}
			}
		},

		// --- Boilerplate Update -----------------------------------------

		clean: {
			afterUpdate: ['temp'],
			beforeUpdate: ['src/boilerplate']
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
					'KR-Boilerplate.bat' ],
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
