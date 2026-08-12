import { createHash } from 'node:crypto';

import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetBucketVersioningCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutBucketVersioningCommand,
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';

import type {
  ObjectHead,
  ObjectStoreConnectionOptions,
  ObjectVersionReference,
  VersionedObjectStore,
} from './types.js';

const bucketPattern = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/u;
const metadataChecksumKey = 'cpos-sha256';

function validateOptions(options: ObjectStoreConnectionOptions): void {
  if (!bucketPattern.test(options.bucket)) {
    throw new Error('object-store bucket must be a valid lowercase S3 bucket name');
  }
  const endpoint = new URL(options.endpoint);
  if (!['http:', 'https:'].includes(endpoint.protocol)) {
    throw new Error('object-store endpoint must use HTTP or HTTPS');
  }
  if (!options.region.trim() || !options.accessKeyId || !options.secretAccessKey) {
    throw new Error('object-store region and credentials are required');
  }
}

function clientConfig(options: ObjectStoreConnectionOptions): S3ClientConfig {
  validateOptions(options);
  return {
    endpoint: options.endpoint,
    region: options.region,
    forcePathStyle: options.forcePathStyle,
    credentials: {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
    },
  };
}

function checksum(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function normalizeETag(value: string | undefined): string {
  if (!value) throw new Error('object-store response omitted ETag');
  return value.replace(/^"|"$/gu, '');
}

function requireVersionId(value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error('object-store response omitted VersionId; bucket versioning is not effective');
  }
  return value;
}

function isMissing(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  const status = Reflect.get(error, '$metadata');
  if (typeof status === 'object' && status !== null) {
    const code = Reflect.get(status, 'httpStatusCode');
    if (code === 404) return true;
  }
  const name = Reflect.get(error, 'name');
  return name === 'NotFound' || name === 'NoSuchBucket';
}

async function responseBytes(body: unknown): Promise<Uint8Array> {
  if (typeof body !== 'object' || body === null) {
    throw new Error('object-store response omitted body');
  }
  const transform = Reflect.get(body, 'transformToByteArray');
  if (typeof transform !== 'function') {
    throw new Error('object-store response body is not byte-readable');
  }
  const value = await Reflect.apply(transform, body, []);
  if (!(value instanceof Uint8Array)) {
    throw new Error('object-store response body did not produce bytes');
  }
  return value;
}

function assertReference(reference: ObjectVersionReference, expectedBucket: string): void {
  if (reference.bucket !== expectedBucket) throw new Error('object reference bucket mismatch');
  if (!reference.key.trim() || reference.key.startsWith('/')) {
    throw new Error('object reference key is invalid');
  }
  if (!reference.versionId.trim() || !reference.sha256.match(/^[a-f0-9]{64}$/u)) {
    throw new Error('object reference version/checksum is invalid');
  }
}

export async function provisionVersionedBucket(
  options: ObjectStoreConnectionOptions,
): Promise<void> {
  const client = new S3Client(clientConfig(options));
  try {
    try {
      await client.send(new HeadBucketCommand({ Bucket: options.bucket }));
    } catch (error: unknown) {
      if (!isMissing(error)) throw error;
      await client.send(new CreateBucketCommand({ Bucket: options.bucket }));
    }
    await client.send(
      new PutBucketVersioningCommand({
        Bucket: options.bucket,
        VersioningConfiguration: { Status: 'Enabled' },
      }),
    );
    const status = await client.send(new GetBucketVersioningCommand({ Bucket: options.bucket }));
    if (status.Status !== 'Enabled') {
      throw new Error('object-store bucket versioning could not be enabled');
    }
  } finally {
    client.destroy();
  }
}

export function createS3VersionedObjectStore(
  options: ObjectStoreConnectionOptions,
): VersionedObjectStore {
  const client = new S3Client(clientConfig(options));

  return {
    async assertBucketReady(): Promise<void> {
      await client.send(new HeadBucketCommand({ Bucket: options.bucket }));
      const status = await client.send(new GetBucketVersioningCommand({ Bucket: options.bucket }));
      if (status.Status !== 'Enabled') {
        throw new Error('object-store bucket versioning must be enabled');
      }
    },

    async putVerifiedObject(input): Promise<ObjectVersionReference> {
      if (!input.key.trim() || input.key.startsWith('/')) throw new Error('object key is invalid');
      if (input.bytes.byteLength === 0) throw new Error('zero-byte test objects are not supported');
      await this.assertBucketReady();
      const sha256 = checksum(input.bytes);
      const response = await client.send(
        new PutObjectCommand({
          Bucket: options.bucket,
          Key: input.key,
          Body: input.bytes,
          ContentLength: input.bytes.byteLength,
          Metadata: { [metadataChecksumKey]: sha256 },
          ...(input.contentType === undefined ? {} : { ContentType: input.contentType }),
        }),
      );
      return {
        bucket: options.bucket,
        key: input.key,
        versionId: requireVersionId(response.VersionId),
        eTag: normalizeETag(response.ETag),
        sha256,
        size: input.bytes.byteLength,
        ...(input.contentType === undefined ? {} : { contentType: input.contentType }),
      };
    },

    async getVerifiedObject(reference): Promise<Uint8Array> {
      assertReference(reference, options.bucket);
      const response = await client.send(
        new GetObjectCommand({
          Bucket: options.bucket,
          Key: reference.key,
          VersionId: reference.versionId,
        }),
      );
      if (requireVersionId(response.VersionId) !== reference.versionId) {
        throw new Error('object-store returned an unexpected version');
      }
      const bytes = await responseBytes(response.Body);
      if (bytes.byteLength !== reference.size || checksum(bytes) !== reference.sha256) {
        throw new Error('object-store payload verification failed');
      }
      return bytes;
    },

    async headVerifiedObject(reference): Promise<ObjectHead> {
      assertReference(reference, options.bucket);
      const response = await client.send(
        new HeadObjectCommand({
          Bucket: options.bucket,
          Key: reference.key,
          VersionId: reference.versionId,
        }),
      );
      const versionId = requireVersionId(response.VersionId);
      const sha256 = response.Metadata?.[metadataChecksumKey];
      const size = response.ContentLength;
      if (
        versionId !== reference.versionId ||
        sha256 !== reference.sha256 ||
        size !== reference.size
      ) {
        throw new Error('object-store metadata verification failed');
      }
      return {
        bucket: options.bucket,
        key: reference.key,
        versionId,
        eTag: normalizeETag(response.ETag),
        sha256,
        size,
        ...(response.ContentType === undefined ? {} : { contentType: response.ContentType }),
        ...(response.LastModified === undefined
          ? {}
          : { lastModified: response.LastModified.toISOString() }),
      };
    },

    async deleteTestObject(reference): Promise<void> {
      assertReference(reference, options.bucket);
      await client.send(
        new DeleteObjectCommand({
          Bucket: options.bucket,
          Key: reference.key,
          VersionId: reference.versionId,
        }),
      );
    },

    close(): void {
      client.destroy();
    },
  };
}
