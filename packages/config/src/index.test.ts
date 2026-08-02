import { describe, expect, it } from 'vitest';

import { ConfigurationError, loadRuntimeConfig } from './index.js';

describe('loadRuntimeConfig', () => {
  it('creates bounded safe defaults', () => {
    const config = loadRuntimeConfig('api', {});
    expect(config.port).toBe(3001);
    expect(config.host).toBe('127.0.0.1');
    expect(config.trustProxy).toBe(false);
    expect(config.otelEndpoint).toBeUndefined();
    expect(config.build.service).toBe('api');
  });

  it('accepts a credential-free HTTP OTLP endpoint', () => {
    const config = loadRuntimeConfig('api', {
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://127.0.0.1:4318/',
    });
    expect(config.otelEndpoint).toBe('http://127.0.0.1:4318');
  });

  it('rejects malformed ports, booleans and telemetry endpoints', () => {
    expect(() => loadRuntimeConfig('api', { PORT: '0' })).toThrow(ConfigurationError);
    expect(() => loadRuntimeConfig('api', { TRUST_PROXY: 'yes' })).toThrow(ConfigurationError);
    expect(() =>
      loadRuntimeConfig('api', { OTEL_EXPORTER_OTLP_ENDPOINT: 'file:///tmp/collector' }),
    ).toThrow(ConfigurationError);
    expect(() =>
      loadRuntimeConfig('api', { OTEL_EXPORTER_OTLP_ENDPOINT: 'http://user:pass@localhost:4318' }),
    ).toThrow(ConfigurationError);
  });

  it('rejects control characters in build metadata', () => {
    expect(() => loadRuntimeConfig('api', { BUILD_ID: 'safe\nunsafe' })).toThrow(
      ConfigurationError,
    );
  });
});
