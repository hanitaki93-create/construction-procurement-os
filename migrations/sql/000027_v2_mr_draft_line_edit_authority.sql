-- Architecture V2 MR Slice 03: DRAFT requisition line editing authority.
--
-- The original Session 01 runtime intentionally omitted DELETE authority on MR lines.
-- S03 introduces governed DRAFT editing by replacing the working line set atomically.
-- Grant DELETE only when the parent MR is still DRAFT and remains inside the active
-- tenant/product RLS boundary. Submitted/approved/closed demand remains immutable.

ALTER TABLE procurement.material_requisition_line ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.material_requisition_line FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_delete_draft_mr_line ON procurement.material_requisition_line;
CREATE POLICY tenant_delete_draft_mr_line
  ON procurement.material_requisition_line
  FOR DELETE
  TO cpos_platform_runtime
  USING (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_tenant_has_active_product_access()
    AND EXISTS (
      SELECT 1
      FROM procurement.material_requisition mr
      WHERE mr.tenant_id = material_requisition_line.tenant_id
        AND mr.mr_id = material_requisition_line.mr_id
        AND mr.status = 'DRAFT'
    )
  );

GRANT DELETE ON procurement.material_requisition_line TO cpos_platform_runtime;
