# P1.3 — Hostile Narrow Recheck Packet v0.1

**Status:** READY FOR EXTERNAL RECHECK
**Scope:** BL-10, BL-11 and direct remediation side-effects only
**P1.4:** LOCKED pending this recheck

## Prior external verdict

`FAIL — remediate blocker(s) before P1.4`

- BL-10: Kojo inheritance ambiguously introduced a possible second first-release direct-order surface.
- BL-11: evidence/provenance had no explicit burden/ownership boundary.

All other prior checks were CLEAN or NO.

---

## 1. BL-10 remediation

### First monetization rail

`requirement / material request / package`
`→ RFQ/tender`
`→ supplier response capture`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

### Kojo inheritance now means only

- low-friction material/field request UX;
- ordinary-material vocabulary;
- minimal effort to create demand.

It does **not** introduce a direct-order product surface in A0–A3.

Simple material requests and complex packages converge on the same sourcing/comparison/award substrate.

### Direct-source route

Direct-source/direct-purchase remains a valid P1.2 domain route but is deferred from first monetization scope.

It is:
- not required for first live tender;
- not part of A0–A3;
- later activated with commercial/commitment execution;
- still subject to requirement authority, direct-source justification/approval and commitment guardrails.

### Activation boundary

A0 bootstrap
A1 first sourcing event
A2 comparison
A3 governed award/handoff
A4 later commercial execution, including controlled direct-source route
A5 optional enterprise/portfolio overlays

---

## 2. BL-11 remediation

### Classification

`Evidence / External Access Substrate = L`

It is a shared bounded substrate across procurement/commercial flows, not a second XL system.

### Product OWNS

For transactions governed by the product:
- EvidenceReference identity;
- immutable/versioned source attachment record;
- source/capture provenance;
- actor/organization/time;
- domain event/object/version linkage;
- source channel;
- integrity hash/checksum where required;
- transaction-level sensitivity/access classification;
- supersession/version lineage;
- bounded external access grant history.

Typical owned transaction evidence may include:
- tender release documents;
- quotations/revisions;
- clarifications/addenda;
- recommendation/approval evidence;
- commitment/change evidence when activated;
- receipt/certification/recovery evidence when activated.

### Product REFERENCES

Where externally authoritative:
- CDE drawings/submittals/review records;
- enterprise document IDs;
- ERP/payment documents;
- bank/security/legal records;
- master correspondence.

### Product REFUSES

- general folder/document management;
- project transmittal/correspondence platform;
- markup/annotation;
- design/submittal review engine;
- CDE replacement;
- enterprise records management;
- legal hold/eDiscovery;
- retention/redaction/classification policy engine;
- mandatory supplier network/portal.

### External access

V1 direction:
- task/tender-scoped guest links;
- email attachment/reply capture;
- optional persistent portal later;
- governed buyer-on-behalf capture.

Access is least-privilege, tenant/project/tender/task scoped, expiring/revocable and provenance-preserving.

No cross-tenant browsing is implied.

### Email ingestion

Email is a capture channel, not an assumed AI feature.

A0–A3 may work with manually or deterministically captured attachments/metadata.

Automatic email-to-structured-bid extraction is not required for architectural closure.

---

## 3. Normalization economics obligation

A2 must be benchmarked against contractor Excel/manual comparison.

Measure:
- supplier response receipt → comparison-ready elapsed time;
- buyer manual-touch minutes per response;
- mapping/coverage decisions;
- clarification loops;
- reusable schema/mapping leverage;
- current manual baseline.

No arbitrary performance threshold is frozen in P1.3.

If real use cannot become economically superior to the incumbent comparison process, the first rail must be reshaped even if architecture is correct.

---

## 4. Closest-incumbent / differentiation posture

ProcurePro is explicitly treated as the closest known specialist incumbent to the same sourcing rail.

Candidate differentiation remains hypothesis-level:
- GCC/UAE contractor operating fit;
- four-layer comparison truth;
- arbitrary-source bid comparability;
- commercial-truth expansion path without full ERP;
- small-footprint deployment.

No claim of superiority or PMF is made.

---

## 5. ADR posture

### ADR-0012

Now:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

Direction:
- low-friction task-scoped external participation;
- no mandatory persistent signup for tender response;
- guest/email/buyer-on-behalf permitted with provenance;
- least-privilege scoped access.

Still open:
- persistent supplier identity/account;
- cross-tenant identity/network;
- authentication mechanism;
- organization hierarchy/persistence.

### Strengthened, not closed

- ADR-0007: actual procurement milestones derive from events; physical model open.
- ADR-0005: accounting integration/authority required; ownership split open.
- ADR-0015: finalization/posting changes editability; persistence/correction model open.
- ADR-0018: workflow governs commands but is not financial truth; seam open.

### ADR-0010

GCC semantics remains explicit primary/regulatory/contractual evidence debt.

---

## 6. Internal remediation result

`FAIL_INTERNAL = 0`

No new competitor class, lifecycle or second XL subsystem introduced.

---

# Reviewer output contract

Review only BL-10, BL-11 and direct side-effects.

## BLOCKERS
Only remaining structural defects.

## BL-10 VERDICT
Choose exactly one:

`CLOSED — Kojo inheritance is intake UX only in A0–A3; no second first-release surface`

or

`OPEN — exact remaining defect`

## BL-11 VERDICT
Choose exactly one:

`CLOSED — evidence/external access is bounded as an L shared substrate rather than CDE/records-management gravity`

or

`OPEN — exact remaining defect`

## SECOND-XL CHECK
`CLEAN` or exact regression.

## ADOPTION-BURDEN CHECK
State whether A0–A3 remains independently usable without direct-source, P07 execution, CDE/ERP or advanced AI.

## ADR-0012 CHECK
State whether provisional direction is correctly recorded without prematurely deciding persistent supplier identity/tenancy.

## COMMERCIAL POSTURE CHECK
State whether normalization economics and ProcurePro differentiation are framed honestly as future tests/hypotheses.

## P1.2 REGRESSION?
`NO` or exact contradiction.

## P1.4 READINESS
Choose:

`READY — P1.3 can close and P1.4 can begin`

or

`NOT READY — exact remaining boundary defect`

## VERDICT
Choose exactly one:

`PASS — P1.3 competitor reconstruction can close; unlock P1.4`

or

`FAIL — blocker(s) remain before P1.4`
