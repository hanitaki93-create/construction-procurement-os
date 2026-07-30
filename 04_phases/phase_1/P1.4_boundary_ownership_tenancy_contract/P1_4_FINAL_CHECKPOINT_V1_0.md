# P1.4 — Final Checkpoint v1.0

**Date:** 2026-07-30  
**Status:** FINAL CHECKPOINT / PASS  
**P1.4:** CLOSED / FROZEN  
**P1.5:** UNLOCKED  
**Product code:** LOCKED

---

## 1. Closure basis

P1.4 closure is based on:

- frozen P1.1 release boundary and one-XL constraint;
- closed P1.2 primary workflow evidence and retained evidence debt;
- closed P1.3 competitor reconstruction and semantic-reuse rule;
- complete P1.4 ownership/tenancy alternatives and authority inventory;
- coherent OWN/MIRROR/REFERENCE/OUT authority contract;
- explicit tenant/legal/project/ContractingAuthorityContext boundary;
- explicit internal-authorization versus external-grant split;
- explicit evidence/offboarding/deletion/retention/residency contract;
- explicit effective-dated/configuration binding semantics;
- explicit accounting/integration authority seam;
- explicit cross-tenant AI/model-mediated isolation boundary;
- a defined `load-bearing` semantic test;
- internal hostile audit/remediation/recheck PASS;
- Claude hostile audit round 1 remediation;
- Claude hostile audit round 2 PASS;
- final ADR reconciliation.

---

## 2. Frozen boundary summary

### Tenancy

- tenant is customer isolation/config/security boundary;
- a project belongs to one tenant;
- multiple legal entities may exist inside one tenant;
- ContractingAuthorityContext expresses the exact legal/contracting authority;
- bounded multi-party/unincorporated authority is supported without a JV platform;
- partner participation does not imply product access.

### Identity/access

- reusable technical identities are allowed;
- tenant business relationships remain tenant-private;
- internal business authorization and external grants are semantically separate;
- external grants cannot bypass P09/DOA/domain authorization;
- persistent supplier signup is optional;
- buyer-on-behalf provenance is preserved.

### System authority

- authority grain is load-bearing fact/field/event;
- classes are OWN/MIRROR/REFERENCE/OUT;
- one authoritative source/writer per effective period;
- no dual masters;
- deployment-profiled authority is allowed;
- authority transfer is governed and history-preserving.

### Load-bearing test

A fact/event/evidence/policy/config value is load-bearing when governed outcome dependence, counterfactual materiality or reconstruction necessity makes its authority/version/context necessary.

P1.5 may catalogue facts; it may not redefine this test.

### Evidence/lifecycle

- product-governed evidence has product-owned integrity/provenance;
- external CDE/ERP/bank/legal records remain external authority where applicable;
- no edit-in-place historical rewrite;
- offboarding separates capability from historical truth;
- retention requires valid basis, not forever;
- evidence payload may be disposed without reversing domain history;
- minimum disposition/provenance tombstone may remain under its own valid basis;
- post-termination disposition authority is explicit;
- bounded export/return is supported without becoming records management.

### Residency

- tenant-level declared primary residency region for in-scope product-hosted data;
- no arbitrary per-project region by default;
- backup/DR/telemetry categories classified later against the commitment;
- governed effective-dated migration;
- no UAE/GCC localization claim without evidence.

### AI/data isolation

- shared foundation models/tools/agent implementations are allowed;
- tenant business context is isolated per authorized invocation;
- cross-tenant learned business knowledge is OUT by default;
- rule binds product and third-party/sub-processor processing paths;
- future shared-learning/benchmarking requires separately governed participation;
- multi-agent architecture remains allowed;
- agents act through bounded domain operations and cannot become arbitrary truth writers.

### Accounting/integration

- P07 owns product commercial truth when activated;
- external accounting may own AP/payment/GL/job-cost facts;
- certification and posting are distinct;
- P08 owns mapping/reconciliation, not accounting balances;
- connector is never business authority;
- sync rejection never justifies arbitrary commercial-truth mutation;
- external values carry freshness/conflict semantics where load-bearing.

