var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log('readList failed');
    }
    callback(data.split('\n'));
  });
};



exports.isUrlInList = function(target, callback) {
  exports.readListOfUrls(function(data) {
    var found = false;
    _.each(data, function(item) {
      if (target === data) {
        callback(true);
      }
    });
    callback(false);
  });
};

exports.addUrlToList = function(input, callback) {
  var newEntry = input + '\n';
  fs.writeFile(exports.paths.list, newEntry, 'utf8', function(err) {
    if (err) {
      console.log('addUrlToList error');
    } else {
      callback();
    }
  });
};



exports.isUrlArchived = function(url, callback) {
  if (exports.paths.archivedSites + url) {
    callback(true);
  } else {
    callback(false);
  }
};

exports.downloadUrls = function(urls) {
  _.each(urls, function(url) {
    if (!url) {
    } else {
      console.log(url, 'THIS IS URLS');
      request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
    }
  });
};
