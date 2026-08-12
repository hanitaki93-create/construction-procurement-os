export interface ObjectStoreConnectionOptions {
  readonly endpoint: string;
  readonly region: string;
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly bucket: string;
  readonly forcePathStyle: boolean;
}

export interface ObjectVersionReference {
  readonly bucket: string;
  readonly key: string;
  readonly versionId: string;
  readonly eTag: string;
  readonly sha256: string;
  readonly size: number;
  readonly contentType?: string;
}

export interface ObjectHead extends ObjectVersionReference {
  readonly lastModified?: string;
}

export interface VersionedObjectStore {
  assertBucketReady(): Promise<void>;
  putVerifiedObject(input: {
    readonly key: string;
    readonly bytes: Uint8Array;
    readonly contentType?: string;
  }): Promise<ObjectVersionReference>;
  getVerifiedObject(reference: ObjectVersionReference): Promise<Uint8Array>;
  headVerifiedObject(reference: ObjectVersionReference): Promise<ObjectHead>;
  deleteTestObject(reference: ObjectVersionReference): Promise<void>;
  close(): void;
}

export type ScannerHealth =
  | Readonly<{ state: 'READY'; checkedAt: string; detail: string }>
  | Readonly<{ state: 'UNAVAILABLE'; checkedAt: string; detail: string }>
  | Readonly<{ state: 'TIMEOUT'; checkedAt: string; detail: string }>
  | Readonly<{ state: 'ERROR'; checkedAt: string; detail: string }>;

export type ScanResult =
  | Readonly<{ state: 'CLEAN'; scannedBytes: number; detail: string }>
  | Readonly<{
      state: 'INFECTED';
      scannedBytes: number;
      signature: string;
      detail: string;
    }>
  | Readonly<{ state: 'REJECTED'; scannedBytes: number; detail: string }>
  | Readonly<{ state: 'UNAVAILABLE'; scannedBytes: number; detail: string }>
  | Readonly<{ state: 'TIMEOUT'; scannedBytes: number; detail: string }>
  | Readonly<{ state: 'ERROR'; scannedBytes: number; detail: string }>;

export interface MalwareScanner {
  health(): Promise<ScannerHealth>;
  scan(bytes: Uint8Array): Promise<ScanResult>;
}
