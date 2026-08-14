-- Architecture V2 Session 04: Bid Comparison / Leveling.
-- Supplier quotation source truth remains immutable. Comparison adds explicit normalized and buyer-adjusted layers.

CREATE TABLE IF NOT EXISTS procurement.bid_comparison (
  comparison_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_issue_id uuid NOT NULL,
  project_id uuid NOT NULL,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 240),
  base_currency text NOT NULL CHECK (base_currency ~ '^[A-Z]{3}$'),
  state text NOT NULL DEFAULT 'DRAFT' CHECK (state IN ('DRAFT','FROZEN')),
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  frozen_by uuid,
  frozen_at timestamptz,
  UNIQUE (tenant_id, comparison_id),
  UNIQUE (tenant_id, rfq_issue_id),
  FOREIGN KEY (tenant_id, rfq_issue_id)
    REFERENCES procurement.rfq_tender_issue(tenant_id, rfq_issue_id),
  FOREIGN KEY (tenant_id, project_id)
    REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, created_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, frozen_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (
    (state = 'DRAFT' AND frozen_by IS NULL AND frozen_at IS NULL)
    OR (state = 'FROZEN' AND frozen_by IS NOT NULL AND frozen_at IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_bidder_selection (
  comparison_bidder_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_id uuid NOT NULL,
  rfq_issue_bidder_id uuid NOT NULL,
  selected_quotation_revision_id uuid NOT NULL,
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, comparison_bidder_id),
  UNIQUE (tenant_id, comparison_id, rfq_issue_bidder_id),
  UNIQUE (tenant_id, comparison_id, selected_quotation_revision_id),
  FOREIGN KEY (tenant_id, comparison_id)
    REFERENCES procurement.bid_comparison(tenant_id, comparison_id),
  FOREIGN KEY (tenant_id, rfq_issue_bidder_id)
    REFERENCES procurement.rfq_tender_issue_bidder(tenant_id, rfq_issue_bidder_id),
  FOREIGN KEY (tenant_id, selected_quotation_revision_id)
    REFERENCES procurement.supplier_quotation_revision(tenant_id, quotation_revision_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id)
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_row (
  comparison_row_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_id uuid NOT NULL,
  row_no integer NOT NULL CHECK (row_no > 0),
  row_kind text NOT NULL DEFAULT 'RFQ_LINE' CHECK (row_kind IN ('RFQ_LINE','SUPPLIER_ADDED')),
  rfq_issue_line_id uuid,
  description text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 1 AND 2000),
  target_quantity numeric(24,6) CHECK (target_quantity IS NULL OR target_quantity > 0),
  target_uom_code text,
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, comparison_row_id),
  UNIQUE (tenant_id, comparison_id, row_no),
  UNIQUE NULLS NOT DISTINCT (tenant_id, comparison_id, rfq_issue_line_id),
  FOREIGN KEY (tenant_id, comparison_id)
    REFERENCES procurement.bid_comparison(tenant_id, comparison_id),
  FOREIGN KEY (tenant_id, rfq_issue_line_id)
    REFERENCES procurement.rfq_tender_issue_line(tenant_id, rfq_issue_line_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (
    (row_kind = 'RFQ_LINE' AND rfq_issue_line_id IS NOT NULL AND target_quantity IS NOT NULL AND target_uom_code IS NOT NULL)
    OR (row_kind = 'SUPPLIER_ADDED' AND rfq_issue_line_id IS NULL)
  ),
  CHECK (target_uom_code IS NULL OR char_length(target_uom_code) BETWEEN 1 AND 80)
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_cell (
  comparison_cell_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_id uuid NOT NULL,
  comparison_row_id uuid NOT NULL,
  comparison_bidder_id uuid NOT NULL,
  source_quotation_line_id uuid,
  coverage_status text NOT NULL CHECK (
    coverage_status IN ('EXACT','PARTIAL','BUNDLED','ALTERNATE','SUPPLIER_ADDED','MISSING','NOT_APPLICABLE','UNRESOLVED')
  ),
  normalized_quantity numeric(24,6) CHECK (normalized_quantity IS NULL OR normalized_quantity > 0),
  normalized_uom_code text,
  normalized_unit_rate numeric(24,6),
  normalized_amount numeric(24,6),
  currency_conversion_rate numeric(24,12) CHECK (currency_conversion_rate IS NULL OR currency_conversion_rate > 0),
  conversion_rate_date date,
  conversion_rate_source text,
  normalization_basis text,
  normalization_note text,
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, comparison_cell_id),
  UNIQUE (tenant_id, comparison_id, comparison_row_id, comparison_bidder_id),
  FOREIGN KEY (tenant_id, comparison_id)
    REFERENCES procurement.bid_comparison(tenant_id, comparison_id),
  FOREIGN KEY (tenant_id, comparison_row_id)
    REFERENCES procurement.bid_comparison_row(tenant_id, comparison_row_id),
  FOREIGN KEY (tenant_id, comparison_bidder_id)
    REFERENCES procurement.bid_comparison_bidder_selection(tenant_id, comparison_bidder_id),
  FOREIGN KEY (tenant_id, source_quotation_line_id)
    REFERENCES procurement.supplier_quotation_line(tenant_id, quotation_line_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (normalized_uom_code IS NULL OR char_length(normalized_uom_code) BETWEEN 1 AND 80),
  CHECK (conversion_rate_source IS NULL OR char_length(conversion_rate_source) <= 500),
  CHECK (normalization_basis IS NULL OR char_length(normalization_basis) <= 2000),
  CHECK (normalization_note IS NULL OR char_length(normalization_note) <= 4000),
  CHECK (normalized_unit_rate IS NULL OR abs(normalized_unit_rate) < 1000000000000000000::numeric),
  CHECK (normalized_amount IS NULL OR abs(normalized_amount) < 1000000000000000000::numeric),
  CHECK (
    (coverage_status IN ('MISSING','NOT_APPLICABLE') AND source_quotation_line_id IS NULL)
    OR (coverage_status NOT IN ('MISSING','NOT_APPLICABLE') AND source_quotation_line_id IS NOT NULL)
  ),
  CHECK (
    coverage_status <> 'MISSING'
    OR (
      normalized_quantity IS NULL
      AND normalized_uom_code IS NULL
      AND normalized_unit_rate IS NULL
      AND normalized_amount IS NULL
      AND currency_conversion_rate IS NULL
    )
  ),
  CHECK (
    (normalized_quantity IS NULL AND normalized_uom_code IS NULL AND normalized_unit_rate IS NULL
      AND normalized_amount IS NULL AND currency_conversion_rate IS NULL)
    OR normalization_basis IS NOT NULL
  )
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_adjustment (
  comparison_adjustment_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_id uuid NOT NULL,
  comparison_cell_id uuid NOT NULL,
  adjustment_type text NOT NULL CHECK (
    adjustment_type IN ('ADD_COST','DEDUCT_COST','EXCLUSION','PLUG','COMMERCIAL_NORMALIZATION')
  ),
  adjustment_amount numeric(24,6) NOT NULL,
  reason text NOT NULL CHECK (char_length(btrim(reason)) BETWEEN 1 AND 4000),
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, comparison_adjustment_id),
  FOREIGN KEY (tenant_id, comparison_id)
    REFERENCES procurement.bid_comparison(tenant_id, comparison_id),
  FOREIGN KEY (tenant_id, comparison_cell_id)
    REFERENCES procurement.bid_comparison_cell(tenant_id, comparison_cell_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (abs(adjustment_amount) < 1000000000000000000::numeric)
);

-- Frozen handoff basis for Recommendation. Snapshot tables copy supplier-source values as well as comparison layers.
CREATE TABLE IF NOT EXISTS procurement.bid_comparison_snapshot (
  comparison_snapshot_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_id uuid NOT NULL,
  rfq_issue_id uuid NOT NULL,
  project_id uuid NOT NULL,
  title text NOT NULL,
  base_currency text NOT NULL CHECK (base_currency ~ '^[A-Z]{3}$'),
  comparison_version bigint NOT NULL CHECK (comparison_version > 0),
  frozen_by uuid NOT NULL,
  frozen_at timestamptz NOT NULL,
  UNIQUE (tenant_id, comparison_snapshot_id),
  UNIQUE (tenant_id, comparison_id),
  FOREIGN KEY (tenant_id, comparison_id)
    REFERENCES procurement.bid_comparison(tenant_id, comparison_id),
  FOREIGN KEY (tenant_id, rfq_issue_id)
    REFERENCES procurement.rfq_tender_issue(tenant_id, rfq_issue_id),
  FOREIGN KEY (tenant_id, project_id)
    REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, frozen_by)
    REFERENCES platform.principal(tenant_id, principal_id)
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_snapshot_bidder (
  snapshot_bidder_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_snapshot_id uuid NOT NULL,
  comparison_bidder_id uuid NOT NULL,
  rfq_issue_bidder_id uuid NOT NULL,
  selected_quotation_revision_id uuid NOT NULL,
  quotation_revision_no integer NOT NULL,
  supplier_id uuid NOT NULL,
  supplier_code text NOT NULL,
  supplier_legal_name text NOT NULL,
  supplier_quotation_reference text,
  quotation_currency text NOT NULL CHECK (quotation_currency ~ '^[A-Z]{3}$'),
  validity_until date,
  lead_time_promise text,
  delivery_promise text,
  payment_terms text,
  warranty_terms text,
  response_status text NOT NULL,
  is_late boolean NOT NULL,
  UNIQUE (tenant_id, snapshot_bidder_id),
  UNIQUE (tenant_id, comparison_snapshot_id, comparison_bidder_id),
  FOREIGN KEY (tenant_id, comparison_snapshot_id)
    REFERENCES procurement.bid_comparison_snapshot(tenant_id, comparison_snapshot_id),
  FOREIGN KEY (tenant_id, selected_quotation_revision_id)
    REFERENCES procurement.supplier_quotation_revision(tenant_id, quotation_revision_id),
  FOREIGN KEY (tenant_id, supplier_id)
    REFERENCES procurement.supplier(tenant_id, supplier_id)
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_snapshot_row (
  snapshot_row_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_snapshot_id uuid NOT NULL,
  comparison_row_id uuid NOT NULL,
  row_no integer NOT NULL,
  row_kind text NOT NULL,
  rfq_issue_line_id uuid,
  description text NOT NULL,
  target_quantity numeric(24,6),
  target_uom_code text,
  UNIQUE (tenant_id, snapshot_row_id),
  UNIQUE (tenant_id, comparison_snapshot_id, comparison_row_id),
  UNIQUE (tenant_id, comparison_snapshot_id, row_no),
  FOREIGN KEY (tenant_id, comparison_snapshot_id)
    REFERENCES procurement.bid_comparison_snapshot(tenant_id, comparison_snapshot_id),
  FOREIGN KEY (tenant_id, rfq_issue_line_id)
    REFERENCES procurement.rfq_tender_issue_line(tenant_id, rfq_issue_line_id)
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_snapshot_cell (
  snapshot_cell_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_snapshot_id uuid NOT NULL,
  comparison_cell_id uuid NOT NULL,
  comparison_row_id uuid NOT NULL,
  comparison_bidder_id uuid NOT NULL,
  coverage_status text NOT NULL,
  source_quotation_line_id uuid,
  source_supplier_line_no text,
  source_supplier_description text,
  source_quoted_quantity numeric(24,6),
  source_quoted_uom_code text,
  source_unit_rate numeric(24,6),
  source_line_amount numeric(24,6),
  source_tax_amount numeric(24,6),
  source_brand text,
  source_manufacturer text,
  source_model text,
  source_inclusion_exclusion_note text,
  source_deviation_note text,
  source_line_type text,
  source_reference text,
  normalized_quantity numeric(24,6),
  normalized_uom_code text,
  normalized_unit_rate numeric(24,6),
  normalized_amount numeric(24,6),
  currency_conversion_rate numeric(24,12),
  conversion_rate_date date,
  conversion_rate_source text,
  normalization_basis text,
  normalization_note text,
  adjustment_total numeric(24,6) NOT NULL,
  UNIQUE (tenant_id, snapshot_cell_id),
  UNIQUE (tenant_id, comparison_snapshot_id, comparison_cell_id),
  FOREIGN KEY (tenant_id, comparison_snapshot_id)
    REFERENCES procurement.bid_comparison_snapshot(tenant_id, comparison_snapshot_id),
  FOREIGN KEY (tenant_id, source_quotation_line_id)
    REFERENCES procurement.supplier_quotation_line(tenant_id, quotation_line_id)
);

CREATE TABLE IF NOT EXISTS procurement.bid_comparison_snapshot_adjustment (
  snapshot_adjustment_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  comparison_snapshot_id uuid NOT NULL,
  comparison_adjustment_id uuid NOT NULL,
  comparison_cell_id uuid NOT NULL,
  adjustment_type text NOT NULL,
  adjustment_amount numeric(24,6) NOT NULL,
  reason text NOT NULL,
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL,
  UNIQUE (tenant_id, snapshot_adjustment_id),
  UNIQUE (tenant_id, comparison_snapshot_id, comparison_adjustment_id),
  FOREIGN KEY (tenant_id, comparison_snapshot_id)
    REFERENCES procurement.bid_comparison_snapshot(tenant_id, comparison_snapshot_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id)
);

CREATE OR REPLACE FUNCTION procurement.require_draft_bid_comparison(p_tenant_id uuid, p_comparison_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  current_state text;
BEGIN
  SELECT state INTO current_state
  FROM procurement.bid_comparison
  WHERE tenant_id = p_tenant_id AND comparison_id = p_comparison_id
  FOR UPDATE;

  IF current_state IS NULL THEN
    RAISE EXCEPTION 'bid comparison does not exist' USING ERRCODE = '23503';
  END IF;
  IF current_state <> 'DRAFT' THEN
    RAISE EXCEPTION 'frozen bid comparison is immutable' USING ERRCODE = '55000';
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION procurement.guard_bid_comparison_child_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);
  NEW.updated_at := clock_timestamp();
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.guard_bid_comparison_adjustment_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_header_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  issue_project_id uuid;
  issue_currency text;
BEGIN
  SELECT project_id, currency INTO issue_project_id, issue_currency
  FROM procurement.rfq_tender_issue
  WHERE tenant_id = NEW.tenant_id AND rfq_issue_id = NEW.rfq_issue_id;

  IF issue_project_id IS NULL THEN
    RAISE EXCEPTION 'comparison RFQ issue does not exist' USING ERRCODE = '23503';
  END IF;
  IF NEW.project_id <> issue_project_id THEN
    RAISE EXCEPTION 'comparison project must preserve issued RFQ project' USING ERRCODE = '23514';
  END IF;
  IF TG_OP = 'UPDATE' THEN
    IF OLD.state = 'FROZEN' THEN
      RAISE EXCEPTION 'frozen bid comparison is immutable' USING ERRCODE = '55000';
    END IF;
    IF NEW.rfq_issue_id <> OLD.rfq_issue_id OR NEW.project_id <> OLD.project_id OR NEW.created_by <> OLD.created_by THEN
      RAISE EXCEPTION 'comparison source identity cannot be rebased' USING ERRCODE = '23514';
    END IF;
    IF NEW.state = 'DRAFT' THEN
      NEW.version := OLD.version + 1;
      NEW.updated_at := clock_timestamp();
    ELSIF NEW.state = 'FROZEN' THEN
      IF NOT EXISTS (
        SELECT 1 FROM procurement.bid_comparison_snapshot s
        WHERE s.tenant_id = NEW.tenant_id AND s.comparison_id = NEW.comparison_id
      ) THEN
        RAISE EXCEPTION 'comparison cannot become FROZEN without its immutable snapshot' USING ERRCODE = '23514';
      END IF;
    ELSE
      RAISE EXCEPTION 'unsupported comparison state transition' USING ERRCODE = '23514';
    END IF;
  END IF;
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_bidder_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  comparison_issue_id uuid;
  bidder_issue_id uuid;
  quote_bidder_id uuid;
  quote_status text;
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);

  SELECT rfq_issue_id INTO comparison_issue_id
  FROM procurement.bid_comparison
  WHERE tenant_id = NEW.tenant_id AND comparison_id = NEW.comparison_id;

  SELECT rfq_issue_id INTO bidder_issue_id
  FROM procurement.rfq_tender_issue_bidder
  WHERE tenant_id = NEW.tenant_id AND rfq_issue_bidder_id = NEW.rfq_issue_bidder_id;

  SELECT rfq_issue_bidder_id, response_status INTO quote_bidder_id, quote_status
  FROM procurement.supplier_quotation_revision
  WHERE tenant_id = NEW.tenant_id AND quotation_revision_id = NEW.selected_quotation_revision_id;

  IF bidder_issue_id IS NULL OR bidder_issue_id <> comparison_issue_id THEN
    RAISE EXCEPTION 'comparison bidder must belong to the same issued RFQ basis' USING ERRCODE = '23514';
  END IF;
  IF quote_bidder_id IS NULL OR quote_bidder_id <> NEW.rfq_issue_bidder_id THEN
    RAISE EXCEPTION 'selected quotation revision must belong to the selected issued bidder' USING ERRCODE = '23514';
  END IF;
  IF quote_status = 'WITHDRAWN' THEN
    RAISE EXCEPTION 'withdrawn supplier quotation revision cannot be selected for comparison' USING ERRCODE = '23514';
  END IF;

  NEW.updated_at := clock_timestamp();
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_row_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  comparison_issue_id uuid;
  source_issue_id uuid;
  source_quantity numeric(24,6);
  source_uom text;
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);

  IF NEW.row_kind = 'RFQ_LINE' THEN
    SELECT c.rfq_issue_id INTO comparison_issue_id
    FROM procurement.bid_comparison c
    WHERE c.tenant_id = NEW.tenant_id AND c.comparison_id = NEW.comparison_id;

    SELECT l.rfq_issue_id, l.quantity, l.uom_code INTO source_issue_id, source_quantity, source_uom
    FROM procurement.rfq_tender_issue_line l
    WHERE l.tenant_id = NEW.tenant_id AND l.rfq_issue_line_id = NEW.rfq_issue_line_id;

    IF source_issue_id IS NULL OR source_issue_id <> comparison_issue_id THEN
      RAISE EXCEPTION 'comparison RFQ row must belong to the same issued RFQ basis' USING ERRCODE = '23514';
    END IF;
    IF NEW.target_quantity IS DISTINCT FROM source_quantity OR NEW.target_uom_code IS DISTINCT FROM source_uom THEN
      RAISE EXCEPTION 'RFQ comparison row target quantity/UOM must preserve issued requirement basis' USING ERRCODE = '23514';
    END IF;
  END IF;

  NEW.updated_at := clock_timestamp();
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_cell_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  row_comparison_id uuid;
  row_kind text;
  row_issue_line_id uuid;
  bidder_comparison_id uuid;
  selected_quote_id uuid;
  source_quote_id uuid;
  source_issue_line_id uuid;
  existing_non_bundled integer;
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);

  SELECT comparison_id, row_kind, rfq_issue_line_id
  INTO row_comparison_id, row_kind, row_issue_line_id
  FROM procurement.bid_comparison_row
  WHERE tenant_id = NEW.tenant_id AND comparison_row_id = NEW.comparison_row_id;

  SELECT comparison_id, selected_quotation_revision_id
  INTO bidder_comparison_id, selected_quote_id
  FROM procurement.bid_comparison_bidder_selection
  WHERE tenant_id = NEW.tenant_id AND comparison_bidder_id = NEW.comparison_bidder_id;

  IF row_comparison_id IS NULL OR bidder_comparison_id IS NULL
     OR row_comparison_id <> NEW.comparison_id OR bidder_comparison_id <> NEW.comparison_id THEN
    RAISE EXCEPTION 'comparison cell row and bidder must belong to the same comparison' USING ERRCODE = '23514';
  END IF;

  IF NEW.source_quotation_line_id IS NOT NULL THEN
    SELECT quotation_revision_id, rfq_issue_line_id
    INTO source_quote_id, source_issue_line_id
    FROM procurement.supplier_quotation_line
    WHERE tenant_id = NEW.tenant_id AND quotation_line_id = NEW.source_quotation_line_id;

    IF source_quote_id IS NULL OR source_quote_id <> selected_quote_id THEN
      RAISE EXCEPTION 'comparison source line must come from the selected immutable quotation revision' USING ERRCODE = '23514';
    END IF;

    IF NEW.coverage_status IN ('EXACT','PARTIAL') AND source_issue_line_id IS DISTINCT FROM row_issue_line_id THEN
      RAISE EXCEPTION 'EXACT/PARTIAL comparison coverage must map to the same issued RFQ line' USING ERRCODE = '23514';
    END IF;

    IF NEW.coverage_status = 'SUPPLIER_ADDED' AND row_kind <> 'SUPPLIER_ADDED' THEN
      RAISE EXCEPTION 'SUPPLIER_ADDED coverage requires a supplier-added comparison row' USING ERRCODE = '23514';
    END IF;

    SELECT count(*)::integer INTO existing_non_bundled
    FROM procurement.bid_comparison_cell c
    WHERE c.tenant_id = NEW.tenant_id
      AND c.comparison_id = NEW.comparison_id
      AND c.source_quotation_line_id = NEW.source_quotation_line_id
      AND c.comparison_cell_id <> NEW.comparison_cell_id
      AND c.coverage_status <> 'BUNDLED';

    IF NEW.coverage_status <> 'BUNDLED' AND EXISTS (
      SELECT 1 FROM procurement.bid_comparison_cell c
      WHERE c.tenant_id = NEW.tenant_id
        AND c.comparison_id = NEW.comparison_id
        AND c.source_quotation_line_id = NEW.source_quotation_line_id
        AND c.comparison_cell_id <> NEW.comparison_cell_id
    ) THEN
      RAISE EXCEPTION 'quotation source line cannot satisfy multiple comparison rows unless explicitly BUNDLED' USING ERRCODE = '23514';
    END IF;
    IF NEW.coverage_status = 'BUNDLED' AND existing_non_bundled > 0 THEN
      RAISE EXCEPTION 'all repeated uses of a bundled quotation source line must be explicitly BUNDLED' USING ERRCODE = '23514';
    END IF;
  END IF;

  NEW.updated_at := clock_timestamp();
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_adjustment_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  cell_comparison_id uuid;
BEGIN
  PERFORM procurement.require_draft_bid_comparison(NEW.tenant_id, NEW.comparison_id);
  SELECT comparison_id INTO cell_comparison_id
  FROM procurement.bid_comparison_cell
  WHERE tenant_id = NEW.tenant_id AND comparison_cell_id = NEW.comparison_cell_id;
  IF cell_comparison_id IS NULL OR cell_comparison_id <> NEW.comparison_id THEN
    RAISE EXCEPTION 'comparison adjustment must belong to a cell in the same comparison' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.reject_immutable_comparison_snapshot_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
BEGIN
  RAISE EXCEPTION 'frozen comparison snapshot is immutable' USING ERRCODE = '55000';
END
$$;

DROP TRIGGER IF EXISTS bid_comparison_header_validate ON procurement.bid_comparison;
CREATE TRIGGER bid_comparison_header_validate
BEFORE INSERT OR UPDATE ON procurement.bid_comparison
FOR EACH ROW EXECUTE FUNCTION procurement.validate_bid_comparison_header_write();

DROP TRIGGER IF EXISTS bid_comparison_bidder_validate ON procurement.bid_comparison_bidder_selection;
CREATE TRIGGER bid_comparison_bidder_validate
BEFORE INSERT OR UPDATE ON procurement.bid_comparison_bidder_selection
FOR EACH ROW EXECUTE FUNCTION procurement.validate_bid_comparison_bidder_write();

DROP TRIGGER IF EXISTS bid_comparison_row_validate ON procurement.bid_comparison_row;
CREATE TRIGGER bid_comparison_row_validate
BEFORE INSERT OR UPDATE ON procurement.bid_comparison_row
FOR EACH ROW EXECUTE FUNCTION procurement.validate_bid_comparison_row_write();

DROP TRIGGER IF EXISTS bid_comparison_cell_validate ON procurement.bid_comparison_cell;
CREATE TRIGGER bid_comparison_cell_validate
BEFORE INSERT OR UPDATE ON procurement.bid_comparison_cell
FOR EACH ROW EXECUTE FUNCTION procurement.validate_bid_comparison_cell_write();

DROP TRIGGER IF EXISTS bid_comparison_adjustment_validate ON procurement.bid_comparison_adjustment;
CREATE TRIGGER bid_comparison_adjustment_validate
BEFORE INSERT OR UPDATE ON procurement.bid_comparison_adjustment
FOR EACH ROW EXECUTE FUNCTION procurement.validate_bid_comparison_adjustment_write();

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'bid_comparison_snapshot',
    'bid_comparison_snapshot_bidder',
    'bid_comparison_snapshot_row',
    'bid_comparison_snapshot_cell',
    'bid_comparison_snapshot_adjustment'
  ] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS reject_immutable_change ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE TRIGGER reject_immutable_change BEFORE UPDATE OR DELETE ON procurement.%I FOR EACH ROW EXECUTE FUNCTION procurement.reject_immutable_comparison_snapshot_change()',
      table_name
    );
  END LOOP;
