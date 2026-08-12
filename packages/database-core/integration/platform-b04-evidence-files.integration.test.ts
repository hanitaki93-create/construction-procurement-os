import path from 'node:path';
import { randomUUID } from 'node:crypto';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { runMigrations } from '../src/internal/migrations.js';
import {
  createIntegrationPool,
  dropSchema,
  requiredDatabaseUrl,
  uniqueSchema,
} from './test-support.js';
import {
  authorityA,
  ownerPrincipal,
  procurementExecutionContext,
  procurementPrincipal,
  projectA,
  reviewerPrincipal,
  seedProcurementWaveFixture,
  tenantA,
} from './procurement-wave-test-support.js';

const setupPool = createIntegrationPool('cpos-b04-evidence-setup');
const runtime = createDatabaseRuntime({ connectionString: requiredDatabaseUrl(), applicationName: 'cpos-b04-evidence-runtime' });
const trackingSchema = uniqueSchema('b04_evidence_tracking');

interface EvidenceHandle {
  createSession(input: { id: string; maxBytes?: bigint; mimeTypes?: readonly string[] }): Promise<void>;
  state(id: string, next: string): Promise<void>;
  payload(input: { sessionId: string; byteSize: bigint; mimeType: string }): Promise<string>;
  validation(attemptId: string, kind: string, disposition?: string): Promise<void>;
  accept(sessionId: string): Promise<string>;
  sessions(): Promise<readonly { upload_session_id: string }[]>;
  createArtifact(projectId: string): Promise<string>;
}

const evidenceAdapter = definePersistenceAdapter<EvidenceHandle>({
  moduleKey: 'b04_evidence_test',
  databaseRole: 'cpos_procurement_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    createSession: async ({ id, maxBytes = 25_000_000n, mimeTypes = ['application/pdf'] }) => {
      await executor.execute(sql`
        SELECT evidence.create_upload_session(
          ${id}, ${projectA}, ${authorityA}, 'PROCUREMENT_SOURCE', 'Procurement source evidence',
          string_to_array(${mimeTypes.join(',')}, ','), ${maxBytes}, ${5}, 'tenant/project/evidence', ${'b04-test'},
          ${'2026-09-01T00:00:00.000Z'}::timestamptz
        )
      `);
    },
    state: async (id, next) => {
      await executor.execute(sql`SELECT evidence.record_upload_state(${id}, ${next}, ${'test transition'})`);
    },
    payload: async ({ sessionId, byteSize, mimeType }) => {
      const attemptId = randomUUID();
      await executor.execute(sql`
        SELECT evidence.record_payload_attempt(
          ${attemptId}, ${sessionId}, ${`objects/${sessionId}/payload`}, ${'provider-v1'},
          ${'a'.repeat(64)}, ${byteSize}, ${mimeType}, 'VERIFIED', ${null}
        )
      `);
      return attemptId;
    },
    validation: async (attemptId, kind, disposition = 'PASS') => {
      await executor.execute(sql`SELECT evidence.record_validation_observation(${randomUUID()}, ${attemptId}, ${kind}, 'test-validator-v1', ${disposition}, ${'hostile test observation'})`);
    },
    accept: async (sessionId) => {
      const recordId = randomUUID();
      const versionId = randomUUID();
      await executor.execute(sql`
        SELECT evidence.accept_captured_evidence(${recordId}, ${versionId}, ${sessionId}, ${'manual validation completed'})
      `);
      return versionId;
    },
    sessions: () => executor.all(sql`SELECT upload_session_id::text FROM evidence.upload_session ORDER BY recorded_at`),
    createArtifact: async (projectId) => {
      const intent = randomUUID();
      const member = randomUUID();
      const issued = randomUUID();
      await executor.execute(sql`SELECT evidence.create_artifact_build_intent(${intent}, ${projectId}, ${authorityA}, 'RFQ_ISSUE', ${`sha256:${'b'.repeat(64)}`})`);
      await executor.execute(sql`SELECT evidence.add_artifact_build_member(${member}, ${intent}, 'SOURCE_DOCUMENT', ${randomUUID()}, 'v1', ${`sha256:${'c'.repeat(64)}`})`);
      await executor.execute(sql`SELECT evidence.issue_artifact_version(${issued}, ${intent}, ${`issued/${issued}.pdf`}, 'immutable-v1', ${'d'.repeat(64)}, ${1000n}, 'application/pdf')`);
      return issued;
    },
  }),
});

function withEvidence<T>(principalId: string, invocation: string, callback: (handle: EvidenceHandle) => Promise<T>): Promise<T> {
  return runtime.withExecutionContext(
    procurementExecutionContext(tenantA, principalId, 'evidence.command.v1', invocation),
    { isolation: 'READ COMMITTED', logicalIdentity: invocation },
    evidenceAdapter,
    callback,
  );
}

