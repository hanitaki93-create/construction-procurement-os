import type { Pool } from 'pg';

export type CatalogFindingKind =
  | 'SECURITY_DEFINER'
  | 'CONTEXT_MUTATION'
  | 'SET_ROLE'
  | 'BYPASS_RLS_ROLE';

export interface CatalogFinding {
  readonly kind: CatalogFindingKind;
  readonly identity: string;
  readonly detail: string;
}

const ownedSchemaPattern = /^(?:cpos|testkit)_[a-z0-9_]+$/u;
const prohibitedContextPattern =
  /set_config\s*\(|\bset\s+(?:local\s+)?role\b|cpos\.(?:tenant|principal|project|authority_context)/iu;

function ownsSchema(schema: string): boolean {
  return ownedSchemaPattern.test(schema);
}

export async function scanDatabaseCatalog(pool: Pool): Promise<readonly CatalogFinding[]> {
  const findings: CatalogFinding[] = [];
  const functions = await pool.query<{
    schema_name: string;
    function_name: string;
    security_definer: boolean;
    definition: string;
  }>(`
    SELECT
      n.nspname AS schema_name,
      p.proname AS function_name,
      p.prosecdef AS security_definer,
      pg_get_functiondef(p.oid) AS definition
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname LIKE 'cpos\\_%' ESCAPE '\\'
       OR n.nspname LIKE 'testkit\\_%' ESCAPE '\\'
  `);

  for (const row of functions.rows) {
    if (!ownsSchema(row.schema_name)) continue;
    const identity = `${row.schema_name}.${row.function_name}`;
    if (row.security_definer) {
      findings.push({
        kind: 'SECURITY_DEFINER',
        identity,
        detail: 'SECURITY DEFINER is prohibited by default',
      });
    }
    if (/\bset\s+(?:local\s+)?role\b/iu.test(row.definition)) {
      findings.push({ kind: 'SET_ROLE', identity, detail: 'database object changes role' });
    }
    if (prohibitedContextPattern.test(row.definition)) {
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
  }>(`
    SELECT schemaname AS schema_name, viewname AS view_name, definition
    FROM pg_views
    WHERE schemaname LIKE 'cpos\\_%' ESCAPE '\\'
       OR schemaname LIKE 'testkit\\_%' ESCAPE '\\'
  `);
  for (const row of views.rows) {
    if (ownsSchema(row.schema_name) && prohibitedContextPattern.test(row.definition)) {
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
  }>(`
    SELECT schemaname AS schema_name, tablename AS table_name, rulename AS rule_name, definition
    FROM pg_rules
    WHERE schemaname LIKE 'cpos\\_%' ESCAPE '\\'
       OR schemaname LIKE 'testkit\\_%' ESCAPE '\\'
  `);
  for (const row of rules.rows) {
    if (ownsSchema(row.schema_name) && prohibitedContextPattern.test(row.definition)) {
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
