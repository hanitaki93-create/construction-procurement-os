import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, requiredDatabaseUrl, uniqueSchema } from './test-support.js';
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

const setupPool = createIntegrationPool('cpos-b06-sourcing-setup');
const runtime = createDatabaseRuntime({ connectionString: requiredDatabaseUrl(), maximumConnections: 12, applicationName: 'cpos-b06-sourcing-runtime' });
const trackingSchema = uniqueSchema('b06_sourcing_tracking');

type Draft = Readonly<{ eventId: string; draftVersionId: string; schemaId: string; policyId: string }>;
type Supplier = Readonly<{ relationshipId: string; contactId: string }>;

interface SourcingHandle {
  supplier(): Promise<Supplier>;
  draft(): Promise<Draft>;
  field(schemaId: string, key: string, ordinal?: number): Promise<void>;
  member(draftVersionId: string, supplier: Supplier): Promise<string>;
  issueBasis(eventId: string): Promise<{ artifactId: string; messageId: string }>;
  issue(eventId: string, expectedVersion: bigint, artifactId: string, messageId: string): Promise<string>;
  grant(issuedVersionId: string, memberId: string): Promise<string>;
  invitation(grantId: string, messageId: string, kind?: 'ISSUE' | 'CONTROLLED_REISSUE'): Promise<string>;
  addContact(relationshipId: string): Promise<string>;
  transfer(grantId: string, newContactId: string): Promise<string>;
  addendum(eventId: string, expectedIssuedVersion: bigint): Promise<string>;
  revoke(grantId: string): Promise<void>;
}

