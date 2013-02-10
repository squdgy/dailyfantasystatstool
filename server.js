var http = require('http'),
    url = require('url'),
    nodeStatic = require('node-static');

var staticFileServer = new(nodeStatic.Server)();

http.createServer(function (req, res) {
    console.log(url.parse(req.url));
    req.addListener('end', function () {
        //
        // Serve files!
        //
        staticFileServer.serve(req, res);
    });
}).listen(process.env.PORT);