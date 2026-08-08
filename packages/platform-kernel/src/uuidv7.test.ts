import { describe, expect, it } from 'vitest';

import { createUuidV7, uuidV7Timestamp } from './uuidv7.js';

describe('createUuidV7', () => {
  it('encodes the exact 48-bit Unix millisecond timestamp with v7 and RFC variant bits', () => {
    const timestampMs = 1_722_470_400_123;
    const uuid = createUuidV7({
      timestampMs,
      entropy: Uint8Array.from({ length: 16 }, (_, index) => index),
    });

    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u,
    );
    expect(uuidV7Timestamp(uuid)).toBe(timestampMs);
  });

  it('retains random entropy outside the timestamp/version/variant fields', () => {
    const timestampMs = 1_722_470_400_123;
    const lowEntropy = new Uint8Array(16);
    const highEntropy = new Uint8Array(16).fill(0xff);

    const low = createUuidV7({ timestampMs, entropy: lowEntropy });
    const high = createUuidV7({ timestampMs, entropy: highEntropy });

    expect(low).not.toBe(high);
    expect(uuidV7Timestamp(low)).toBe(timestampMs);
    expect(uuidV7Timestamp(high)).toBe(timestampMs);
  });

  it('generates unique values under ordinary repeated use', () => {
    const generated = new Set(Array.from({ length: 1_000 }, () => createUuidV7()));
    expect(generated.size).toBe(1_000);
  });

  it('rejects invalid timestamps and entropy sizes', () => {
    expect(() => createUuidV7({ timestampMs: -1 })).toThrow(/non-negative/u);
    expect(() => createUuidV7({ timestampMs: Number.MAX_SAFE_INTEGER })).toThrow(/48-bit/u);
    expect(() => createUuidV7({ entropy: new Uint8Array(15) })).toThrow(/16 bytes/u);
  });

  it('rejects non-v7 identifiers when decoding the timestamp', () => {
    expect(() => uuidV7Timestamp('550e8400-e29b-41d4-a716-446655440000')).toThrow(/UUIDv7/u);
  });
});
