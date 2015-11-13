'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');

function hydra() {
  var onData = function onData(file, encoding, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error',
                new gutil.PluginError('gulp-hydra', 'Streaming not supported'));
      return cb();
    }

    this.push(file);

    return cb();
  };

  var onEnd = function onEnd(cb) {
    return cb();
  };

  return through2.obj(onData, onEnd);
}

module.exports = hydra;
