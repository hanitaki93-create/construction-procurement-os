# P1.4 — Accounting & Integration Authority Contract v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / EXTERNAL AUDIT PENDING

---

## 1. Core decision

V1 uses **split commercial/accounting authority**.

The Construction Procurement OS owns procurement/commercial truth required to govern its in-scope transactions. An external accounting/ERP platform may remain authoritative for accounting facts.

P08 owns the authority mapping, transport/reconciliation evidence and operational integration state. P08 does **not** become GL/AP/cash accounting.

This is the P1.4 semantic seam for ADR-0005/0006/0021; exact connector and P1.5 physical models remain later work.

---

## 2. Product-owned commercial truth

Where the relevant domain is activated, the OS owns:
- requirement/sourcing/award truth through A0–A3;
- P07 effective commitment baseline;
- effective governed commitment changes;
- procurement receipt/acceptance commercial facts when P07 goods fulfillment is used;
- supplier claim source record;
- buyer valuation assessment;
- certification decision/commercial certified value when P07 certification is used;
- contractual retention/advance/recoupment basis and event-derived commercial positions;
- commercial recovery/backcharge events;
- reconciliation/mapping/transport status.

An external ERP representation of these product-owned facts is not a second editable master.

---

## 3. Externally authoritative accounting truth

Where an external accounting system exists, the following are external `MIRROR/REFERENCE` or `OUT` concerns rather than product ledgers:
- AP invoice accounting record/posting;
- payable liability;
- payment execution/cash settlement;
- bank transaction;
- GL journal;
- accounting-period close;
- accounting tax posting where the ERP is authority;
- job-cost/accounting posting fact;
- chart-of-accounts accounting master;
- intercompany accounting.

The OS may display or consume selected mirrored/referenced facts with source/freshness semantics, but it does not own the accounting ledger.

---

## 4. Invoice boundary

The word `invoice` is decomposed semantically.

### Procurement invoice evidence / match context

The OS may own:
- received invoice document/evidence captured for procurement context;
- linkage to commitment/receipt/certification;
- procurement match/exception facts;
- dispute/clarification evidence needed by procurement.

### AP invoice truth

The accounting system remains authoritative for:
- payable invoice record;
- tax/accounting posting;
- liability/open-item status;
- payment allocation.

A document captured in the OS does not automatically make the OS the AP system.

---

## 5. Certification versus accounting posting

A P07 certification is a commercial decision/event.

Accounting acceptance/posting of that certification is a distinct external fact where ERP/accounting is authoritative.

Therefore:
- certification ≠ payment;
- certification ≠ AP posting;
- ERP rejection does not erase the commercial certification;
- if rejection proves a real commercial data defect, correction occurs through the authoritative P07 correction path;
- if rejection is mapping/transport/period related, fix integration/accounting handling without mutating the commercial event.

Exact reversal/correction mechanics remain ADR-0015/P1.5.

---

## 6. Retention and advance split

The OS may derive contractual/commercial positions such as:
- retention held under current governed commercial events;
- advance outstanding/recoupment;
- provisional allowance remaining;
- commercial payable component resulting from certification.

These are not duplicate accounting balances.

External accounting may own:
- posted retention liability/account classification;
- invoice/payable balance;
- payment allocation;
- GL/job-cost recognition.

Differences are reconciled as differences between commercial and accounting authority, not resolved by last-write-wins.

---

## 7. Budget and cost structure

P1.4 does not assert one universal system master for contractor budget/cost structure.

Allowed deployment authority profiles:
- OS `OWN` for the required procurement budgeting/cost structure facts;
- external ERP/project system `MIRROR` into the OS;
- external system `REFERENCE` where local payload ownership is unnecessary.

For any load-bearing fact, exactly one source is authoritative.

Transaction cost-attribution binding is product-owned as a transaction relationship even when the referenced cost-code/budget master is externally authoritative.

Historical attribution binds the source/version/context used at the time; later cost-code changes/reclassifications are governed separately.

ADR-0011 exact mandatory attribution timing remains open beyond this boundary constraint.

---