END
$$;

CREATE OR REPLACE FUNCTION procurement.freeze_bid_comparison(p_comparison_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
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

CREATE INDEX IF NOT EXISTS bid_comparison_issue_idx
  ON procurement.bid_comparison (tenant_id, rfq_issue_id, state);
CREATE INDEX IF NOT EXISTS bid_comparison_bidder_quote_idx
  ON procurement.bid_comparison_bidder_selection (tenant_id, selected_quotation_revision_id);
CREATE INDEX IF NOT EXISTS bid_comparison_cell_source_idx
  ON procurement.bid_comparison_cell (tenant_id, comparison_id, source_quotation_line_id)
  WHERE source_quotation_line_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS bid_comparison_adjustment_cell_idx
  ON procurement.bid_comparison_adjustment (tenant_id, comparison_cell_id);

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'bid_comparison',
    'bid_comparison_bidder_selection',
    'bid_comparison_row',
    'bid_comparison_cell',
    'bid_comparison_adjustment',
    'bid_comparison_snapshot',
    'bid_comparison_snapshot_bidder',
    'bid_comparison_snapshot_row',
    'bid_comparison_snapshot_cell',
    'bid_comparison_snapshot_adjustment'
  ] LOOP
    EXECUTE format('ALTER TABLE procurement.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('ALTER TABLE procurement.%I FORCE ROW LEVEL SECURITY', table_name);
    EXECUTE format('DROP POLICY IF EXISTS tenant_select ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE POLICY tenant_select ON procurement.%I FOR SELECT TO cpos_platform_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), ''''))',
      table_name
    );
    EXECUTE format('DROP POLICY IF EXISTS tenant_insert ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE POLICY tenant_insert ON procurement.%I FOR INSERT TO cpos_platform_runtime WITH CHECK (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), '''') AND platform.current_tenant_has_active_product_access())',
      table_name
    );
  END LOOP;

  FOREACH table_name IN ARRAY ARRAY[
    'bid_comparison',
    'bid_comparison_bidder_selection',
    'bid_comparison_row',
    'bid_comparison_cell',
    'bid_comparison_adjustment'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS tenant_update ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE POLICY tenant_update ON procurement.%I FOR UPDATE TO cpos_platform_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), '''')) WITH CHECK (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), '''') AND platform.current_tenant_has_active_product_access())',
      table_name
    );
  END LOOP;
