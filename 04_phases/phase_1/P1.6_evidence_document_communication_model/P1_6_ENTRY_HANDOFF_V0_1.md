# P1.6 — Evidence, Document & Communication Model — Entry Handoff v0.1

**Date:** 2026-07-31  
**Status:** P1.6 UNLOCKED / READY TO START  
**P1.5:** PASS / CLOSED / FROZEN  
**Product code:** LOCKED / NOT STARTED

---

## 1. Canonical orientation

GitHub is canonical truth.

Before making P1.6 structural claims, read in this order:

1. `PROJECT_STATE.md`
2. `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md`
3. `04_phases/phase_1/P1.4_boundary_ownership_tenancy_contract/P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`
4. `04_phases/phase_1/P1.5_commercial_core/P1_5_FROZEN_COMMERCIAL_CORE_V1_0.md`
5. `04_phases/phase_1/P1.5_commercial_core/P1_5_FINAL_VERDICT.md`
6. `04_phases/phase_1/P1.5_commercial_core/P1_5_FINAL_CHECKPOINT_V1_0.md`
7. current `02_research/control/adr_log.csv`
8. P1.2 evidence/provenance and supplier communication artifacts only where needed
9. P1.3 competitor evidence only where a concrete document/communication mechanic genuinely needs comparison

Do not restart broad competitor research.

Do not start product code.

---

## 2. P1.6 objective

P1.6 must define the **durable provenance substrate for commercial records, issued documents and communications** so that later integrations, reporting, UI and AI can refer to exact evidence without inventing document truth.

The roadmap-required outputs are:

- document identity;
- versions/revisions;
- supersession;
- immutable issued versions;
- hashing;
- transmittals;
- source-location references;
- confidentiality;
- retention;
- message/thread model;
- external communication capture rules;
- email/portal/message-channel boundary.

P1.6 is not a full CDE, records-management, eDiscovery, email server or collaboration suite.

---

## 3. P1.6 gate

P1.6 cannot close until:

1. every disputed commercial value can trace to a specific source version/location;
2. every externally communicated commercial commitment has a defined capture path;
3. the model preserves P1.4 OWN/MIRROR/REFERENCE/OUT authority;
4. the model preserves P1.5 commercial/economic meaning without becoming a second truth writer;
5. issued/superseded/redacted/disposed evidence remains historically interpretable under valid basis;
6. external-system evidence can remain externally authoritative without losing exact references/version/freshness context required for reconstruction;
7. communication capture distinguishes message transport from domain acceptance/acknowledgment/commitment;
8. P1.6 does not create full CDE/records-management gravity;
9. product code remains locked.

---

## 4. Frozen P1.4 constraints P1.6 may not reinterpret

P1.6 inherits:

- tenant isolation and within-tenant authorization scope;
- `ContractingAuthorityContext` semantics;
- tenant-private supplier relationships;
- internal authorization versus external-grant separation;
- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- one authoritative source/writer per effective period;
- load-bearing test = governed outcome dependence OR counterfactual materiality OR reconstruction necessity;
- product owns integrity/provenance of governed transaction evidence, not underlying supplier IP/title;
- external CDE/ERP/bank/legal/master records remain REFERENCE or narrow MIRROR where externally authoritative;
- exact supplier-facing release copy issued by the OS is product-governed evidence;
- no edit-in-place rewriting of load-bearing source evidence;
- immutability does not mean perpetual retention;
- retention requires valid bounded basis;
- disposition/tombstone semantics;
- post-termination retained-state authority;
- bounded export/return;
- sensitivity/access classification is bounded metadata, not a generic policy engine;
- declared primary residency boundary and governed migration;
- external system residency remains outside OS control;
- reusable technical identity does not create cross-tenant relationship discovery;
- agent/AI use remains tenant-scoped and bounded.

A P1.6 physical model that weakens one of these invariants is defective.

---

## 5. Frozen P1.5 constraints P1.6 may not reinterpret

P1.6 inherits:

