BEGIN;

TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE;

SELECT set_config('cpos.tenant_id', '019f1500-0000-7000-8000-000000000001', true);
SELECT set_config('cpos.principal_id', '019f1500-0000-7000-8000-000000000002', true);
SELECT set_config('cpos.authentication_identity_id', 'development:019f1500-0000-7000-8000-000000000002', true);

INSERT INTO platform.tenant (tenant_id, display_name)
VALUES ('019f1500-0000-7000-8000-000000000001', 'Ground Tech — Architecture V2 Review');

INSERT INTO platform.legal_entity (legal_entity_id, tenant_id)
VALUES ('019f1500-0000-7000-8000-000000000003', '019f1500-0000-7000-8000-000000000001');

INSERT INTO platform.legal_entity_version (
  legal_entity_id, tenant_id, version, legal_name, lifecycle_state, effective_period
) VALUES (
  '019f1500-0000-7000-8000-000000000003',
  '019f1500-0000-7000-8000-000000000001',
  1,
  'Ground Tech Contracting — V2 Review',
  'ACTIVE',
  tstzrange('2026-01-01T00:00:00Z', NULL, '[)')
);

INSERT INTO platform.principal (
  principal_id, tenant_id, principal_kind, display_name, lifecycle_state
) VALUES (
  '019f1500-0000-7000-8000-000000000002',
  '019f1500-0000-7000-8000-000000000001',
  'HUMAN',
  'Hani — V2 Review Owner',
  'ACTIVE'
);

INSERT INTO platform.principal_authentication_identity (
  tenant_id, principal_id, authentication_identity_id, effective_period
) VALUES (
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000002',
  'development:019f1500-0000-7000-8000-000000000002',
  tstzrange('2026-01-01T00:00:00Z', NULL, '[)')
);

