import { describe, expect, it } from 'vitest';

import { createTechnicalLogger } from './index.js';

describe('technical logger', () => {
  it('redacts sensitive fields recursively', () => {
    const output: string[] = [];
    const logger = createTechnicalLogger({
      service: 'test',
      minimumLevel: 'debug',
      sink: (line) => output.push(line),
      now: () => new Date('2026-08-02T00:00:00.000Z'),
    });

    logger.info('safe event', {
      requestId: 'request-1',
      authorization: 'Bearer secret',
      nested: { sessionToken: 'hidden', status: 'ok' },
    });

    const serialized = output.join('');
    expect(serialized).toContain('request-1');
    expect(serialized).toContain('[REDACTED]');
    expect(serialized).not.toContain('Bearer secret');
    expect(serialized).not.toContain('hidden');
  });
});
