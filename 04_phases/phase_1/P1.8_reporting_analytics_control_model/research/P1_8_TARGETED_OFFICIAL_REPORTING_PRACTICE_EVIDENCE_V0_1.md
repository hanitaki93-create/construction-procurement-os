# P1.8 — Targeted Official Reporting Practice Evidence v0.1

**Date:** 2026-08-01  
**Status:** TARGETED SECONDARY EVIDENCE / NON-BINDING  
**Scope:** reporting semantic versioning, refresh/source-cut visibility, dependency validation, export identity and current AI limitations  
**Authority class:** E5 — OFFICIAL PRODUCT / PLATFORM DOCUMENTATION

---

# 1. Purpose

This evidence note records only current official-product practices that materially inform unresolved P1.8 reporting semantics.

It is not a competitor feature inventory and does not establish product scope, business authority or reliability.

Frozen contractor/domain semantics and accepted ADRs outrank this evidence.

---

# 2. Sources reviewed

## Microsoft Power BI

1. **Use semantic model version history — Microsoft Learn**  
   Retrieved 2026-08-01.  
   Official page: `learn.microsoft.com/en-us/power-bi/transform-model/service-semantic-model-version-history`

2. **Data refresh in Power BI — Microsoft Learn**  
   Retrieved 2026-08-01.  
   Official page: `learn.microsoft.com/en-us/power-bi/connect-data/refresh-data`

3. **Export Power BI reports to PDF — Microsoft Learn**  
   Retrieved 2026-08-01.  
   Official page: `learn.microsoft.com/en-us/power-bi/collaborate-share/end-user-pdf`

4. **Download a report from the Power BI service — Microsoft Learn**  
   Retrieved 2026-08-01.  
   Official page: `learn.microsoft.com/en-us/power-bi/create-reports/service-export-to-pbix`

## Google Looker

5. **Introduction to LookML — Google Cloud Documentation**  
   Retrieved 2026-08-01.  
   Official page: `cloud.google.com/looker/docs/what-is-lookml`

6. **Using version control and deploying — Google Cloud Documentation**  
   Retrieved 2026-08-01.  
   Official page: `cloud.google.com/looker/docs/version-control-and-deploying-changes`

7. **Content validation — Google Cloud Documentation**  
   Retrieved 2026-08-01.  
   Official page: `cloud.google.com/looker/docs/content-validation`

8. **Continuous Integration Content Validator — Google Cloud Documentation**  
   Retrieved 2026-08-01.  
   Official page: `cloud.google.com/looker/docs/ci-content-validator`

## SAP Analytics Cloud

9. **Undo, Redo, and Revert Changes to Versions — SAP Help Portal**  
   Retrieved 2026-08-01.  
   Official page version observed: 2026.15.

---

# 3. Evidence observations

## EVD-P18-OFF-01 — semantic-model version and data freshness are separate

Power BI records semantic-model versions and separately records/refers to data refresh history.

Restoring a semantic-model version can leave data outdated until refresh.

### Architecture implication

P1.8 must keep distinct:

- definition/model version;
- projection execution/build identity;
- source cut and freshness;
- rendered report identity.

A restored or versioned model does not prove the report data is current or historically reproducible.

### Classification

`OFFICIAL_PRACTICE_CORROBORATES_CANDIDATE`

---

## EVD-P18-OFF-02 — imported semantic models are point-in-time copies

Power BI describes imported semantic models as point-in-time copies that require refresh to obtain source changes.

Full and partial refreshes are distinct, and refresh attempts have separate history/status.

### Architecture implication

P1.8 must treat cache/materialized/warehouse state as projection state, never source authority.

A result must expose:

- source cut;
- refresh/build identity;
- full versus partial population behavior;
- failed or incomplete refresh status;
- freshness limitation.

### Classification

`OFFICIAL_PRACTICE_CORROBORATES_CANDIDATE`

---

## EVD-P18-OFF-03 — model refresh and query-cache refresh may differ

Power BI documents separate data-load and query-cache/tile refresh activities.

### Architecture implication

A displayed visual timestamp cannot by itself establish source freshness.

P1.8 must distinguish:

- source data cut;
- semantic/projection build;
- query/cache materialization;
- presentation render time.

### Classification

`OFFICIAL_PRACTICE_CORROBORATES_CANDIDATE`

---

## EVD-P18-OFF-04 — centralized semantic definitions are version-controlled

Looker uses LookML projects to define dimensions, aggregates, calculations and relationships. Projects are generally version-controlled through Git, with development and production branches.

### Architecture implication

Central, versioned metric/projection definitions reduce repeated hidden logic.

However, LookML permits broad modeling expressions and ad hoc query construction; that product practice does not justify arbitrary tenant-authored formulas or SQL in this OS.

