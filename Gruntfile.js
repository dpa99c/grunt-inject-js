/*
 * grunt-inject-js
 * https://github.com/MarkAPhillips/grunt-inject-js
 *
 * Copyright (c) 2015 Mark Phillips
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/output']
    },

    // Configuration to be run (and then tested).
    injectjs: {
      when_injecting_all_javascript_files_into_a_html_page: {
        files: {
          'test/output/index-injected-all.html': 'test/fixtures/index.html'
        },
        scriptsrc: 'test/fixtures/js/*.js'
      },
      when_removing_all_tags_from_an_html_page: {
        files: {
          'test/output/index-removed.html': 'test/fixtures/index.html'
        },
        clear: true
      },
      when_injecting_two_javascript_files_into_a_html_page: {
        files: {
          'test/output/index-injected-two.html': 'test/fixtures/index.html'
        },
        scriptsrc: ['test/fixtures/js/woopra.js', 'test/fixtures/js/google.js']
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*-tests.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'injectjs', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
