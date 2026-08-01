# P1.8 — A0–A3 Minimum Report Pack v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE MINIMUM-PROFILE CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This document proves that the first live tender can produce useful, governed reporting without:

- ERP/CDE/email connectors;
- public API/event broker;
- persistent supplier account/network;
- chat;
- AI;
- P07/A4 commercial execution;
- data warehouse or BI platform;
- historical migration.

The governing rule is:

> **A0–A3 reporting is complete enough to control the first sourcing event using product-owned facts, structured/manual evidence and bounded registered queries. Optional connectors or AI may improve capture or access later but cannot be prerequisites or alternate truth paths.**

---

# 2. Deployment assumptions

Required:

- one tenant;
- one project and ContractingAuthorityContext;
- authorized users/roles;
- bounded requirement/allocation/package/tender/response/comparison/recommendation/approval/AwardDecision/handoff operations;
- P1.6 evidence/document/communication substrate;
- manual/structured-file data entry/import/export;
- registered P1.8 metric/projection definitions;
- report snapshot/export capability at semantic level.

Not required:

- external email API;
- supplier portal account;
- ERP/CDE/bank connector;
- live external payment/accounting data;
- AI extraction/packaging;
- cross-project portfolio;
- P07 Commitment/certification/payment analytics.

---

# 3. Minimum report set

## RPT-A03-01 — Requirement and allocation control

Includes:

- authorized requirement count;
- requirement quantity/value where available and authoritative;
- allocation coverage;
- unallocated/partial/unknown position;
- overlapping allocation exceptions;
- requirement-to-sourcing-start aging;
- exact as-of/source/quality.

Package dimension appears only where package route is used.

## RPT-A03-02 — Tender/RFQ register

Includes:

- RFQ/tender identity and exact issued revision;
- lifecycle distribution;
- issue/open/close/due dates under exact time families;
- invited supplier count;
- dispatch/delivery/acknowledgment facts separately where captured;
- addendum/revision coverage;
- due/overdue control observations;
- evidence/quality limitations.

## RPT-A03-03 — Supplier response register

Includes:

- tenant-private supplier relationship identity;
- invitation applicability;
- accepted response occurrence;
- response revision/withdrawal/late state;
- source body/attachment evidence linkage;
- completeness/evidence limitation;
- response coverage population and denominator;
- manual-capture attribution.

One supplier contributes once to response coverage regardless of message/revision count.

## RPT-A03-04 — Normalization and comparison readiness

Includes:

- source-line population;
- accepted normalized-line coverage;
- proposal/AI/parser-derived counts separately, if any optional capability was used;
- unresolved ambiguity/unsupported lines;
- source/normalized/buyer-adjusted/supplier-confirmed layers separately;
- commercial/technical evidence completeness;
- currency/comparability limitations;
- comparison readiness classification.

No supplier ranking is required.

## RPT-A03-05 — Recommendation and approval control

Includes:

- recommendation identity/version/state;
- approval/DOA state;
- return/revision history;
- approval aging;
- missing evidence/control exceptions;
- explicit statement that recommendation/approval outcome is not AwardDecision until owning command establishes it.

## RPT-A03-06 — AwardDecision and handoff

Includes:

- AwardDecision identity/event/status;
- awarded supplier relationship/scope/value basis;
- award correction/supersession history;
- award evidence limitations;
- handoff preparation/export/dispatch/acknowledgment/reconciliation state;
- exact issued artifacts/exports;
- explicit AwardDecision ≠ Commitment.

## RPT-A03-07 — Open controls and data quality

Includes:

- overdue/aging observations by class;
- missing evidence;
- incomplete populations;
- stale/manual external observations where any;
- identity/mapping conflicts;
- reconciliation/open handoff issues;
- effect uncertainty where any external effect occurred;
- unassigned/aging control observations;
- quality summary.

Control observations remain non-authoritative.

## RPT-A03-08 — Sourcing event snapshot pack

Immutable snapshot suitable for internal review/issue containing:

- report definition/version;
- source cut;
- report members and values;
- actual/time families;
- quality/limitations;
- exact evidence/report artifact identities;
- issue/transmittal linkage if issued;
- reconstruction level.

---

# 4. Manual and file capture paths

## Requirements/bootstrap

- bounded manual entry;
- validated structured-file import with run/item/error manifest;
- no direct lifecycle/status assignment.

## Supplier communication

- product-generated/downloaded exact issued artifact;
- buyer sends through ordinary channel;
- buyer captures dispatch/delivery/response evidence on behalf where allowed;
- selected inbound message/body/attachments captured manually;
- no full-mailbox archive.

