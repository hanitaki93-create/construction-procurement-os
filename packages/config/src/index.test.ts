import { describe, expect, it } from 'vitest';

import { ConfigurationError, loadRuntimeConfig } from './index.js';

describe('loadRuntimeConfig', () => {
  it('creates bounded safe defaults', () => {
    const config = loadRuntimeConfig('api', {});
    expect(config.port).toBe(3001);
    expect(config.host).toBe('127.0.0.1');
    expect(config.trustProxy).toBe(false);
    expect(config.build.service).toBe('api');
  });

  it('rejects malformed ports and booleans', () => {
    expect(() => loadRuntimeConfig('api', { PORT: '0' })).toThrow(ConfigurationError);
    expect(() => loadRuntimeConfig('api', { TRUST_PROXY: 'yes' })).toThrow(ConfigurationError);
  });

  it('rejects control characters in build metadata', () => {
    expect(() => loadRuntimeConfig('api', { BUILD_ID: 'safe\nunsafe' })).toThrow(
      ConfigurationError,
    );
  });
});