### Classification

`USEFUL_PATTERN_WITH_SCOPE_REJECTION`

---

## EVD-P18-OFF-05 — model changes can break dependent reports

Looker Content Validator identifies Looks and dashboards that reference removed or renamed model objects. Official documentation warns that bulk fixes can affect many dependent reports and may break production content.

### Architecture implication

P1.8 must include dependency/conformance validation when:

- metric/projection definitions change;
- source fields/event types change;
- dimensions/identities are renamed or remapped;
- report definitions depend on retired members.

A semantic change cannot be treated as a harmless dashboard edit.

### Classification

`OFFICIAL_PRACTICE_CORROBORATES_CANDIDATE`

---

## EVD-P18-OFF-06 — development and production semantic states differ

Looker validation behavior depends on whether validation occurs against development or production model state.

### Architecture implication

P1.8 must keep distinct:

- draft definition;
- evidence-review definition;
- active production definition;
- deprecated/retired definition;
- issued report bound to exact active version at issue.

A draft semantic version cannot silently govern production reports.

### Classification

`OFFICIAL_PRACTICE_CORROBORATES_CANDIDATE`

---

## EVD-P18-OFF-07 — exported artifacts are distinct portable copies

Power BI documents PDF and PBIX/report exports as files that may be shared or archived separately from the live service. Sensitivity labels and encryption can carry to PDF exports where configured.

### Architecture implication

P1.8 must assign independent identity to:

- report snapshot;
- generated artifact;
- format/render version;
- exact content identity;
- access/disclosure marking;
- issue/transmittal occurrence.

A live report URL and an exported artifact are not interchangeable historical evidence.

### Classification

`OFFICIAL_PRACTICE_CORROBORATES_CANDIDATE`

---

## EVD-P18-OFF-08 — vendor version history is operationally bounded

Official product version-history features have storage/retention/availability limitations and may overwrite or delete older versions under product-specific conditions.

### Architecture implication

Vendor/model version history alone cannot satisfy P1.6 ReconstructionAnchorTest or P1.8 issued-report reconstruction.

The OS must preserve its own semantic version identity, source cut, snapshot identity and evidence limitation state.

### Classification

`OFFICIAL_LIMITATION_SUPPORTS_STRONGER_OS_CONTRACT`

---

## EVD-P18-OFF-09 — published planning versions can have different mutability semantics

SAP Analytics Cloud documents private/public/tracing versions and notes that some changes can be reverted before publication but not after publication.

### Architecture implication

The useful pattern is separation among:

- working/draft versions;
- shared/review versions;
- published/issued versions.

P1.8 must not inherit planning-writeback semantics into reporting truth. A report remains a projection/snapshot and cannot become a writable commercial-planning version unless a later bounded domain explicitly owns that planning fact.

### Classification

`USEFUL_PATTERN_WITH_AUTHORITY_REJECTION`

---

# 4. Practices explicitly not adopted

P1.8 does not adopt from current products:

- arbitrary modeling languages for tenant users;
- generic SQL/measure authoring;
- dashboard-level writeback as business truth;
- vendor-limited version history as contractual reconstruction proof;
- automatic assumption that refresh success means complete authoritative truth;
- cross-tenant benchmarking or shared supplier reputation;
- platform-specific report, model or cache terminology as canonical domain language;
- AI-generated narrative as authoritative explanation.

---

# 5. Evidence-supported P1.8 controls

The reviewed evidence supports the following candidate controls:

1. definition version ≠ data/source freshness;
2. source cut/build/cache/render times remain distinct;
3. semantic definitions are centrally versioned;
4. semantic dependency validation is mandatory before activation;
5. draft/review/active semantic states remain distinct;
6. report snapshot ≠ export artifact ≠ live report;
7. exported files retain independent content/access identity;
8. vendor version history is not sufficient reconstruction evidence;
9. model or definition change requires impact analysis on dependent reports;
10. current official practices do not justify arbitrary formula or AI authority.

---

# 6. Remaining evidence limitations

This targeted review does not prove:

- contractor-specific KPI priorities;
- legally required UAE/GCC reporting packs;
- one universal supplier-performance score;
- causality or predictive reliability;
- exact portfolio FX/reporting practice for the beachhead;
- report retention duration;
- that any named BI/reporting platform should be used;
- that a public API, warehouse or dashboard tool is required in V1.

Those remain governed by frozen semantics, primary contractor evidence and later targeted evidence where necessary.

---

# 7. Disposition

Use this evidence in:

- projection/version/restatement hostile audit;
- data-quality/freshness contract;
- report export/snapshot/evidence contract;
- dependency validation and change-impact rules;
- Claude audit context.

Do not use it to select technology or expand scope.
