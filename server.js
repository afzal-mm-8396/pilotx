const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ZOHO_HOST = 'crmdx5.localzoho.com';

// MIME types
const MIME = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff',
    '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject',
    '.gif': 'image/gif', '.map': 'application/json'
};

function corsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

http.createServer(function (req, res) {
    var parsed = url.parse(req.url, true);
    var pathname = parsed.pathname;

    corsHeaders(res);

    // Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // ─── PROXY: /crm/* → Zoho ───
    if (pathname.startsWith('/crm/')) {
        var body = [];
        req.on('data', function (c) { body.push(c); });
        req.on('end', function () {
            var buf = Buffer.concat(body);
            var opts = {
                hostname: ZOHO_HOST, port: 443,
                path: parsed.path, method: req.method,
                rejectUnauthorized: false,
                headers: {
                    'Content-Type': req.headers['content-type'] || 'application/json',
                    'Content-Length': buf.length
                }
            };

            var pr = https.request(opts, function (pRes) {
                res.writeHead(pRes.statusCode, {
                    'Content-Type': pRes.headers['content-type'] || 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                pRes.pipe(res);
            });

            pr.on('error', function (e) {
                console.error('[Proxy]', e.message);
                res.writeHead(502);
                res.end(JSON.stringify({ error: 'Proxy error: ' + e.message }));
            });

            pr.setTimeout(30000, function () {
                pr.destroy();
                res.writeHead(504);
                res.end(JSON.stringify({ error: 'Proxy timeout' }));
            });

            pr.write(buf);
            pr.end();
            console.log('[Proxy] ' + req.method + ' ' + parsed.path);
        });
        return;
    }

    // ─── STATIC: serve from dist/ ───
    var filePath = pathname === '/' ? '/index.html' : pathname;
    var fullPath = path.join(__dirname, 'dist', filePath);

    // Security: no directory traversal
    if (!fullPath.startsWith(path.join(__dirname, 'dist'))) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(fullPath, function (err, stats) {
        if (err || !stats.isFile()) {
            // Try index.html fallback
            fullPath = path.join(__dirname, 'dist', 'index.html');
        }

        fs.readFile(fullPath, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            var ext = path.extname(fullPath).toLowerCase();
            res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
            res.end(data);
        });
    });

}).listen(PORT, function () {
    console.log('');
    console.log('  WorkPilot server running on port ' + PORT);
    console.log('  ├── Static:  http://localhost:' + PORT + '/  (from dist/)');
    console.log('  └── Proxy:   /crm/* → https://' + ZOHO_HOST);
    console.log('');
});
