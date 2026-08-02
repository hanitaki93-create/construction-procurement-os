import { connect } from 'node:net';

import type { MalwareScanner, ScanResult, ScannerHealth } from './types.js';

export interface ClamdScannerOptions {
  readonly host: string;
  readonly port: number;
  readonly timeoutMs: number;
  readonly maximumBytes: number;
}

type ExchangeResult =
  | Readonly<{ state: 'RESPONSE'; value: string }>
  | Readonly<{ state: 'UNAVAILABLE'; detail: string }>
  | Readonly<{ state: 'TIMEOUT'; detail: string }>
  | Readonly<{ state: 'ERROR'; detail: string }>;

function validateOptions(options: ClamdScannerOptions): void {
  if (!options.host.trim()) throw new Error('clamd host is required');
  if (!Number.isSafeInteger(options.port) || options.port < 1 || options.port > 65_535) {
    throw new Error('clamd port is invalid');
  }
  if (
    !Number.isSafeInteger(options.timeoutMs) ||
    options.timeoutMs < 10 ||
    options.timeoutMs > 120_000
  ) {
    throw new Error('clamd timeout must be from 10 to 120000 milliseconds');
  }
  if (
    !Number.isSafeInteger(options.maximumBytes) ||
    options.maximumBytes < 1 ||
    options.maximumBytes > 64 * 1024 * 1024
  ) {
    throw new Error('clamd maximumBytes must be from 1 byte to 64 MiB');
  }
}

function framesForScan(bytes: Uint8Array): readonly Buffer[] {
  const frames: Buffer[] = [Buffer.from('zINSTREAM\0', 'ascii')];
  const chunkSize = 64 * 1024;
  for (let offset = 0; offset < bytes.byteLength; offset += chunkSize) {
    const chunk = Buffer.from(
      bytes.subarray(offset, Math.min(offset + chunkSize, bytes.byteLength)),
    );
    const length = Buffer.allocUnsafe(4);
    length.writeUInt32BE(chunk.byteLength, 0);
    frames.push(length, chunk);
  }
  frames.push(Buffer.alloc(4));
  return frames;
}

function errorDetail(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`.slice(0, 240);
  return 'unknown scanner transport error';
}

async function exchange(
  options: ClamdScannerOptions,
  frames: readonly Buffer[],
): Promise<ExchangeResult> {
  return await new Promise<ExchangeResult>((resolve) => {
    let settled = false;
    let connected = false;
    const response: Buffer[] = [];
    const socket = connect({ host: options.host, port: options.port });

    const finish = (result: ExchangeResult): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      resolve(result);
    };

    const timer = setTimeout(() => {
      finish({ state: 'TIMEOUT', detail: 'clamd did not respond before the configured timeout' });
    }, options.timeoutMs);

    socket.setNoDelay(true);

    socket.once('connect', () => {
      connected = true;
      for (const frame of frames) socket.write(frame);
    });

    socket.on('data', (chunk: Buffer) => {
      response.push(chunk);
      const combined = Buffer.concat(response);
      const nullIndex = combined.indexOf(0);
      const newlineIndex = combined.indexOf(10);
      const boundary = nullIndex >= 0 ? nullIndex : newlineIndex;
      if (boundary >= 0) {
        finish({
          state: 'RESPONSE',
          value: combined.subarray(0, boundary).toString('utf8').trim(),
        });
      }
    });

    socket.once('error', (error: Error) => {
      finish({
        state: connected ? 'ERROR' : 'UNAVAILABLE',
        detail: errorDetail(error),
      });
    });

    socket.once('close', () => {
      if (!settled) {
        finish({
          state: connected ? 'ERROR' : 'UNAVAILABLE',
          detail: 'clamd connection closed before a complete response',
        });
      }
    });
  });
}

export function createClamdScanner(options: ClamdScannerOptions): MalwareScanner {
  validateOptions(options);

  return {
    async health(): Promise<ScannerHealth> {
      const checkedAt = new Date().toISOString();
      const result = await exchange(options, [Buffer.from('zPING\0', 'ascii')]);
      if (result.state === 'RESPONSE') {
        return result.value === 'PONG'
          ? { state: 'READY', checkedAt, detail: 'clamd responded PONG' }
          : { state: 'ERROR', checkedAt, detail: `unexpected clamd response: ${result.value}` };
      }
      return { state: result.state, checkedAt, detail: result.detail };
    },

    async scan(bytes: Uint8Array): Promise<ScanResult> {
      if (bytes.byteLength > options.maximumBytes) {
        return {
          state: 'REJECTED',
          scannedBytes: 0,
          detail: `payload exceeds the configured ${options.maximumBytes}-byte scanner limit`,
        };
      }
      const result = await exchange(options, framesForScan(bytes));
      if (result.state !== 'RESPONSE') {
        return { state: result.state, scannedBytes: 0, detail: result.detail };
      }
      if (/\bOK$/u.test(result.value)) {
        return { state: 'CLEAN', scannedBytes: bytes.byteLength, detail: 'clamd reported clean' };
      }
      const found = /^.*?:\s*(.+?)\s+FOUND$/u.exec(result.value);
      if (found?.[1]) {
        return {
          state: 'INFECTED',
          scannedBytes: bytes.byteLength,
          signature: found[1],
          detail: 'clamd reported an antivirus signature',
        };
      }
      return {
        state: 'ERROR',
        scannedBytes: bytes.byteLength,
        detail: `unexpected clamd response: ${result.value}`,
      };
    },
  };
}