## Supplier response

- manual response occurrence/evidence capture;
- structured response import where supported;
- exact source revision preserved;
- normalization remains separate.

## Handoff

- exact structured export/report artifact;
- manual dispatch evidence;
- later external acknowledgment captured as observation;
- no external posting inferred.

---

# 5. No-connector truth behavior

When no connector exists:

- connector-dependent metrics are `NOT_APPLICABLE`, `UNSUPPORTED` or manual-observation based;
- external accounting/payment/CDE facts are not fabricated as zero;
- source availability limitations remain explicit;
- product-owned sourcing/AwardDecision reporting remains complete;
- manual evidence has source principal/occurrence attribution;
- later connector activation attaches to the same operations/history and does not replace it.

---

# 6. No-AI truth behavior

When no AI capability exists:

- users manually create/correct normalized lines and packages;
- report populations derive from accepted product facts;
- no proposal-derived metrics are required;
- comparison readiness is deterministic;
- conventional reports/filters/exports work;
- chat/query AI is absent without reducing semantic completeness.

If optional AI is used:

- proposals remain separately counted/classified;
- human/authorized acceptance creates authoritative normalized/package/RFQ facts;
- disabling AI leaves the same reports operational.

---

# 7. Golden thread

1. Authorized requirement line created.
2. RequirementAllocation established.
3. Optional ProcurementPackage created where route requires.
4. RFQ draft frozen/approved/issued through bounded commands.
5. Exact issued artifact and recipient population recorded.
6. Manual dispatch evidence captured.
7. Supplier responses/revisions captured with exact evidence.
8. Normalization proposals/accepted normalized lines kept distinct.
9. Comparison readiness reports exact population/quality.
10. Recommendation created and approved under bounded control.
11. AwardDecision established by owning command.
12. External handoff artifact/export created and manually dispatched.
13. Report pack snapshot freezes exact values/source cut/quality.
14. Later corrections/restatements create new history; prior snapshot remains.

At no point does a report write source-domain truth.

---

# 8. Minimum metric activation set

Required MetricKeys/families:

- authorized requirement count;
- allocation coverage;
- unallocated position;
- allocation overlap exception;
- package lifecycle/readiness where applicable;
- RFQ lifecycle distribution;
- invited supplier distinct count;
- dispatch coverage;
- response coverage;
- response completeness;
- normalization coverage;
- unresolved normalization ambiguity;
- comparison readiness;
- recommendation state;
- approval state/aging;
- AwardDecision count/state;
- handoff status/completeness;
- open control observations;
- population/freshness/evidence/quality summary.

Each uses the controlling semantic/time/quality contract.

---

# 9. Required limitations

The minimum pack must state where applicable:

- manual capture basis;
- communication delivery/acknowledgment unknown;
- external accounting/payment not integrated/not applicable;
- partial supplier population;
- missing/unknown response/evidence;
- migration not performed;
- AI not used or proposal-derived content present;
- report as-of/known-at/reconstruction level.

No “green” summary hides these limitations.

---

# 10. One-XL test

The minimum pack does not require:

- data warehouse/lakehouse;
- generic report builder;
- arbitrary formula language;
- supplier network;
- CPM/GRC system;
- ERP/accounting clone;
- email archive;
- agent platform;
- second commercial ledger.

P07 remains sole XL and is not required for A0–A3 reporting.

---

# 11. Hostile scenarios

Test at minimum:

1. requirement entered manually;
2. package route omitted;
3. no email connector;
4. manual dispatch;
5. supplier replies through ordinary email;
6. body and attachment captured separately;
7. one supplier sends revisions;
8. one supplier no response;
9. delivery unknown;
10. partial invited population;
11. normalization done manually;
12. optional AI disabled;
13. AI proposal present but unaccepted;
14. comparison has incomparable currency;
15. recommendation approved;
16. AwardDecision not yet issued;
17. AwardDecision issued;
18. no Commitment/P07;
19. handoff downloaded and sent manually;
20. external acknowledgment absent;
21. report snapshot issued;
22. source correction later occurs;
23. restated report created;
24. user edits exported workbook;
25. workbook not accepted as source correction;
26. no public API/broker/chat;
27. external accounting report requested;
28. result returns not applicable/unsupported, not zero;
29. first tender completes end to end;
30. team attempts to require connector/warehouse before go-live.

---

# 12. Exit condition

A0–A3 reporting proof passes when the eight-report pack can be generated from product-owned/manual facts, all metrics carry exact source/time/quality semantics, AwardDecision/handoff remain distinct from Commitment/external posting, and no connector/AI/warehouse is required.
