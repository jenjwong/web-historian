var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var url = require('url');
var fs = require('fs');


exports.handleRequest = function (req, res) {




  var actions = {
    'GET': function(req, res) {
      var urlPath = url.parse(req.url).pathname;
      utils.sendResponse(res, archive.paths.list);
      if (urlPath === '/') {
        urlPath = '/index.html';
        utils.serveAssets(res, urlPath, function() {
          //trim extra /
          //isUrlInList?
            //redirect
        });
      } else {
        utils.sendResponse(res, '', 404);
      }
    },

    //'POST': function(req, res)
      //util method collectData(req and callback)
      //callback takes allData
      //same util method response as GET
      // messages.push(JSON.parse(fullBody));
    'POST': function(req, res) {
      utils.collectData(req, function(data) {
      });
      utils.sendResponse(res, {results: messages}, 201);
    },

    'OPTIONS': function(req, res) {
      utils.sendResponse(res, null);
    }


  };



  var handler = actions[req.method];

  if (handler) {
    handler(req, res);
  } else {
    utils.sendResponse(res, '', 404);
  }







  //
  // if (req.method === 'GET') {
  //   res.writeHead(200, httpUtils.defaultCorsHeaders);
  //   fs.readFile(path.join(__dirname, './public/index.html'), 'utf8', function(err, data) {
  //     if (err) {
  //       console.log('GET failed');
  //     } else {
  //       res.end(data);
  //     }
  //   });
  // }
  //
  // if (req.method === 'POST') {
  //   console.log('inside post')
  //   archive.addUrlToList(req);
  // }



  // write req.url + '\n' to file

  // else if (req.method === 'POST') {
  //   res.writeHead(200, httpUtils.defaultCorsHeaders);
  //


  //   fs.readFile(path.join(__dirname, './public/index.html'), 'utf8', function(err, data) {
  //     if (err) {
  //       console.log('GET failed');
  //     } else {
  //       res.end(data);
  //     }
  //   });
  // }


//go to archives
  // if (req.url === '/www.google.com') {
  //   res.writeHead(200, httpUtils.defaultCorsHeaders);
  //   fs.readFile(path.join(__dirname, archive.paths.archivedSites, req.url), 'utf8', function(err, data) {
  //     if (err) {
  //       console.log('GET failed');
  //     } else {
  //       res.end(data);
  //     }
  //   });

  // } else {
  //   res.end(archive.paths.list);
  // }







  //elegant version of GET/POST...
  // var actions = {
  //   "GET": function(req, res) {
  //     httpUtils.sendResponse(res, data);
  //   }
  // };



};