END
$$;

REVOKE ALL ON procurement.bid_comparison FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_bidder_selection FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_row FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_cell FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_adjustment FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_snapshot FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_snapshot_bidder FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_snapshot_row FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_snapshot_cell FROM PUBLIC;
REVOKE ALL ON procurement.bid_comparison_snapshot_adjustment FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.freeze_bid_comparison(uuid) FROM PUBLIC;

GRANT SELECT, INSERT, UPDATE ON procurement.bid_comparison TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.bid_comparison_bidder_selection TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.bid_comparison_row TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.bid_comparison_cell TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.bid_comparison_adjustment TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.bid_comparison_snapshot TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.bid_comparison_snapshot_bidder TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.bid_comparison_snapshot_row TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.bid_comparison_snapshot_cell TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.bid_comparison_snapshot_adjustment TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.freeze_bid_comparison(uuid) TO cpos_platform_runtime;

COMMENT ON TABLE procurement.bid_comparison IS
  'Draft/frozen buyer leveling workspace bound to one immutable RFQ issue basis. Supplier source truth is never edited here.';
COMMENT ON TABLE procurement.bid_comparison_cell IS
  'Explicit supplier-vs-row comparison cell. MISSING remains null source truth; normalization is a separate buyer-confirmed representation.';
COMMENT ON TABLE procurement.bid_comparison_adjustment IS
  'Explicit buyer evaluation adjustment layered on a comparison cell with reason/provenance; never a supplier quotation edit.';
COMMENT ON TABLE procurement.bid_comparison_snapshot IS
  'Immutable frozen ComparisonSnapshot handed to Recommendation. Selected quote revisions and all comparison layers are copied at freeze.';
