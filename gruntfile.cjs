module.exports = function (grunt) {
  grunt.initConfig({
    curl: {
      update: {
        src: 'https://github.com/felixheidecke/KR-Boilerplate/archive/refs/heads/dev/svelte.zip',
        dest: 'temp/svelte.zip',
      },
    },

    unzip: {
      update: {
        src: 'temp/svelte.zip',
        dest: 'temp/',
      },
    },

    move: {
      update: {
        files: [
          {
            src: 'temp/KR-Boilerplate-dev-svelte/boilerplate/',
            dest: 'boilerplate',
          },
          {
            src: [
              'temp/KR-Boilerplate-dev-svelte/.gitignore',
              'temp/KR-Boilerplate-dev-svelte/.npmrc',
              'temp/KR-Boilerplate-dev-svelte/gruntfile.js',
              'temp/KR-Boilerplate-dev-svelte/package.json',
              'temp/KR-Boilerplate-dev-svelte/package-lock.json',
              'temp/KR-Boilerplate-dev-svelte/svelte.config.js',
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