- polycentric procurement graph;
- `RequirementAllocation` = scope consumption only;
- award ≠ Commitment;
- one semantic Commitment core;
- `ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile`;
- `EffectSubject` = COMPONENT or OBLIGATION only;
- EconomicComponentKey / ObligationEffectKey conservation lineages;
- one-economic-value-once;
- closed CommercialEffectVector dimensions;
- claim ≠ assessment ≠ certification;
- certification ≠ accounting posting/payment;
- commercial certificate tax ≠ statutory tax liability;
- invoice match ≠ AP liability;
- actual physical/commercial/accounting/cash meanings remain distinct;
- exact-decimal/versioned calculation semantics;
- history-preserving correction modes;
- temporal/version binding;
- workflow/control outcome never directly writes commercial truth;
- TX-001–TX-056 lifecycle membership and nine-field transition contract;
- projection evolution must be explicit/versioned/non-silent;
- P07 remains sole independent XL;
- A0–A3 remains independently viable.

Evidence/document/message objects must support these truths, not become alternative owners of them.

---

## 6. Evidence versus business truth

P1.6 must preserve three different concepts:

1. **source evidence** — what a supplier/internal/external authority actually issued, submitted or communicated;
2. **evidence provenance/custody/reference** — how the OS can prove identity, version, source, location, capture and integrity;
3. **domain truth** — the governed commercial/approval/receipt/certification/etc. event created through deterministic domain action.

Evidence existence does not automatically create domain truth.

A message saying “approved” is not an `ApprovalOutcome` unless the supported domain process accepts it through a governed action.

A supplier email attachment is not automatically the current contractable basis unless supplier-source/revision rules and domain action make it so.

---

## 7. AI/extraction provenance obligation

P1.5 freezes the boundary:

AI/model/tool-derived extraction, mapping, classification or proposal that materially influences a governed outcome is provenance-bearing when load-bearing.

P1.6 must therefore be able to link:

`source evidence/version/location`
`→ extraction/derived observation`
`→ machine/tool execution identity where required`
`→ human/domain acceptance/correction/transformation`
`→ final authoritative domain fact/event`

Machine extraction never rewrites itself as supplier-authored source truth.

P1.6 defines the provenance/evidence structure only; P1.10 owns broader AI design, confidence, orchestration and agent authority.

---

## 8. First working sequence

Create `P1_6_WORKPLAN_V0_1.md` before selecting physical storage technology.

Recommended workstreams:

### P1.6a — Evidence identity & provenance

Define:

- evidence/document identity;
- source principal/organization/channel;
- source location/reference;
- exact captured/issued version;
- content identity/hash/integrity semantics;
- capture/import/issue provenance;
- relationship to canonical domain transactions/events;
- OWN/MIRROR/REFERENCE handling.

### P1.6b — Document revision / issue / supersession

Define:

- draft versus source/captured versus issued artifacts;
- revision/version identity;
- supersession;
- immutable issued copies;
- addenda/reissue/correction semantics;
- document composition/attachment relations only where load-bearing;
- no edit-in-place historical rewrite.

### P1.6c — Communication / message / transmittal

Define:

- message/thread identity;
- participant/principal/channel provenance;
- transmittal/issue receipt;
- email/portal/message capture boundary;
- acknowledgment versus delivery versus domain acceptance;
- buyer-on-behalf communication capture;
- outbound supplier-facing evidence version.

### P1.6d — Confidentiality / retention / redaction / disposition

Define:

- bounded classification metadata;
- access relationship to P09/domain authorization;
- retention-basis linkage;
- redaction/tombstone/disposition compatibility;
- post-termination retained-state actions;
- residency-category obligations carried to P1.10 NFR classification;
- no generic legal-hold/eDiscovery/records-policy engine.

### P1.6e — Dispute/reconstruction test

For every key P1.5 commercial value/decision, test:

- exact source evidence;
- exact revision/version;
- exact location/reference;
- actor/source principal;
- extraction/normalization/adjustment lineage where relevant;
- authoritative domain event that consumed the evidence;
- later correction/supersession/disposition effect on reconstruction.

