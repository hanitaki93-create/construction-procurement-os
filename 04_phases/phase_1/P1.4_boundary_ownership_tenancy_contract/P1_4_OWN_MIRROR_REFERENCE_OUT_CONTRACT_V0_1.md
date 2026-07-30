# P1.4 — OWN / MIRROR / REFERENCE / OUT Contract v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / EXTERNAL AUDIT PENDING  
**Parent:** `P1_4_LOAD_BEARING_AUTHORITY_INVENTORY_V0_1.md`

---

## 1. Decision

The V1 boundary uses `OWN / MIRROR / REFERENCE / OUT` at the **load-bearing fact/field/event grain**.

A whole business object is not assigned one misleading label when its facts have mixed authority.

These labels describe system authority/custody only. They do not determine legal title, copyright, contractual ownership or intellectual-property rights.

At any point in effective time, each load-bearing fact/event has exactly **one authoritative source/writer**.

---

## 2. Authority classes

### OWN

The Construction Procurement OS is authoritative for the identified fact/event/history inside its declared tenant/legal/project scope.

Rules:
- state change only through bounded validated domain/service action;
- domain invariants revalidated at mutation time;
- provenance retained for commercially or authorization-significant truth;
- correction is history-preserving, not arbitrary overwrite;
- current projection may be derived from authoritative events but is never a second editable truth.

### MIRROR

The OS keeps a local operational copy of externally authoritative truth.

Rules:
- mirrored value is not independently editable as competing business truth;
- source system/record identity is mandatory where load-bearing;
- freshness/last-success/conflict state is explicit when downstream decisions consume the value;
- correction targets the authoritative source or a mapping/transport defect;
- local change requests may exist, but they do not become truth until accepted by the authority.

### REFERENCE

The OS stores an external authority pointer/identity and the minimum provenance needed to use the record safely while the authoritative payload remains external.

Load-bearing references preserve as applicable:
- external system identity;
- record/document identity;
- version/revision/effective state;
- observed/fetched time;
- authority/source organization;
- content hash or immutable released copy when the product itself issued the transaction basis;
- freshness/availability state where operationally material.

A URL or free-text note alone is insufficient when a referenced record governed a commercial or approval decision.

### OUT

The business truth is outside V1 product authority.

`OUT` does not mean the product must pretend the concern does not exist. A bounded dependency, status reference, external ID or handoff acknowledgement may be recorded where needed, but the OS does not become the authority or build the external subsystem.

---

## 3. Derived values are not a fifth authority class

A derived position is reproducible from authoritative `OWN`, `MIRROR` and/or `REFERENCE` inputs.

Examples:
- current approved commitment from original baseline + effective approved changes;
- retention/advance outstanding from governed terms/events;
- actual procurement milestone from domain events;
- non-response from deadline + absence of valid response.

A derived value may be cached for performance, but it is never independently editable business truth.

---

## 4. Authority binding contract

Every load-bearing authority assignment must resolve, semantically, to:

`{tenant boundary, fact/event identity, authority class, authoritative source/writer, legal-entity/project scope where applicable, effective interval/version, correction owner, freshness rule where external}`.

Physical storage is deferred to P1.5.

### Deployment-profiled facts

Some facts legitimately vary by contractor deployment, especially:
- project master facts;
- budget/cost structure;
- requisition/planning sources;
- selected accounting/master-data dimensions;
- scheduling dates.

For these facts P1.4 does not force one universal external/internal master.

Instead the deployment binds one allowed authority profile:
- `OWN`; or
- `MIRROR` from named authority; or
- `REFERENCE` to named authority.

The same fact cannot be simultaneously editable in two authority systems.

A0–A3 cannot require a named connector merely to establish this binding; controlled manual/import/reference configuration is allowed.

---

## 5. Authority transfer

Authority may move between systems only through a governed cutover.

Minimum semantics:
1. old authority identified;
2. new authority identified;
3. effective cutover time/version identified;
4. outstanding conflicts reconciled or explicitly dispositioned;
5. in-flight transactions bound to the correct governing authority/configuration;
6. historical records remain interpretable under the authority that governed them;
7. no indefinite dual-master period.

A source migration does not rewrite historical provenance.

---

## 6. Correction and conflict contract

A synchronization disagreement is classified before correction.

