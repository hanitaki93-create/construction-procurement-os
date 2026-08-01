# P1.8 — Report Export, Snapshot and Evidence Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract freezes the evidence and delivery meaning of live reports, report snapshots, exports, rendered files, issues and restatements.

The governing rule is:

> **A report snapshot is an immutable identified set of exact metric/projection results under one definition and source cut. An exported/rendered artifact is a separate exact content version of that snapshot. Issue, dispatch, delivery and acknowledgment remain communication facts and never change source-domain or report-result truth.**

---

# 2. Semantic objects

## `ReportDefinitionVersion`

Presentation-independent report membership, required metrics/projections, dimensions, ordering, access, quality and issue rules.

## `ReportExecution`

One calculation/assembly under exact report definition, metric/projection versions and source cut.

## `ReportSnapshot`

Immutable membership and values selected from one ReportExecution.

## `ReportArtifactVersion`

Exact rendered/exported content such as PDF, XLSX, CSV, JSON or structured package.

## `ReportIssue`

Governed intent/action to issue a specific ReportSnapshot/ArtifactVersion.

## `ReportCommunicationOccurrence`

Dispatch/delivery/receipt/acknowledgment evidence under P1.6.

## `ReportRestatementNotice`

Explicit linkage explaining a later corrected/restated report and its relation to prior issued snapshots.

---

# 3. Snapshot identity

Every ReportSnapshot binds:

- ReportSnapshotId;
- ReportDefinitionVersion;
- ReportExecutionId;
- exact MetricResult/ProjectionResult membership;
- source-cut manifest;
- report scope/context;
- as-of/period/known-at perspective;
- execution/creation time;
- quality/limitation summary;
- access/sensitivity/residency;
- content/member manifest identity;
- restatement/supersession lineage;
- reconstruction level.

A report URL pointing to a live view is not a ReportSnapshot unless the exact result/member identity is frozen.

---

# 4. Artifact identity

Every rendered/exported artifact binds:

- ReportArtifactVersionId;
- ReportSnapshotId;
- format/media type;
- renderer/template/locale/timezone versions;
- exact member/order/column/worksheet/page mapping;
- ContentIdentity/IntegrityAssertion;
- generation time;
- access/sensitivity labels;
- encryption/watermark policy where used;
- included evidence/limitation notes;
- attachment/member EvidenceVersions where applicable.

Two formats from one snapshot are distinct artifact versions.

A regenerated artifact after template change is a new artifact version even if metric values are unchanged.

---

# 5. Export classes

- `PORTABLE_RENDERED_REPORT` — PDF/image/print-style output;
- `STRUCTURED_RESULT_EXPORT` — CSV/JSON/XML/table package;
- `WORKBOOK_EXPORT` — spreadsheet representation;
- `SOURCE_LINKED_PACKAGE` — report plus source/evidence references where permitted;
- `LIVE_LINK_REFERENCE` — link to current/query surface, explicitly not frozen snapshot;
- `RESTATEMENT_PACKAGE` — replacement/corrected report and notice lineage.

Each export states whether it is:

- exact snapshot artifact;
- live/current reference;
- presentation-only reproduction;
- editable working copy;
- non-authoritative downstream copy.

---

# 6. Spreadsheet boundary

Spreadsheet export may permit downstream analysis, but:

- exported cells/formulas are not source authority;
- user edits create an external working copy;
- edited workbook cannot be re-imported as report correction or domain truth without a bounded import/proposal/command route;
- formulas/adjustments added after export are outside the ReportSnapshot;
- exact original workbook artifact remains identified;
- macros/scripts are not trusted instructions;
- hidden sheets/rows/formulas are included in content identity where material.

No shadow reporting ledger is created.

---

# 7. Issue and communication

Report issue binds:

- exact ReportSnapshot/ArtifactVersion;
- issuer principal/authority;
- purpose/audience;
- issue time;
- disclosure/access basis;
- recipient/distribution snapshot;
- transmittal/message identities;
- retention/evidence policy.

Provider acceptance is not delivery, receipt, acknowledgment, substantive agreement or domain reliance.

A recipient opening or acknowledging a report does not make its values authoritative source facts.

---

# 8. Restatement and prior issue

A restated report creates:

- new ReportExecution;
- new ReportSnapshot;
- new ArtifactVersion(s);
- RestatementRecord/cause/scope;
- relationship to prior snapshot/issues;
- changed result/member summary;
- updated quality/reconstruction state;
- required notice/communication where policy requires.