const sourcingAdapter = definePersistenceAdapter<SourcingHandle>({
  moduleKey: 'b06_sourcing_test',
  databaseRole: 'cpos_procurement_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    supplier: async () => {
      const relationshipId = randomUUID();
      const contactId = randomUUID();
      await executor.execute(sql`SELECT sourcing.create_supplier(${relationshipId},${contactId},'Al Fahad Trading','AF-001','Sales Desk','sales@example.test','SHARED_MAILBOX')`);
      return { relationshipId, contactId };
    },
    draft: async () => {
      const eventId = randomUUID();
      const draftVersionId = randomUUID();
      const schemaId = randomUUID();
      const policyId = randomUUID();
      await executor.execute(sql`SELECT sourcing.create_rfq_draft(${eventId},${draftVersionId},${schemaId},${policyId},${projectA},${authorityA},${`RFQ-${eventId.slice(0,8)}`},'Concrete Supply RFQ',${'2026-09-15T12:00:00.000Z'}::timestamptz)`);
      return { eventId, draftVersionId, schemaId, policyId };
    },
    field: async (schemaId, key, ordinal = 1) => {
      await executor.execute(sql`SELECT sourcing.add_response_schema_field(${randomUUID()},${schemaId},${key},${key.replaceAll('_',' ')},${ordinal},'MANDATORY',${null},${'{}'}::jsonb)`);
    },
    member: async (draftVersionId, supplier) => {
      const memberId = randomUUID();
      await executor.execute(sql`SELECT sourcing.add_event_member(${memberId},${draftVersionId},${supplier.relationshipId},${supplier.contactId})`);
      return memberId;
    },
    issueBasis: async (eventId) => {
      const intent = randomUUID();
      const artifactMember = randomUUID();
      const artifactId = randomUUID();
      const messageId = randomUUID();
      await executor.execute(sql`SELECT evidence.create_artifact_build_intent(${intent},${projectA},${authorityA},'RFQ_ISSUE',${`sha256:${'b'.repeat(64)}`})`);
      await executor.execute(sql`SELECT evidence.add_artifact_build_member(${artifactMember},${intent},'SOURCING_EVENT',${eventId},'draft-v1',${`sha256:${'c'.repeat(64)}`})`);
      await executor.execute(sql`SELECT evidence.issue_artifact_version(${artifactId},${intent},${`rfq/${eventId}.pdf`},'obj-v1',${'d'.repeat(64)},${2048n},'application/pdf')`);
      await executor.execute(sql`SELECT evidence.record_message(${messageId},${projectA},${authorityA},'RFQ_ISSUE','RFQ issue',${artifactId})`);
      return { artifactId, messageId };
    },
    issue: async (eventId, expectedVersion, artifactId, messageId) => {
      const issuedVersionId = randomUUID();
      await executor.execute(sql`SELECT sourcing.issue_event(${issuedVersionId},${eventId},${expectedVersion},${artifactId},${messageId})`);
      return issuedVersionId;
    },
    grant: async (issuedVersionId, memberId) => {
      const grantId = randomUUID();
      const tokenDigest = createHash('sha256').update(`opaque-${grantId}`).digest('hex');
      await executor.execute(sql`SELECT sourcing.issue_external_task_grant(${grantId},${issuedVersionId},${memberId},${tokenDigest},string_to_array(${'VIEW_TASK,SUBMIT_RESPONSE'}, ','),'STANDARD_RFQ','EMAIL_LINK_ASSURANCE','CONTROLLED_REISSUE',${'2026-09-16T12:00:00.000Z'}::timestamptz)`);
      return grantId;
    },
    invitation: async (grantId, messageId, kind = 'ISSUE') => {
      const invitationId = randomUUID();
      await executor.execute(sql`SELECT sourcing.record_invitation(${invitationId},${grantId},${messageId},'SECURE_LINK',${kind})`);
      return invitationId;
    },
    addContact: async (relationshipId) => {
      const contactId = randomUUID();
      await executor.execute(sql`SELECT sourcing.add_supplier_contact(${contactId},${relationshipId},'Alternate Sales Desk',${`alt-${contactId.slice(0,8)}@example.test`},'PERSON')`);
      return contactId;
    },
    transfer: async (grantId, newContactId) => {
      const newGrantId = randomUUID();
      const tokenDigest = createHash('sha256').update(`reissue-${newGrantId}`).digest('hex');
      await executor.execute(sql`SELECT sourcing.transfer_external_task_grant(${newGrantId},${grantId},${newContactId},${tokenDigest},${'2026-09-16T12:00:00.000Z'}::timestamptz,'contact changed by buyer')`);
      return newGrantId;
    },
    addendum: async (eventId, expectedIssuedVersion) => {
      const versionId = randomUUID();
      await executor.execute(sql`SELECT sourcing.create_addendum_draft(${versionId},${eventId},${expectedIssuedVersion},${'2026-09-20T12:00:00.000Z'}::timestamptz,'deadline extension after clarification')`);
      return versionId;
    },
    revoke: async (grantId) => {
      await executor.execute(sql`SELECT sourcing.revoke_external_task_grant(${grantId},'buyer revoked invitation')`);
    },
  }),
});

function withSourcing<T>(principalId: string, invocation: string, callback: (h: SourcingHandle) => Promise<T>): Promise<T> {
  return runtime.withExecutionContext(
    procurementExecutionContext(tenantA, principalId, 'sourcing.command.v1', invocation),
    { isolation: 'READ COMMITTED', logicalIdentity: invocation },
    sourcingAdapter,
    callback,
  );
}

async function readyDraft(principalId = procurementPrincipal) {
  const supplier = await withSourcing(principalId, 'b06-supplier', (h) => h.supplier());
  const draft = await withSourcing(principalId, 'b06-draft', (h) => h.draft());
  await withSourcing(principalId, 'b06-field', (h) => h.field(draft.schemaId, 'RFQ_UNIT_RATE'));
  const memberId = await withSourcing(principalId, 'b06-member', (h) => h.member(draft.draftVersionId, supplier));
  const basis = await withSourcing(principalId, 'b06-basis', (h) => h.issueBasis(draft.eventId));
  return { supplier, draft, memberId, basis };
}

