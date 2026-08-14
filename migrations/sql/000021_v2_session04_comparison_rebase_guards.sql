-- Session 04 hardening: comparison basis cannot silently rebase underneath derived leveling data.

CREATE OR REPLACE FUNCTION procurement.validate_bid_comparison_header_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  issue_project_id uuid;
BEGIN
  SELECT project_id INTO issue_project_id
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
    IF NEW.base_currency <> OLD.base_currency AND EXISTS (
      SELECT 1
      FROM procurement.bid_comparison_cell c
      WHERE c.tenant_id = OLD.tenant_id
        AND c.comparison_id = OLD.comparison_id
        AND (
          c.normalized_quantity IS NOT NULL
          OR c.normalized_uom_code IS NOT NULL
          OR c.normalized_unit_rate IS NOT NULL
          OR c.normalized_amount IS NOT NULL
          OR c.currency_conversion_rate IS NOT NULL
          OR c.normalization_basis IS NOT NULL
        )
    ) THEN
      RAISE EXCEPTION 'comparison base currency cannot change after normalization has been recorded' USING ERRCODE = '23514';
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

  IF TG_OP = 'UPDATE' THEN
    IF NEW.rfq_issue_bidder_id <> OLD.rfq_issue_bidder_id OR NEW.comparison_id <> OLD.comparison_id THEN
      RAISE EXCEPTION 'comparison bidder source identity cannot be rebased' USING ERRCODE = '23514';
    END IF;
    IF NEW.selected_quotation_revision_id <> OLD.selected_quotation_revision_id AND EXISTS (
      SELECT 1
      FROM procurement.bid_comparison_cell c
      JOIN procurement.supplier_quotation_line ql
        ON ql.tenant_id = c.tenant_id AND ql.quotation_line_id = c.source_quotation_line_id
      WHERE c.tenant_id = NEW.tenant_id
        AND c.comparison_id = NEW.comparison_id
        AND c.comparison_bidder_id = NEW.comparison_bidder_id
        AND ql.quotation_revision_id <> NEW.selected_quotation_revision_id
    ) THEN
      RAISE EXCEPTION 'selected quotation revision cannot change while comparison cells still reference the prior revision' USING ERRCODE = '23514';
    END IF;
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

  IF TG_OP = 'UPDATE' AND (
    NEW.comparison_id <> OLD.comparison_id
    OR NEW.row_kind <> OLD.row_kind
    OR NEW.rfq_issue_line_id IS DISTINCT FROM OLD.rfq_issue_line_id
  ) THEN
    RAISE EXCEPTION 'comparison row source identity cannot be rebased' USING ERRCODE = '23514';
  END IF;

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
