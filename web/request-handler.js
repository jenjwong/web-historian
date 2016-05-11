var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpUtils = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === "GET") {
    res.writeHead(200, httpUtils.defaultCorsHeaders);
    fs.readFile(path.join(__dirname, './public/index.html'), 'utf8', function(err, data) {
      if (err) {
        console.log('file did not read');
      } else {
        console.log(data);
        res.end(JSON.stringify(data));
      }
    });
  } else {
    res.end(archive.paths.list);
  }







  //elegant version of GET/POST...
  // var actions = {
  //   "GET": function(req, res) {
  //     httpUtils.sendResponse(res, data);
  //   }
  // };



};
