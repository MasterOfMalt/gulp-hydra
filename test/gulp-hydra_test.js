/* global before, describe, it */
'use strict';

var assert = require('assert');
var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');
var childUtils = require('./utils/child.js');

before(function(done) {
  rimraf(__dirname + '/actual-files/', done);
});

describe('gulp-spritesmash', function() {
  describe('running hydra without any options', function() {
    childUtils.run('gulp hydra-passthrough');

    it('should output filtered files separately', function(done) {
      assert.doesNotThrow(function() {
        var filePath = 'actual-files/passthrough';
        fs.readdir(filePath, function(err, files) {
          if (err) {
            throw err;
          }
          files.map(function(file) {
            return { fileName: file, path: path.join(filePath, file) };
          }).filter(function(file) {
            return fs.statSync(file.path).isFile();
          }).forEach(function(file) {
            var expectedFilePath = path.join('expected-files/passthrough', file.fileName);
            var actualFile = fs.readFileSync(file.path, 'utf8');
            var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

            assert.strictEqual(actualFile, expectedFile);
          });
          done();
        });
      });
    });
  });

  describe('running hydra with filters on text files', function() {
    childUtils.run('gulp hydra-text-files-only');

    it('should pass all files through as root stream', function(done) {
      assert.doesNotThrow(function() {
        var filePath = 'actual-files/text-files/';
        fs.readdir(filePath, function(err, files) {
          if (err) {
            throw err;
          }
          files.map(function(file) {
            return { fileName: file, path: path.join(filePath, file) };
          }).filter(function(file) {
            return fs.statSync(file.path).isFile();
          }).forEach(function(file) {
            var expectedFilePath = path.join('expected-files/text-files/', file.fileName);
            var actualFile = fs.readFileSync(file.path, 'utf8');
            var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

            assert.strictEqual(actualFile, expectedFile);
          });
          done();
        });
      });
    });

    it('should output filtered files separately', function(done) {
      assert.doesNotThrow(function() {
        var filePath = 'actual-files/text-files/text';
        fs.readdir(filePath, function(err, files) {
          if (err) {
            throw err;
          }
          files.map(function(file) {
            return { fileName: file, path: path.join(filePath, file) };
          }).filter(function(file) {
            return fs.statSync(file.path).isFile();
          }).forEach(function(file) {
            var expectedFilePath = path.join('expected-files/text-files/text', file.fileName);
            var actualFile = fs.readFileSync(file.path, 'utf8');
            var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

            assert.strictEqual(actualFile, expectedFile);
          });
          done();
        });
      });
    });
  });

  describe('running hydra with multiple filters with overlapping files', function() {
    childUtils.run('gulp hydra-text-markdown');

    it('should output markdown files into markdown directory', function(done) {
      assert.doesNotThrow(function() {
        var filePath = 'actual-files/text-markdown/markdown';

        fs.readdir(filePath, function(err, files) {
          if (err) {
            throw err;
          }
          files.map(function(file) {
            return { fileName: file, path: path.join(filePath, file) };
          }).filter(function(file) {
            return fs.statSync(file.path).isFile();
          }).forEach(function(file) {
            var expectedFilePath =
                  path.join('expected-files/text-markdown/markdown', file.fileName);
            var actualFile = fs.readFileSync(file.path, 'utf8');
            var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

            assert.strictEqual(actualFile, expectedFile);
          });
          done();
        });
      });
    });

    it('should output text files into the text directory', function(done) {
      assert.doesNotThrow(function() {
        var filePath = 'actual-files/text-markdown/text';

        fs.readdir(filePath, function(err, files) {
          if (err) {
            throw err;
          }
          files.map(function(file) {
            return { fileName: file, path: path.join(filePath, file) };
          }).filter(function(file) {
            return fs.statSync(file.path).isFile();
          }).forEach(function(file) {
            var expectedFilePath = path.join('expected-files/text-markdown/text', file.fileName);
            var actualFile = fs.readFileSync(file.path, 'utf8');
            var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

            assert.strictEqual(actualFile, expectedFile);
          });
          done();
        });
      });
    });

    it('should output the same file in each matched location', function() {
      var filePath = 'actual-files/text-markdown/';
      assert.doesNotThrow(function() {
        var actualFile = fs.readFileSync(path.join(filePath + 'markdown', 'file4.md'), 'utf8');
        var expectedFile = fs.readFileSync(path.join(filePath + 'text', 'file4.md'), 'utf8');

        assert.strictEqual(actualFile, expectedFile);
      });
    });
  });

  describe('running hydra with extension filter', function() {
    describe('with single argument - not array - with dot', function() {
      childUtils.run('gulp hydra-extension-split-single-with-dot');

      it('should output files correctly', function(done) {
        assert.doesNotThrow(function() {
          var filePath = 'actual-files/extension-split/single-with-dot';

          fs.readdir(filePath, function(err, files) {
            if (err) {
              throw err;
            }
            files.map(function(file) {
              return { fileName: file, path: path.join(filePath, file) };
            }).filter(function(file) {
              return fs.statSync(file.path).isFile();
            }).forEach(function(file) {
              var expectedFilePath =
                    path.join('expected-files/extension-split/single-with-dot', file.fileName);
              var actualFile = fs.readFileSync(file.path, 'utf8');
              var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

              assert.strictEqual(actualFile, expectedFile);
            });
            done();
          });
        });
      });
    });

    describe('with single argument - not array - no dot', function() {
      childUtils.run('gulp hydra-extension-split-single-no-dot');

      it('should output files correctly', function(done) {
        assert.doesNotThrow(function() {
          var filePath = 'actual-files/extension-split/single-no-dot';

          fs.readdir(filePath, function(err, files) {
            if (err) {
              throw err;
            }
            files.map(function(file) {
              return { fileName: file, path: path.join(filePath, file) };
            }).filter(function(file) {
              return fs.statSync(file.path).isFile();
            }).forEach(function(file) {
              var expectedFilePath =
                    path.join('expected-files/extension-split/single-no-dot', file.fileName);
              var actualFile = fs.readFileSync(file.path, 'utf8');
              var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

              assert.strictEqual(actualFile, expectedFile);
            });
            done();
          });
        });
      });
    });

    describe('with array argument with dot', function() {
      childUtils.run('gulp hydra-extension-split-array');

      it('should output files correctly', function(done) {
        assert.doesNotThrow(function() {
          var filePath = 'actual-files/extension-split/array';

          fs.readdir(filePath, function(err, files) {
            if (err) {
              throw err;
            }
            files.map(function(file) {
              return { fileName: file, path: path.join(filePath, file) };
            }).filter(function(file) {
              return fs.statSync(file.path).isFile();
            }).forEach(function(file) {
              var expectedFilePath =
                    path.join('expected-files/extension-split/array', file.fileName);
              var actualFile = fs.readFileSync(file.path, 'utf8');
              var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

              assert.strictEqual(actualFile, expectedFile);
            });
            done();
          });
        });
      });
    });
  });

  describe('running hydra with filename filter', function() {
    describe('with single argument - not array', function() {
      childUtils.run('gulp hydra-filename-filter-single');

      it('should output files correctly', function(done) {
        assert.doesNotThrow(function() {
          var filePath = 'actual-files/filename-filter/single';

          fs.readdir(filePath, function(err, files) {
            if (err) {
              throw err;
            }
            files.map(function(file) {
              return { fileName: file, path: path.join(filePath, file) };
            }).filter(function(file) {
              return fs.statSync(file.path).isFile();
            }).forEach(function(file) {
              var expectedFilePath =
                    path.join('expected-files/filename-filter/single', file.fileName);
              var actualFile = fs.readFileSync(file.path, 'utf8');
              var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

              assert.strictEqual(actualFile, expectedFile);
            });
            done();
          });
        });
      });
    });

    describe('with single argument - array', function() {
      childUtils.run('gulp hydra-filename-filter-array');

      it('should output files correctly', function(done) {
        assert.doesNotThrow(function() {
          var filePath = 'actual-files/filename-filter/array';

          fs.readdir(filePath, function(err, files) {
            if (err) {
              throw err;
            }
            files.map(function(file) {
              return { fileName: file, path: path.join(filePath, file) };
            }).filter(function(file) {
              return fs.statSync(file.path).isFile();
            }).forEach(function(file) {
              var expectedFilePath =
                    path.join('expected-files/filename-filter/array', file.fileName);
              var actualFile = fs.readFileSync(file.path, 'utf8');
              var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

              assert.strictEqual(actualFile, expectedFile);
            });
            done();
          });
        });
      });
    });
  });

  describe('running hydra with lots of files', function() {
    childUtils.run('gulp hydra-lots-of-files-single');

    it('should output files correctly', function(done) {
      assert.doesNotThrow(function() {
        var filePath = 'actual-files/lots-of-files/single';

        fs.readdir(filePath, function(err, files) {
          if (err) {
            throw err;
          }
          files.map(function(file) {
            return { fileName: file, path: path.join(filePath, file) };
          }).filter(function(file) {
            return fs.statSync(file.path).isFile();
          }).forEach(function(file) {
            var expectedFilePath =
                  path.join('expected-files/lots-of-files/single', file.fileName);
            var actualFile = fs.readFileSync(file.path, 'utf8');
            var expectedFile = fs.readFileSync(expectedFilePath, 'utf8');

            assert.strictEqual(actualFile, expectedFile);
          });
          done();
        });
      });
    });
  });
});
