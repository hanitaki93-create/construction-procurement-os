-- Architecture V2 Session 04 R06 completion.
-- Adds the missing supplier-confirmed contractable basis and governed comparison numbering.
-- Internal buyer evaluation adjustments remain distinct from supplier-confirmed commercial truth.

ALTER TABLE procurement.document_number_counter
  DROP CONSTRAINT IF EXISTS document_number_counter_document_class_check;
ALTER TABLE procurement.document_number_counter
  ADD CONSTRAINT document_number_counter_document_class_check
  CHECK (document_class IN ('MR','PACKAGE','RFQ','COMPARISON','RECOMMENDATION','AWARD'));

ALTER TABLE procurement.bid_comparison
  ADD COLUMN IF NOT EXISTS comparison_number text;
ALTER TABLE procurement.bid_comparison
  ADD COLUMN IF NOT EXISTS numbering_scope_key text;
CREATE UNIQUE INDEX IF NOT EXISTS bid_comparison_number_unique
  ON procurement.bid_comparison (tenant_id, comparison_number)
  WHERE comparison_number IS NOT NULL;

ALTER TABLE procurement.bid_comparison_snapshot
  ADD COLUMN IF NOT EXISTS comparison_number text;
CREATE UNIQUE INDEX IF NOT EXISTS bid_comparison_snapshot_number_unique
  ON procurement.bid_comparison_snapshot (tenant_id, comparison_number)
  WHERE comparison_number IS NOT NULL;

