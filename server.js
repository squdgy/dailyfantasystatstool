var http = require('http'),
    url = require('url'),
    nodeStatic = require('node-static');

var staticFileServer = new(nodeStatic.Server)();
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    console.log(url.parse(req.url));
    req.addListener('end', function () {
        //
        // Serve files!
        //
        staticFileServer.serve(req, res);
    });
}).listen(port);