Minimum disposition family:
- `DATA_DEFECT` — authoritative business fact itself is wrong and must be corrected at authority;
- `TRANSPORT_OR_MAPPING_DEFECT` — business truth is valid; connector/mapping failed;
- `TEMPORAL_RESTRICTION` — external period/state prevents acceptance now;
- `EXTERNAL_AUTHORITY_RETURN` — authoritative downstream system rejects/returns for a domain reason it owns.

Rules:
- transport defects never justify changing commercial truth merely to make sync pass;
- mapping corrections do not masquerade as commercial corrections;
- external-authority return does not automatically reverse product-owned commercial truth unless a governed domain rule/event requires that consequence;
- corrections preserve evidence, idempotency and causal lineage.

Exact posting/reversal mechanics remain ADR-0015/P1.5.

---

## 7. Authority by major domain family

| Domain family | V1 authority boundary |
|---|---|
| Tenant/config/security boundary | OS `OWN` |
| Project/legal-entity relationship | OS `OWN`; effective-dated |
| Internal membership/role/delegation/DOA | OS `OWN` |
| External task/tender grants | OS `OWN`, semantically separate from internal authorization |
| Supplier business relationship | OS `OWN` within tenant only |
| Cross-tenant supplier network/history | `OUT` |
| Governed tender release/addenda | OS `OWN` transaction evidence |
| Supplier quote/revision captured for governed transaction | OS `OWN` immutable transaction record/custody; supplier remains source principal |
| Buyer normalization/mapping/adjustment | OS `OWN` |
| ComparisonSnapshot/recommendation/award | OS `OWN` |
| P07 effective commitment/change/valuation truth when activated | OS `OWN` |
| RequirementAllocation | OS `OWN` procurement-scope authority only; exact mechanics remain falsifiable |
| AP invoice/payment/GL/cash/job-cost accounting fact where ERP is authority | `MIRROR` or `REFERENCE`; journals/ledger engine `OUT` |
| Integration transport/reconciliation state | OS `OWN` operational metadata |
| External CDE/consultant approval record | `REFERENCE`/narrow `MIRROR`; procurement dependency relationship `OWN` |
| Full CDE, WMS, CPM, legal claims, banking platform | `OUT` |

---

## 8. P07 protection rule

No supporting subsystem may create an independently editable representation of P07 commercial truth.

Specifically:
- RequirementAllocation owns authorized procurement-scope consumption, not a duplicate commitment/value ledger;
- workflow/approval owns authorization evidence/task state, not financial state;
- evidence metadata proves or links events, not business balances;
- integration state describes synchronization, not commercial position;
- accounting mirrors/reference facts remain externally authoritative where configured;
- current commercial positions are event-derived rather than separate editable balances.

**P07 remains the only independent XL gravity well.**

---

## 9. External-evidence custody rule

When the OS captures a supplier quote, clarification, signed record or other source evidence as part of a governed transaction, `OWN` means the OS is authoritative for the integrity/provenance of the captured transaction record.

It does **not** mean the OS or contractor acquires legal ownership of the supplier's underlying content/IP.

Legal rights remain governed by contract/law outside this semantic authority vocabulary.

---

## 10. First-rail compatibility

A0–A3 may operate using product-owned sourcing truth and bounded manually configured/imported/referenced master facts.

A0–A3 must not require:
- P07 execution;
- ERP/CDE connector;
- supplier portal/network account;
- full accounting master;
- full project master/CDE;
- advanced AI.

AwardDecision + external handoff remains a valid terminal point.

---

## 11. P1.5 constraints created by this contract

P1.5 physical design must make the following impossible or explicit:
1. dual editable authority for one load-bearing fact;
2. unversioned authority-map change that reinterprets history;
3. mutable mirror treated as local master;
4. free-text-only external reference for a record that governed a load-bearing decision;
5. current-config lookup rewriting historical authorization or commercial interpretation;
6. connector state becoming domain state;
7. independently editable derived commercial balances;
8. workflow/grant bypass of domain authorization;
9. cross-tenant supplier history leakage;
10. P08 becoming GL/AP/cash ownership.

---

## 12. ADR impact candidate — no status change yet

This contract materially constrains ADR-0005, ADR-0006 and ADR-0021 and supports the already accepted ADR-0024 invariants.

It also constrains ADR-0018/0019/0020 without selecting their P1.5 physical implementation.

**No ADR status is changed by this artifact before hostile review.**

---

## 13. Internal result

**CANDIDATE PASS — central system-authority vocabulary and dual-master prevention are coherent enough for the remaining P1.4 boundary contracts.**

External hostile review remains required before freeze.