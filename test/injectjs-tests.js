'use strict';

var grunt = require('grunt');

exports.inject_js = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    default_options: function(test) {

        test.expect(1);
        var actual = grunt.file.read('test/output/index.html');
        var expected = grunt.file.read('test/expected/index.html');
        test.equal(actual, expected, 'Then should output the correct file into the HTML document.');
        test.done();
    }
};