CREATE OR REPLACE FUNCTION procurement.allocate_project_business_number(
  p_document_class text,
  p_project_id uuid
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid;
  v_project_code text;
  v_year text;
  v_year_short text;
  v_scope_key text;
  v_sequence bigint;
  v_prefix text;
BEGIN
  v_tenant_id := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'business number allocation requires tenant execution context' USING ERRCODE = '42501';
  END IF;

  v_prefix := CASE p_document_class
    WHEN 'COMPARISON' THEN 'CMP'
    WHEN 'RECOMMENDATION' THEN 'REC'
    WHEN 'AWARD' THEN 'AWD'
    ELSE NULL
  END;
  IF v_prefix IS NULL THEN
    RAISE EXCEPTION 'unsupported project business number class' USING ERRCODE = '23514';
  END IF;

  SELECT pv.project_code INTO v_project_code
  FROM platform.project_version pv
  WHERE pv.tenant_id = v_tenant_id
    AND pv.project_id = p_project_id
    AND pv.lifecycle_state = 'ACTIVE'
    AND pv.effective_period @> statement_timestamp()
  ORDER BY pv.version DESC
  LIMIT 1;

  IF v_project_code IS NULL THEN
    RAISE EXCEPTION 'business number project is not active or not visible' USING ERRCODE = '23503';
  END IF;

  v_year := to_char(statement_timestamp() AT TIME ZONE 'Asia/Dubai', 'YYYY');
  v_year_short := to_char(statement_timestamp() AT TIME ZONE 'Asia/Dubai', 'YY');
  v_scope_key := p_project_id::text || ':' || v_year;

  INSERT INTO procurement.document_number_counter (
    tenant_id, document_class, scope_key, next_value
  ) VALUES (
    v_tenant_id, p_document_class, v_scope_key, 1
  ) ON CONFLICT (tenant_id, document_class, scope_key) DO NOTHING;

  SELECT next_value INTO v_sequence
  FROM procurement.document_number_counter
  WHERE tenant_id = v_tenant_id
    AND document_class = p_document_class
    AND scope_key = v_scope_key
  FOR UPDATE;

  UPDATE procurement.document_number_counter
  SET next_value = v_sequence + 1,
      updated_at = clock_timestamp()
  WHERE tenant_id = v_tenant_id
    AND document_class = p_document_class
    AND scope_key = v_scope_key;

  RETURN v_prefix || '-' || v_project_code || '-' || v_year_short || '-' || lpad(v_sequence::text, 5, '0');
END
$$;

REVOKE ALL ON FUNCTION procurement.allocate_project_business_number(text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION procurement.allocate_project_business_number(text, uuid) TO cpos_platform_runtime;

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_confirmed_basis (
  confirmed_basis_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_id uuid NOT NULL,
  comparison_row_id uuid NOT NULL,
  comparison_bidder_id uuid NOT NULL,
  basis_version integer NOT NULL CHECK (basis_version > 0),
  supersedes_confirmed_basis_id uuid,
  confirmation_kind text NOT NULL CHECK (
    confirmation_kind IN ('QUOTATION_REVISION','CLARIFICATION_CONFIRMATION','NEGOTIATED_BAFO','WRITTEN_CONFIRMATION')
  ),
  source_quotation_revision_id uuid,
  source_confirmation_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  confirmed_description text NOT NULL CHECK (char_length(btrim(confirmed_description)) BETWEEN 1 AND 2000),
  confirmed_quantity numeric(24,6) CHECK (confirmed_quantity IS NULL OR confirmed_quantity > 0),
  confirmed_uom_code text,
  confirmed_unit_rate numeric(24,6),
  confirmed_amount numeric(24,6) NOT NULL CHECK (confirmed_amount >= 0),
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  confirmed_terms jsonb NOT NULL DEFAULT '{}'::jsonb,
  technical_status_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, confirmed_basis_id),
  UNIQUE (tenant_id, comparison_id, comparison_row_id, comparison_bidder_id, basis_version),
  FOREIGN KEY (tenant_id, comparison_id)
    REFERENCES procurement.bid_comparison(tenant_id, comparison_id),
  FOREIGN KEY (tenant_id, comparison_row_id)
    REFERENCES procurement.bid_comparison_row(tenant_id, comparison_row_id),
  FOREIGN KEY (tenant_id, comparison_bidder_id)
    REFERENCES procurement.bid_comparison_bidder_selection(tenant_id, comparison_bidder_id),
  FOREIGN KEY (tenant_id, source_quotation_revision_id)
    REFERENCES procurement.supplier_quotation_revision(tenant_id, quotation_revision_id),
  FOREIGN KEY (tenant_id, supersedes_confirmed_basis_id)
    REFERENCES procurement.bid_comparison_confirmed_basis(tenant_id, confirmed_basis_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (confirmed_uom_code IS NULL OR char_length(confirmed_uom_code) BETWEEN 1 AND 80),
  CHECK (jsonb_typeof(source_confirmation_refs) = 'array'),
  CHECK (jsonb_typeof(confirmed_terms) = 'object'),
  CHECK (jsonb_typeof(technical_status_refs) = 'array'),
  CHECK (
    (confirmation_kind = 'QUOTATION_REVISION' AND source_quotation_revision_id IS NOT NULL)
    OR confirmation_kind <> 'QUOTATION_REVISION'
  )
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_snapshot_confirmed_basis (
  snapshot_confirmed_basis_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_snapshot_id uuid NOT NULL,
  confirmed_basis_id uuid NOT NULL,
  comparison_row_id uuid NOT NULL,
  comparison_bidder_id uuid NOT NULL,
  basis_version integer NOT NULL,
  confirmation_kind text NOT NULL,
  source_quotation_revision_id uuid,
  source_confirmation_refs jsonb NOT NULL,
  confirmed_description text NOT NULL,
  confirmed_quantity numeric(24,6),
  confirmed_uom_code text,
  confirmed_unit_rate numeric(24,6),
  confirmed_amount numeric(24,6) NOT NULL,
  currency text NOT NULL,
  confirmed_terms jsonb NOT NULL,
  technical_status_refs jsonb NOT NULL,
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL,
  UNIQUE (tenant_id, snapshot_confirmed_basis_id),
  UNIQUE (tenant_id, comparison_snapshot_id, comparison_row_id, comparison_bidder_id),
  FOREIGN KEY (tenant_id, comparison_snapshot_id)
    REFERENCES procurement.bid_comparison_snapshot(tenant_id, comparison_snapshot_id),
  FOREIGN KEY (tenant_id, confirmed_basis_id)
    REFERENCES procurement.bid_comparison_confirmed_basis(tenant_id, confirmed_basis_id),
  FOREIGN KEY (tenant_id, source_quotation_revision_id)
    REFERENCES procurement.supplier_quotation_revision(tenant_id, quotation_revision_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id)
);

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_confirmed_basis_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_expected_version integer;
  v_previous_basis_id uuid;
  v_selected_revision_id uuid;
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);

  IF NOT (
    platform.current_principal_has_active_tenant_role('OWNER')
    OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
    OR platform.current_principal_has_active_tenant_role('BUYER')
  ) THEN
    RAISE EXCEPTION 'supplier-confirmed basis requires sourcing authority' USING ERRCODE = '42501';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM procurement.bid_comparison_row r
    WHERE r.tenant_id = NEW.tenant_id
      AND r.comparison_id = NEW.comparison_id
      AND r.comparison_row_id = NEW.comparison_row_id
  ) THEN
    RAISE EXCEPTION 'confirmed basis row must belong to comparison' USING ERRCODE = '23514';
  END IF;

  SELECT b.selected_quotation_revision_id INTO v_selected_revision_id
  FROM procurement.bid_comparison_bidder_selection b
  WHERE b.tenant_id = NEW.tenant_id
    AND b.comparison_id = NEW.comparison_id
    AND b.comparison_bidder_id = NEW.comparison_bidder_id;

  IF v_selected_revision_id IS NULL THEN
    RAISE EXCEPTION 'confirmed basis bidder must belong to comparison' USING ERRCODE = '23514';
  END IF;

  IF NEW.confirmation_kind = 'QUOTATION_REVISION'
     AND NEW.source_quotation_revision_id <> v_selected_revision_id THEN
    RAISE EXCEPTION 'quotation-confirmed basis must cite the selected quotation revision' USING ERRCODE = '23514';
  END IF;

  SELECT coalesce(max(basis_version), 0) + 1,
         (array_agg(confirmed_basis_id ORDER BY basis_version DESC))[1]
    INTO v_expected_version, v_previous_basis_id
  FROM procurement.bid_comparison_confirmed_basis
  WHERE tenant_id = NEW.tenant_id
    AND comparison_id = NEW.comparison_id
    AND comparison_row_id = NEW.comparison_row_id
    AND comparison_bidder_id = NEW.comparison_bidder_id;

  IF NEW.basis_version <> v_expected_version THEN
    RAISE EXCEPTION 'confirmed basis version must be contiguous' USING ERRCODE = '23514';
  END IF;

  IF v_expected_version = 1 AND NEW.supersedes_confirmed_basis_id IS NOT NULL THEN
    RAISE EXCEPTION 'first confirmed basis version cannot supersede another basis' USING ERRCODE = '23514';
  END IF;
  IF v_expected_version > 1 AND NEW.supersedes_confirmed_basis_id IS DISTINCT FROM v_previous_basis_id THEN
    RAISE EXCEPTION 'confirmed basis revision must supersede the immediately prior basis' USING ERRCODE = '23514';
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS bid_comparison_confirmed_basis_insert_guard
  ON procurement.bid_comparison_confirmed_basis;
CREATE TRIGGER bid_comparison_confirmed_basis_insert_guard
BEFORE INSERT ON procurement.bid_comparison_confirmed_basis
FOR EACH ROW EXECUTE FUNCTION procurement.validate_bid_comparison_confirmed_basis_insert();

CREATE OR REPLACE FUNCTION procurement.reject_confirmed_basis_rewrite()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'supplier-confirmed basis is immutable; append a superseding basis version' USING ERRCODE = '55000';
END
$$;

DROP TRIGGER IF EXISTS bid_comparison_confirmed_basis_immutable
  ON procurement.bid_comparison_confirmed_basis;
CREATE TRIGGER bid_comparison_confirmed_basis_immutable
BEFORE UPDATE OR DELETE ON procurement.bid_comparison_confirmed_basis
FOR EACH ROW EXECUTE FUNCTION procurement.reject_confirmed_basis_rewrite();

ALTER TABLE procurement.bid_comparison_confirmed_basis ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.bid_comparison_confirmed_basis FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.bid_comparison_snapshot_confirmed_basis ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.bid_comparison_snapshot_confirmed_basis FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_select ON procurement.bid_comparison_confirmed_basis;
DROP POLICY IF EXISTS tenant_insert ON procurement.bid_comparison_confirmed_basis;
CREATE POLICY tenant_select ON procurement.bid_comparison_confirmed_basis
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));
CREATE POLICY tenant_insert ON procurement.bid_comparison_confirmed_basis
  FOR INSERT TO cpos_platform_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_tenant_has_active_product_access()
  );

