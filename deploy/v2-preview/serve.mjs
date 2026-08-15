import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer, request as httpRequest } from 'node:http';
import { extname, join, resolve } from 'node:path';

const root = resolve('/app/apps/web-internal/dist');
const apiOrigin = new URL(process.env.CPOS_PREVIEW_API_ORIGIN || 'http://127.0.0.1:43117');
const port = Number.parseInt(process.env.CPOS_PREVIEW_WEB_PORT || '43118', 10);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

const proxyPrefixes = ['/health', '/meta', '/platform', '/procurement', '/openapi.json'];

function shouldProxy(pathname) {
  return proxyPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function proxy(req, res, url) {
  const upstream = httpRequest(
    {
      protocol: apiOrigin.protocol,
      hostname: apiOrigin.hostname,
      port: apiOrigin.port,
      method: req.method,
      path: `${url.pathname}${url.search}`,
      headers: { ...req.headers, host: apiOrigin.host },
    },
    (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode || 502, upstreamRes.headers);
      upstreamRes.pipe(res);
    },
  );

  upstream.on('error', (error) => {
    if (!res.headersSent) {
      res.writeHead(502, { 'content-type': 'application/json; charset=utf-8' });
    }
    res.end(JSON.stringify({ error: 'preview_api_unavailable', message: error.message }));
  });

  req.pipe(upstream);
}

function serveFile(res, filePath) {
  const type = contentTypes.get(extname(filePath).toLowerCase()) || 'application/octet-stream';
  res.writeHead(200, {
    'content-type': type,
    'cache-control': filePath.endsWith('index.html') ? 'no-store' : 'public, max-age=300',
  });
  createReadStream(filePath).pipe(res);
}

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');

  if (shouldProxy(url.pathname)) {
    proxy(req, res, url);
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  let candidate = resolve(join(root, pathname.replace(/^\/+/, '')));
  if (!candidate.startsWith(`${root}/`) && candidate !== root) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = join(candidate, 'index.html');
  }

  if (!existsSync(candidate) || !statSync(candidate).isFile()) {
    candidate = join(root, 'index.html');
  }

  if (req.method === 'HEAD') {
    const type = contentTypes.get(extname(candidate).toLowerCase()) || 'application/octet-stream';
    res.writeHead(200, { 'content-type': type });
    res.end();
    return;
  }

  serveFile(res, candidate);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`CPOS Architecture V2 preview listening on 0.0.0.0:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.close(() => process.exit(0)));
}