---

## 9. Initial evidence targets from P1.5

P1.6 must be able to support, at minimum:

- requirement/planned-requirement source evidence;
- supplier qualification/compliance evidence;
- exact TenderRelease/Addendum copies;
- invitations/external grants where evidentiary;
- BidSubmission revisions;
- supplier quote/email/document captured buyer-on-behalf;
- normalization/mapping source links;
- EvaluationAdjustment reason/evidence;
- ComparisonSnapshot source/version bindings;
- AwardRecommendation and AwardDecision evidence;
- direct-source justification/source quotation/approval evidence;
- CommercialTermsAuthority / Commitment formation evidence;
- change/variation/instruction evidence;
- delivery/receipt/return evidence;
- claim/assessment/certification evidence;
- retention/advance/allowance/recovery evidence;
- supplier invoice/tax-invoice/credit-note evidence where captured;
- external accounting/tax references;
- long-lead milestone/technical dependency evidence;
- security/warranty/closeout evidence;
- authority-transfer/config-version/correction evidence;
- redaction/tombstone/disposition actions.

Do not infer that each bullet requires a separate durable entity/table.

---

## 10. P1.6 hostile questions

Attack continuously:

1. Can two files with the same filename be distinguished reliably?
2. Can a revised supplier quote be confused with the earlier quote used in award?
3. Can a mutable external CDE URL make historical reconstruction impossible?
4. Can an email delivery be mistaken for supplier acceptance?
5. Can a portal acknowledgment be mistaken for commercial agreement?
6. Can an AI-extracted value lose the link to source page/location/revision?
7. Can redaction/disposition destroy the explanation of a commercial event?
8. Can document custody be mistaken for legal/IP ownership?
9. Can confidentiality metadata become a hidden authorization engine?
10. Can transmittal/message storage expand into full CDE/email/archive software?
11. Can the same attachment become duplicate business truth through email + portal capture?
12. Can externally authoritative evidence be mirrored without preserving source/version/freshness authority?

---

## 11. Open ADR/evidence posture entering P1.6

P1.5 accepted semantic ADRs are frozen and may not be reopened by document-model convenience.

Still open but non-blocking:

- ADR-0010 — regional legal/rate/statutory evidence;
- ADR-0011 — detailed attribution/suspense mechanics.

Later-owned:

- ADR-0006 — P1.7 integration depth;
- ADR-0016 — P1.9 external UX;
- ADR-0017 — P1.10 broader AI readiness.

P1.6 may create new ADRs only for genuinely load-bearing evidence/document/communication choices, not for physical implementation preferences that can remain later-owned.

---

## 12. One-XL guard

P1.6 must not become an independent XL gravity well.

Reject designs that turn it into:

- general CDE/document management;
- enterprise records management;
- email server/archive;
- eDiscovery/legal-hold platform;
- generalized collaboration/chat platform;
- digital-signature/contract-lifecycle-management suite beyond bounded required seams;
- independent approval/workflow engine;
- independent commercial truth ledger.

P1.6 is a **shared evidence/provenance/communication substrate** supporting P01–P12.

---

## 13. First monetization rail guard

A0–A3 must remain deployable with minimal evidence primitives sufficient for:

- requirement/RFQ source;
- exact tender release;
- supplier response revisions;
- comparison source lineage;
- recommendation/approval evidence;
- AwardDecision;
- external handoff.

The first live tender must not require:

- full enterprise document migration;
- CDE connector;
- historical email ingestion;
- persistent supplier account;
- advanced AI extraction;
- legal records-policy configuration.

---

## 14. Current transition

**P1.5 CLOSED / FROZEN.**  
**P1.6 EVIDENCE, DOCUMENT & COMMUNICATION MODEL UNLOCKED / NEXT ACTIVE STAGE.**  
**P1.7+ LOCKED.**  
**Product code remains LOCKED.**