-- MR Slice 02 realistic review fixture.
-- Source: MAMS Trading L.L.C quotation Ref #15967 supplied by the product owner.
-- This is internal demand only: supplier pricing/VAT is intentionally NOT copied into the MR.

BEGIN;

INSERT INTO procurement.uom_reference (uom_code, display_name, quantity_kind, decimal_scale)
VALUES
  ('CTN', 'Carton', 'COUNT', 0),
  ('ROLL', 'Roll', 'COUNT', 0)
ON CONFLICT (uom_code) DO NOTHING;

INSERT INTO procurement.supplier (
  supplier_id, tenant_id, supplier_code, legal_name, trade_name, supplier_type,
  supplier_state, country_code, emirate_region, business_phone, business_email,
  trn_vat_number, default_currency, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000101',
  '019f1500-0000-7000-8000-000000000001',
  'SUP-MAMS',
  'MAMS Trading L.L.C',
  'MAMS Trading',
  'MATERIAL_SUPPLIER',
  'ACTIVE',
  'AE',
  'Dubai',
  '056 372 5957',
  'adith@mamstradingllc.com',
  '100222464800003',
  'AED',
  '019f1500-0000-7000-8000-000000000002'
)
ON CONFLICT DO NOTHING;

INSERT INTO procurement.material_requisition (
  mr_id, tenant_id, project_id, mr_number, numbering_scope_key, requester_id,
  requester_team, request_date, required_on_site_date, priority, subject,
  instructions, status, submitted_at, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000102',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000005',
  'MR-GT-DEMO-26-09001',
  'GT-DEMO:2026:MR-S02-REALISTIC',
  '019f1500-0000-7000-8000-000000000002',
  'Site / Procurement',
  DATE '2026-08-17',
  DATE '2026-08-28',
  'HIGH',
  'Site timber, tools & fixing materials — 8-line request',
  'Realistic MR review fixture recreated from MAMS Trading quotation Ref #15967. MAMS is recorded only as the proposed supplier. Quoted prices are intentionally excluded because the MR represents internal project demand, not an award or commitment.',
  'SUBMITTED',
  '2026-08-17T05:30:00Z',
  '019f1500-0000-7000-8000-000000000002'
)
ON CONFLICT DO NOTHING;

INSERT INTO procurement.material_requisition_line (
  mr_line_id, tenant_id, mr_id, line_no, entry_mode, line_type, description,
  specification, requested_quantity, uom_code, required_date_override,
  manufacturer, brand, model, equivalent_rule, preferred_supplier_id,
  technical_notes, approved_quantity, line_state
) VALUES
(
  '019f1500-0000-7000-8000-000000000103',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  10, 'FREE_FORM', 'MATERIAL',
  'Wood auger bit (PVC tube package)',
  '25 x 460 mm',
  3, 'PCS', DATE '2026-08-26',
  NULL, 'TRAEGER', 'TRG133A', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference TRG133A · source Ref #15967.',
  NULL, 'SUBMITTED'
),
(
  '019f1500-0000-7000-8000-000000000104',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  20, 'FREE_FORM', 'MATERIAL',
  'White wood 3" x 3" x 13',
  'Site timber requirement; confirm acceptable grade and moisture condition before sourcing.',
  400, 'PCS', DATE '2026-08-28',
  NULL, NULL, 'WW13G', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference WW13G · source Ref #15967.',
  NULL, 'SUBMITTED'
),
(
  '019f1500-0000-7000-8000-000000000105',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  30, 'FREE_FORM', 'MATERIAL',
  'SDS drill bit',
  '16 x 260 mm',
  2, 'PCS', DATE '2026-08-25',
  NULL, 'TRAEGER', 'TRG28A', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference TRG28A · source Ref #15967.',
  NULL, 'SUBMITTED'
),
(
  '019f1500-0000-7000-8000-000000000106',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  40, 'FREE_FORM', 'MATERIAL',
  'SDS drill bit',
  '20 x 260 mm',
  2, 'PCS', DATE '2026-08-25',
  NULL, 'TRAEGER', 'TRG30A', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference TRG30A · source Ref #15967.',
  NULL, 'SUBMITTED'
),
(
  '019f1500-0000-7000-8000-000000000107',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  50, 'FREE_FORM', 'MATERIAL',
  'Black steel nail 1.5"',
  '120 packets per carton',
  1, 'CTN', DATE '2026-08-28',
  NULL, NULL, 'N164C', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference N164C · source Ref #15967.',
  NULL, 'SUBMITTED'
),
(
  '019f1500-0000-7000-8000-000000000108',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  60, 'FREE_FORM', 'MATERIAL',
  'Sledge hammer with plastic handle',
  '4 lb',
  3, 'PCS', DATE '2026-08-26',
  NULL, 'PERFECT TOOLS', 'H510A-PT', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference H510A-PT · source Ref #15967.',
  NULL, 'SUBMITTED'
),
(
  '019f1500-0000-7000-8000-000000000109',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  70, 'FREE_FORM', 'MATERIAL',
  'Sika AnchorFix-3001',
  '600 ml / piece; supplier pack reference 12 pieces per carton',
  12, 'PCS', DATE '2026-08-25',
  'Sika', 'SIKA', 'CA338A', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference CA338A · source Ref #15967.',
  NULL, 'SUBMITTED'
),
(
  '019f1500-0000-7000-8000-000000000110',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000102',
  80, 'FREE_FORM', 'MATERIAL',
  'Insulation tape',
  'Taiwan, 3/4", black',
  20, 'ROLL', DATE '2026-08-28',
  NULL, NULL, 'T52D', 'ALTERNATE_BY_APPROVAL',
  '019f1500-0000-7000-8000-000000000101',
  'Proposed supplier item reference T52D · source Ref #15967.',
  NULL, 'SUBMITTED'
)
ON CONFLICT DO NOTHING;

COMMIT;
