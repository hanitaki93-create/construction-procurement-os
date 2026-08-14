-- Architecture V2 Session 02 hostile-lineage hardening.
-- Service validation is not authoritative: PostgreSQL rejects cross-project and mismatched Package/RFQ source wiring.

CREATE OR REPLACE FUNCTION procurement.validate_package_scope_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  source_line_state text;
  source_uom_code text;
  source_approved_quantity numeric(24,6);
  source_requested_quantity numeric(24,6);
  source_project_id uuid;
  target_project_id uuid;
  current_route text;
  already_allocated numeric(24,6);
  source_authority numeric(24,6);
BEGIN
  SELECT
    l.line_state,
    l.uom_code,
    l.approved_quantity,
    l.requested_quantity,
    mr.project_id
  INTO
    source_line_state,
    source_uom_code,
    source_approved_quantity,
    source_requested_quantity,
    source_project_id
  FROM procurement.material_requisition_line l
  JOIN procurement.material_requisition mr
    ON mr.tenant_id = l.tenant_id AND mr.mr_id = l.mr_id
  WHERE l.tenant_id = NEW.tenant_id AND l.mr_line_id = NEW.mr_line_id
  FOR UPDATE OF l;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'package scope source MR line does not exist' USING ERRCODE = '23503';
  END IF;

  SELECT p.project_id INTO target_project_id
  FROM procurement.procurement_package p
  WHERE p.tenant_id = NEW.tenant_id AND p.package_id = NEW.package_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'package does not exist in tenant' USING ERRCODE = '23503';
  END IF;
  IF target_project_id <> source_project_id THEN
    RAISE EXCEPTION 'package and MR source must belong to the same project' USING ERRCODE = '23514';
  END IF;

  IF source_line_state NOT IN ('APPROVED','PARTIALLY_APPROVED','SOURCING') THEN
    RAISE EXCEPTION 'package scope requires approved MR authority' USING ERRCODE = '23514';
  END IF;

  source_authority := coalesce(source_approved_quantity, source_requested_quantity);
  IF NEW.source_uom_code <> source_uom_code THEN
    RAISE EXCEPTION 'package scope UOM must preserve source MR UOM' USING ERRCODE = '23514';
  END IF;

  SELECT route INTO current_route
  FROM procurement.procurement_route_decision
  WHERE tenant_id = NEW.tenant_id AND mr_line_id = NEW.mr_line_id AND is_current;
  IF current_route IS DISTINCT FROM 'PACKAGE_SOURCING' THEN
    RAISE EXCEPTION 'MR line is not governed for package sourcing' USING ERRCODE = '23514';
  END IF;

  SELECT coalesce(sum(allocated_quantity), 0) INTO already_allocated
  FROM procurement.procurement_package_scope
  WHERE tenant_id = NEW.tenant_id
    AND mr_line_id = NEW.mr_line_id
    AND package_scope_id <> NEW.package_scope_id;
  IF already_allocated + NEW.allocated_quantity > source_authority THEN
    RAISE EXCEPTION 'package scope allocation exceeds approved MR authority' USING ERRCODE = '23514';
  END IF;

  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_rfq_line_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  source_line_state text;
  source_uom_code text;
  source_approved_quantity numeric(24,6);
  source_requested_quantity numeric(24,6);
  source_project_id uuid;
  rfq_project_id uuid;
  rfq_package_id uuid;
  scope_package_id uuid;
  scope_mr_line_id uuid;
  scope_quantity numeric(24,6);
  current_route text;
  source_authority numeric(24,6);
BEGIN
  SELECT
    l.line_state,
    l.uom_code,
    l.approved_quantity,
    l.requested_quantity,
    mr.project_id
  INTO
    source_line_state,
    source_uom_code,
    source_approved_quantity,
    source_requested_quantity,
    source_project_id
  FROM procurement.material_requisition_line l
  JOIN procurement.material_requisition mr
    ON mr.tenant_id = l.tenant_id AND mr.mr_id = l.mr_id
  WHERE l.tenant_id = NEW.tenant_id AND l.mr_line_id = NEW.mr_line_id
  FOR UPDATE OF l;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'RFQ source MR line does not exist' USING ERRCODE = '23503';
  END IF;

  SELECT r.project_id, r.package_id
  INTO rfq_project_id, rfq_package_id
  FROM procurement.rfq_tender r
  WHERE r.tenant_id = NEW.tenant_id AND r.rfq_id = NEW.rfq_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'RFQ does not exist in tenant' USING ERRCODE = '23503';
  END IF;
  IF rfq_project_id <> source_project_id THEN
    RAISE EXCEPTION 'RFQ and MR source must belong to the same project' USING ERRCODE = '23514';
  END IF;

  IF NEW.uom_code <> source_uom_code THEN
    RAISE EXCEPTION 'RFQ UOM must preserve source MR UOM' USING ERRCODE = '23514';
  END IF;

  IF rfq_package_id IS NOT NULL THEN
    IF NEW.package_scope_id IS NULL THEN
      RAISE EXCEPTION 'Package-backed RFQ line requires package scope' USING ERRCODE = '23514';
    END IF;
    SELECT ps.package_id, ps.mr_line_id, ps.allocated_quantity
    INTO scope_package_id, scope_mr_line_id, scope_quantity
    FROM procurement.procurement_package_scope ps
    WHERE ps.tenant_id = NEW.tenant_id AND ps.package_scope_id = NEW.package_scope_id;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'RFQ package scope does not exist' USING ERRCODE = '23503';
    END IF;
    IF scope_package_id <> rfq_package_id OR scope_mr_line_id <> NEW.mr_line_id THEN
      RAISE EXCEPTION 'RFQ package scope does not match RFQ Package and source MR line' USING ERRCODE = '23514';
    END IF;
    source_authority := scope_quantity;
  ELSE
    IF NEW.package_scope_id IS NOT NULL THEN
      RAISE EXCEPTION 'Direct RFQ line cannot carry package scope' USING ERRCODE = '23514';
    END IF;
    SELECT route INTO current_route
    FROM procurement.procurement_route_decision
    WHERE tenant_id = NEW.tenant_id AND mr_line_id = NEW.mr_line_id AND is_current;
    IF current_route IS DISTINCT FROM 'COMPETITIVE_RFQ' THEN
      RAISE EXCEPTION 'direct MR source is not governed for competitive RFQ' USING ERRCODE = '23514';
    END IF;
    IF source_line_state NOT IN ('APPROVED','PARTIALLY_APPROVED','SOURCING') THEN
      RAISE EXCEPTION 'RFQ requires approved MR authority' USING ERRCODE = '23514';
    END IF;
    source_authority := coalesce(source_approved_quantity, source_requested_quantity);
  END IF;

  IF NEW.quantity > source_authority THEN
    RAISE EXCEPTION 'RFQ quantity exceeds governed source authority' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END
$$;
