# P1.3 — Hostile Review Remediation v0.1

**Status:** REMEDIATED / NARROW EXTERNAL RECHECK REQUIRED
**Source verdict:** P1.3 hostile closure review FAIL with BL-10 and BL-11
**P1.4:** remains LOCKED pending narrow recheck

---

## 1. Independent disposition

### BL-10 — Kojo inheritance ambiguity

**ACCEPTED.**

The previous phrase `fast material path` could be read as either:

1. a simplified material-request intake feeding the same sourcing/comparison/award rail; or
2. a direct-to-order surface that bypasses normalization/leveling/recommendation/award.

Only interpretation **1** belongs in A0–A3.

### Binding correction

For A0–A3:

> **Kojo inheritance means low-friction field/material intake UX feeding the same governed sourcing rail. It does not introduce a second direct-purchase product surface.**

A material request may be lightweight and urgent, but when handled inside the first monetization rail it still progresses through the applicable sourcing path:

`Material Request / simple requirement`
`→ RFQ/tender or bounded quote request`
`→ supplier response capture`
`→ normalization/comparison where competition exists`
`→ recommendation/approval/award`
`→ external handoff`

The user does not need to see RequirementAllocation ontology to create the request.

### Direct-source route

P1.2 already recognizes direct-source/direct-purchase as a legitimate procurement variant.

It remains in the architecture, but:
- it is **not part of A0–A3 first monetization scope**;
- it is not required for first live tender;
- it cannot silently bypass sourcing governance where competition/approval policy requires it;
- when later activated, it must carry the same requirement authority, justification, approval and commitment guardrails as any direct-source route.

Current activation placement:

> **DEFERRED SOURCING VARIANT — activated with later commercial/commitment execution, not first tender/comparison value.**

This avoids inventing a second first-release user journey while preserving the valid domain route.

---

## 2. BL-11 — Evidence/provenance burden boundary

**ACCEPTED.**

Evidence/provenance is structural, but the product must not become Aconex-lite.

### Size classification

`EVIDENCE / EXTERNAL ACCESS SUBSTRATE = L`

It is a shared bounded substrate across P03–P12, not an independent XL product.

P07 remains the only intended XL gravity well.

### What the product OWNS

For procurement/commercial transactions that the product itself governs, it may own:

- `EvidenceReference` identity;
- immutable/versioned source attachment records;
- source/capture provenance;
- actor / organization / timestamp;
- source channel: upload, email, guest task, buyer-on-behalf, API/import;
- content hash/checksum where used for load-bearing evidence integrity;
- relationship to domain event/object/version;
- evidence type / purpose;
- sensitivity/access classification needed for the transaction;
- bounded external access grant scoped to an exact task/tender/record;
- grant expiry/revocation/history;
- source-organization ownership attribution;
- supersession/version lineage;
- limited transaction-level retrieval/download history where audit requires it.

Transaction evidence may include:
- tender release documents;
- supplier quotations/revisions;
- clarifications/addenda;
- approvals/recommendation evidence;
- commitment/change evidence;
- receipt/certification/recovery evidence where that domain is active.

### What the product REFERENCES

Where another system is authoritative, the product should reference rather than absorb:

- CDE document IDs/URLs;
- drawing/submittal packages;
- consultant/client review records;
- enterprise records-management IDs;
- accounting/payment documents owned by ERP;
- master correspondence records;
- external security/bank/legal records.

Reference preserves source system, external identity, version/effective state where available, and freshness/authority under P08/P12 rules.

### What the product explicitly REFUSES

P1.3/P1.4 must not turn the evidence substrate into:

- general document folder/tree management;
- full project correspondence/transmittal platform;
- drawing markup/annotation;
- design review workflow;
- submittal/CDE replacement;
- enterprise retention-schedule engine;
- legal hold/eDiscovery;
- customer-authored document lifecycle/BPM;
- general redaction/classification policy engine;
- enterprise records management;
- universal cross-company document portal.

### External access boundary

V1 direction:

- task/tender-scoped guest link;
- email submission/attachment ingestion;
- optional persistent portal later;
- buyer-on-behalf capture under provenance control.

Guest/external access must be:
- tenant/project/tender/task scoped;
- least privilege;
- expiring/revocable;
- unable to browse unrelated tenant data;
- provenance-preserving.

The product does **not** require a cross-tenant supplier network or a persistent external account before a supplier can participate.

### Email ingestion boundary

Email is a capture channel, not an AI promise.

A0–A3 may accept:
- manually attached email evidence;
- forwarded/replied supplier attachments;
- deterministic metadata capture.

Automatic email-to-structured-bid parsing is **not required** to close P1.3 or to define first-release architecture. It may later improve economics, but supplier source truth must remain preserved independently of extraction quality.

---

## 3. Adoption activation correction

### A0 — bootstrap
Company/legal entity/project, users/roles, minimum money/time/cost-reference defaults.

