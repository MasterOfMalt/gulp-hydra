/* global before, describe, it */
'use strict';

var assert = require('assert');
var rimraf = require('rimraf');
var fs = require('fs');
var childUtils = require('./utils/child.js');

before(function(done) {
  rimraf(__dirname + '/actual-files/', done);
});

describe('gulp-spritesmash', function() {
  describe('running hydra without any options', function() {
    childUtils.run('gulp hydra-passthrough');
    it('should pass all files through as root stream', function() {
      assert.doesNotThrow(function() {
        var files = fs.readdirSync(__dirname + '/actual-files/passthrough/');

        files.forEach(function(fileName) {
          var actualFile = fs.readFileSync(__dirname
                            + '/actual-files/passthrough/'
                            + fileName, 'utf8');
          var expectedFile = fs.readFileSync(__dirname
                            + '/expected-files/passthrough/'
                            + fileName, 'utf8');
          assert.strictEqual(actualFile, expectedFile);
        });
      });
    });
  });
});
