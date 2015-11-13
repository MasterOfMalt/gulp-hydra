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

gulp.task('hydra-passthrough', function() {
  return gulp.src(files)
    .pipe(hydra({
      text: function(file) { return ['.txt', '.md'].indexOf(file.ext) !== -1; },
    }))
    .pipe(gulp.dest('actual-files/passthrough/'));
});

gulp.task('hydra-text-files-only', function() {
  var stream = gulp.src(files)
    .pipe(hydra({
      text: function(file) { return ['.txt', '.md'].indexOf(file.ext) !== -1; },
    }));

  stream.text
      .pipe(gulp.dest('actual-files/text-files/text'));
  return stream
    .pipe(gulp.dest('actual-files/text-files/'));
});

gulp.task('hydra-text-markdown', function() {
  var stream = gulp.src(files)
    .pipe(hydra({
      markdown: function(file) { return ['.md'].indexOf(file.ext) !== -1; },
      text: function(file) { return ['.txt', '.md'].indexOf(file.ext) !== -1; },
    }));

  stream.markdown
    .pipe(gulp.dest('actual-files/text-markdown/markdown'));

  return stream.text
    .pipe(gulp.dest('actual-files/text-markdown/text'));
});
