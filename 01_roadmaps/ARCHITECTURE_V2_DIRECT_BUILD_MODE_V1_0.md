# CPOS Architecture V2 — Direct Build Mode v1.0

**Status:** POST-FREEZE EXECUTION MODE / NO PRODUCT-MEANING AUTHORITY

This document only sequences coding. It cannot reinterpret Architecture V2, CapabilitySpecifications or field contracts.

## Build philosophy

After Architecture V2 is frozen and merged:

- stop producing successor-prompt/build-block interpretation documents;
- work in focused multi-hour vertical coding sessions directly from frozen architecture/specs;
- let one session span several old R labels when needed for a coherent user journey;
- ship real UI + backend + documents + tests together rather than hidden primitives first and UX later;
- commit incrementally inside a session, but judge progress by working procurement capability;
- use architecture/change-control only when implementation exposes a genuine contradiction or the owner requests a product-meaning change;
- continue code/security/concurrency hostile testing without reopening accepted product meaning by default.

## Session 01 — Foundation -> Supplier -> real MR

**Goal:** first V2 product slice a contractor can actually operate.

Implement directly from:
- common + R01/R02/R03 field contracts;
- Master/Reference, File/Issued Artifact, Numbering, Budget, Route Policy, Supplier, MR, Quality specs;
- UAE starter profile.

Expected working result:
1. controlled starter UOM/reference data and tenant defaults;
2. governed document numbering service using the frozen class policies;
3. file/attachment/source/issued-artifact foundation sufficient for MR documents;
4. serious supplier/subcontractor master with contacts/compliance and basic registration/qualification/eligibility surfaces;
5. Item/Material/Service/Scope master plus explicit free-form line mode;
6. real Material/Purchase Requisition header + lines + cost distributions;
7. MR approval/review flow on accepted B02 authority primitives;
8. procurement route decision/exceptions sufficient to route approved demand;
9. demand/scope conservation guard foundation;
10. actual internal web screens/registers for the above;
11. professional numbered MR PDF/preview/download;
12. responsive/keyboard/RTL-safe states and typed business errors;
13. migrations + domain/service/API/UI tests + PostgreSQL hostile concurrency/security tests appropriate to the slice.

**Do not** build generic ERP/accounting, a report designer, broad supplier portal, or hidden ontology UI.

## Session 02 — Approved demand -> RFQ/Tender issue

Build MR/package selection, optional Scope Library/package route, core procurement schedule facts, RFQ lines/bid form, bidder selection with qualification/intelligence context, documents/addenda/correspondence, exact RFQ PDF/XLSX and secure supplier task issue.

End state: buyer can turn approved demand into a professional supplier enquiry without re-keying.

## Session 03 — Supplier response -> source-cited structured quote

Build external task/no-bid, quotation revisions, source-document preservation, file/email/manual/buyer-on-behalf capture, structured supplier values and bounded AI extraction proposal/citations/human confirmation.

End state: three messy supplier quotations can coexist as immutable source truth and deterministic structured captures.

## Session 04 — Level -> technical/commercial decision

Build technical tender evaluation where configured, four-layer comparison, normalization, buyer adjustments, clarifications, supplier-confirmed basis, supplier intelligence in decision context, ComparisonSnapshot, recommendation, DOA approval and AwardDecision.

End state: a buyer can defend exactly why a supplier was selected—including non-lowest/split/sole-source cases.

## Session 05 — Award -> LPO/PO/Subcontract -> execution

Build demand-conserving formation, professional documents/annexures, issue, acknowledgment/manual/eSign execution state, executed artifact and ERP handoff/reconciliation seam.

End state: approved award becomes a real issue-ready/executed commercial instrument without re-keying.

## Session 06 — Operating product consolidation

Build/complete role workbench, serious registers, portfolio procurement schedule, deterministic analytics, receipt/GRN seam, search/export, quality/accessibility/RTL hardening, imports/onboarding and pilot workflow.

## Later sessions

Framework/call-offs and Phase-1 deep commercial administration (variations, valuation, retention, advance, claims/certification/recovery/closeout) remain retained architecture but require their own field-detail closure immediately before their implementation session. They do not block the first complete procurement product.

## Session discipline

At the start of a coding session the implementation agent should:
1. read the canonical Architecture V2 composition and only the owning specs/field contracts needed for the slice;
2. inspect current code/database state;
3. implement rather than rewrite architecture prose;
4. stop and raise a precise contradiction only if frozen documents genuinely cannot all be satisfied simultaneously.

At the end of a session:
- run relevant unit/type/integration/PostgreSQL hostile tests;
- manually verify the working role journey and generated business documents;
- record bugs/gaps as implementation issues, not new architecture blocks;
- merge only when the vertical slice is coherent and no load-bearing test is waived.

This is intentionally a **thin coding roadmap**, not a new Phase-2 decomposition.