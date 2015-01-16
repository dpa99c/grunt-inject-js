'use strict';

var grunt = require('grunt');

exports.inject_js = {
    when_injecting_all_javascript_files_into_a_html_page: function(test) {
        test.expect(1);
        var actual = grunt.file.read('test/output/index-injected-all.html');
        var expected = grunt.file.read('test/expected/index-injected-all.html');
        test.equal(actual, expected, 'Then should output the correct file into the HTML document.');
        test.done();
    },
    when_removing_all_tags_from_an_html_page: function(test)
    {
        test.expect(1);
        var actual = grunt.file.read('test/output/index-removed.html');
        var expected = grunt.file.read('test/expected/index-removed.html');
        test.equal(actual, expected, 'Then should remove all tags in the HTML document.');
        test.done();
    },
    when_injecting_two_javascript_files_into_a_html_page: function(test) {
        test.expect(1);
        var actual = grunt.file.read('test/output/index-injected-two.html');
        var expected = grunt.file.read('test/expected/index-injected-two.html');
        test.equal(actual, expected, 'Then should output the correct files into the HTML document.');
        test.done();
    }
};

