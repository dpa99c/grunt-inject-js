/*
* grunt-inject-js
* Copyright (c) 2015 Mark Phillips
* Licensed under the MIT License
 */

module.exports = function(grunt) {
  'use strict';
  grunt.registerMultiTask('inject_js', 'Grunt Task that allows for multiple js files to be injected into a file.', function() {

    var scriptsrc = grunt.file.expand(this.data.scriptsrc);
    var scriptArray = [];

    if (scriptsrc) {
      scriptsrc.forEach(function (path) {
          createFileContent(path);
      });
    } else {
      grunt.log.error('Please enter a location of the Javascript files to be injected into the Html document');
      return;
    }

    this.files.forEach(function(file)
    {
      var src = grunt.file.read(file.src);
      var replaceContent = src;
      var dest = file.dest;

      scriptArray.forEach(function(item)
      {
          var placeholder  = '<!-- inject:' + item.identifier + ' -->';
          replaceContent = replaceContent.replace(placeholder,'<script type="text/javascript">' + item.filecontent + '</script>');
          var fileText = item.identifier + '.js injected';
          grunt.log.ok('Dev script '+ fileText.blue + ' into ' + file.dest);
      });
      grunt.file.write(dest,replaceContent);
      grunt.log.ok('Successfully updated file  '+ file.dest.blue);
    });

    // Create file content.
    function createFileContent(path)
    {
      if(path.indexOf('.js')) {
        var filename = path.split('/').pop();
        var identifier = filename.replace('.js', '').toLowerCase();
        var filecontent = grunt.file.read(path);
        var scriptItem = {
          identifier : identifier,
          filecontent : filecontent
        };
        scriptArray.push(scriptItem);
      }
    }
  });
};
