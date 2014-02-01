'use strict';

module.exports = function (grunt) {

  // auto load register grunt tasks
  require('load-grunt-config')(grunt);

  // defined karma test files
  var testFiles = [
    // classy
    'bower_components/classy/classy.js',
    'bower_components/jquery/jquery.js',
    'bower_components/jquery-fullscreen/jquery.fullscreen.js'
  ].concat(grunt.file.readJSON('.make.json')).concat([
      // html fixtures
      'test/fixtures/canvas.js',
      // specs
      'test/spec/**/*.js'
  ]);

  // project configuration
  grunt.initConfig({
    app: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        interupt: false,
        reporter: require('jshint-stylish')
      },
      source: ['src/**/*.js']
    },
    uglify: {
      min: {
        files: [{
          src: grunt.file.readJSON('.make.json'),
          dest: 'kitten.min.js'
        }]
      }
    },
    yuidoc: {
      compile: {
        name: '<%= app.name %>',
        description: '<%= app.description %>',
        version: '<%= app.version %>',
        url: '<%= app.homepage %>',
        options: {
          paths: 'src/',
          outdir: 'doc/'
        }
      }
    },
    karma: {
      spec: {
        options: {
          files: testFiles
        },
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      source: {
        files: ['src/**/*.js'],
        tasks: ['jshint:source']
      },
      spec: {
        files: ['test/spec/**/*.js'],
        tasks: ['karma:spec']
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint', 'karma']);
};