Prior issued artifact remains historically what was issued.

A live link may show the restated current report, but must not silently replace the historical issued artifact identity.

---

# 9. Withdrawal and supersession

A report may be:

- active/current;
- superseded;
- withdrawn from future reliance;
- restated;
- access-restricted;
- disposed under retention policy.

Withdrawal/supersession:

- preserves identity/history;
- does not delete prior issue/communication evidence;
- does not automatically reverse decisions made in reliance;
- may trigger owning-domain review/correction through bounded operations;
- exposes reason/authority/time.

---

# 10. Reconstruction levels

Every snapshot/artifact states one:

- `EXACT_RECONSTRUCTABLE`;
- `VALUE_REPRODUCIBLE_SOURCE_LIMITED`;
- `SNAPSHOT_VERIFIABLE_NOT_RECALCULABLE`;
- `LINEAGE_ONLY_LIMITED`;
- `RECONSTRUCTION_BLOCKED_OR_UNKNOWN`.

A disposed source payload may reduce future reconstruction level but never changes the original report values or issue facts.

The current level must be visible and may differ from the level at issue.

---

# 11. Access and inference

Snapshot/export access is evaluated independently from current live-report access.

Rules include:

- source restrictions propagate;
- aggregate disclosure requires explicit policy;
- supplier/bid confidentiality preserved;
- historical access may be restricted/revoked under policy;
- issue to one audience does not authorize forwarding to another;
- external export/residency rules apply;
- small-population/inference risk assessed;
- cross-tenant export prohibited.

---

# 12. Data/definition dependency validation

Before issue or activation, validate:

- all MetricDefinition/ProjectionDefinition dependencies active/compatible;
- no retired/renamed source member unresolved;
- source cut complete under required use;
- quality thresholds satisfied;
- required evidence/reconstruction basis present;
- access/disclosure policy valid;
- renderer/export member mapping complete;
- no hidden stale/mixed/partial limitation suppressed.

Official-product dependency validators are evidence that model changes can break downstream reports, but P1.8 owns the semantic rule independently of any vendor tool.

---

# 13. Machine-readable report manifest

Every issued/exported load-bearing report has a manifest containing:

- report/snapshot/artifact identities;
- definition versions;
- source cut;
- metrics/results/members;
- values/value states/units/currencies;
- time/actual/status families;
- quality/limitations;
- access/disclosure;
- content integrity;
- issue/communication linkage;
- restatement/supersession lineage;
- reconstruction level.

The human-rendered file may summarize this, but the machine-readable manifest preserves exact meaning.

---

# 14. Prohibitions

- no live URL as historical issued artifact;
- no regenerated current view replacing prior issue;
- no export timestamp as source/as-of time;
- no user-edited workbook as report truth;
- no format conversion changing metric values/membership silently;
- no issue/delivery acknowledgment as source-domain acceptance;
- no removed sensitivity/limitation labels on export;
- no restatement deleting prior report;
- no evidence disposition hiding reduced reconstruction quality;
- no public/share link bypassing tenant/context access;
- no report artifact becoming command or business event automatically.

---

# 15. Hostile scenarios

Test at minimum:

1. live dashboard changes after issue;
2. PDF issued before source correction;
3. corrected report later issued;
4. old link opens current report;
5. workbook edited after export;
6. workbook re-uploaded;
7. template changes only;
8. column order changes;
9. locale/timezone formatting changes;
10. values unchanged but quality worsens;
11. evidence disposed;
12. report recalculation impossible;
13. snapshot still verifiable;
14. report withdrawn;
15. decision relied on withdrawn report;
16. recipient acknowledges receipt;
17. provider says sent but delivery unknown;
18. recipient forwards report;
19. access revoked later;
20. supplier-confidential detail exported;
21. small aggregate reveals competitor price;
22. CSV truncates rows;
23. export omits limitation codes;
24. hidden spreadsheet formulas altered;
25. dependency renamed;
26. deprecated metric still used;
27. stale source passes rendering;
28. partial page exported as full;
29. cross-tenant share link;
30. AI summarizes old snapshot using current values.

---

# 16. Exit condition

This contract may enter the integrated P1.8 candidate when live queries, immutable snapshots, artifacts, issues, communications and restatements remain distinct and every issued result is reconstructable or honestly limitation-classified without becoming source-domain truth.
