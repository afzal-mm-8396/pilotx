const http = require('http');
const https = require('https');
const url = require('url');

const TARGET_HOST = 'crmdx5.localzoho.com';
const PORT = 3001;

http.createServer(function (req, res) {
    // Add CORS headers to every response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    var body = [];
    req.on('data', function (chunk) { body.push(chunk); });
    req.on('end', function () {
        var bodyBuffer = Buffer.concat(body);
        var parsed = url.parse(req.url);

        var options = {
            hostname: TARGET_HOST,
            port: 443,
            path: parsed.path,
            method: req.method,
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/json',
                'Content-Length': bodyBuffer.length
            }
        };

        var proxyReq = https.request(options, function (proxyRes) {
            var chunks = [];
            proxyRes.on('data', function (chunk) { chunks.push(chunk); });
            proxyRes.on('end', function () {
                var responseBody = Buffer.concat(chunks).toString();
                res.writeHead(proxyRes.statusCode, {
                    'Content-Type': proxyRes.headers['content-type'] || 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(responseBody);
            });
        });

        proxyReq.on('error', function (err) {
            console.error('[Proxy] Error:', err.message);
            res.writeHead(502);
            res.end(JSON.stringify({ error: 'Proxy error: ' + err.message }));
        });

        proxyReq.write(bodyBuffer);
        proxyReq.end();

        console.log('[Proxy] ' + req.method + ' ' + parsed.path);
    });
}).listen(PORT, function () {
    console.log('[Proxy] CORS proxy running at http://localhost:' + PORT);
    console.log('[Proxy] Forwarding to https://' + TARGET_HOST);
});