## 8. Integration authority-map contract

For each integrated load-bearing fact/event the configured authority map identifies:
- tenant/legal-entity/project context;
- business fact/event;
- authoritative source system;
- OS authority class (`OWN/MIRROR/REFERENCE/OUT`);
- transport direction;
- mapping/version;
- freshness/staleness rule;
- conflict/disposition rule;
- correction owner;
- effective period/version.

Entity-level labels alone are insufficient when mixed authority exists inside one object.

---

## 9. Connector boundary

Connector/middleware is **never business authority merely because it transformed or transmitted data**.

Connector-owned facts are operational only, such as:
- attempt identity;
- payload/reference identity;
- mapping version;
- send/receive time;
- retry/idempotency state;
- transport error;
- acknowledgement;
- reconciliation result.

A connector cannot decide the commercial value merely to make two systems agree.

---

## 10. Rejection/disposition contract

Integration rejection is classified before business correction:

1. `DATA_DEFECT` — authoritative source business data is wrong;
2. `TRANSPORT_OR_MAPPING_DEFECT` — mapping/payload/transport failed while business truth remains valid;
3. `TEMPORAL_RESTRICTION` — period/status/timing prevents external acceptance;
4. `EXTERNAL_AUTHORITY_RETURN` — external system returns/rejects according to a domain rule it owns.

Required response:
- correct data at authoritative source when it is truly defective;
- correct mapping/transport without changing business truth when integration is defective;
- retain rejection/retry/reconciliation history;
- use a governed domain event where a legitimate external-authority outcome requires a commercial consequence.

---

## 11. Mirror freshness and decision use

A mirrored/referenced external fact that affects a domain decision carries sufficient freshness/source context.

The consuming domain decides whether stale data:
- remains usable with warning;
- blocks a specific action;
- requires refresh/reconfirmation;
- is irrelevant to the action.

P1.4 does not impose `everything must be real time`.

Silent stale use of a load-bearing external fact is not acceptable.

---

## 12. External-system outage behavior

External outage must not automatically stop all procurement activity.

Rules:
- A0–A3 first value remains operable without a live ERP/CDE connector;
- actions that require a fresh externally authoritative fact may be blocked or queued according to their domain rule;
- product-owned commercial truth can continue when external posting is unavailable if the domain permits it;
- pending synchronization is explicit operational state, not false accounting acceptance;
- no silent fallback makes the OS master of an externally owned accounting fact.

---

## 13. A0–A3 activation boundary

Before first live tender:
- bespoke named connector requirement = 0;
- manual/imported/reference master setup is allowed;
- P07 execution is not required;
- ERP accounting acceptance is not required for AwardDecision/handoff;
- future integration authority must still be representable without rebuilding sourcing truth.

---

## 14. P07 second-ledger protection

Forbidden duplicate balances include:
- editable `current commitment` stored independently from baseline/change events;
- editable accounting mirror of a product-owned commitment;
- workflow-approved amount treated as commitment without domain transition;
- sync-accepted amount treated as commercial truth merely because ERP accepted it;
- separate retention/advance balance manually maintained in P08;
- RequirementAllocation value balance competing with P07.

P08 remains bounded infrastructure. P07 remains the sole independent XL gravity well.

---

## 15. Explicit OUT boundaries

P1.4 refuses to turn the OS into:
- GL;
- AP subledger;
- cash/bank ledger;
- tax engine of record for accounting;
- accounting period-close engine;
- intercompany accounting platform;
- universal ERP connector prerequisite.

Bounded references/mirrors/interfaces are permitted where needed.

---

## 16. ADR impact candidate — no status change yet

This contract provides a concrete P1.4 candidate decision for ADR-0005 and materially constrains ADR-0006 and ADR-0021.

It also constrains ADR-0011/0015/0018/0019/0020 while leaving their later physical/state details open.

No ADR status is changed until hostile review and remediation are complete.

---

## 17. Internal result

**CANDIDATE PASS — commercial and accounting authority are split without duplicate editable truth, and P08 remains bounded integration/reconciliation infrastructure.**

External hostile review remains required.