import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    environment: 'node',
    fileParallelism: false,
    include: ['integration/**/*.integration.test.ts'],
    exclude: ['integration/platform-c1-bootstrap.integration.test.ts'],
    pool: 'forks',
    reporters: ['default'],
    restoreMocks: true,
    sequence: { concurrent: false },
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
