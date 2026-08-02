import { createServer, type Server } from 'node:net';

import { afterEach, describe, expect, it } from 'vitest';

import { createClamdScanner } from './clamd-scanner.js';

const servers: Server[] = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      async (server) =>
        await new Promise<void>((resolve) => {
          server.close(() => resolve());
        }),
    ),
  );
});

async function listen(server: Server): Promise<number> {
  servers.push(server);
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });
  const address = server.address();
  if (typeof address !== 'object' || address === null)
    throw new Error('test server has no TCP address');
  return address.port;
}

function scanner(port: number, timeoutMs = 100) {
  return createClamdScanner({
    host: '127.0.0.1',
    port,
    timeoutMs,
    maximumBytes: 128,
  });
}

describe('clamd scanner fail-closed contract', () => {
  it('reports unavailable rather than clean when no scanner is listening', async () => {
    const server = createServer();
    const port = await listen(server);
    await new Promise<void>((resolve) => server.close(() => resolve()));
    servers.splice(servers.indexOf(server), 1);

    const result = await scanner(port).scan(Buffer.from('safe-looking bytes'));
    expect(result.state).toBe('UNAVAILABLE');
  });

  it('reports timeout rather than clean when a scanner accepts but never responds', async () => {
    const server = createServer(() => undefined);
    const port = await listen(server);

    const result = await scanner(port, 40).scan(Buffer.from('safe-looking bytes'));
    expect(result.state).toBe('TIMEOUT');
  });

  it('rejects over-limit payloads before opening a scanner connection', async () => {
    const result = await scanner(9).scan(Buffer.alloc(129));
    expect(result).toEqual({
      state: 'REJECTED',
      scannedBytes: 0,
      detail: 'payload exceeds the configured 128-byte scanner limit',
    });
  });

  it('does not treat an unexpected scanner response as clean', async () => {
    const server = createServer((socket) => {
      socket.once('data', () => socket.end('stream: UNKNOWN\0'));
    });
    const port = await listen(server);

    const result = await scanner(port).scan(Buffer.from('bytes'));
    expect(result.state).toBe('ERROR');
  });
});
