# P1.6 — Integrated Evidence, Document & Communication Candidate v0.2

**Date:** 2026-07-31  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / INTERNAL RECHECK REQUIRED  
**Supersedes for current audit:** `P1_6_INTEGRATED_EVIDENCE_COMMUNICATION_CANDIDATE_V0_1.md` where this file/remediation differs  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Precedence

Current P1.6 audit semantics are:

1. `P1_6_INTEGRATED_EVIDENCE_COMMUNICATION_CANDIDATE_V0_1.md` for unchanged clauses;
2. `P1_6_INTERNAL_AUDIT_REMEDIATION_V0_1.md` for historical reliance, external anchor, communication-effectiveness and watch hardening;
3. underlying evidence/document/communication/retention/hash/action/reconstruction artifacts as supporting detail.

No ADR status changes are implied before external hostile-audit PASS and final reconciliation.

---

# 2. Historical reliance is immutable

## C66 — RelianceBinding

A load-bearing effective domain fact/event/decision preserves an immutable historical binding to the exact evidence it relied on.

As applicable:

`domain event/decision`
`→ binding role`
`→ exact EvidenceVersion`
`→ exact SourceLocator`
`→ source principal/attribution`
`→ governing policy/config/authority context`
`→ relied-on time/context`.

Once the domain event is effective, later evidence revision cannot update this historical link.

Reevaluation/correction creates new domain event/binding history.

Ancillary convenience links are distinguishable from frozen RelianceBinding.

PRODUCT_ISSUED output likewise binds immutably to the issue/domain action that produced it.

---

# 3. External reconstruction anchors

## C67 — ReconstructionAnchorTest

A load-bearing external `SOURCE_BASIS` reference is sufficient only when source semantics identify the exact immutable/historically addressable version relied on and prevent later current-state substitution.

Required semantic evidence includes as applicable:

- authoritative external source/system;
- object identity;
- exact version/revision identity;
- source semantics establishing version immutability/historical addressability;
- source principal/authority;
- source locator;
- relevant effective/source context;
- observed/fetched/freshness/conflict context;
- supported retrieval/reference path while valid retention/source-access basis exists.

Stable object ID pointing to current content is insufficient.

Mutable URL/path/current-state token is insufficient unless its source semantics meet the exact-version test.

If external source cannot pass the test, immutable local capture is required where permitted for a load-bearing exact-reconstruction dependency.

If neither path exists, the relevant evidence dependency remains unresolved and cannot satisfy the governing evidence guard.

Later legitimate source loss/disposition does not retroactively rewrite the original valid reliance; current availability/reconstruction limit changes separately.

---

# 4. Communication-conditioned domain effectiveness

## C68 — Pattern A: EFFECTIVE_THEN_NOTIFY

Owning domain event becomes effective under its own guards first.

P1.6 then freezes/issues/communicates exact resulting artifact as applicable.

Transport failure/absence does not silently reverse the effective event.

Any business correction/withdrawal uses a separate owning-domain action.

## C69 — Pattern B: COMMUNICATION_GATED_EFFECTIVENESS

Where issue/dispatch/delivery/acknowledgment/content response is a governing condition of effectiveness:

1. owning domain creates/authorizes a pre-effective immutable business basis containing enough final content/identity/number/authority to generate the outgoing artifact without asserting final effectiveness;
2. P1.6 freezes exact EvidenceVersion/Transmittal;
3. required issue/dispatch/delivery/acknowledgment/content response evidence occurs;
4. owning-domain effectiveness command consumes that exact P1.6 evidence + pre-effective basis + current authority/invariants;
5. domain event becomes effective with causal binding to the communication fact;
6. effective time may derive from the named communication observation where the governing rule requires.

Retry is idempotent and does not require reissue once the qualifying immutable observation exists.

## C70 — no hidden third pattern

The later implementation may not invent document-save/email-queued/read-receipt semantics as business effect.

The domain profile selects Pattern A or Pattern B.

For Pattern B it declares the exact qualifying observation:

- issue/Transmittal;
- dispatch/send occurrence;
- delivery/receipt observation;
- acknowledgment observation;
- substantive response evidence + domain authority validation.

P1.6 records the observation; the owning domain emits the business event.

---

# 5. Time semantics

## C71 — typed time observations

P1.6 distinguishes:

- SOURCE_DOCUMENT_DATE;
- SOURCE_SENT_TIME_ASSERTION;
- PROVIDER_SEND_OBSERVATION;
- DELIVERY_RECEIVE_OBSERVATION;
- READ_OPEN_OBSERVATION;
- ACKNOWLEDGMENT_TIME;
- OS_CAPTURED_OBSERVED_TIME;
- DOMAIN_EFFECTIVE_TIME.

