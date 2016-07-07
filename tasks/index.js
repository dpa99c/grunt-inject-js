/*
* grunt-inject-js
* Copyright (c) 2015 Mark Phillips
* Licensed under the MIT License
 */
'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('injectjs', 'Grunt Task that allows for multiple JavaScript files to be injected into a file.', function() {

    var _this = this,
        clearTags = this.data.clear,
        startPlaceholder = {
          html: '<!-- inject:',
          js: '/* inject:'
        },
        endPlaceholder = {
          html: ' -->',
          js: ' */'
        };

    if(clearTags)
    {
      this.files.forEach(function (file) {
        var dest = file.dest,
            destType = file.dest.match(/\.js$/) ? "js" : "html",
            replaceContent = grunt.file.read(file.src),
            regex = new RegExp(startPlaceholder[destType] + "[a-zA-Z]*" + endPlaceholder[destType], 'gi'),
            output= replaceContent.replace(regex,'');
        grunt.file.write(dest, output);
        grunt.log.ok('Successfully removed all tags from file:  ' + file.dest.blue);
      });
    }
  else {
      var scriptsrc = grunt.file.expand(this.data.scriptsrc);
      var scriptArray = [];
      if (scriptsrc) {
        scriptsrc.forEach(function (path) {
          grunt.verbose.writeln('Processing file ' + path);
          createFileContent(path);
        });
      } else {
        grunt.log.error('Please enter a location of the JavaScript files to be injected into the Html document');
        return;
      }
      if (scriptArray.length === 0) {
        var warningText = "Warning: No files located using glob pattern " + this.data.scriptsrc;
        grunt.log.warn(warningText);
      }
      else {
        this.files.forEach(function (file) {
          var replaceContent = grunt.file.read(file.src);
          var dest = file.dest,
              destType = file.dest.match(/\.js$/) ? "js" : "html";

          scriptArray.forEach(function (item) {
            var placeholder = startPlaceholder[destType] + item.identifier + endPlaceholder[destType],
                replacement = destType === "js" ? item.filecontent : '<script type="text/javascript">' + item.filecontent + '</script>';
            replaceContent = replaceContent.replace(placeholder, replacement);
            var fileText = item.identifier + '.js';
            grunt.verbose.writeln('JS script ' + fileText + ' injected into ' + file.dest);
          });
          grunt.file.write(dest, replaceContent);
          grunt.log.ok('Successfully updated file  ' + file.dest.blue);
        });
      }
    }

    /** Create file content based on the file path passed. **/
    function createFileContent(path) {
      var filename = path.split('/').pop();
      if (typeof path !== 'undefined' && path.indexOf('.js')!==-1) {
          createScriptItem(filename, path);
        }
        else {
          grunt.verbose.warn("Warning scriptsrc contains a non-javascript file: " + filename);
        }

    }

    /** Read file and create script item and push to array **/
    function createScriptItem(filename, path) {
      var identifier = filename.replace('.js', '');
      if(!_this.data.preserveCase) identifier = identifier.toLowerCase();
      var filecontent = grunt.file.read(path);
      var scriptItem = {
        identifier: identifier,
        filecontent: filecontent
      };
      scriptArray.push(scriptItem);
    }
  });
};