### One-XL / activation

- P07 remains sole independent XL;
- evidence/tenancy/identity/integration/AI-isolation remain bounded substrates/constraints;
- A0–A3 remains operable without P07, ERP/CDE connectors, supplier network, CPM/BPM, WMS or advanced AI.

---

## 3. P1.5 inherited hard constraints

P1.5 must preserve:

1. the frozen P1.4 ownership/authority boundaries;
2. ADR-0024 provenance and bounded-action constraints;
3. append-only commercial/audit history semantics compatible with controlled redaction/tombstoning;
4. projection evolution that is explicit/versioned/non-silent;
5. one canonical commercial cost-event substrate;
6. workflow/financial-state separation;
7. effective dating and in-flight configuration binding;
8. field-level integration authority/staleness;
9. P07 as sole independent XL;
10. P1.2 FT-02/06/09/10 evidence debt without silently treating it as proven;
11. A0–A3 activation independence;
12. product-code lock during Phase 1 architecture.

---

## 4. P1.5 objective from frozen roadmap

P1.5 — **Commercial Core** must produce one internally consistent model of data, commercial value, lifecycle and authority.

### P1.5a — Entities & Master Data

- entity dictionary;
- attributes/types;
- cardinalities;
- master vs transaction;
- numbering;
- immutability;
- revision semantics;
- P1.4 ownership inheritance.

### P1.5b — Cost Ledger & Posting Semantics

- commercial financial-event types;
- canonical derivation formula for each commercial balance;
- pending/approved/committed semantics;
- certification;
- actual/paid distinction;
- retention;
- forecasts;
- reversal/adjustment;
- periods/cut-off/backdating;
- multi-currency/FX;
- tax timing;
- external GL/AP posting seam.

### P1.5c — Lifecycles & State Machines

For every SPINE transaction:

- states;
- transitions;
- guards;
- side effects;
- emitted events;
- reversibility;
- supersession/cancellation.

### P1.5d — Authority / Approval / Audit / Concurrency

- role/permission model;
- approval policies;
- authority limits;
- delegation;
- ball-in-court;
- audit-event catalogue;
- simultaneous-edit/concurrency rules.

---

## 5. P1.5 specific roadmap augmentation

P1.5 owns the audit/history invariant and must freeze an append-only commercial/audit history with controlled redaction/tombstoning capability that preserves:

- immutable record/event identity;
- financial meaning and derived-balance integrity;
- referential integrity;
- evidence that redaction/tombstone occurred;
- authority/audit trail for that action.

Projection/derivation evolution must be explicit and versioned. New event types may alter projections only through traceable, defined recalculation/effective-applicability rules; historical events do not change meaning silently.

---

## 6. P1.5 gate inherited from roadmap

P1.5 may close only when:

- every derived balance has one canonical derivation over commercial financial events;
- every SPINE transaction has a complete lifecycle;
- every transition identifies guard, authority, financial effect, event and reversibility;
- golden threads 1–4 execute on paper with zero architecture invention;
- P1.5 Ceiling Test passes;
- P1.5 Closed Sub-graph Gate passes;
- hostile red-team gate passes.

---

## 7. Open ADR/evidence obligations entering P1.5

Priority open decisions include:

- ADR-0003 procurement structural root;
- ADR-0004 PO/Subcontract physical composition;
- ADR-0008 workflow breadth;
- ADR-0009 configuration breadth;
- ADR-0010 GCC semantic/evidence boundary;
- ADR-0011 cost attribution timing;
- ADR-0015 posting/finalization/reversal/correction physical semantics;
- ADR-0019 temporal storage semantics;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 numbering/concurrency/fiscal rules.

ADR-0006 connector depth remains open but cannot force a connector before first live tender.

P1.5 must not silently solve these by schema convenience.

---

## 8. Final transition

**P1.4 is CLOSED / FROZEN.**

**P1.5 Commercial Core is UNLOCKED.**

The next working artifact should be a P1.5 workplan that treats P1.5a–P1.5d as concurrent interlocking tracks rather than four independent sequential mini-projects.

Do not start product code.
