import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = '/srv/site';
const port = Number(process.env['PORT'] || '8080');
if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
  throw new Error('PORT must be a valid TCP port');
}

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
]);

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0] || '/');
  const normalized = path.posix.normalize(decoded);
  if (normalized.includes('\0') || normalized.startsWith('../') || normalized.includes('/../')) {
    return undefined;
  }
  return path.join(root, normalized === '/' ? 'index.html' : normalized);
}

async function existingFile(candidate) {
  try {
    await access(candidate);
    const metadata = await stat(candidate);
    return metadata.isFile() ? candidate : undefined;
  } catch {
    return undefined;
  }
}

const server = createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { allow: 'GET, HEAD' });
      response.end();
      return;
    }

    if (request.url === '/health/live') {
      response.writeHead(200, {
        'cache-control': 'no-store',
        'content-type': 'application/json; charset=utf-8',
      });
      response.end(JSON.stringify({ state: 'alive' }));
      return;
    }

    const requested = safePath(request.url || '/');
    if (!requested) {
      response.writeHead(400);
      response.end();
      return;
    }
    const file = (await existingFile(requested)) || (await existingFile(path.join(root, 'index.html')));
    if (!file) {
      response.writeHead(404);
      response.end();
      return;
    }

    const metadata = await stat(file);
    response.writeHead(200, {
      'cache-control': file.endsWith('index.html') ? 'no-store' : 'public, max-age=31536000, immutable',
      'content-length': metadata.size,
      'content-type': contentTypes.get(path.extname(file).toLowerCase()) || 'application/octet-stream',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'referrer-policy': 'no-referrer',
      'content-security-policy': "default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'",
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(response);
  } catch {
    response.writeHead(500, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ state: 'error' }));
  }
});

server.listen(port, '0.0.0.0');
