CREATE TABLE IF NOT EXISTS platform.usage_measure_definition_version (
  usage_measure_definition_version_id uuid PRIMARY KEY DEFAULT uuidv7(),
  usage_measure_key text NOT NULL CHECK (usage_measure_key ~ '^[a-z][a-z0-9._-]{1,127}$'),
  version bigint NOT NULL CHECK (version > 0),
  unit_key text NOT NULL CHECK (unit_key ~ '^[a-z][a-z0-9._-]{0,63}$'),
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (usage_measure_key, version),
  UNIQUE (usage_measure_key, effective_period WITHOUT OVERLAPS)
);

COMMENT ON TABLE platform.usage_measure_definition_version IS
  'Product-authored commercial usage-unit definitions. They are not procurement truth or provider token truth.';

CREATE TABLE IF NOT EXISTS platform.entitlement_definition_version (
  entitlement_definition_version_id uuid PRIMARY KEY DEFAULT uuidv7(),
  entitlement_key text NOT NULL CHECK (entitlement_key ~ '^[a-z][a-z0-9._-]{1,127}$'),
  version bigint NOT NULL CHECK (version > 0),
  entitlement_kind text NOT NULL CHECK (entitlement_kind IN ('CAPABILITY', 'METERED_LIMIT')),
  aggregation text NOT NULL CHECK (aggregation IN ('ANY', 'ADDITIVE_LIMIT')),
  usage_measure_definition_version_id uuid REFERENCES platform.usage_measure_definition_version(usage_measure_definition_version_id),
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (entitlement_key, version),
  UNIQUE (entitlement_key, effective_period WITHOUT OVERLAPS),
  UNIQUE (entitlement_definition_version_id, entitlement_key, entitlement_kind),
  CHECK (
    (entitlement_kind = 'CAPABILITY' AND aggregation = 'ANY' AND usage_measure_definition_version_id IS NULL)
    OR
    (entitlement_kind = 'METERED_LIMIT' AND aggregation = 'ADDITIVE_LIMIT' AND usage_measure_definition_version_id IS NOT NULL)
  )
);

COMMENT ON TABLE platform.entitlement_definition_version IS
  'Versioned product capability/allowance meanings. Purchase never grants procurement business authority.';

CREATE TABLE IF NOT EXISTS platform.product_offering_version (
  product_offering_version_id uuid PRIMARY KEY DEFAULT uuidv7(),
  offering_key text NOT NULL CHECK (offering_key ~ '^[A-Z][A-Z0-9_]{0,63}$'),
  version bigint NOT NULL CHECK (version > 0),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 160),
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('DRAFT', 'AVAILABLE', 'RETIRED')),
  availability_period tstzrange NOT NULL CHECK (NOT isempty(availability_period)),
  commercial_metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(commercial_metadata) = 'object'),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (offering_key, version),
  UNIQUE (offering_key, availability_period WITHOUT OVERLAPS)
);

COMMENT ON TABLE platform.product_offering_version IS
  'Immutable product-authored purchasable component version. Availability limits new assignment only; existing subscription items remain bound to their exact version.';

CREATE TABLE IF NOT EXISTS platform.product_offering_entitlement_grant (
  product_offering_version_id uuid NOT NULL REFERENCES platform.product_offering_version(product_offering_version_id),
  entitlement_definition_version_id uuid NOT NULL,
  entitlement_key text NOT NULL,
  entitlement_kind text NOT NULL,
  limit_mode text CHECK (limit_mode IN ('FINITE', 'UNBOUNDED')),
  limit_quantity_text text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (product_offering_version_id, entitlement_key),
  FOREIGN KEY (
    entitlement_definition_version_id,
    entitlement_key,
    entitlement_kind
  ) REFERENCES platform.entitlement_definition_version(
    entitlement_definition_version_id,
    entitlement_key,
    entitlement_kind
  ),
  CHECK (
    (
      entitlement_kind = 'CAPABILITY'
      AND limit_mode IS NULL
      AND limit_quantity_text IS NULL
    )
    OR
    (
      entitlement_kind = 'METERED_LIMIT'
      AND limit_mode = 'UNBOUNDED'
      AND limit_quantity_text IS NULL
    )
    OR
    (
      entitlement_kind = 'METERED_LIMIT'
      AND limit_mode = 'FINITE'
      AND limit_quantity_text IS NOT NULL
      AND limit_quantity_text ~ '^(0|[1-9][0-9]*)(\.[0-9]+)?$'
    )
  )
);

COMMENT ON TABLE platform.product_offering_entitlement_grant IS
  'Immutable entitlement grants contributed by one exact offering version. Capability rows only enable; v1 has no negative/deny grant grammar.';

REVOKE ALL ON platform.usage_measure_definition_version FROM PUBLIC;
REVOKE ALL ON platform.entitlement_definition_version FROM PUBLIC;
REVOKE ALL ON platform.product_offering_version FROM PUBLIC;
REVOKE ALL ON platform.product_offering_entitlement_grant FROM PUBLIC;

GRANT SELECT ON platform.usage_measure_definition_version TO cpos_platform_runtime;
GRANT SELECT ON platform.entitlement_definition_version TO cpos_platform_runtime;
GRANT SELECT ON platform.product_offering_version TO cpos_platform_runtime;
GRANT SELECT ON platform.product_offering_entitlement_grant TO cpos_platform_runtime;
