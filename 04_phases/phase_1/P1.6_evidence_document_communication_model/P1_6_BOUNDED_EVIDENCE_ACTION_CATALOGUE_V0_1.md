# P1.6 — Bounded Evidence/Document/Communication Action Catalogue v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.6  
**Product code:** LOCKED

---

# 1. Purpose

Apply frozen ADR-0024 to P1.6: state-changing evidence/document/communication operations must be bounded validated domain/service actions rather than arbitrary record/file mutation.

This catalogue is semantic. API names, service boundaries and storage implementation remain P1.7/later design.

---

# 2. Common invariants

Every action below inherits as applicable:

- tenant/project/resource scope;
- current principal/security capability;
- internal authorization versus external-grant separation;
- expected version/current-state precondition;
- idempotency/correlation identity where retries are possible;
- evidence/config/authority version binding;
- audit event;
- no direct P07/commercial effect unless the owning P01–P12 domain separately executes a bounded domain action.

P1.6 actions change evidence/provenance/communication state only.

---

# 3. Candidate closed action families

| ID | Bounded action family | Core guard | Result | Business/commercial effect |
|---|---|---|---|---|
| EA-001 | `CaptureSourceEvidenceVersion` | source/capture context valid; payload/reference available; scope/authorization | immutable SOURCE_CAPTURED EvidenceVersion + CaptureObservation | NONE |
| EA-002 | `RegisterExternalEvidenceVersionReference` | external authority known; stable version anchor sufficient or marked ancillary | external EvidenceVersion/reference provenance | NONE |
| EA-003 | `AddCaptureObservation` | existing version equivalence proven/current scope | new channel/capture occurrence linked to same EvidenceVersion | NONE |
| EA-004 | `CreateEvidenceBinding` | product-supported binding role; domain target/source valid; authority | typed EvidenceBinding | NONE; owning domain may consume it later |
| EA-005 | `RecordDerivedObservation` | exact source version/locator; derivation context known | DerivedObservation provenance record | NONE |
| EA-006 | `FreezeGeneratedEvidenceVersion` | generated state/basis complete; load-bearing freeze trigger | immutable PRODUCT_GENERATED EvidenceVersion | NONE |
| EA-007 | `IssueArtifactOrTransmittal` | exact EvidenceVersion/member set frozen; issuer/addressees/purpose/authority valid | PRODUCT_ISSUED issue fact / Transmittal | NONE; domain effectiveness remains separate unless owning domain explicitly uses issue fact as guard |
| EA-008 | `RecordCommunicationOccurrence` | valid message/transmittal/channel/source context | MessageEnvelope/CommunicationOccurrence | NONE |
| EA-009 | `RecordDeliveryObservation` | transport evidence present; occurrence valid | DeliveryObservation | NONE |
| EA-010 | `RecordReadOpenObservation` | channel provides attributable observation | ReadOpenObservation | NONE |
| EA-011 | `RecordAcknowledgmentObservation` | source/addressee evidence present | receipt acknowledgment evidence | NONE |
| EA-012 | `RecordContentResponseEvidence` | attributable source message/response | response EvidenceVersion/binding | NONE |
| EA-013 | `RecordRevisionOrSupersession` | real source/business lineage; predecessor/current context | REVISION_OF/SUPERSEDES/REPLACES/ADDENDUM relation | NONE |
| EA-014 | `WithdrawEvidenceVersionForFutureUse` | authority/source withdrawal basis; contextual effect | WITHDRAWS fact | NONE; owning domain decides reevaluation/correction |
| EA-015 | `RecordIntegrityAssertion` | exact representation available or supported external proof | immutable integrity assertion | NONE |
| EA-016 | `RecordValidationEvidence` | signature/seal/time/delivery/provider validation context | ValidationEvidence | NONE |
| EA-017 | `CreateRedactedDisclosureRepresentation` | redaction basis/authority; source retained/access valid | derived redacted representation + redaction action | NONE |
| EA-018 | `EstablishRetentionBasis` | supported basis type/source/authority | active RetentionBasisRef | NONE |
| EA-019 | `EndOrSupersedeRetentionBasis` | basis end/change proven and authorized | basis history/version transition | NONE |
| EA-020 | `EstablishPreservationDependency` | supported scoped dispute/audit/contract/security basis | bounded preservation dependency | NONE |
| EA-021 | `ReleasePreservationDependency` | ending condition/basis satisfied | dependency ended | NONE |
| EA-022 | `DisposeEvidencePayload` | all applicable bases/dependencies permit; authority; dependencies assessed | payload disposition + minimal DispositionRecord as justified | NONE; retained domain event unchanged |
| EA-023 | `MinimizeMutableEvidenceMetadata` | minimization basis/authority; historical truth preserved | bounded metadata minimization + action evidence | NONE |
| EA-024 | `ExportOrReturnEvidencePackage` | contract/lawful basis; scope; authority | bounded package/manifest/handoff evidence | NONE |
| EA-025 | `ExecutePostTerminationRetainedStateAction` | explicit post-termination authority; scoped operation | export/restriction/minimization/disposition action | NONE |
| EA-026 | `RecordEvidenceResidencyMigrationBinding` | governed region migration from P1.4/P1.10; evidence scope known | evidence-category migration/cutover provenance | NONE |

