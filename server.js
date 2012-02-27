var http = require('http'),
    url = require('url'),
    fs = require('fs');

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
            }
        }
        console.log(feed);
        var feedData = "";
        
        var feedParts = feed.split('%2F');
        var fpLen = feedParts.length;
        var options = {
            host: feedParts[fpLen-2],
            port: 80,
            path: '/' + feedParts[fpLen-1]
        };
        
        http.get(options, function(feedResponse){
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
    } else if (pathname === '/feed-viewer.html') {
        fs.stat('feed-viewer.html', function(err, stat){
            if (err) {
                if ('ENOENT' == err.code) {
                    notifyNotFound(res);
                } else {
                    failMiserably(res);
                }
            } else {
                res.setHeader('Content-Length', stat.size);
                var stream = fs.createReadStream(pathname);
                stream.pipe(res);
                stream.on('error', function(err){
                    failMiserably(res);
                });
            }
        });        
    } else { // a file we don't handle
        notifyNotFound(res);
    }
}).listen(process.env.PORT);