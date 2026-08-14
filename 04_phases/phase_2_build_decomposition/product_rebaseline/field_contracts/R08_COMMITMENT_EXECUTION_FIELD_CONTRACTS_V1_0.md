# CPOS Architecture V2 — R08 LPO / PO / Subcontract + Execution Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

## A. Commitment Formation Header

Closed enum `commitment_document_type = {LPO, PO, SUBCONTRACT}`.
Closed enum `formation_status = {DRAFT, REVIEW, APPROVAL, READY_TO_ISSUE, ISSUED, EXECUTION_PENDING, ACKNOWLEDGED, ACTIVE, SUPERSEDED, CANCELLED}`.
Closed enum `tax_basis_type = {EXCLUSIVE, INCLUSIVE, ZERO_RATED, OUT_OF_SCOPE, MIXED_GOVERNED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| document_type | LPO/PO/Subcontract nature | ClosedEnum | REQUIRED | product enum | PO for material award, SUBCONTRACT for subcontract award, LPO by tenant policy | editable in DRAFT only; changing after approval creates new formation case | legal enum; compatible award type/scope | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| business_number | Human commercial document number | BusinessNumber | REQUIRED at READY_TO_ISSUE | NumberingPolicy class | assigned at declared transition | immutable | class policy | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT + reference |
| award_decision_id | Exact approved commercial decision | Reference<AwardDecision> | REQUIRED | R07 | NONE | immutable | EFFECTIVE_FOR_HANDOFF/eligible status | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_id | Contracting supplier/subcontractor | Reference<Supplier> | REQUIRED | AwardDecision/Supplier Master | award supplier | immutable after READY_TO_ISSUE; correction before issue must remain consistent with award | matches award decision | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE + snapshot legal identity |
| supplier_contact_id | Commercial/contract contact | Reference<SupplierContact> | REQUIRED for issue unless manual exception | Supplier contacts | award/invited commercial contact | editable until issue; post-issue recipient changes are communication/execution events | active contact | PERSONAL_CONTACT | COPY_SNAPSHOT |
| project_id | Project buying context | Reference<Project> | REQUIRED | Award/Project | award project | immutable | same award project | TENANT_INTERNAL | COPY_REFERENCE |
| legal_entity_id | Contracting legal entity | Reference<LegalEntity> | REQUIRED | Award/tenant | award legal entity | immutable after number assignment | authority/numbering compatible | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| comparison_snapshot_id | Commercial evaluation lineage | Reference<ComparisonSnapshot> | CONDITIONAL for tendered award | R06/R07 | award basis | immutable | exact award reference | SYSTEM_CONTROL | COPY_REFERENCE |
| route_decision_id | Procurement policy basis | VersionReference<ProcurementRouteDecision> | REQUIRED | R07 | award basis | immutable | exact award basis | SYSTEM_CONTROL | COPY_REFERENCE |
| issue_date | Supplier-facing issue date | LocalDate | REQUIRED at READY_TO_ISSUE/ISSUED | NONE | local issue date | editable before issue; locked after | valid | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| effective_date_basis | When obligation becomes effective | ClosedEnum{ON_ISSUE, ON_ACKNOWLEDGMENT, ON_SIGNATURE_EXECUTION, SPECIFIED_DATE, CONDITIONAL_GATE} | REQUIRED | document/execution policy | ON_ACKNOWLEDGMENT for starter LPO/PO; ON_SIGNATURE_EXECUTION for subcontract | editable before issue only | compatible execution policy | SYSTEM_CONTROL | COPY_SNAPSHOT |
| specified_effective_date | Fixed effective date | LocalDate | CONDITIONAL when SPECIFIED_DATE | NONE | NONE | editable before issue | >= permitted issue/context date | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| currency | Commercial document currency | ISO-4217 | REQUIRED | Award/currency | award confirmed basis | immutable after READY_TO_ISSUE | consistent with approved basis or explicit approved conversion | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| tax_basis | Tax treatment | ClosedEnum/structured tax refs | REQUIRED | Tax registry/award | legal-entity default + award source | editable before approval/issue | jurisdiction/policy valid | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| payment_term_id | Contractual payment terms | Reference<PaymentTerm> + optional special text | REQUIRED unless subcontract special clause fully governs | PaymentTerms/award confirmed basis | confirmed supplier/tenant term | editable before approval; locked at issue | approved/confirmed basis; divergence requires explicit approval | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| delivery_location_id | Ship-to/site | Reference<DeliveryLocation> | CONDITIONAL for physical delivery | Location registry | source MR/package location | editable before issue | project compatible | TENANT_INTERNAL | COPY_SNAPSHOT |
| delivery_commencement_terms | Delivery/commencement requirement | LongText(3000) + structured dates | REQUIRED as applicable | schedule/award | confirmed basis | editable before issue | source/approved divergence explicit | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| completion_terms | Completion/end milestone | LongText(3000) + optional date | CONDITIONAL for subcontract/service | schedule/award | confirmed basis | editable before issue | valid dates | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| warranty_guarantee_security_summary | Warranty/guarantee/bond/security commercial terms | structured text/refs | OPTIONAL/CONDITIONAL by award/document type | confirmed basis/approved terms | award basis | editable before issue | explicit source/approval | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| standard_term_versions | Approved standard clauses | VersionReference<CommercialTermBlock>[] | REQUIRED per template class | terms registry | active class starter set | selected before issue; exact versions locked at issue | approved active terms | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| special_terms | Transaction-specific approved clauses | LongText(12000) / structured clauses | OPTIONAL | award/approval/legal review | blank | editable before issue; locked afterward | changes from standard identified; approval policy may gate | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| project_scope_instance_id | Exact scope annexure | VersionReference<ProjectScopeInstance> | CONDITIONAL for package/subcontract scope | Scope Library/RFQ | award tender scope + approved negotiated changes | locked before issue | same RFQ/award; exact frozen/revised scope | SYSTEM_CONTROL | COPY_REFERENCE |
| approval_case_id | Formation/document approval | Reference<ApprovalCase> | CONDITIONAL by policy | Approval | award approval may satisfy only if policy says so | system-linked | approved before READY_TO_ISSUE | SYSTEM_CONTROL | COPY_REFERENCE |
| technical_gate_refs | TechnicalApprovalDependencies/conditions affecting issue/effectiveness | VersionReference<TechnicalApprovalDependency>[] | OPTIONAL/CONDITIONAL | R04 | award conditions | revalidated before issue/effectiveness | blocking gates satisfied or explicit conditional contract clause/approval | SYSTEM_CONTROL | COPY_REFERENCE |
| external_erp_reference | ERP order/contract identity | ShortText(160) | OPTIONAL/CONDITIONAL when ERP authoritative/connected | integration | NONE | set/reconciled through adapter; never free overwrite after accepted | unique/source-valid | SYSTEM_CONTROL | COPY_REFERENCE |
| erp_handoff_state | External handoff/reconciliation state | ClosedEnum{NOT_REQUIRED, PENDING, SENT, ACCEPTED, REJECTED, STALE, ERROR, RECONCILED} | REQUIRED | integration | NOT_REQUIRED | system/reconciliation transitions | authority-mode valid | SYSTEM_CONTROL | COPY_SNAPSHOT |
| status | Formation lifecycle | ClosedEnum | REQUIRED | product lifecycle | DRAFT | transition only | legal transition; ISSUED != EXECUTED | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |

## B. Commitment Line / Schedule of Values

Closed enum `commitment_line_type = {MATERIAL, SERVICE, EQUIPMENT, SUBCONTRACT_SOV, PROVISIONAL_OPTIONAL, OTHER_GOVERNED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| line_no | Supplier-facing order/SOV line | Integer >=1 | REQUIRED | formation | award order | editable/reorder in DRAFT; locked at issue | unique | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| line_type | Commercial line nature | ClosedEnum | REQUIRED | product enum | source basis type | editable in DRAFT only | legal enum | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| award_basis_refs | Exact confirmed/awarded rows | VersionReference<SupplierConfirmedBasis/AwardAllocation>[] | REQUIRED | R06/R07 | award basis | immutable | same supplier/award | SYSTEM_CONTROL | COPY_REFERENCE |
| demand_authority_refs | Approved demand/scope partitions consumed | VersionReference<DemandAuthority>[] | REQUIRED unless explicit non-demand commercial line is governed | Conservation control | award allocation | immutable | exact authority | SYSTEM_CONTROL | COPY_REFERENCE |
| description | Contractual line/SOV description | LongText(1200) | REQUIRED | confirmed basis | confirmed description | editable before issue only; divergence from award basis explicit/approved | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| quantity | Contract quantity | Quantity(uom) | OPTIONAL/CONDITIONAL for quantified line | confirmed basis/UOM | confirmed quantity | editable before issue only within approved/demand authority | >0; conservation guard | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to receipt/change baseline |
| uom_id | Contract UOM | Reference<UOM> | CONDITIONAL with quantity/rate | UOM | confirmed | locked at issue | active/compatible | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| unit_rate | Contract rate | Money(currency)/uom | OPTIONAL/CONDITIONAL | confirmed basis | confirmed rate | editable before issue only if still within approved basis or new approval | exact decimal | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to commercial baseline |
| amount | Contract line/SOV amount | Money(currency) | REQUIRED | confirmed basis | confirmed amount/derived qty*rate | system-derived or approved exact source; locked at issue | exact sum/rounding | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| tax | Line tax treatment/amount | structured exact tax | OPTIONAL/CONDITIONAL | Tax policy | header/confirmed | locked at issue | exact decimal/policy | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| brand_model | Contracted product/system | structured text | OPTIONAL/CONDITIONAL | confirmed/technical basis | confirmed approved offer | locked at issue | if alternate required technical approval, reference approved state | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| delivery_completion_date | Line delivery/completion promise | LocalDate | OPTIONAL | confirmed basis/schedule | confirmed date | locked at issue; change later is amendment/variation semantics | valid | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to schedule/receipt baseline |
| source_scope_refs | RFQ/MR/package/scope exact lineage | Reference[] | REQUIRED | source domains | derived | immutable | complete lineage | SYSTEM_CONTROL | COPY_REFERENCE |

### Protected consumption transition

Before `READY_TO_ISSUE` or another configured effective-commitment point consumes demand authority, the R03 conservation guard is locked/serialized, remaining authority is revalidated, and consumption is committed atomically with the protected formation transition. A later cancellation/reversal uses explicit release/reversal semantics.

## C. Issued Document Binding

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| template_version_id | Exact LPO/PO/Subcontract template | VersionReference<TemplateVersion> | REQUIRED | R01 templates | active class template | locked at issue | approved/effective | SYSTEM_CONTROL | COPY_REFERENCE |
| issued_artifact_id | Exact supplier-facing issued PDF/package | Reference<IssuedArtifactVersion> | REQUIRED at ISSUED | provenance/rendering | render at issue | immutable | content/source hashes verified | SYSTEM_CONTROL | COPY_REFERENCE to ExecutionCase |
| annexure_refs | Exact scope/BOQ/terms/attachments | Reference<BusinessAttachment/IssuedArtifactVersion>[] | OPTIONAL/CONDITIONAL | provenance | compiled source set | locked at issue | all exact versions | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| issue_by / issue_at | Issue occurrence | Principal + Instant | REQUIRED | Identity/SYSTEM | current actor/time | immutable | issue authority | SYSTEM_CONTROL | COPY_SNAPSHOT |

## D. ExecutionCase

Closed enum `execution_method = {ACKNOWLEDGMENT, MANUAL_SIGNATURE, EXTERNAL_ESIGN, PROVIDER_NEUTRAL_ESIGN}`.
Closed enum `execution_state = {NOT_READY, READY_TO_SEND, SENT, VIEWED, DELIVERED, PARTIALLY_SIGNED, EXECUTED, DECLINED, EXPIRED, DELIVERY_FAILED, VOIDED, SUPERSEDED, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| commitment_id | LPO/PO/Subcontract being executed | Reference<CommitmentFormation> | REQUIRED | R08 | NONE | immutable | issued/ready state | SYSTEM_CONTROL | COPY_REFERENCE |
| issued_artifact_id | Exact document presented for acceptance/signature | Reference<IssuedArtifactVersion> | REQUIRED | provenance | commitment issued artifact | immutable | exact current issued version | SYSTEM_CONTROL | COPY_REFERENCE |
| execution_method | Acceptance/signature method | ClosedEnum | REQUIRED | execution policy by class | ACKNOWLEDGMENT for starter LPO/PO; EXTERNAL_ESIGN or MANUAL_SIGNATURE for subcontract unless tenant chooses otherwise | editable before SENT only | legal enum/class policy | SYSTEM_CONTROL | COPY_SNAPSHOT |
| sender_id | Issuer/sender | Reference<Principal> | REQUIRED | Identity | issue actor/current authorized user | locked on send occurrence | authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |
| deadline | Acceptance/signature due | Instant | OPTIONAL/CONDITIONAL by execution policy | policy | tenant default 7 days for acknowledgment; configurable | editable before send; extension is explicit occurrence after send | > sent time | TENANT_INTERNAL | COPY_SNAPSHOT |
| reminder_policy_version | Reminder cadence/rules | VersionReference<ReminderPolicy> | OPTIONAL | tenant execution config | starter reminder profile | locked when sent; update applies prospectively or explicit reschedule | bounded policy | SYSTEM_CONTROL | COPY_REFERENCE |
| provider_transaction_ref | External eSign/provider transaction | ShortText(240) | CONDITIONAL for provider integration | provider adapter | NONE | system-managed | unique/idempotent | SYSTEM_CONTROL | COPY_REFERENCE |
| state | Execution lifecycle | ClosedEnum | REQUIRED | product lifecycle | NOT_READY | transition/system occurrences only | legal transition; EXECUTED requires evidence | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| sent_at | Send occurrence | Instant | CONDITIONAL at SENT+ | SYSTEM/provider | send time | immutable | trusted | SYSTEM_CONTROL | COPY_SNAPSHOT |
| executed_at | Final execution occurrence | Instant | CONDITIONAL at EXECUTED | SYSTEM/provider/manual evidence | NONE | immutable | all mandatory signatory/ack rules satisfied | SYSTEM_CONTROL | COPY_SNAPSHOT |
| executed_artifact_id | Exact final executed/signed artifact | Reference<FileAsset/IssuedArtifactVersion> | REQUIRED at EXECUTED when method produces signed artifact; acknowledgment may use issued artifact + occurrence evidence | provenance/provider | NONE | immutable | content hash/evidence verified | SYSTEM_CONTROL | COPY_REFERENCE |

## E. Execution Signatory / Recipient

Closed enum `party_role = {SUPPLIER_AUTHORIZED_SIGNATORY, BUYER_AUTHORIZED_SIGNATORY, ACKNOWLEDGING_CONTACT, WITNESS, OTHER_GOVERNED}`.
Closed enum `signatory_state = {PENDING, SENT, VIEWED, SIGNED, ACKNOWLEDGED, DECLINED, FAILED, EXPIRED, NOT_REQUIRED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| execution_case_id | Execution case | Reference<ExecutionCase> | REQUIRED | R08 | NONE | immutable | valid case | SYSTEM_CONTROL | COPY_REFERENCE |
| party_role | Required role in execution | ClosedEnum | REQUIRED | execution policy | ACKNOWLEDGING_CONTACT for LPO/PO supplier recipient | editable before SENT; changes after send require void/resend/new execution version | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| party_identity | Internal principal or supplier/external person snapshot | Reference<Principal/SupplierContact> + snapshot | REQUIRED | Identity/Supplier | selected contact/signatory | locked on send | email/contact present for electronic method | PERSONAL_CONTACT | COPY_SNAPSHOT |
| signing_order | Sequence if ordered | Integer >=1 | OPTIONAL | execution policy | NONE/parallel | editable before send | unique ordering if sequential | SYSTEM_CONTROL | COPY_SNAPSHOT |
| state | Party execution state | ClosedEnum | REQUIRED | product/provider | PENDING | provider/manual evidence transitions | legal transition | SYSTEM_CONTROL | COPY_SNAPSHOT |
| occurrence_at | Latest material action time | Instant | OPTIONAL | provider/SYSTEM | NONE | system-managed | trusted occurrence | SYSTEM_CONTROL | COPY_SNAPSHOT |
| evidence_ref | Signature/acknowledgment evidence | Reference<SourceDocumentVersion/ProviderEvidence> | CONDITIONAL on SIGNED/ACKNOWLEDGED/DECLINED | provenance/provider | NONE | immutable per occurrence | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |

## F. ERP Handoff / Reconciliation Record

Closed enum `handoff_operation = {CREATE_ORDER, UPDATE_REFERENCE, CANCEL_VOID_NOTICE, RECEIPT_REFERENCE, OTHER_GOVERNED}`.
Closed enum `handoff_state = {PENDING, SENT, ACCEPTED, REJECTED, ERROR, STALE, RECONCILED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| commitment_id | CPOS order/contract | Reference<CommitmentFormation> | REQUIRED | R08 | NONE | immutable | valid source | SYSTEM_CONTROL | COPY_REFERENCE |
| authority_contract_version | OWN/MIRROR/REFERENCE field/domain authority map | VersionReference<IntegrationAuthorityContract> | REQUIRED | integration config | current connector profile | immutable per handoff | applicable legal entity/project | SYSTEM_CONTROL | COPY_REFERENCE |
| operation | External operation intent | ClosedEnum | REQUIRED | product integration enum | CREATE_ORDER | immutable | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| outbound_payload_version | Exact normalized payload | VersionReference<IntegrationPayload> | REQUIRED | integration adapter | generated | immutable | schema-valid | SYSTEM_CONTROL | COPY_REFERENCE |
| external_id | ERP/vendor-system ID/PO number | ShortText(200) | OPTIONAL until ACCEPTED | external system | NONE | system reconciled; conflicts never overwrite silently | unique in provider scope where promised | SYSTEM_CONTROL | COPY_REFERENCE |
| state | Handoff lifecycle | ClosedEnum | REQUIRED | product integration | PENDING | system/reconciliation transitions | legal transition | SYSTEM_CONTROL | COPY_SNAPSHOT |
| provider_response_ref | Exact accept/reject/error response | VersionReference<ProviderOccurrence> | OPTIONAL | integration effects | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
| reconciliation_reason | Human/system explanation for mismatch/stale/reconcile | LongText(3000) | CONDITIONAL for REJECTED/STALE/RECONCILED | NONE | blank | immutable occurrence | nonblank where required | SYSTEM_CONTROL | COPY_SNAPSHOT |

External acceptance never retroactively changes supplier-source/award truth; conflicts create reconciliation work.
