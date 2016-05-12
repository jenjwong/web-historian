var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
//bluebird

defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.sendResponse = function(res, data, statusCode) {
  console.log('called the send resoibse', data)
  statusCode = statusCode || 200;
  res.writeHead(statusCode, defaultCorsHeaders);
  res.end(data);
};

exports.collectData = function(req, callback) {
  var allTheData = '';
  req.on('data', function(chunk) {
    allTheData += chunk.toString();
  });
  req.on('end', function() {
    callback(allTheData);
  });
};

exports.serveAssets = function(res, assetPath, callback) {
  fs.readFile(archive.paths.siteAssets + assetPath, 'utf8', function(err, data) {
    if (err) {
      fs.readFile(archive.paths.archivedSites + assetPath, 'utf8', function(err, data) {
        if (err) {
          callback ? callback() : exports.sendResponse(res, 404);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};