---

# 4. Actions that are explicitly NOT P1.6 actions

P1.6 may not expose generic actions such as:

- `SetApproved(true)`;
- `SetAwarded(true)`;
- `SetCommitmentValue(...)`;
- `SetCertifiedValue(...)`;
- `MarkPaid(...)`;
- `EditHistoricalEvidenceVersion(...)`;
- `OverwriteIssuedFile(...)`;
- `DeleteEvidenceIgnoringRetention(...)`;
- `GrantAccessBecauseClassification(...)`;
- `AcceptSupplierBecauseEmailSaysApproved(...)`.

Those either violate immutable evidence semantics or belong to owning P01–P12/P09 domains.

---

# 5. Idempotency and retries

## I01 — capture retry

Retrying the same logical capture/import must not create duplicate EvidenceVersions where source equivalence/correlation is established.

Additional genuine channel occurrences may still be recorded.

## I02 — issue retry

Retrying `IssueArtifactOrTransmittal` after timeout must return the same logical issue/transmittal and exact member EvidenceVersions, not regenerate new content or allocate another business issue by accident.

Separate transport attempts can be recorded.

## I03 — delivery/ack observation dedupe

Repeated provider callbacks may update/add observations only according to stable provider/correlation identity and must not produce duplicate business effect.

## I04 — disposal idempotency

Retrying an already completed payload disposal under the same action identity returns the same disposition result; it cannot generate conflicting deletion histories.

---

# 6. Correction semantics

P1.6 evidence-state errors use history-preserving actions:

- wrong source attribution → superseding provenance correction with prior history preserved;
- duplicate merge made incorrectly → explicit separation/reclassification lineage, not silent rewrite;
- mistaken revision relation → corrected/superseded relation history;
- wrong delivery/ack observation → correction/new observation preserving source/provider history;
- wrong redaction → new derived representation/correction record; source unchanged;
- wrongful attempted disposal blocked before destructive action where possible; completed invalid disposal becomes explicit control incident/reconstruction deficiency, not fabricated payload restoration.

P1.6 correction does not change commercial/domain truth directly.

---

# 7. Authority examples

- supplier external grant can submit/capture supplier evidence only within granted resource/action scope;
- internal buyer may capture buyer-on-behalf evidence under internal domain authorization, preserving representation provenance;
- issue action requires owning domain/role authority, not generic document-editor permission;
- redaction/disclosure requires supported authorization/basis;
- retention/disposition requires retention basis + current authority, not file-owner permission;
- post-termination retained-state action does not rely on former tenant membership.

---

# 8. AI/agent boundary

Future agents may invoke the same bounded actions if P1.10/P1.7 authorize them.

Agents may not:

- fabricate source principal;
- merge evidence solely by semantic similarity;
- issue a load-bearing artifact without exact frozen version/basis;
- convert response text into business acceptance directly;
- dispose payload outside retention authority;
- write commercial effects.

AI-specific orchestration/confidence remains P1.10.

---

# 9. A0–A3 subset

First-live-tender operation only needs a subset such as:

- EA-001/002/003 capture/reference;
- EA-004 evidence binding;
- EA-006/007 freeze + issue release/addenda/award/handoff artifacts;
- EA-008–012 communication observations where used;
- EA-013/014 revision/withdrawal;
- EA-015 basic integrity;
- bounded retention/disposition later.

No advanced AI, CDE connector or corporate email archive is required.

---

# 10. One-XL check

The catalogue makes P1.6 evidence mutation explicit without turning it into workflow/commercial truth.

**SECOND XL: CLEAN.**  
**A0–A3: CLEAN.**

This catalogue remains subject to integrated P1.6 hostile audit.