One timestamp may satisfy multiple roles only where governing source/channel/domain semantics establish equivalence.

Upload time cannot silently substitute for source issue, receipt or effective time.

---

# 6. External freshness/availability history

## C72 — observation history, not mutable source truth

EvidenceVersion/external version identity remains historical.

Current external availability/freshness/conflict/superseded state is represented as observation history/projection.

An update today cannot overwrite what external state/version was observed and relied on at an earlier decision.

RelianceBinding includes the relevant observed/version context where load-bearing.

---

# 7. EvidenceRecord lineage

## C73 — lineage membership is evidence-backed

EvidenceVersion membership in one logical EvidenceRecord lineage requires supported source/business relation such as source revision family, explicit supersession, provider version lineage, product issue predecessor/addendum relation or bounded reconciliation.

Filename, subject, visual similarity or hash equality alone cannot establish lineage.

Incorrect lineage assignment is corrected history-preservingly.

---

# 8. Redacted external issue

## C74 — redacted issue is its own issued version

If a redacted derived representation is externally issued:

- original source EvidenceVersion remains historical;
- redaction action/basis/scope is preserved;
- derived redacted EvidenceVersion has its own content/integrity identity;
- that exact derived version receives its own PRODUCT_ISSUED/Transmittal history;
- recipient/disclosure context is preserved.

Past reliance on original source remains bound to original version.

---

# 9. Physical-original custody

## C75 — bounded custody observation

Where custody/location of a physical original is itself load-bearing, preserve a bounded observation/reference for physical-original identity assertion, holder/custodian/location, time and transfer/receipt evidence as applicable.

A scan/photo has its own integrity and does not prove current physical-original custody or continued existence.

P1.6 does not create general physical records management.

---

# 10. Existing core preserved

Unchanged v0.1 candidate semantics remain binding for current audit, including:

- EvidenceRecord/EvidenceVersion/content identity separation;
- SourcePrincipalRef + PrincipalAttributionBasis;
- electronic versus physical/offline source distinction;
- exact SourceLocator;
- integrity/hash exact-representation semantics + algorithm agility;
- WORKING_DRAFT/SOURCE_CAPTURED/PRODUCT_GENERATED/PRODUCT_ISSUED/DERIVED_REPRESENTATION roles;
- load-bearing freeze trigger;
- REVISION_OF/SUPERSEDES/ADDENDUM/REPLACES/WITHDRAWS/CORRECTED_REISSUE/equivalence relations;
- issue/Transmittal exact member set;
- signature/seal/timestamp/delivery validation as evidence not business authority;
- MessageEnvelope/CommunicationOccurrence/ThreadContext;
- issue/send/delivery/read/ack/content response/domain acceptance separation;
- multi-channel idempotency/duplicate handling;
- DerivedObservation source/AI provenance;
- classification metadata ≠ authorization;
- retention basis/preservation dependency;
- restriction/redaction/disposition separation;
- post-termination/export/residency boundaries;
- EA-001–EA-026 bounded action catalogue;
- P01–P12 reconstruction matrix;
- A0–A3 minimal evidence profile;
- one-XL guard.

---

# 11. Candidate ADR posture

No status changes yet.

If hostile review remains clean, final traceability candidates remain:

- ADR-0027 — Evidence identity/version/content-integrity/reconstruction-anchor model;
- ADR-0028 — Communication/transmittal/delivery/acknowledgment/domain-effect boundary.

P1.4 ADR-0014 remains the ownership/provenance foundation.

---

# 12. Current gate claim before recheck

Candidate claim:

- G1 exact source version/location reconstruction — PASS after C66/C67;
- G2 external communication capture/effectiveness — PASS after C68–C70;
- G3 no evidence/message direct business writer — PASS;
- G4 revision/issue/supersession immutability — PASS;
- G5 external reference reconstructability — PASS after C67/C72;
- G6 send/delivery/read/ack/content/domain separation — PASS;
- G7 retention/redaction/disposition — PASS;
- G8 AI/source/derived provenance — PASS;
- G9 duplicate channel/business dedupe — PASS;
- G10 hash/content/business identity separation — PASS;
- G11 source principal/attribution/physical scan/custody — PASS;
- G12 no CDE/email/records/signature/legal gravity — PASS;
- G13 A0–A3 minimal activation — PASS;
- G14 P1.1–P1.5 regression = NO / P07 sole XL — PASS;
- G15 product code locked — PASS.

This claim requires independent internal recheck before external audit readiness.
