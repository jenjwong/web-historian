var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpUtils = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  console.log(req.url, 'REQ PATH');
  console.log(archive.paths.archivedSites, 'this is my import')

  if (req.method === 'GET') {
    res.writeHead(200, httpUtils.defaultCorsHeaders);
    fs.readFile(path.join(__dirname, './public/index.html'), 'utf8', function(err, data) {
      if (err) {
        console.log('GET failed');
      } else {
        res.end(data);
      }
    });
  } 

  if (req.method === 'POST') {
    console.log('inside post')
    archive.addUrlToList(req);
  }



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
