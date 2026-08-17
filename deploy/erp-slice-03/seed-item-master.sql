-- MR Slice 03 review item master.
-- Reuses the eight-line MAMS-derived internal demand fixture so the review can compare
-- master-backed items with a free-form requisition workflow without importing prices.

BEGIN;

INSERT INTO procurement.item_master (
  item_id, tenant_id, item_code, item_kind, short_description, detailed_specification,
  default_uom_code, manufacturer, brand, model, equivalent_rule, active
) VALUES
  ('019f1500-0000-7000-8000-000000000201','019f1500-0000-7000-8000-000000000001','TOOL-AUGER-25X460','MATERIAL','Wood auger bit (PVC tube package)','25 x 460 mm','PCS',NULL,'TRAEGER','TRG133A','ALTERNATE_BY_APPROVAL',true),
  ('019f1500-0000-7000-8000-000000000202','019f1500-0000-7000-8000-000000000001','TIMBER-WHITE-3X3X13','MATERIAL','White wood 3" x 3" x 13','Site timber requirement; confirm acceptable grade and moisture condition before sourcing.','PCS',NULL,NULL,'WW13G','ALTERNATE_BY_APPROVAL',true),
  ('019f1500-0000-7000-8000-000000000203','019f1500-0000-7000-8000-000000000001','SDS-16X260','MATERIAL','SDS drill bit','16 x 260 mm','PCS',NULL,'TRAEGER','TRG28A','ALTERNATE_BY_APPROVAL',true),
  ('019f1500-0000-7000-8000-000000000204','019f1500-0000-7000-8000-000000000001','SDS-20X260','MATERIAL','SDS drill bit','20 x 260 mm','PCS',NULL,'TRAEGER','TRG30A','ALTERNATE_BY_APPROVAL',true),
  ('019f1500-0000-7000-8000-000000000205','019f1500-0000-7000-8000-000000000001','NAIL-BLACK-1.5','MATERIAL','Black steel nail 1.5"','120 packets per carton','CTN',NULL,NULL,'N164C','ALTERNATE_BY_APPROVAL',true),
  ('019f1500-0000-7000-8000-000000000206','019f1500-0000-7000-8000-000000000001','HAMMER-SLEDGE-4LB','MATERIAL','Sledge hammer with plastic handle','4 lb','PCS',NULL,'PERFECT TOOLS','H510A-PT','ALTERNATE_BY_APPROVAL',true),
  ('019f1500-0000-7000-8000-000000000207','019f1500-0000-7000-8000-000000000001','SIKA-AF3001-600','MATERIAL','Sika AnchorFix-3001','600 ml / piece; supplier pack reference 12 pieces per carton','PCS','Sika','SIKA','CA338A','ALTERNATE_BY_APPROVAL',true),
  ('019f1500-0000-7000-8000-000000000208','019f1500-0000-7000-8000-000000000001','TAPE-INS-BLK-3/4','MATERIAL','Insulation tape','Taiwan, 3/4", black','ROLL',NULL,NULL,'T52D','ALTERNATE_BY_APPROVAL',true)
ON CONFLICT (tenant_id, item_code) DO UPDATE SET
  short_description = EXCLUDED.short_description,
  detailed_specification = EXCLUDED.detailed_specification,
  default_uom_code = EXCLUDED.default_uom_code,
  manufacturer = EXCLUDED.manufacturer,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  equivalent_rule = EXCLUDED.equivalent_rule,
  active = true;

UPDATE procurement.material_requisition_line AS line
SET entry_mode = 'MASTER_BACKED', item_id = map.item_id
FROM (VALUES
  (10, '019f1500-0000-7000-8000-000000000201'::uuid),
  (20, '019f1500-0000-7000-8000-000000000202'::uuid),
  (30, '019f1500-0000-7000-8000-000000000203'::uuid),
  (40, '019f1500-0000-7000-8000-000000000204'::uuid),
  (50, '019f1500-0000-7000-8000-000000000205'::uuid),
  (60, '019f1500-0000-7000-8000-000000000206'::uuid),
  (70, '019f1500-0000-7000-8000-000000000207'::uuid),
  (80, '019f1500-0000-7000-8000-000000000208'::uuid)
) AS map(line_no, item_id)
WHERE line.tenant_id = '019f1500-0000-7000-8000-000000000001'
  AND line.mr_id = '019f1500-0000-7000-8000-000000000102'
  AND line.line_no = map.line_no;

COMMIT;
