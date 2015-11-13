'use strict';
var gulp = require('gulp');
var hydra = require('../src/index.js');

var files = [
  'test-files/file1.txt',
  'test-files/file2.css',
  'test-files/file3.css',
  'test-files/file4.md',
  'test-files/file5.png',
  'test-files/file6.png',
  'test-files/file7.png',
];

gulp.task('hydra-default-passthrough', function() {
  return gulp.src(files)
    .pipe(hydra({
      css: 'CSS',
      images: 'Images',
      text: function(file) { return ['.txt', '.md'].indexOf(file.ext) !== -1; },
    }));
});
