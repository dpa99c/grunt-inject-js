
module.exports = function(grunt) {
  'use strict';
  grunt.registerMultiTask('inject_js', 'Grunt Task that allows for multiple js files to be injected into a file', function() {

    var scriptsrc = grunt.file.expand(this.data.scriptsrc);
    var scriptArray = [];

    if (scriptsrc) {
      scriptsrc.forEach(function (path) {
        grunt.log.writeln('Path:' + path);
          createFileContent(path);
      });
    } else {
      grunt.log.error('Please enter a location of the Javascript files to be injected into the Html document');
      return;
    }

    this.files.forEach(function(file)
    {
      var src = grunt.file.read(file.src);
      scriptArray.forEach(function(item)
      {
          var placeholder  = '<!--inject:' + item.identifier + '-->';
          grunt.file.write(file.dest,src.replace(placeholder,'<script type="text/javascript">' + item.filecontent + '</script>'));
          grunt.log.ok('Dev script '+ item.identifier + '.js injected'.blue + ' into ' + file.dest);

      });
    });

    // Create file content
    function createFileContent(path)
    {
      if(path.indexOf('.js')) {
        var filename = path.split('/').pop();
        grunt.log.writeln('Filename:' + filename);
        var identifier = filename.replace('.js', '').toLowerCase();
        grunt.log.writeln('Identifier:' + identifier);
        var filecontent = grunt.file.read(path);
        grunt.log.writeln('FileContent:' + filecontent);
        var scriptItem = {
          identifier : identifier,
          filecontent : filecontent
        };
        scriptArray.push(scriptItem);
      }
    }
  });
};
