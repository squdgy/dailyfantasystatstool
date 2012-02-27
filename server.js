var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};
    
var failMiserably = function(res) { // report error to response
    res.statusCode = 500;
    res.end('Wicked Terrible Internal Server Error');
};

var notifyNotFound = function(res) {
    res.statusCode = 404;
    res.end('I can\'t find your page. OOPS.');
}

http.createServer(function (req, res) {
    console.log(url.parse(req.url));
    var urlParts = url.parse(req.url);
    var pathname = urlParts.pathname;
    if (pathname === '/feed-proxy.php') {    
        var queryParamString = urlParts.query;
        var params = queryParamString.split('&');
        for (var i=0, plen = params.length; i<plen; i++) {
            console.log(params[i]);
            var param = params[i].split('=');
            console.log(param);
            if (param[0] === 'feed') {
                var feed = param[1];
                //TODO: url decode
                feed = feed.replace(/%3A/gi, ':');
                feed = feed.replace(/%2F/gi, '/');
                feed = feed.replace(/%2F/gi, '/');
                feed = feed.replace(/%3F/gi, '?');
                feed = feed.replace(/%3D/gi, '=');
            }
        }
        console.log(feed);
        var feedData = "";
        
        var feedParts = feed.split('/');        
        var fpLen = feedParts.length;
        var rpath = feedParts[fpLen - 1];
        var host = feed.replace(rpath, '');
        var host = host.replace('http://', '');
        host = host.substring(0, host.length - 1);
        var options = {
            host: host,
            port: 80,
            path: '/' + rpath
        };
        
        var feedReqiest = http.get(options, function(feedResponse){
            var pageData = "";
            feedResponse.setEncoding('utf8');
            feedResponse.on('data', function (chunk) {
              pageData += chunk;
            });
        
            feedResponse.on('end', function(){
                feedData = pageData;
                feedData.replace('<content:encoded>', '<content>');
                feedData.replace('</content:encoded>', '</content>');
                feedData.replace('</dc:creator>', '</author>');
                feedData.replace('<dc:creator', '<author');              
                console.log(feedData);
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(feedData);
            });

            feedResponse.on('error', function() {failMiserably(res);});
        });
        feedReqiest.on('error', function(e){
            console.log(e.message);
            notifyNotFound(res);
        });       
    } else {
        if (pathname === '/') pathname = '/feed-viewer.html';
        var filename = path.join(process.cwd(), pathname);
        path.exists(filename, function(exists) {
            if (exists) {
                pathname = pathname.substring(1);
                fs.stat(pathname, function(err, stat){
                    if (err) {
                        if ('ENOENT' == err.code) {
                            notifyNotFound(res);
                        } else {
                            failMiserably(res);
                        }
                    } else {
                        //res.setHeader('Content-Length', stat.size);
                        res.writeHead(200, {'Content-Type':mimeType});                
                        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
                        var stream = fs.createReadStream(pathname);
                        stream.pipe(res);
                        stream.on('error', function(err){
                            failMiserably(res);
                        });
                    }
                });        
            } else {
                console.log(pathname + ' not found');
                notifyNotFound(res);
            }
        });
    }
}).listen(process.env.PORT);