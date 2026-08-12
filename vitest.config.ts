import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      enabled: false,
    },
    environment: 'node',
    passWithNoTests: false,
    reporters: ['default'],
    restoreMocks: true,
    testTimeout: 10_000,
  },
});
