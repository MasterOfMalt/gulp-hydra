'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');
var Readable = require('stream').Readable;
var path = require('path');

var filterNames = [];
var filterFunctions = {};
var outputStreams = {};

function hydra(options) {
  var keys = Object.keys(options);
  var key;
  var val;
  var i;
  var stream;
  var onData;
  var onEnd;
  var retStream;

  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    val = options[key];
    if (typeof val === 'function') {
      filterNames.push(key);
      filterFunctions[key] = val;
      stream = outputStreams[key] = new Readable({objectMode: true});
      stream._read = function read() {};
    }
  }

  onData = function(file, encoding, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error',
                new gutil.PluginError('gulp-hydra', 'Streaming not supported'));
      return cb();
    }

    filterNames.forEach(function(filter) {
      var filterFunc = filterFunctions[filter];
      var parsedPath = path.parse(file.path);

      var result = filterFunc(parsedPath);
      if (result) {
        outputStreams[filter].push(file);
      }
    });

    this.push(file);

    return cb();
  };

  onEnd = function(cb) {
    return cb();
  };

  retStream = through2.obj(onData, onEnd);

  filterNames.forEach(function(filter) {
    retStream[filter] = outputStreams[filter];
  });

  return retStream;
}

module.exports = hydra;
