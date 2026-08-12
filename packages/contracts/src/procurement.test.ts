import { describe, expect, it } from 'vitest';
import { semanticFieldFamilies, uploadSessionStates } from './procurement.js';

describe('B04-B06 procurement contracts', () => {
  it('freezes the exact ten UploadSession states', () => {
    expect(uploadSessionStates).toHaveLength(10);
    expect(uploadSessionStates[0]).toBe('RESERVED');
    expect(uploadSessionStates.at(-1)).toBe('PAYLOAD_MISSING_RECONCILIATION_REQUIRED');
  });
  it('freezes the product-owned thirteen semantic field families', () => {
    expect(semanticFieldFamilies).toHaveLength(13);
    expect(new Set(semanticFieldFamilies).size).toBe(13);
  });
});