INSERT INTO platform.tenant_membership (membership_id, tenant_id, principal_id)
VALUES (
  '019f1500-0000-7000-8000-000000000006',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO platform.tenant_membership_version (
  membership_id, tenant_id, version, membership_state, effective_period
) VALUES (
  '019f1500-0000-7000-8000-000000000006',
  '019f1500-0000-7000-8000-000000000001',
  1,
  'ACTIVE',
  tstzrange('2026-01-01T00:00:00Z', NULL, '[)')
);

INSERT INTO platform.role_assignment (
  role_assignment_id, tenant_id, membership_id, role_key
) VALUES (
  '019f1500-0000-7000-8000-000000000007',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000006',
  'OWNER'
);

INSERT INTO platform.role_assignment_version (
  role_assignment_id, tenant_id, version, assignment_state, effective_period
) VALUES (
  '019f1500-0000-7000-8000-000000000007',
  '019f1500-0000-7000-8000-000000000001',
  1,
  'ACTIVE',
  tstzrange('2026-01-01T00:00:00Z', NULL, '[)')
);

INSERT INTO platform.contracting_authority_context (
  authority_context_id, tenant_id, context_kind
) VALUES (
  '019f1500-0000-7000-8000-000000000004',
  '019f1500-0000-7000-8000-000000000001',
  'SINGLE_LEGAL_ENTITY'
);

INSERT INTO platform.contracting_authority_context_version (
  authority_context_id, tenant_id, version, primary_legal_entity_id, effective_period
) VALUES (
  '019f1500-0000-7000-8000-000000000004',
  '019f1500-0000-7000-8000-000000000001',
  1,
  '019f1500-0000-7000-8000-000000000003',
  tstzrange('2026-01-01T00:00:00Z', NULL, '[)')
);

INSERT INTO platform.project (project_id, tenant_id, authority_context_id)
VALUES (
  '019f1500-0000-7000-8000-000000000005',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000004'
);

INSERT INTO platform.project_version (
  project_id, tenant_id, version, project_code, display_name, lifecycle_state, effective_period
) VALUES (
  '019f1500-0000-7000-8000-000000000005',
  '019f1500-0000-7000-8000-000000000001',
  1,
  'GT-DEMO',
  'Ground Tech V2 Procurement Review',
  'ACTIVE',
  tstzrange('2026-01-01T00:00:00Z', NULL, '[)')
);

INSERT INTO platform.tenant_subscription (
  tenant_subscription_id, tenant_id, commercial_channel
) VALUES (
  '019f1500-0000-7000-8000-000000000008',
  '019f1500-0000-7000-8000-000000000001',
  'SELF_SERVICE'
);

INSERT INTO platform.subscription_lifecycle_occurrence (
  tenant_id, tenant_subscription_id, sequence, occurrence_kind, effective_at, actor_kind
) VALUES (
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000008',
  1,
  'ACTIVATED',
  '2026-01-01T00:00:00Z',
  'SYSTEM'
);

UPDATE platform.tenant_entitlement_authority_guard
SET guard_version = guard_version + 1
WHERE tenant_id = '019f1500-0000-7000-8000-000000000001';

INSERT INTO procurement.supplier (
  supplier_id, tenant_id, supplier_code, legal_name, supplier_type, supplier_state, country_code, created_by
) VALUES
  (
    '019f1500-0000-7000-8000-000000000009',
    '019f1500-0000-7000-8000-000000000001',
    'SUP-ALF',
    'Al Fahad Supply LLC',
    'MATERIAL_SUPPLIER',
    'ACTIVE',
    'AE',
    '019f1500-0000-7000-8000-000000000002'
  ),
  (
    '019f1500-0000-7000-8000-000000000031',
    '019f1500-0000-7000-8000-000000000001',
    'SUP-GULF',
    'Gulf Technical Trading LLC',
    'MATERIAL_SUPPLIER',
    'ACTIVE',
    'AE',
    '019f1500-0000-7000-8000-000000000002'
  ),
  (
    '019f1500-0000-7000-8000-000000000032',
    '019f1500-0000-7000-8000-000000000001',
    'SUP-EMIR',
    'Emirates Building Materials LLC',
    'MATERIAL_SUPPLIER',
    'ACTIVE',
    'AE',
    '019f1500-0000-7000-8000-000000000002'
  );

-- Approved direct-RFQ demand carried all the way into a frozen comparison.
INSERT INTO procurement.material_requisition (
  mr_id, tenant_id, project_id, mr_number, numbering_scope_key, requester_id,
  request_date, required_on_site_date, priority, subject, status, submitted_at, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000010',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000005',
  'MR-V2-001',
  'GT-DEMO:2026',
  '019f1500-0000-7000-8000-000000000002',
  DATE '2026-08-05',
  DATE '2026-09-15',
  'HIGH',
  'Chilled water valve package',
  'APPROVED',
  '2026-08-05T08:00:00Z',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.material_requisition_line (
  mr_line_id, tenant_id, mr_id, line_no, entry_mode, line_type, description,
  specification, requested_quantity, approved_quantity, uom_code, line_state
) VALUES (
  '019f1500-0000-7000-8000-000000000011',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000010',
  10,
  'FREE_FORM',
  'MATERIAL',
  'Motorized butterfly valve DN150',
  'PN16, flanged, actuator included',
  6,
  6,
  'EA',
  'APPROVED'
);

INSERT INTO procurement.procurement_route_decision (
  route_decision_id, tenant_id, mr_line_id, policy_key, policy_version, route,
  justification, decided_by, is_current
) VALUES (
  '019f1500-0000-7000-8000-000000000012',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000011',
  'UAE_CONTRACTOR_STARTER',
  1,
  'COMPETITIVE_RFQ',
  'Competitive RFQ selected for the approved project demand.',
  '019f1500-0000-7000-8000-000000000002',
  true
);

-- Separate package-sourcing demand so the Package workspace is reviewable too.
INSERT INTO procurement.material_requisition (
  mr_id, tenant_id, project_id, mr_number, numbering_scope_key, requester_id,
  request_date, required_on_site_date, priority, subject, status, submitted_at, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000026',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000005',
  'MR-V2-002',
  'GT-DEMO:2026',
  '019f1500-0000-7000-8000-000000000002',
  DATE '2026-08-06',
  DATE '2026-10-01',
  'NORMAL',
  'Sanitary fixtures package',
  'APPROVED',
  '2026-08-06T08:00:00Z',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.material_requisition_line (
  mr_line_id, tenant_id, mr_id, line_no, entry_mode, line_type, description,
  specification, requested_quantity, approved_quantity, uom_code, line_state
) VALUES (
  '019f1500-0000-7000-8000-000000000027',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000026',
  10,
  'FREE_FORM',
  'MATERIAL',
  'Sanitary fixtures complete package',
  'Approved equivalent brands subject to consultant acceptance',
  20,
  20,
  'EA',
  'APPROVED'
);

INSERT INTO procurement.procurement_route_decision (
  route_decision_id, tenant_id, mr_line_id, policy_key, policy_version, route,
  justification, decided_by, is_current
) VALUES (
  '019f1500-0000-7000-8000-000000000028',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000027',
  'UAE_CONTRACTOR_STARTER',
  1,
  'PACKAGE_SOURCING',
  NULL,
  '019f1500-0000-7000-8000-000000000002',
  true
);

INSERT INTO procurement.procurement_package (
  package_id, tenant_id, project_id, package_number, numbering_scope_key, title, package_type,
  trade_category, owner_id, required_on_site_date, target_award_date, scope_summary,
  route_policy_key, route_policy_version, status, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000029',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000005',
  'PKG-GT-26-00001',
  'GT-DEMO:2026',
  'Sanitary Fixtures',
  'MATERIAL_PACKAGE',
  'SANITARY',
  '019f1500-0000-7000-8000-000000000002',
  DATE '2026-10-01',
  DATE '2026-09-01',
  'Supply of sanitary fixtures for the V2 review project.',
  'UAE_CONTRACTOR_STARTER',
  1,
  'READY_FOR_SOURCING',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.procurement_package_scope (
  package_scope_id, tenant_id, package_id, mr_line_id, allocated_quantity, source_uom_code
) VALUES (
  '019f1500-0000-7000-8000-000000000030',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000029',
  '019f1500-0000-7000-8000-000000000027',
  20,
  'EA'
);

INSERT INTO procurement.rfq_tender (
  rfq_id, tenant_id, project_id, rfq_number, numbering_scope_key, title, event_type, buyer_id,
  route_policy_key, route_policy_version, response_due_at, response_timezone, currency,
  pricing_basis, evaluation_mode, bid_visibility_policy, status, revision_no, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000013',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000005',
  'RFQ-GT-26-00001',
  'GT-DEMO:2026',
  'Motorized Butterfly Valves',
  'RFQ',
  '019f1500-0000-7000-8000-000000000002',
  'UAE_CONTRACTOR_STARTER',
  1,
  '2026-08-20T12:00:00Z',
  'Asia/Dubai',
  'AED',
  'UNIT_AND_TOTAL',
  'COMBINED',
  'BUYER_AFTER_CLOSE',
  'ISSUED',
  0,
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.rfq_tender_line (
  rfq_line_id, tenant_id, rfq_id, line_no, mr_line_id, description, specification,
  quantity, uom_code, required_date, equivalent_rule
) VALUES (
  '019f1500-0000-7000-8000-000000000014',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000013',
  10,
  '019f1500-0000-7000-8000-000000000011',
  'Motorized butterfly valve DN150',
  'PN16, flanged, actuator included',
  6,
  'EA',
  DATE '2026-09-15',
  'ALTERNATE_BY_APPROVAL'
);

INSERT INTO procurement.rfq_tender_bidder (
  rfq_bidder_id, tenant_id, rfq_id, supplier_id, invitation_state, eligibility_note
) VALUES (
  '019f1500-0000-7000-8000-000000000015',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000013',
  '019f1500-0000-7000-8000-000000000009',
  'INVITED',
  'Active supplier selected for V2 review.'
);

INSERT INTO procurement.rfq_tender_issue (
  rfq_issue_id, tenant_id, rfq_id, revision_no, rfq_number, title, event_type, project_id,
  buyer_id, issued_at, response_due_at, response_timezone, currency, pricing_basis,
  evaluation_mode, bid_visibility_policy, route_policy_key, route_policy_version, issued_by
) VALUES (
  '019f1500-0000-7000-8000-000000000016',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000013',
  0,
  'RFQ-GT-26-00001',
  'Motorized Butterfly Valves',
  'RFQ',
  '019f1500-0000-7000-8000-000000000005',
  '019f1500-0000-7000-8000-000000000002',
  '2026-08-10T08:00:00Z',
  '2026-08-20T12:00:00Z',
  'Asia/Dubai',
  'AED',
  'UNIT_AND_TOTAL',
  'COMBINED',
  'BUYER_AFTER_CLOSE',
  'UAE_CONTRACTOR_STARTER',
  1,
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.rfq_tender_issue_line (
  rfq_issue_line_id, tenant_id, rfq_issue_id, source_rfq_line_id, line_no, mr_line_id,
  description, specification, quantity, uom_code, required_date, equivalent_rule
) VALUES (
  '019f1500-0000-7000-8000-000000000017',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000016',
  '019f1500-0000-7000-8000-000000000014',
  10,
  '019f1500-0000-7000-8000-000000000011',
  'Motorized butterfly valve DN150',
  'PN16, flanged, actuator included',
  6,
  'EA',
  DATE '2026-09-15',
  'ALTERNATE_BY_APPROVAL'
);

INSERT INTO procurement.rfq_tender_issue_bidder (
  rfq_issue_bidder_id, tenant_id, rfq_issue_id, source_rfq_bidder_id, supplier_id,
  invitation_state, eligibility_note
) VALUES (
  '019f1500-0000-7000-8000-000000000018',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000016',
  '019f1500-0000-7000-8000-000000000015',
  '019f1500-0000-7000-8000-000000000009',
  'INVITED',
  'Active supplier selected for V2 review.'
);

INSERT INTO procurement.supplier_quotation_revision (
  quotation_revision_id, tenant_id, rfq_issue_bidder_id, revision_no,
  supplier_quotation_reference, quotation_date, received_at, response_channel, capture_mode,
  captured_by_principal_id, currency, validity_until, payment_terms, response_status,
  source_file_name, source_media_type, source_sha256, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000019',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000018',
  0,
  'AFS-Q-260815-01',
  DATE '2026-08-14',
  '2026-08-14T10:00:00Z',
  'BUYER_CAPTURE',
  'BUYER_ON_BEHALF',
  '019f1500-0000-7000-8000-000000000002',
  'AED',
  DATE '2026-12-31',
  '45 days from delivery',
  'RECEIVED',
  'Al_Fahad_Valve_Quotation.pdf',
  'application/pdf',
  repeat('a', 64),
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.supplier_quotation_line (
  quotation_line_id, tenant_id, quotation_revision_id, rfq_issue_line_id, supplier_line_no,
  supplier_description, quoted_quantity, quoted_uom_code, unit_rate, line_amount,
  line_type, source_reference
) VALUES (
  '019f1500-0000-7000-8000-000000000020',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000019',
  '019f1500-0000-7000-8000-000000000017',
  '1',
  'DN150 motorized butterfly valve PN16 complete with actuator',
  6,
  'EA',
  1850,
  11100,
  'BASE',
  'Quotation p.1'
);

INSERT INTO procurement.bid_comparison (
  comparison_id, tenant_id, rfq_issue_id, project_id, title, base_currency, created_by
) VALUES (
  '019f1500-0000-7000-8000-000000000021',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000016',
  '019f1500-0000-7000-8000-000000000005',
  'Motorized Valve Commercial Leveling',
  'AED',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.bid_comparison_bidder_selection (
  comparison_bidder_id, tenant_id, comparison_id, rfq_issue_bidder_id,
  selected_quotation_revision_id, recorded_by
) VALUES (
  '019f1500-0000-7000-8000-000000000022',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000021',
  '019f1500-0000-7000-8000-000000000018',
  '019f1500-0000-7000-8000-000000000019',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.bid_comparison_row (
  comparison_row_id, tenant_id, comparison_id, row_no, row_kind, rfq_issue_line_id,
  description, target_quantity, target_uom_code, recorded_by
) VALUES (
  '019f1500-0000-7000-8000-000000000023',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000021',
  10,
  'RFQ_LINE',
  '019f1500-0000-7000-8000-000000000017',
  'Motorized butterfly valve DN150',
  6,
  'EA',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.bid_comparison_cell (
  comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
  source_quotation_line_id, coverage_status, normalized_quantity, normalized_uom_code,
  normalized_unit_rate, normalized_amount, normalization_basis, recorded_by
) VALUES (
  '019f1500-0000-7000-8000-000000000024',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000021',
  '019f1500-0000-7000-8000-000000000023',
  '019f1500-0000-7000-8000-000000000022',
  '019f1500-0000-7000-8000-000000000020',
  'EXACT',
  6,
  'EA',
  1850,
  11100,
  'Source arithmetic only; no buyer-created supplier price.',
  '019f1500-0000-7000-8000-000000000002'
);

INSERT INTO procurement.bid_comparison_confirmed_basis (
  confirmed_basis_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
  basis_version, confirmation_kind, source_quotation_revision_id, source_confirmation_refs,
  confirmed_description, confirmed_quantity, confirmed_uom_code, confirmed_unit_rate,
  confirmed_amount, currency, confirmed_terms, recorded_by
) VALUES (
  '019f1500-0000-7000-8000-000000000025',
  '019f1500-0000-7000-8000-000000000001',
  '019f1500-0000-7000-8000-000000000021',
  '019f1500-0000-7000-8000-000000000023',
  '019f1500-0000-7000-8000-000000000022',
  1,
  'QUOTATION_REVISION',
  '019f1500-0000-7000-8000-000000000019',
  '["Quotation p.1"]'::jsonb,
  'DN150 motorized butterfly valve PN16 complete with actuator',
  6,
  'EA',
  1850,
  11100,
  'AED',
  '{"payment":"45 days from delivery","validity":"2026-12-31"}'::jsonb,
  '019f1500-0000-7000-8000-000000000002'
);

DO $$
DECLARE
  v_snapshot_id uuid;
  v_snapshot_basis_id uuid;
  v_recommendation_id uuid;
BEGIN
  SELECT procurement.freeze_bid_comparison('019f1500-0000-7000-8000-000000000021')
    INTO v_snapshot_id;

  SELECT snapshot_confirmed_basis_id
    INTO v_snapshot_basis_id
  FROM procurement.bid_comparison_snapshot_confirmed_basis
  WHERE tenant_id = '019f1500-0000-7000-8000-000000000001'
    AND comparison_snapshot_id = v_snapshot_id
    AND confirmed_basis_id = '019f1500-0000-7000-8000-000000000025';

  SELECT procurement.create_award_recommendation(
    v_snapshot_id,
    'SINGLE_SUPPLIER',
    'CLEAR',
    'Draft recommendation seeded for Architecture V2 product review. Review the supplier-confirmed basis, evidence and competition exception before submission.',
    NULL,
    NULL,
    'Preview fixture contains one commercial return so the governed under-competition exception path can be reviewed.',
    '["GT-DEMO budget review placeholder"]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '["Only one supplier return is intentionally seeded for review"]'::jsonb,
    NULL
  ) INTO v_recommendation_id;

  PERFORM procurement.add_award_recommendation_basis(
    v_recommendation_id,
    v_snapshot_basis_id,
    'Full RFQ requirement row'
  );
END
$$;

COMMIT;
