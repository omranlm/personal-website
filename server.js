const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

const MIME = {
  '.html':    'text/html; charset=utf-8',
  '.css':     'text/css',
  '.js':      'application/javascript',
  '.json':    'application/json',
  '.svg':     'image/svg+xml',
  '.jpg':     'image/jpeg',
  '.jpeg':    'image/jpeg',
  '.png':     'image/png',
  '.webp':    'image/webp',
  '.ico':     'image/x-icon',
  '.pdf':     'application/pdf',
  '.glb':     'model/gltf-binary',
  '.geojson': 'application/geo+json',
};

// Cache-Control policy per extension (seconds)
// html → always revalidate; assets → long-lived; rest → 1 day
const CACHE = {
  '.html':    'no-cache',
  '.css':     'no-cache',
  '.js':      'no-cache',
  '.json':    'public, max-age=86400',           // 1 day
  '.geojson': 'public, max-age=86400',           // 1 day
  '.svg':     'public, max-age=604800',          // 1 week
  '.jpg':     'public, max-age=604800',          // 1 week
  '.jpeg':    'public, max-age=604800',          // 1 week
  '.png':     'public, max-age=604800',          // 1 week
  '.webp':    'public, max-age=604800',          // 1 week
  '.ico':     'public, max-age=604800',          // 1 week
  '.pdf':     'public, max-age=604800',          // 1 week
  '.glb':     'public, max-age=31536000, immutable', // 1 year — large binary, rarely changes
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(__dirname, urlPath);
  const ext      = path.extname(filePath).toLowerCase();
  const mime     = MIME[ext]  || 'application/octet-stream';
  const cache    = CACHE[ext] || 'public, max-age=3600';

  fs.stat(filePath, (statErr, stat) => {
    if (statErr) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const lastModified = stat.mtime.toUTCString();
    const etag         = `"${stat.size}-${stat.mtimeMs}"`;

    // Conditional request — return 304 if content unchanged
    if (
      req.headers['if-none-match'] === etag ||
      req.headers['if-modified-since'] === lastModified
    ) {
      res.writeHead(304, {
        'Cache-Control': cache,
        'ETag':          etag,
        'Last-Modified': lastModified,
      });
      res.end();
      return;
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type':  mime,
        'Cache-Control': cache,
        'ETag':          etag,
        'Last-Modified': lastModified,
        'Content-Length': data.length,
      });
      res.end(data);
    });
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
