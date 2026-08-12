import { randomUUID } from 'node:crypto';

import { CreateBucketCommand, DeleteBucketCommand, S3Client } from '@aws-sdk/client-s3';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import {
  createS3VersionedObjectStore,
  provisionVersionedBucket,
  type ObjectStoreConnectionOptions,
  type ObjectVersionReference,
} from '../src/index.js';

function requiredEnvironment(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) throw new Error(`${key} is required for object-store integration tests`);
  return value;
}

function connection(bucket: string): ObjectStoreConnectionOptions {
  return {
    endpoint: requiredEnvironment('OBJECT_STORE_ENDPOINT'),
    region: process.env['OBJECT_STORE_REGION']?.trim() || 'us-east-1',
    accessKeyId: requiredEnvironment('OBJECT_STORE_ACCESS_KEY_ID'),
    secretAccessKey: requiredEnvironment('OBJECT_STORE_SECRET_ACCESS_KEY'),
    bucket,
    forcePathStyle: true,
  };
}

const suffix = randomUUID().replaceAll('-', '').slice(0, 12);
const versionedOptions = connection(`cpos-b01-versioned-${suffix}`);
const unversionedOptions = connection(`cpos-b01-unversioned-${suffix}`);
const store = createS3VersionedObjectStore(versionedOptions);
const created: ObjectVersionReference[] = [];

beforeAll(async () => {
  await provisionVersionedBucket(versionedOptions);
});

afterAll(async () => {
  await Promise.all(created.map(async (reference) => await store.deleteTestObject(reference)));
  store.close();

  const client = new S3Client({
    endpoint: unversionedOptions.endpoint,
    region: unversionedOptions.region,
    forcePathStyle: true,
    credentials: {
      accessKeyId: unversionedOptions.accessKeyId,
      secretAccessKey: unversionedOptions.secretAccessKey,
    },
  });
  try {
    await client.send(new DeleteBucketCommand({ Bucket: unversionedOptions.bucket }));
  } catch {
    // The negative-control bucket may not exist if its test failed before creation.
  } finally {
    client.destroy();
  }
});

describe('versioned S3-compatible object adapter', () => {
  it('requires bucket versioning instead of silently accepting an unversioned store', async () => {
    const client = new S3Client({
      endpoint: unversionedOptions.endpoint,
      region: unversionedOptions.region,
      forcePathStyle: true,
      credentials: {
        accessKeyId: unversionedOptions.accessKeyId,
        secretAccessKey: unversionedOptions.secretAccessKey,
      },
    });
    try {
      await client.send(new CreateBucketCommand({ Bucket: unversionedOptions.bucket }));
    } finally {
      client.destroy();
    }

    const unversionedStore = createS3VersionedObjectStore(unversionedOptions);
    await expect(unversionedStore.assertBucketReady()).rejects.toThrow(
      /versioning must be enabled/u,
    );
    unversionedStore.close();
  });

  it('preserves two immutable versions and verifies exact bytes and metadata', async () => {
    await store.assertBucketReady();
    const key = `integration/${suffix}/payload.bin`;
    const firstBytes = Buffer.from([0, 1, 2, 3, 254, 255]);
    const secondBytes = Buffer.from('second immutable version', 'utf8');

    const first = await store.putVerifiedObject({
      key,
      bytes: firstBytes,
      contentType: 'application/octet-stream',
    });
    const second = await store.putVerifiedObject({
      key,
      bytes: secondBytes,
      contentType: 'text/plain',
    });
    created.push(first, second);

    expect(first.versionId).not.toBe(second.versionId);
    expect(Buffer.from(await store.getVerifiedObject(first))).toEqual(firstBytes);
    expect(Buffer.from(await store.getVerifiedObject(second))).toEqual(secondBytes);

    const head = await store.headVerifiedObject(first);
    expect(head).toMatchObject({
      bucket: versionedOptions.bucket,
      key,
      versionId: first.versionId,
      sha256: first.sha256,
      size: firstBytes.byteLength,
      contentType: 'application/octet-stream',
    });
  });

  it('rejects a tampered reference instead of returning unchecked bytes', async () => {
    const reference = await store.putVerifiedObject({
      key: `integration/${suffix}/tamper.bin`,
      bytes: Buffer.from('verified payload'),
    });
    created.push(reference);

    await expect(store.getVerifiedObject({ ...reference, sha256: '0'.repeat(64) })).rejects.toThrow(
      /payload verification failed/u,
    );
  });
});
