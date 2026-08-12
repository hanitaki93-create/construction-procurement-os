import { describe, expect, it } from 'vitest';

import { workspacePolicy } from './index.js';

describe('workspacePolicy', () => {
  it('keeps B01 business-empty and exact', () => {
    expect(workspacePolicy.nodeVersion).toBe('24.18.0');
    expect(workspacePolicy.packageManager).toBe('pnpm@10.34.0');
    expect(workspacePolicy.exactDependencyVersions).toBe(true);
    expect(workspacePolicy.businessModulesAllowedInB01).toBe(false);
    expect(Object.isFrozen(workspacePolicy)).toBe(true);
  });
});
