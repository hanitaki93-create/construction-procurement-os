import { randomBytes } from 'node:crypto';

const MAX_UUIDV7_TIMESTAMP = (1n << 48n) - 1n;

function requireTimestamp(timestampMs: number): bigint {
  if (!Number.isSafeInteger(timestampMs) || timestampMs < 0) {
    throw new Error('UUIDv7 timestamp must be a non-negative safe integer');
  }
  const timestamp = BigInt(timestampMs);
  if (timestamp > MAX_UUIDV7_TIMESTAMP) {
    throw new Error('UUIDv7 timestamp exceeds the 48-bit Unix-millisecond field');
  }
  return timestamp;
}

function requireEntropy(entropy: Uint8Array): Uint8Array {
  if (entropy.byteLength !== 16) {
    throw new Error('UUIDv7 entropy must contain exactly 16 bytes');
  }
  return Uint8Array.from(entropy);
}

function hexByte(value: number): string {
  return value.toString(16).padStart(2, '0');
}

export function createUuidV7(options: {
  readonly timestampMs?: number;
  readonly entropy?: Uint8Array;
} = {}): string {
  const timestamp = requireTimestamp(options.timestampMs ?? Date.now());
  const bytes = requireEntropy(options.entropy ?? randomBytes(16));

  let remaining = timestamp;
  for (let index = 5; index >= 0; index -= 1) {
    bytes[index] = Number(remaining & 0xffn);
    remaining >>= 8n;
  }

  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x70;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;

  const hex = Array.from(bytes, hexByte).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function uuidV7Timestamp(value: string): number {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value)) {
    throw new Error('value is not an RFC 9562 UUIDv7');
  }
  return Number.parseInt(value.replaceAll('-', '').slice(0, 12), 16);
}
