import { createServer, type Server } from 'node:http';

import { afterAll, describe, expect, it } from 'vitest';

import { startTechnicalTelemetry } from './telemetry.js';

let server: Server | undefined;

afterAll(async () => {
  if (!server) return;
  await new Promise<void>((resolve) => server?.close(() => resolve()));
});

describe('technical telemetry', () => {
  it('is disabled when no collector endpoint is configured', async () => {
    const telemetry = await startTechnicalTelemetry({
      serviceName: 'test-service',
      environment: 'test',
    });
    expect(telemetry.enabled).toBe(false);
    await expect(telemetry.runSpan('test.noop', async () => 'ok')).resolves.toBe('ok');
    await telemetry.shutdown();
  });

  it('exports trace and metric payloads over OTLP HTTP', async () => {
    const paths: string[] = [];
    server = createServer((request, response) => {
      paths.push(request.url || '');
      request.resume();
      response.writeHead(200, { 'content-type': 'application/x-protobuf' });
      response.end();
    });
    await new Promise<void>((resolve, reject) => {
      server?.once('error', reject);
      server?.listen(0, '127.0.0.1', () => resolve());
    });
    const address = server.address();
    if (typeof address !== 'object' || address === null) throw new Error('test server missing');

    const telemetry = await startTechnicalTelemetry({
      serviceName: 'test-service',
      environment: 'test',
      endpoint: `http://127.0.0.1:${address.port}`,
      exportIntervalMs: 1_000,
    });
    await telemetry.runSpan('test.operation', async () => undefined);
    telemetry.addCounter('test.counter', 1, { state: 'ready' });
    expect(() => telemetry.addCounter('test.counter', 1, { record_id: 'not-allowed' })).toThrow(
      /bounded-cardinality allowlist/u,
    );
    await telemetry.shutdown();

    expect(paths).toContain('/v1/traces');
    expect(paths).toContain('/v1/metrics');
  });
});