beforeAll(async () => {
  await runMigrations(setupPool, { directory: path.resolve('../../migrations/sql'), schema: trackingSchema, buildId: 'b06-sourcing-integration' });
});
beforeEach(async () => seedProcurementWaveFixture(setupPool));
afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B06 sourcing/RFQ/schema/grant/issue substrate', () => {
  it('rejects tenant-invented semantic fields and requires product-registered keys', async () => {
    const draft = await withSourcing(procurementPrincipal, 'b06-arbitrary-draft', (h) => h.draft());
    await expect(withSourcing(procurementPrincipal, 'b06-arbitrary-field', (h) => h.field(draft.schemaId, 'TENANT_FORMULA_PRICE_SCORE'))).rejects.toThrow(/not product-registered/u);
    await withSourcing(procurementPrincipal, 'b06-registered-field', (h) => h.field(draft.schemaId, 'RFQ_UNIT_RATE'));
  });

  it('blocks issue until schema, acceptance policy, member and immutable artifact/message basis are complete', async () => {
    const draft = await withSourcing(procurementPrincipal, 'b06-incomplete-draft', (h) => h.draft());
    const basis = await withSourcing(procurementPrincipal, 'b06-incomplete-basis', (h) => h.issueBasis(draft.eventId));
    await expect(withSourcing(procurementPrincipal, 'b06-incomplete-issue', (h) => h.issue(draft.eventId, 1n, basis.artifactId, basis.messageId))).rejects.toThrow(/response schema|required before issue/u);
  });

  it('blocks stale issue and issues exact version only from current draft basis', async () => {
    const ready = await readyDraft();
    await expect(withSourcing(procurementPrincipal, 'b06-stale', (h) => h.issue(ready.draft.eventId, 99n, ready.basis.artifactId, ready.basis.messageId))).rejects.toThrow(/stale or non-draft/u);
    const issuedVersion = await withSourcing(procurementPrincipal, 'b06-issue', (h) => h.issue(ready.draft.eventId, 1n, ready.basis.artifactId, ready.basis.messageId));
    const row = await setupPool.query(`SELECT lifecycle_state,response_schema_version_id,acceptance_policy_id,issued_artifact_version_id FROM sourcing.sourcing_event_version WHERE sourcing_event_version_id=$1`, [issuedVersion]);
    expect(row.rows[0]).toMatchObject({ lifecycle_state: 'ISSUED', response_schema_version_id: ready.draft.schemaId, acceptance_policy_id: ready.draft.policyId, issued_artifact_version_id: ready.basis.artifactId });
  });

  it('supports a no-account supplier contact path and binds grant authority to exact contact/event version', async () => {
    const ready = await readyDraft(ownerPrincipal);
    const issued = await withSourcing(ownerPrincipal, 'b06-issue-owner', (h) => h.issue(ready.draft.eventId, 1n, ready.basis.artifactId, ready.basis.messageId));
    const grantId = await withSourcing(ownerPrincipal, 'b06-grant', (h) => h.grant(issued, ready.memberId));
    const grant = await setupPool.query(`SELECT supplier_contact_id,issue_time_subscription_id,token_digest_sha256 FROM sourcing.external_task_grant WHERE external_task_grant_id=$1`, [grantId]);
    expect(grant.rows[0]?.supplier_contact_id).toBe(ready.supplier.contactId);
    expect(grant.rows[0]?.issue_time_subscription_id).toBeTruthy();
    const principalColumn = await setupPool.query(`SELECT 1 FROM information_schema.columns WHERE table_schema='sourcing' AND table_name='supplier_contact' AND column_name='principal_id'`);
    expect(principalColumn.rowCount).toBe(0);
    await expect(setupPool.query(`UPDATE sourcing.external_task_grant SET supplier_contact_id=$1 WHERE external_task_grant_id=$2`, [randomUUID(), grantId])).rejects.toThrow(/append-only/u);
    await withSourcing(ownerPrincipal, 'b06-revoke', (h) => h.revoke(grantId));
  });

  it('records exact invitation channel/calendar basis and controlled grant transfer without forwarding authority', async () => {
    const ready = await readyDraft(ownerPrincipal);
    const issued = await withSourcing(ownerPrincipal, 'b06-transfer-issue', (h) => h.issue(ready.draft.eventId, 1n, ready.basis.artifactId, ready.basis.messageId));
    const oldGrant = await withSourcing(ownerPrincipal, 'b06-transfer-grant', (h) => h.grant(issued, ready.memberId));
    await withSourcing(ownerPrincipal, 'b06-transfer-invite', (h) => h.invitation(oldGrant, ready.basis.messageId));
    const newContact = await withSourcing(ownerPrincipal, 'b06-transfer-contact', (h) => h.addContact(ready.supplier.relationshipId));
    const newGrant = await withSourcing(ownerPrincipal, 'b06-transfer-reissue', (h) => h.transfer(oldGrant, newContact));
    await withSourcing(ownerPrincipal, 'b06-transfer-reinvite', (h) => h.invitation(newGrant, ready.basis.messageId, 'CONTROLLED_REISSUE'));

    const oldState = await setupPool.query<{ occurrence_kind: string }>(`SELECT occurrence_kind FROM sourcing.external_task_grant_occurrence WHERE external_task_grant_id=$1 ORDER BY sequence DESC LIMIT 1`, [oldGrant]);
    const replacement = await setupPool.query<{ supplier_contact_id: string; replaces_grant_id: string }>(`SELECT supplier_contact_id,replaces_grant_id FROM sourcing.external_task_grant WHERE external_task_grant_id=$1`, [newGrant]);
    const invitation = await setupPool.query<{ channel: string; supplier_contact_id: string }>(`SELECT channel,supplier_contact_id FROM sourcing.invitation_occurrence WHERE external_task_grant_id=$1`, [newGrant]);
    expect(oldState.rows[0]?.occurrence_kind).toBe('TRANSFER_REISSUED');
    expect(replacement.rows[0]).toMatchObject({ supplier_contact_id: newContact, replaces_grant_id: oldGrant });
    expect(invitation.rows[0]).toMatchObject({ channel: 'SECURE_LINK', supplier_contact_id: newContact });
    await expect(withSourcing(ownerPrincipal, 'b06-transfer-old-reuse', (h) => h.transfer(oldGrant, newContact))).rejects.toThrow(/only an active issued grant/u);
  });

  it('creates a versioned addendum draft from the exact current issued RFQ and blocks stale addenda', async () => {
    const ready = await readyDraft();
    await withSourcing(procurementPrincipal, 'b06-addendum-issue', (h) => h.issue(ready.draft.eventId, 1n, ready.basis.artifactId, ready.basis.messageId));
    const addendum = await withSourcing(procurementPrincipal, 'b06-addendum-create', (h) => h.addendum(ready.draft.eventId, 2n));
    const row = await setupPool.query<{ version: string; lifecycle_state: string; addendum_reason: string; members: string }>(`SELECT v.version::text,v.lifecycle_state,v.addendum_reason,(SELECT count(*)::text FROM sourcing.sourcing_event_member m WHERE m.sourcing_event_version_id=v.sourcing_event_version_id) members FROM sourcing.sourcing_event_version v WHERE v.sourcing_event_version_id=$1`, [addendum]);
    expect(row.rows[0]).toMatchObject({ version: '3', lifecycle_state: 'DRAFT', addendum_reason: 'deadline extension after clarification', members: '1' });
    await expect(withSourcing(procurementPrincipal, 'b06-addendum-stale', (h) => h.addendum(ready.draft.eventId, 2n))).rejects.toThrow(/exact current issued version/u);
  });

  it('keeps Commercial Reviewer from issuing procurement commands', async () => {
    await expect(withSourcing(reviewerPrincipal, 'b06-reviewer-draft', (h) => h.draft())).rejects.toThrow(/unauthorized/u);
  });
});