beforeAll(async () => {
  await runMigrations(setupPool, { directory: path.resolve('../../migrations/sql'), schema: trackingSchema, buildId: 'b04-evidence-integration' });
});
beforeEach(async () => seedProcurementWaveFixture(setupPool));
afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B04 evidence/files/issued-artifact substrate', () => {
  it('enforces the exact upload-state progression and separate acceptance acknowledgment', async () => {
    const sessionId = randomUUID();
    await withEvidence(procurementPrincipal, 'b04-create', (h) => h.createSession({ id: sessionId }));
    await expect(withEvidence(procurementPrincipal, 'b04-skip', (h) => h.state(sessionId, 'CAPTURED_EVIDENCE_ONLY'))).rejects.toThrow(/illegal upload session transition/u);

    await withEvidence(procurementPrincipal, 'b04-transfer', (h) => h.state(sessionId, 'PAYLOAD_TRANSFER_IN_PROGRESS'));
    await withEvidence(procurementPrincipal, 'b04-stored', (h) => h.state(sessionId, 'PAYLOAD_STORED_UNVERIFIED'));
    const attemptId = await withEvidence(procurementPrincipal, 'b04-payload', (h) => h.payload({ sessionId, byteSize: 1024n, mimeType: 'application/pdf' }));
    await withEvidence(procurementPrincipal, 'b04-quarantine', (h) => h.state(sessionId, 'PAYLOAD_VERIFIED_QUARANTINED'));
    await withEvidence(procurementPrincipal, 'b04-validating', (h) => h.state(sessionId, 'VALIDATION_IN_PROGRESS'));
    for (const kind of ['CHECKSUM','MIME','MALWARE']) await withEvidence(procurementPrincipal, `b04-validation-${kind}`, (h) => h.validation(attemptId, kind));
    await withEvidence(procurementPrincipal, 'b04-captured', (h) => h.state(sessionId, 'CAPTURED_EVIDENCE_ONLY'));
    const versionId = await withEvidence(procurementPrincipal, 'b04-accept', (h) => h.accept(sessionId));
    const row = await setupPool.query<{ state: string }>(`SELECT state FROM evidence.upload_session_state_occurrence WHERE upload_session_id=$1 ORDER BY sequence DESC LIMIT 1`, [sessionId]);
    expect(row.rows[0]?.state).toBe('ACCEPTED_EVIDENCE_VERSION');
    expect(versionId).toBeTruthy();
  });

  it('rejects oversized/wrong-MIME payloads before they can become accepted evidence', async () => {
    const sessionId = randomUUID();
    await withEvidence(ownerPrincipal, 'b04-limits', (h) => h.createSession({ id: sessionId, maxBytes: 100n, mimeTypes: ['application/pdf'] }));
    await withEvidence(ownerPrincipal, 'b04-limits-transfer', (h) => h.state(sessionId, 'PAYLOAD_TRANSFER_IN_PROGRESS'));
    await withEvidence(ownerPrincipal, 'b04-limits-stored', (h) => h.state(sessionId, 'PAYLOAD_STORED_UNVERIFIED'));
    await expect(withEvidence(ownerPrincipal, 'b04-big', (h) => h.payload({ sessionId, byteSize: 101n, mimeType: 'application/pdf' }))).rejects.toThrow(/byte limit/u);
    await expect(withEvidence(ownerPrincipal, 'b04-mime', (h) => h.payload({ sessionId, byteSize: 10n, mimeType: 'text/html' }))).rejects.toThrow(/MIME/u);
  });

  it('refuses capture acknowledgment without positive payload validation evidence', async () => {
    const sessionId = randomUUID();
    await withEvidence(procurementPrincipal, 'b04-proof-create', (h) => h.createSession({ id: sessionId }));
    await withEvidence(procurementPrincipal, 'b04-proof-transfer', (h) => h.state(sessionId, 'PAYLOAD_TRANSFER_IN_PROGRESS'));
    await withEvidence(procurementPrincipal, 'b04-proof-stored', (h) => h.state(sessionId, 'PAYLOAD_STORED_UNVERIFIED'));
    await withEvidence(procurementPrincipal, 'b04-proof-payload', (h) => h.payload({ sessionId, byteSize: 10n, mimeType: 'application/pdf' }));
    await withEvidence(procurementPrincipal, 'b04-proof-quarantine', (h) => h.state(sessionId, 'PAYLOAD_VERIFIED_QUARANTINED'));
    await withEvidence(procurementPrincipal, 'b04-proof-validating', (h) => h.state(sessionId, 'VALIDATION_IN_PROGRESS'));
    await expect(withEvidence(procurementPrincipal, 'b04-proof-capture', (h) => h.state(sessionId, 'CAPTURED_EVIDENCE_ONLY'))).rejects.toThrow(/positive checksum, MIME and malware/u);
  });

  it('keeps evidence and issued artifacts immutable after acknowledgment', async () => {
    const sessionId = randomUUID();
    await withEvidence(ownerPrincipal, 'b04-immutable-create', (h) => h.createSession({ id: sessionId }));
    await expect(setupPool.query(`UPDATE evidence.upload_session SET intended_use='rewritten' WHERE upload_session_id=$1`, [sessionId])).rejects.toThrow(/append-only/u);
    const issued = await withEvidence(ownerPrincipal, 'b04-artifact', (h) => h.createArtifact(projectA));
    await expect(setupPool.query(`DELETE FROM evidence.issued_artifact_version WHERE issued_artifact_version_id=$1`, [issued])).rejects.toThrow(/append-only/u);
  });

  it('allows procurement command roles but keeps commercial reviewer read-only', async () => {
    await expect(withEvidence(reviewerPrincipal, 'b04-reviewer-write', (h) => h.createSession({ id: randomUUID() }))).rejects.toThrow(/not authorized/u);
    const rows = await withEvidence(reviewerPrincipal, 'b04-reviewer-read', (h) => h.sessions());
    expect(rows).toEqual([]);
  });
});