DROP POLICY IF EXISTS tenant_select ON procurement.bid_comparison_snapshot_confirmed_basis;
CREATE POLICY tenant_select ON procurement.bid_comparison_snapshot_confirmed_basis
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

REVOKE ALL ON procurement.bid_comparison_confirmed_basis FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_snapshot_confirmed_basis FROM PUBLIC;
GRANT SELECT, INSERT ON procurement.bid_comparison_confirmed_basis TO cpos_platform_runtime;
GRANT SELECT ON procurement.bid_comparison_snapshot_confirmed_basis TO cpos_platform_runtime;

-- Replace the freeze authority so the immutable snapshot now includes a governed business number
-- and the latest supplier-confirmed basis version for each supplier/row pair.
CREATE OR REPLACE FUNCTION procurement.freeze_bid_comparison(p_comparison_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid;
  v_actor_id uuid;
  v_comparison procurement.bid_comparison%ROWTYPE;
  v_snapshot_id uuid;
  v_comparison_number text;
  v_scope_key text;
  v_frozen_at timestamptz := clock_timestamp();
BEGIN
  v_tenant_id := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id := nullif(current_setting('cpos.principal_id', true), '')::uuid;

  IF v_tenant_id IS NULL OR v_actor_id IS NULL THEN
    RAISE EXCEPTION 'comparison freeze requires tenant and principal execution context' USING ERRCODE = '42501';
  END IF;
  IF NOT platform.current_tenant_has_active_product_access() THEN
    RAISE EXCEPTION 'comparison freeze requires active product access' USING ERRCODE = '42501';
  END IF;
  IF NOT (
    platform.current_principal_has_active_tenant_role('OWNER')
    OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
    OR platform.current_principal_has_active_tenant_role('BUYER')
  ) THEN
    RAISE EXCEPTION 'comparison freeze requires sourcing authority' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO v_comparison
  FROM procurement.bid_comparison
  WHERE tenant_id = v_tenant_id AND comparison_id = p_comparison_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'bid comparison does not exist' USING ERRCODE = '23503';
  END IF;

  IF v_comparison.state = 'FROZEN' THEN
    SELECT comparison_snapshot_id INTO v_snapshot_id
    FROM procurement.bid_comparison_snapshot
    WHERE tenant_id = v_tenant_id AND comparison_id = p_comparison_id;
    RETURN v_snapshot_id;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM procurement.bid_comparison_bidder_selection b
    WHERE b.tenant_id = v_tenant_id AND b.comparison_id = p_comparison_id
  ) THEN
    RAISE EXCEPTION 'comparison requires at least one selected quotation revision before freeze' USING ERRCODE = '23514';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM procurement.bid_comparison_row r
    WHERE r.tenant_id = v_tenant_id AND r.comparison_id = p_comparison_id
  ) THEN
    RAISE EXCEPTION 'comparison requires at least one comparison row before freeze' USING ERRCODE = '23514';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM procurement.bid_comparison_row r
    CROSS JOIN procurement.bid_comparison_bidder_selection b
    LEFT JOIN procurement.bid_comparison_cell c
      ON c.tenant_id = r.tenant_id
     AND c.comparison_id = r.comparison_id
     AND c.comparison_row_id = r.comparison_row_id
     AND c.comparison_bidder_id = b.comparison_bidder_id
    WHERE r.tenant_id = v_tenant_id
      AND r.comparison_id = p_comparison_id
      AND b.tenant_id = v_tenant_id
      AND b.comparison_id = p_comparison_id
      AND c.comparison_cell_id IS NULL
  ) THEN
    RAISE EXCEPTION 'comparison freeze requires an explicit coverage cell for every row and selected bidder; missing scope must be recorded as MISSING' USING ERRCODE = '23514';
  END IF;

  v_comparison_number := procurement.allocate_project_business_number('COMPARISON', v_comparison.project_id);
  v_scope_key := v_comparison.project_id::text || ':' || to_char(statement_timestamp() AT TIME ZONE 'Asia/Dubai', 'YYYY');

  INSERT INTO procurement.bid_comparison_snapshot (
    tenant_id, comparison_id, rfq_issue_id, project_id, title, base_currency,
    comparison_number, comparison_version, frozen_by, frozen_at
  ) VALUES (
    v_tenant_id, v_comparison.comparison_id, v_comparison.rfq_issue_id, v_comparison.project_id,
    v_comparison.title, v_comparison.base_currency, v_comparison_number,
    v_comparison.version, v_actor_id, v_frozen_at
  ) RETURNING comparison_snapshot_id INTO v_snapshot_id;

  INSERT INTO procurement.bid_comparison_snapshot_bidder (
    tenant_id, comparison_snapshot_id, comparison_bidder_id, rfq_issue_bidder_id,
    selected_quotation_revision_id, quotation_revision_no, supplier_id, supplier_code,
    supplier_legal_name, supplier_quotation_reference, quotation_currency, validity_until,
    lead_time_promise, delivery_promise, payment_terms, warranty_terms, response_status, is_late
  )
  SELECT
    v_tenant_id, v_snapshot_id, b.comparison_bidder_id, b.rfq_issue_bidder_id,
    q.quotation_revision_id, q.revision_no, ib.supplier_id, s.supplier_code, s.legal_name,
    q.supplier_quotation_reference, q.currency, q.validity_until, q.lead_time_promise,
    q.delivery_promise, q.payment_terms, q.warranty_terms, q.response_status, q.is_late
  FROM procurement.bid_comparison_bidder_selection b
  JOIN procurement.supplier_quotation_revision q
    ON q.tenant_id = b.tenant_id AND q.quotation_revision_id = b.selected_quotation_revision_id
  JOIN procurement.rfq_tender_issue_bidder ib
    ON ib.tenant_id = b.tenant_id AND ib.rfq_issue_bidder_id = b.rfq_issue_bidder_id
  JOIN procurement.supplier s
    ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
  WHERE b.tenant_id = v_tenant_id AND b.comparison_id = p_comparison_id;

  INSERT INTO procurement.bid_comparison_snapshot_row (
    tenant_id, comparison_snapshot_id, comparison_row_id, row_no, row_kind,
    rfq_issue_line_id, description, target_quantity, target_uom_code
  )
  SELECT
    v_tenant_id, v_snapshot_id, r.comparison_row_id, r.row_no, r.row_kind,
    r.rfq_issue_line_id, r.description, r.target_quantity, r.target_uom_code
  FROM procurement.bid_comparison_row r
  WHERE r.tenant_id = v_tenant_id AND r.comparison_id = p_comparison_id;

  INSERT INTO procurement.bid_comparison_snapshot_cell (
    tenant_id, comparison_snapshot_id, comparison_cell_id, comparison_row_id,
    comparison_bidder_id, coverage_status, source_quotation_line_id, source_supplier_line_no,
    source_supplier_description, source_quoted_quantity, source_quoted_uom_code, source_unit_rate,
    source_line_amount, source_tax_amount, source_brand, source_manufacturer, source_model,
    source_inclusion_exclusion_note, source_deviation_note, source_line_type, source_reference,
    normalized_quantity, normalized_uom_code, normalized_unit_rate, normalized_amount,
    currency_conversion_rate, conversion_rate_date, conversion_rate_source, normalization_basis,
    normalization_note, adjustment_total
  )
  SELECT
    v_tenant_id, v_snapshot_id, c.comparison_cell_id, c.comparison_row_id,
    c.comparison_bidder_id, c.coverage_status, ql.quotation_line_id, ql.supplier_line_no,
    ql.supplier_description, ql.quoted_quantity, ql.quoted_uom_code, ql.unit_rate,
    ql.line_amount, ql.tax_amount, ql.brand, ql.manufacturer, ql.model,
    ql.inclusion_exclusion_note, ql.deviation_note, ql.line_type, ql.source_reference,
    c.normalized_quantity, c.normalized_uom_code, c.normalized_unit_rate, c.normalized_amount,
    c.currency_conversion_rate, c.conversion_rate_date, c.conversion_rate_source,
    c.normalization_basis, c.normalization_note,
    coalesce((
      SELECT sum(a.adjustment_amount)
      FROM procurement.bid_comparison_adjustment a
      WHERE a.tenant_id = c.tenant_id AND a.comparison_cell_id = c.comparison_cell_id
    ), 0::numeric)
  FROM procurement.bid_comparison_cell c
  LEFT JOIN procurement.supplier_quotation_line ql
    ON ql.tenant_id = c.tenant_id AND ql.quotation_line_id = c.source_quotation_line_id
  WHERE c.tenant_id = v_tenant_id AND c.comparison_id = p_comparison_id;

  INSERT INTO procurement.bid_comparison_snapshot_adjustment (
    tenant_id, comparison_snapshot_id, comparison_adjustment_id, comparison_cell_id,
    adjustment_type, adjustment_amount, reason, recorded_by, recorded_at
  )
  SELECT
    v_tenant_id, v_snapshot_id, a.comparison_adjustment_id, a.comparison_cell_id,
    a.adjustment_type, a.adjustment_amount, a.reason, a.recorded_by, a.recorded_at
  FROM procurement.bid_comparison_adjustment a
  WHERE a.tenant_id = v_tenant_id AND a.comparison_id = p_comparison_id;

  INSERT INTO procurement.bid_comparison_snapshot_confirmed_basis (
    tenant_id, comparison_snapshot_id, confirmed_basis_id, comparison_row_id,
    comparison_bidder_id, basis_version, confirmation_kind, source_quotation_revision_id,
    source_confirmation_refs, confirmed_description, confirmed_quantity, confirmed_uom_code,
    confirmed_unit_rate, confirmed_amount, currency, confirmed_terms, technical_status_refs,
    recorded_by, recorded_at
  )
  SELECT
    b.tenant_id, v_snapshot_id, b.confirmed_basis_id, b.comparison_row_id,
    b.comparison_bidder_id, b.basis_version, b.confirmation_kind, b.source_quotation_revision_id,
    b.source_confirmation_refs, b.confirmed_description, b.confirmed_quantity, b.confirmed_uom_code,
    b.confirmed_unit_rate, b.confirmed_amount, b.currency, b.confirmed_terms, b.technical_status_refs,
    b.recorded_by, b.recorded_at
  FROM procurement.bid_comparison_confirmed_basis b
  WHERE b.tenant_id = v_tenant_id
    AND b.comparison_id = p_comparison_id
    AND b.basis_version = (
      SELECT max(latest.basis_version)
      FROM procurement.bid_comparison_confirmed_basis latest
      WHERE latest.tenant_id = b.tenant_id
        AND latest.comparison_id = b.comparison_id
        AND latest.comparison_row_id = b.comparison_row_id
        AND latest.comparison_bidder_id = b.comparison_bidder_id
    );

  UPDATE procurement.bid_comparison
  SET state = 'FROZEN',
      comparison_number = v_comparison_number,
      numbering_scope_key = v_scope_key,
      frozen_by = v_actor_id,
      frozen_at = v_frozen_at,
      updated_at = v_frozen_at
  WHERE tenant_id = v_tenant_id AND comparison_id = p_comparison_id;

  RETURN v_snapshot_id;
END
$$;

REVOKE INSERT ON procurement.bid_comparison_snapshot_confirmed_basis FROM cpos_platform_runtime;
REVOKE ALL ON FUNCTION procurement.freeze_bid_comparison(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION procurement.freeze_bid_comparison(uuid) TO cpos_platform_runtime;

DO $$
BEGIN
  IF has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_snapshot_confirmed_basis', 'INSERT') THEN
    RAISE EXCEPTION 'runtime must not directly insert immutable confirmed-basis snapshots';
  END IF;
  IF has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_confirmed_basis', 'UPDATE')
     OR has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_confirmed_basis', 'DELETE') THEN
    RAISE EXCEPTION 'runtime must not rewrite supplier-confirmed basis history';
  END IF;
END
$$;

COMMENT ON TABLE procurement.bid_comparison_confirmed_basis IS
  'Append-only supplier-confirmed contractable basis. It is distinct from source quotation, normalized representation and internal buyer evaluation adjustments.';
COMMENT ON TABLE procurement.bid_comparison_snapshot_confirmed_basis IS
  'Immutable exact supplier-confirmed basis copied into a frozen ComparisonSnapshot for R07 recommendation/award provenance.';