### A1 — first sourcing event
- lightweight material/request intake OR complex package intake;
- requirement authority/allocation behind the UX;
- vendor/contact minimum;
- RFQ/tender/release;
- bounded evidence/access.

**Direct-source-without-comparison is not an A1 first-rail surface.**

### A2 — comparison
- immutable supplier revisions;
- normalization/mapping;
- package-specific comparison schema;
- gaps/alternates/bundles;
- buyer evaluation adjustment;
- frozen snapshot.

### A3 — recommendation/approval/award
- recommendation;
- structured justification;
- bounded DOA/approval;
- AwardDecision;
- external handoff disposition.

### Later activation
- controlled direct-source route;
- PO/subcontract/framework formation;
- receipts/change/certification/recovery;
- ERP/CDE integration;
- deep supplier lifecycle;
- portfolio/long-lead overlays.

---

## 4. Normalization economics — required commercial metric

The reviewer correctly identified that A2 can be architecturally clean and still fail commercially if normalization costs more labor than Excel.

This becomes an explicit pilot measurement obligation.

For each real package measure:

1. `supplier response receipt → comparison-ready snapshot` elapsed time;
2. buyer manual-touch minutes per supplier response;
3. number of mapping/coverage decisions;
4. number of clarification loops caused by comparison incompleteness;
5. percentage of comparison basis reused from prior/template structure where applicable;
6. current contractor Excel/manual baseline for the same package type;
7. repeat-package improvement after schema/mapping reuse.

Commercial success requires the product to reduce or materially improve the total comparison effort/quality trade-off versus the contractor's current workflow.

No fixed percentage threshold is frozen in P1.3; baseline is contractor/package dependent and must be measured in live pilots.

Advanced AI extraction is not assumed necessary for architectural correctness, but if deterministic/manual normalization cannot become economically superior to the incumbent workflow, the monetization rail must be reshaped.

---

## 5. ProcurePro proximity / differentiation hypothesis

ProcurePro is not only an inspiration source; it is the nearest known specialist incumbent to the same sourcing rail.

Therefore P1.3 must not imply differentiation merely because our architecture is deeper.

### Candidate differentiation hypothesis — NOT MARKET PROOF

Potential differentiation to test later:

1. **GCC/UAE contractor operating fit** — local procurement/commercial practices, mixed supplier maturity, email/WhatsApp/document reality, subcontract/material hybrid packages and local approval context;
2. **four-layer comparison truth** — supplier submission → normalized representation → buyer evaluation adjustment → supplier-confirmed contractable basis;
3. **arbitrary-source comparability** — preserve and level PDF/Excel/email/manual bids rather than requiring a clean structured supplier response;
4. **commercial-truth expansion path** — ability to extend from sourcing into commitment/change/valuation/recovery without becoming full ERP;
5. **small-footprint deployment** — first sourcing value without enterprise implementation, mandatory supplier network, CDE or accounting replacement.

These are hypotheses to validate against ProcurePro and real buyers, not claims of superiority.

---

## 6. ADR posture updates

### ADR-0012 — External identity/access

Reclassify direction to:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

Direction set:
- low-friction task-scoped external participation;
- no mandatory persistent signup for tender response;
- guest/email/buyer-on-behalf channels permitted with provenance;
- access is least-privilege and bounded to tenant/project/tender/task.

Still open:
- persistent supplier account model;
- cross-tenant supplier identity/network;
- account linking/deduplication;
- exact authentication mechanism;
- external organization hierarchy/tenancy persistence.

### Directions further strengthened but not closed

- ADR-0007 — actual procurement milestones derive from domain events; physical long-lead model still open.
- ADR-0005 — accounting integration/authority required; full ownership split still open.
- ADR-0015 — posting/finalization affects editability; correction persistence model still open.
- ADR-0018 — workflow may govern domain commands but must not become financial truth; exact seam still open.

### ADR-0010 — GCC semantics

Still materially unresolved by competitor evidence.

Route to GCC/UAE primary/regulatory/contractual evidence in later structural work. Do not infer GCC commercial semantics from Western enterprise products.

---

## 7. Internal remediation sanity check

`FAIL_INTERNAL = 0`

Checked:

- simple material request can enter the same RFQ/comparison/award rail without a second first-release surface;
- later direct source remains representable without becoming A0–A3 prerequisite;
- evidence owns transaction provenance without general CDE scope;
- guest access cannot browse unrelated tenant data;
- email can be a capture channel without mandatory parsing automation;
- external CDE records can remain authoritative references;
- normalization economics is measurable independently of architecture correctness;
- differentiation is explicitly hypothesis-level rather than market proof;
- ADR-0012 direction is recorded without freezing persistent external identity architecture.

---

## 8. Current verdict

`REMEDIATED — P1.3 remains open pending narrow hostile recheck.`

P1.4 remains LOCKED.
