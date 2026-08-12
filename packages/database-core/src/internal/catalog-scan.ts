import type { Pool } from 'pg';

export type CatalogFindingKind =
  'SECURITY_DEFINER' | 'CONTEXT_MUTATION' | 'SET_ROLE' | 'BYPASS_RLS_ROLE';

export interface CatalogFinding {
  readonly kind: CatalogFindingKind;
  readonly identity: string;
  readonly detail: string;
}

const productOwnedSchemas = ['platform', 'evidence', 'requirements', 'sourcing', 'ops'] as const;
const productOwnedSchemaSet = new Set<string>(productOwnedSchemas);
const ownedSchemaPattern = /^(?:cpos|testkit)_[a-z0-9_]+$/u;
const approvedSecurityDefiners = new Set([
  'platform.validate_metered_usage_occurrence_insert',
  'platform.current_principal_has_active_tenant_role',
  'platform.validate_project_version_insert',
  'ops.accept_async_operation',
  'ops.claim_jobs',
  'ops.heartbeat_job',
  'ops.mark_effect_boundary_started',
  'ops.complete_pre_effect_attempt',
  'ops.record_unknown_effect',
  'ops.reap_expired_leases',
  'ops.resolve_indeterminate_effect',
  'ops.accept_unresolved_external_position',
  'ops.record_domain_event_once',
  'ops.record_publication_intent_once',
  'ops.materialize_integration_event_once',
  'ops.begin_transport_attempt',
  'evidence.command_context_valid',
  'evidence.create_upload_session',
  'evidence.record_upload_state',
  'evidence.record_payload_attempt',
  'evidence.record_validation_observation',
  'evidence.accept_captured_evidence',
  'evidence.create_artifact_build_intent',
  'evidence.add_artifact_build_member',
  'evidence.issue_artifact_version',
  'evidence.record_message',
  'requirements.command_context_valid',
  'requirements.create_authorized_requirement',
  'requirements.amend_authorized_requirement',
  'requirements.allocate_requirement',
  'requirements.release_allocation',
  'requirements.create_procurement_package',
  'requirements.record_package_membership',
  'sourcing.command_context_valid',
  'sourcing.create_supplier',
  'sourcing.add_supplier_contact',
  'sourcing.create_rfq_draft',
  'sourcing.add_response_schema_field',
  'sourcing.add_event_member',
  'sourcing.issue_event',
  'sourcing.issue_external_task_grant',
  'sourcing.revoke_external_task_grant',
  'sourcing.record_invitation',
  'sourcing.create_addendum_draft',
  'sourcing.transfer_external_task_grant',
]);
const pinnedSearchPathPattern = /\bset\s+search_path\s*(?:=|to)\s*/iu;
const setRolePattern = /\bset\s+(?:local\s+)?role\b/iu;
const prohibitedContextMutationPattern =
  /set_config\s*\(|\bset\s+(?:(?:local|session)\s+)?cpos\.[a-z0-9_.]+\b/iu;

function ownsSchema(schema: string): boolean {
  return productOwnedSchemaSet.has(schema) || ownedSchemaPattern.test(schema);
}

export async function scanDatabaseCatalog(pool: Pool): Promise<readonly CatalogFinding[]> {
  const findings: CatalogFinding[] = [];
  const functions = await pool.query<{
    schema_name: string;
    function_name: string;
    security_definer: boolean;
    definition: string;
  }>(
    `
      SELECT
        n.nspname AS schema_name,
        p.proname AS function_name,
        p.prosecdef AS security_definer,
        pg_get_functiondef(p.oid) AS definition
      FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = ANY($1::text[])
         OR n.nspname LIKE 'cpos\\_%' ESCAPE '\\'
         OR n.nspname LIKE 'testkit\\_%' ESCAPE '\\'
    `,
    [productOwnedSchemas],
  );

  const securityDefinerCounts = new Map<string, number>();
  for (const row of functions.rows) {
    if (!row.security_definer) continue;
    const identity = `${row.schema_name}.${row.function_name}`;
    securityDefinerCounts.set(identity, (securityDefinerCounts.get(identity) ?? 0) + 1);
  }

  for (const row of functions.rows) {
    if (!ownsSchema(row.schema_name)) continue;
    const identity = `${row.schema_name}.${row.function_name}`;
    if (row.security_definer) {
      if (!approvedSecurityDefiners.has(identity)) {
        findings.push({
          kind: 'SECURITY_DEFINER',
          identity,
          detail: 'SECURITY DEFINER is prohibited unless explicitly approved',
        });
      } else if (!pinnedSearchPathPattern.test(row.definition)) {
        findings.push({
          kind: 'SECURITY_DEFINER',
          identity,
          detail: 'approved SECURITY DEFINER must pin search_path',
        });
      } else if ((securityDefinerCounts.get(identity) ?? 0) !== 1) {
        findings.push({
          kind: 'SECURITY_DEFINER',
          identity,
          detail: 'approved SECURITY DEFINER identity may not be overloaded',
        });
      }
    }
    if (setRolePattern.test(row.definition)) {
      findings.push({ kind: 'SET_ROLE', identity, detail: 'database object changes role' });
    }
    if (prohibitedContextMutationPattern.test(row.definition)) {
      findings.push({
        kind: 'CONTEXT_MUTATION',
        identity,
        detail: 'database object can mutate reserved execution context',
      });
    }
  }

  const views = await pool.query<{
    schema_name: string;
    view_name: string;
    definition: string;
  }>(
    `
      SELECT schemaname AS schema_name, viewname AS view_name, definition
      FROM pg_views
      WHERE schemaname = ANY($1::text[])
         OR schemaname LIKE 'cpos\\_%' ESCAPE '\\'
         OR schemaname LIKE 'testkit\\_%' ESCAPE '\\'
    `,
    [productOwnedSchemas],
  );
  for (const row of views.rows) {
    if (ownsSchema(row.schema_name) && prohibitedContextMutationPattern.test(row.definition)) {
      findings.push({
        kind: 'CONTEXT_MUTATION',
        identity: `${row.schema_name}.${row.view_name}`,
        detail: 'view definition contains a prohibited context/role expression',
      });
    }
  }

  const rules = await pool.query<{
    schema_name: string;
    table_name: string;
    rule_name: string;
    definition: string;
  }>(
    `
      SELECT schemaname AS schema_name, tablename AS table_name, rulename AS rule_name, definition
      FROM pg_rules
      WHERE schemaname = ANY($1::text[])
         OR schemaname LIKE 'cpos\\_%' ESCAPE '\\'
         OR schemaname LIKE 'testkit\\_%' ESCAPE '\\'
    `,
    [productOwnedSchemas],
  );
  for (const row of rules.rows) {
    if (ownsSchema(row.schema_name) && prohibitedContextMutationPattern.test(row.definition)) {
      findings.push({
        kind: 'CONTEXT_MUTATION',
        identity: `${row.schema_name}.${row.table_name}.${row.rule_name}`,
        detail: 'rule definition contains a prohibited context/role expression',
      });
    }
  }

  const roles = await pool.query<{ role_name: string }>(`
    SELECT rolname AS role_name
    FROM pg_roles
    WHERE rolname LIKE 'cpos\\_%' ESCAPE '\\'
      AND rolbypassrls
  `);
  for (const row of roles.rows) {
    findings.push({
      kind: 'BYPASS_RLS_ROLE',
      identity: row.role_name,
      detail: 'CPOS runtime roles may not have BYPASSRLS',
    });
  }

  return findings.sort((left, right) =>
    `${left.kind}:${left.identity}`.localeCompare(`${right.kind}:${right.identity}`),
  );
}
