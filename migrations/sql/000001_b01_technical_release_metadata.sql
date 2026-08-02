CREATE TABLE IF NOT EXISTS release_metadata (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  build_id text NOT NULL,
  source_commit text NOT NULL,
  compatibility_manifest_version text NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

COMMENT ON TABLE release_metadata IS
  'B01 technical release metadata only. This table is not product, tenant, evidence, or procurement authority.';
