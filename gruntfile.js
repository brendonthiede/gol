'use strict';

module.exports = function (grunt) {
  var banner = '/*n<%= pkg.name %> <%= pkg.version %>';
  banner += '- <%= pkg.description %>n<%= pkg.repository.url %>n';
  banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gol.js', 'test.js'],
      options: {
        jshintrc: true
      }
    },
    simplemocha: {
      options: {
      },
      all: { src: ['test.js'] }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['default'],
        options: {
          spawn: true,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',
    ['jshint', 'simplemocha']);
};