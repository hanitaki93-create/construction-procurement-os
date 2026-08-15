-- Session 04 remediation: fix comparison-row uniqueness, remove PL/pgSQL ambiguity,
-- and make immutable snapshot creation exclusive to the governed freeze function.

DO $$
DECLARE
  v_constraint_name text;
BEGIN
  SELECT c.conname
  INTO v_constraint_name
  FROM pg_constraint c
  WHERE c.conrelid = 'procurement.bid_comparison_row'::regclass
    AND c.contype = 'u'
    AND pg_get_constraintdef(c.oid) LIKE 'UNIQUE NULLS NOT DISTINCT (tenant_id, comparison_id, rfq_issue_line_id)%'
  LIMIT 1;

  IF v_constraint_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE procurement.bid_comparison_row DROP CONSTRAINT %I', v_constraint_name);
  END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS bid_comparison_row_rfq_line_unique_idx
  ON procurement.bid_comparison_row (tenant_id, comparison_id, rfq_issue_line_id)
  WHERE rfq_issue_line_id IS NOT NULL;

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_cell_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_row_comparison_id uuid;
  v_row_kind text;
  v_row_issue_line_id uuid;
  v_bidder_comparison_id uuid;
  v_selected_quote_id uuid;
  v_source_quote_id uuid;
  v_source_issue_line_id uuid;
  v_existing_non_bundled integer;
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);

  SELECT r.comparison_id, r.row_kind, r.rfq_issue_line_id
  INTO v_row_comparison_id, v_row_kind, v_row_issue_line_id
  FROM procurement.bid_comparison_row r
  WHERE r.tenant_id = NEW.tenant_id
    AND r.comparison_row_id = NEW.comparison_row_id;

  SELECT b.comparison_id, b.selected_quotation_revision_id
  INTO v_bidder_comparison_id, v_selected_quote_id
  FROM procurement.bid_comparison_bidder_selection b
  WHERE b.tenant_id = NEW.tenant_id
    AND b.comparison_bidder_id = NEW.comparison_bidder_id;

  IF v_row_comparison_id IS NULL OR v_bidder_comparison_id IS NULL
     OR v_row_comparison_id <> NEW.comparison_id OR v_bidder_comparison_id <> NEW.comparison_id THEN
    RAISE EXCEPTION 'comparison cell row and bidder must belong to the same comparison' USING ERRCODE = '23514';
  END IF;

  IF NEW.source_quotation_line_id IS NOT NULL THEN
    SELECT ql.quotation_revision_id, ql.rfq_issue_line_id
    INTO v_source_quote_id, v_source_issue_line_id
    FROM procurement.supplier_quotation_line ql
    WHERE ql.tenant_id = NEW.tenant_id
      AND ql.quotation_line_id = NEW.source_quotation_line_id;

    IF v_source_quote_id IS NULL OR v_source_quote_id <> v_selected_quote_id THEN
      RAISE EXCEPTION 'comparison source line must come from the selected immutable quotation revision' USING ERRCODE = '23514';
    END IF;

    IF NEW.coverage_status IN ('EXACT','PARTIAL') AND v_source_issue_line_id IS DISTINCT FROM v_row_issue_line_id THEN
      RAISE EXCEPTION 'EXACT/PARTIAL comparison coverage must map to the same issued RFQ line' USING ERRCODE = '23514';
    END IF;

    IF NEW.coverage_status = 'SUPPLIER_ADDED' AND v_row_kind <> 'SUPPLIER_ADDED' THEN
      RAISE EXCEPTION 'SUPPLIER_ADDED coverage requires a supplier-added comparison row' USING ERRCODE = '23514';
    END IF;

    SELECT count(*)::integer
    INTO v_existing_non_bundled
    FROM procurement.bid_comparison_cell c
    WHERE c.tenant_id = NEW.tenant_id
      AND c.comparison_id = NEW.comparison_id
      AND c.source_quotation_line_id = NEW.source_quotation_line_id
      AND c.comparison_cell_id <> NEW.comparison_cell_id
      AND c.coverage_status <> 'BUNDLED';

    IF NEW.coverage_status <> 'BUNDLED' AND EXISTS (
      SELECT 1
      FROM procurement.bid_comparison_cell c
      WHERE c.tenant_id = NEW.tenant_id
        AND c.comparison_id = NEW.comparison_id
        AND c.source_quotation_line_id = NEW.source_quotation_line_id
        AND c.comparison_cell_id <> NEW.comparison_cell_id
    ) THEN
      RAISE EXCEPTION 'quotation source line cannot satisfy multiple comparison rows unless explicitly BUNDLED' USING ERRCODE = '23514';
    END IF;

    IF NEW.coverage_status = 'BUNDLED' AND v_existing_non_bundled > 0 THEN
      RAISE EXCEPTION 'all repeated uses of a bundled quotation source line must be explicitly BUNDLED' USING ERRCODE = '23514';
    END IF;
  END IF;

  NEW.updated_at := clock_timestamp();
  RETURN NEW;
END
$$;

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

  INSERT INTO procurement.bid_comparison_snapshot (
    tenant_id, comparison_id, rfq_issue_id, project_id, title, base_currency,
    comparison_version, frozen_by, frozen_at
  ) VALUES (
    v_tenant_id, v_comparison.comparison_id, v_comparison.rfq_issue_id, v_comparison.project_id,
    v_comparison.title, v_comparison.base_currency, v_comparison.version, v_actor_id, v_frozen_at
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

  UPDATE procurement.bid_comparison
  SET state = 'FROZEN', frozen_by = v_actor_id, frozen_at = v_frozen_at, updated_at = v_frozen_at
  WHERE tenant_id = v_tenant_id AND comparison_id = p_comparison_id;

  RETURN v_snapshot_id;
END
$$;

REVOKE INSERT ON procurement.bid_comparison_snapshot FROM cpos_platform_runtime;
REVOKE INSERT ON procurement.bid_comparison_snapshot_bidder FROM cpos_platform_runtime;
REVOKE INSERT ON procurement.bid_comparison_snapshot_row FROM cpos_platform_runtime;
REVOKE INSERT ON procurement.bid_comparison_snapshot_cell FROM cpos_platform_runtime;
REVOKE INSERT ON procurement.bid_comparison_snapshot_adjustment FROM cpos_platform_runtime;
REVOKE ALL ON FUNCTION procurement.freeze_bid_comparison(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION procurement.freeze_bid_comparison(uuid) TO cpos_platform_runtime;

DO $$
BEGIN
  IF has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_snapshot', 'INSERT')
     OR has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_snapshot_bidder', 'INSERT')
     OR has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_snapshot_row', 'INSERT')
     OR has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_snapshot_cell', 'INSERT')
     OR has_table_privilege('cpos_platform_runtime', 'procurement.bid_comparison_snapshot_adjustment', 'INSERT') THEN
    RAISE EXCEPTION 'runtime must not have direct INSERT privilege on immutable comparison snapshot tables';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'procurement'
      AND p.proname = 'freeze_bid_comparison'
      AND p.prosecdef
  ) THEN
    RAISE EXCEPTION 'freeze_bid_comparison must execute as a security-definer governed write authority';
  END IF;
END
$$;

COMMENT ON FUNCTION procurement.freeze_bid_comparison(uuid) IS
  'Exclusive governed write authority for immutable ComparisonSnapshot creation. Runtime callers require tenant/principal context, active entitlement and sourcing role authority.';
