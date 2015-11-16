'use strict';
var gulp = require('gulp');
var hydra = require('../src/index.js');
var path = require('path');

var files = [
  'test-files/file1.txt',
  'test-files/file2.css',
  'test-files/file3.css',
  'test-files/file4.md',
  'test-files/file5.png',
  'test-files/file6.png',
  'test-files/file7.png',
];

function extensionMatch(extensions) {
  return function(file) {
    var parsedPath = path.parse(file.path);
    return extensions.indexOf(parsedPath.ext) !== -1;
  };
}

gulp.task('hydra-passthrough', function() {
  return gulp.src(files)
    .pipe(hydra({
      text: extensionMatch(['.txt', '.md']),
    }))
    .pipe(gulp.dest('actual-files/passthrough/'));
});

gulp.task('hydra-text-files-only', function() {
  var stream = gulp.src(files)
    .pipe(hydra({
      text: extensionMatch(['.txt', '.md']),
    }));

  stream.text
      .pipe(gulp.dest('actual-files/text-files/text'));
  return stream
    .pipe(gulp.dest('actual-files/text-files/'));
});

gulp.task('hydra-text-markdown', function() {
  var stream = gulp.src(files)
    .pipe(hydra({
      markdown: extensionMatch(['.md']),
      text: extensionMatch(['.txt', '.md']),
    }));

  stream.markdown
    .pipe(gulp.dest('actual-files/text-markdown/markdown'));

  return stream.text
    .pipe(gulp.dest('actual-files/text-markdown/text'));
});

gulp.task('hydra-extension-split-single-with-dot', function() {
  var stream = gulp.src(files)
    .pipe(hydra({
      filtered: { type: 'ext', filter: '.css' },
    }));

  return stream.filtered
    .pipe(gulp.dest('actual-files/extension-split/single-with-dot/'));
});

gulp.task('hydra-extension-split-single-no-dot', function() {
  var stream = gulp.src(files)
    .pipe(hydra({
      filtered: { type: 'ext', filter: 'css' },
    }));

  return stream.filtered
    .pipe(gulp.dest('actual-files/extension-split/single-no-dot/'));
});

gulp.task('hydra-extension-split-array', function() {
  var stream = gulp.src(files)
    .pipe(hydra({
      filtered: { type: 'ext', filter: ['.css', '.md' ] },
    }));

  return stream.filtered
    .pipe(gulp.dest('actual-files/extension-split/array/'));
});
