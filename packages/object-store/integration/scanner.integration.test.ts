import { describe, expect, it } from 'vitest';

import { createClamdScanner } from '../src/index.js';

function integerEnvironment(key: string, fallback: number): number {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value)) throw new Error(`${key} must be an integer`);
  return value;
}

const scanner = createClamdScanner({
  host: process.env['CLAMD_HOST']?.trim() || '127.0.0.1',
  port: integerEnvironment('CLAMD_PORT', 3310),
  timeoutMs: 15_000,
  maximumBytes: 8 * 1024 * 1024,
});

const eicar = Buffer.from(
  'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*',
  'ascii',
);

describe('ClamAV INSTREAM adapter', () => {
  it('reports ready only after a valid PONG response', async () => {
    const health = await scanner.health();
    expect(health.state).toBe('READY');
  });

  it('reports ordinary bytes as clean', async () => {
    const result = await scanner.scan(Buffer.from('construction procurement os scanner test'));
    expect(result).toMatchObject({ state: 'CLEAN' });
  });

  it('reports the harmless EICAR test signature as infected', async () => {
    const result = await scanner.scan(eicar);
    expect(result.state).toBe('INFECTED');
    if (result.state === 'INFECTED') expect(result.signature.length).toBeGreaterThan(0);
  });
});
