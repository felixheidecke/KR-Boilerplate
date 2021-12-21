const sass = require('node-sass')

module.exports = function (grunt) {
  grunt.initConfig({
    curl: {
      update: {
        src: 'https://github.com/felixheidecke/KR-Boilerplate/archive/stable_2.zip',
        dest: 'temp/master.zip',
      },
    },

    unzip: {
      update: {
        src: 'temp/master.zip',
        dest: 'temp/',
      },
    },

    move: {
      update: {
        files: [
          {
            src: 'temp/KR-Boilerplate-stable_2/boilerplate/',
            dest: 'boilerplate',
          },
          {
            src: [
              'temp/KR-Boilerplate-stable_2/.gitignore',
              'temp/KR-Boilerplate-stable_2/gruntfile.js',
              'temp/KR-Boilerplate-stable_2/header.js',
              'temp/KR-Boilerplate-stable_2/package.json',
              'temp/KR-Boilerplate-stable_2/package-lock.json',
              'temp/KR-Boilerplate-stable_2/README.md',
              'temp/KR-Boilerplate-stable_2/webpack.config.js',
              'temp/KR-Boilerplate-stable_2/KR-Boilerplate.bat',
            ],
            dest: './',
          },
        ],
      },
    },
  })

  grunt.loadNpmTasks('grunt-curl')
  grunt.loadNpmTasks('grunt-zip')
  grunt.loadNpmTasks('grunt-move')

  grunt.registerTask('update', ['curl', 'unzip', 'move'])
}
