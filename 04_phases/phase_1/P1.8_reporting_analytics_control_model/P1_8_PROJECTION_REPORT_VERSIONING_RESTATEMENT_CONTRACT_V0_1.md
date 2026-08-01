# P1.8 — Projection, Report Versioning and Restatement Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**Parent:** `P1_8_WORKPLAN_V0_1.md`  
**Control baseline:** `P1_8_CONTROL_BASELINE_AND_EVIDENCE_PLAN_V0_1.md`  
**Metric contract:** `P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md`  
**P1.7:** PASS / CLOSED / FROZEN  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract defines how metric projections, reports, exports and issued reporting artifacts are identified, versioned, calculated, rebuilt, corrected, restated, superseded and reconstructed without:

- rewriting authoritative source history;
- silently changing prior report meaning;
- replacing an issued snapshot with a live view;
- confusing source correction with formula change;
- confusing recalculation with restatement;
- allowing cache, warehouse or materialized-view state to become business authority;
- hiding new event types, mapping changes, late data or migration remediation inside the same apparent KPI;
- weakening evidence, access, retention or residency controls;
- creating a generic BI, report-builder or data-warehouse platform.

The governing rule is:

> **A projection is a reproducible derivation under an exact semantic version and source cut. An issued report or export is an immutable identified snapshot of specific projection results. Later source corrections, definition changes or improved data create explicit recalculation, restatement, supersession or limitation history; they never mutate the prior issued result silently.**

---

# 2. Precedence and inherited constraints

This contract is governed by:

1. frozen P1.4 authority, tenancy, access, effective-period and correction semantics;
2. frozen P1.5 commercial event/effect, temporal, money, actual-family and history-preserving correction semantics;
3. frozen P1.6 EvidenceVersion, SourceLocator, RelianceBinding, issued-artifact, redaction and disposition semantics;
4. frozen P1.7 query consistency, event separation, PublicationIntent, migration, partiality and external-source limitation semantics;
5. `P1_8_ENTRY_HANDOFF_V0_1.md`;
6. `P1_8_WORKPLAN_V0_1.md`;
7. `P1_8_CONTROL_BASELINE_AND_EVIDENCE_PLAN_V0_1.md`;
8. `P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md`.

This contract cannot reinterpret:

- authoritative source facts or their OWN / MIRROR / REFERENCE / OUT status;
- one authoritative source/writer per effective period;
- immutable source events and history-preserving corrections;
- physical, certified/commercial, accounting-posted and paid/cash actual separation;
- effective-time versus recorded-time meaning;
- exact-decimal, currency, FX-purpose and calculation-policy rules;
- EvidenceVersion / SourceLocator / RelianceBinding;
- exact issued artifact and member-set identity;
- query cut, pagination, partiality, freshness, mixed-time and indeterminate-effect semantics;
- access, tenant, project, ContractingAuthorityContext, residency and cross-tenant isolation;
- `DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation`;
- report, projection, export or warehouse state never being business authority.

No dashboard, reporting engine, warehouse implementation, export format or AI summary may choose a different meaning.

---

# 3. Core distinctions

P1.8 freezes the following distinctions:

- authoritative source fact ≠ projection contribution;
- `MetricDefinitionVersion` ≠ `ProjectionDefinitionVersion`;
- projection definition ≠ projection execution;
- projection execution ≠ projection result;
- projection result ≠ report member automatically;
- report definition ≠ report execution;
- report execution ≠ report snapshot;
- live query ≠ materialized projection ≠ issued report snapshot;
- rebuild ≠ source correction;
- recalculation ≠ semantic-version change;
- recalculation ≠ restatement automatically;
- restatement ≠ source-history rewrite;
- restatement ≠ withdrawal automatically;
- supersession ≠ deletion;
- presentation-only revision ≠ semantic report revision;
- source-fact correction ≠ metric-definition correction;
- implementation defect fix ≠ business-semantic change automatically;
- late-arriving fact ≠ backdated rewrite;
- new event-type support ≠ automatic historical applicability;
- projection cache ≠ projection authority;
- export file ≠ live report link;
- export format ≠ report semantic version;
- issue time ≠ source as-of time;
- report member set ≠ all currently visible results;
- exact reconstruction ≠ lineage-only reconstruction;
- evidence disposition ≠ permission to regenerate missing historical content from current state;
- access to an aggregate ≠ access to all restricted source facts;
- natural-language explanation ≠ report result;
- correction note ≠ corrected value;
- annotation ≠ business or projection state.

---

# 4. Semantic object model

## 4.1 `ProjectionDefinition`

A stable semantic family describing how one or more accepted `MetricDefinitionVersion`s are transformed into a reproducible result structure.

It may define:

- one metric result;
- a grouped/dimensional metric result set;
- a balance or flow projection;
- a deterministic status/control-observation projection;
- a report-ready result family;
- a historical/as-of reconstruction family.

It never owns source business truth.

## 4.2 `ProjectionDefinitionVersion`

An immutable semantic version binding all load-bearing projection meaning, including:

- stable `ProjectionKey` and version;
- purpose and permitted decision use;
- accepted `MetricDefinitionVersion` dependencies;
- source fact/event families;
- projection grain and result grain;
- dimensional hierarchy and grouping rules;
- population and contribution resolution;
- consistency/as-of cut semantics;
- time and actual/status family;
- currency, FX and calculation policies;
- quality and limitation propagation;
- correction/recalculation/restatement behavior;
- access, sensitivity and disclosure;
- applicability/effective period;
- predecessor/successor lineage;
- ADR/evidence/change basis;
- explicit non-meaning.

A `ProjectionDefinitionVersion` is required even where the projection appears to be a simple direct display of one metric, because grouping, source cut, quality and dimensional behavior remain load-bearing.

## 4.3 `ProjectionExecution`

One identified execution of one exact `ProjectionDefinitionVersion`.

It binds:

- `ProjectionExecutionId`;
- projection key/version;
- exact dependent metric versions;
- exact source/query cut;
- requested and resolved scope/context;
- source/event/config/authority/conformance versions as material;
- execution recorded time;
- evaluation as-of/effective/recorded time basis;
- exact calendar/timezone/FX/calculation versions;
- input/result completeness and limitation state;
- execution mode;
- full versus incremental basis;
- rebuild/replay/restatement cause where applicable;
- software/calculation implementation identity where needed to diagnose defects, without making implementation identity semantic authority;
- lineage to prior execution where applicable.

## 4.4 `SourceCutManifest`

A reproducible declaration of the source population and temporal/consistency boundary used by one projection or report execution.

It includes as applicable:

- tenant/project/ContractingAuthorityContext;
- source domains and authoritative external systems;
- source event/fact families and semantic versions;
- source effective/recorded/observed cut;
- query consistency mode;
- pagination/completeness proof;
- external freshness/conformance states;
- included correction/supersession horizon;
- excluded/unknown/unavailable source families;
- mixed-time component cuts;
- migration/evidence/reconciliation limitations;
- `EFFECT_INDETERMINATE` inclusion/exclusion basis;
- stable source-set or deterministic reconstruction basis.

A source cut is not merely a timestamp. It states what was known, included and authoritative under the declared query contract.

## 4.5 `ProjectionResult`

The result of one `ProjectionExecution`.

It includes:

- stable result identity;
- projection key/version and execution identity;
- result scope/grain/dimension coordinates;
- metric result references and/or governed result members;
- value/state/classification;
- unit/currency;
- effective/as-of/recorded basis;
- source-authority composition;
- completeness/freshness/limitation state;
- contribution/population summary;
- source-cut manifest reference;
- correction/recalculation/restatement lineage;
- access/disclosure classification;
- explicit non-meaning or decision-use restrictions where material.

A projection result is not a source-domain fact and cannot be edited to fix the underlying business record.

## 4.6 `ReportDefinition`

A stable semantic report family defining which projections/metrics, scopes, sections, comparisons, totals, notes and mandatory limitation disclosures compose a report independent of visual layout technology.

It states:

- report purpose and permitted decision use;
- intended audience/access class;
- mandatory and optional semantic members;
- member ordering/grouping semantics where meaningful;
- scope and population rules;
- required source/as-of cut behavior;
- mandatory definitions/quality/limitation disclosures;
- issue/export eligibility;
- confidentiality/residency rules;
- correction/restatement/supersession policy;
- whether signing/approval/acknowledgment is required by another domain or communication rule.

A report definition does not authorize a business action.

## 4.7 `ReportDefinitionVersion`

An immutable semantic version of a `ReportDefinition`.

A new semantic version is required when any load-bearing member, scope, calculation, time basis, comparability, disclosure, quality rule or decision use changes.

Visual formatting, spacing, font or non-semantic label changes may be presentation revisions without a new semantic version only if no load-bearing meaning or member identity changes.

## 4.8 `ReportExecution`

One identified assembly/evaluation of one `ReportDefinitionVersion` using exact projection executions/results and one source/report cut.

It binds:

- `ReportExecutionId`;
- report key/version;
- included projection and metric versions;
- exact member/result identities;
- source cut and report as-of basis;
- execution time;
- access/audience/disclosure basis;
- completeness and limitation state;
- restatement/supersession cause where applicable;
- presentation template/version where needed to reconstruct an issued artifact.

A report execution may remain non-issued and mutable only by replacement with a new execution. Its execution history is not edited in place once used for an issued/exported snapshot.

## 4.9 `ReportSnapshot`

An immutable identified semantic member set and result state at a declared report cut.

It binds:

- `ReportSnapshotId`;
- report definition/version;
- report execution identity;
- exact member/result identities and ordering where material;
- source-cut manifest;
- report as-of/effective/recorded basis;
- generated/issue/export times separately;
- exact quality and limitation state;
- exact access/disclosure classification;
- content identity or deterministic generation basis;
- evidence/artifact identity where materialized;
- issue/publication/withdrawal/supersession/restatement lineage;
- recipient/audience or publication profile where issued;
- signature/approval/acknowledgment references only where applicable under separate owning semantics.

A report snapshot is never a mutable URL to a current live report.

## 4.10 `ReportArtifact`

A concrete rendered/exported representation of one `ReportSnapshot`, such as PDF, spreadsheet, CSV, structured data package or machine-readable document.

It binds:

- artifact identity and format;
- exact report snapshot;
- template/formatter/serializer/canonicalization/locale/timezone versions as material;
- content identity/hash/integrity assertion;
- member/attachment set;
- redaction/disclosure profile;
- creation/issue/export occurrence;
- storage/reference/materialization basis;
- supersession/withdrawal lineage.

A format conversion creates a new artifact representation but does not create a new semantic report snapshot unless semantic content/member meaning changes.

## 4.11 `RestatementRecord`

A governed record explaining why a prior metric/projection/report result has a later restated result.

It binds:

- `RestatementId`;
- affected result/snapshot identities;
- restatement cause class;
- authoritative source correction or definition/change basis;
- affected scope/time/population;
- original and new definition/execution/snapshot identities;
- material value/state differences;
- authority approving or acknowledging the restatement where required;
- issue/communication requirements;
- whether the prior report remains valid historical evidence, is superseded for current reliance, or is withdrawn for a stated reason;
- limitations and unresolved differences.

A `RestatementRecord` never edits the prior report or source history.

---

# 5. Projection execution modes

Every projection execution declares exactly one mode.

## 5.1 `LIVE_QUERY`

Calculated on demand against a declared source/query cut.

Characteristics:

- result may differ on later execution because source facts, freshness, correction history or definition version changed;
- not an issued historical snapshot by default;
- must expose as-of/cut/definition/quality state;
- cannot be cited later as an exact historical result unless preserved as a snapshot/result identity.

## 5.2 `MATERIALIZED_CURRENT_PROJECTION`

Persisted or cached current projection for performance/availability.

Characteristics:

- cache/materialized state is not authority;
- source cut and build identity are mandatory;
- freshness and rebuild status are visible;
- stale or failed rebuild cannot masquerade as current;
- rebuild may replace current cache while preserving execution history required for audit/issued snapshots.

## 5.3 `AS_OF_RECONSTRUCTION`

Calculated for an explicit historical effective-time or recorded-time cut.

Characteristics:

- binds exact historical semantic versions and source-history rules;
- current configuration/identity/mapping cannot silently reinterpret the past;
- later known corrections are included or excluded only under the declared reconstruction basis;
- if exact historical evidence is unavailable, limitations are explicit.

## 5.4 `SCHEDULED_CONTROL_PROJECTION`

Periodic deterministic execution used for control observations, aging, exception or operational visibility.

Characteristics:

- schedule frequency is operational, not semantic authority;
- missed run does not imply no exception;
- result remains a projection/control observation;
- alerts produced from it do not write domain status.

## 5.5 `REPORT_SNAPSHOT_BUILD`

Execution performed to create a candidate immutable report snapshot.

Characteristics:

- exact source and result member set freezes when the snapshot is established;
- completeness/limitation checks must pass the report’s issue policy or be explicitly disclosed;
- later changes require new snapshot/restatement/supersession.

## 5.6 `RECALCULATION`

Re-execution under the same accepted semantic definition/version because source facts, corrections, late data, quality state or materialization were updated.

Characteristics:

- does not imply prior issued snapshot changes;
- produces a new execution/result identity;
- cause and source delta are recorded;
- may lead to a restatement decision if prior issued or relied-on results are materially affected.

## 5.7 `RESTATEMENT_BUILD`

Execution specifically intended to establish a new restated result/report related to a prior result/snapshot.

Characteristics:

- requires a `RestatementRecord` basis;
- preserves original result/snapshot;
- states why and how the result changed;
- issue/publication of the restatement is separate from calculation.

## 5.8 `HISTORICAL_REPLAY_VALIDATION`

Controlled re-execution to validate reproducibility or diagnose divergence.

Characteristics:

- no new business or report effect automatically;
- compares expected versus reproduced result;
- differences are classified as source change, definition/version difference, implementation defect, evidence disposition limitation, conformance change or unknown;
- cannot overwrite the original result.

---

# 6. Query cut and source membership

Every projection/report execution binds one accepted P1.7 consistency mode:

- `ATOMIC_DOMAIN_SNAPSHOT`;
- `CONSISTENT_AS_OF_CUT`;
- `CAUSALLY_BOUND_RESULT_SET`;
- `NON_ATOMIC_MIXED_OBSERVATION` with component cuts and limitations.

## 6.1 No false simultaneity

Values appearing together in one report are not automatically simultaneous.

Where the result set is mixed-time:

- each material component exposes its cut/freshness;
- the report is marked `MIXED_TIME`;
- comparisons or totals requiring simultaneity are blocked or explicitly limited;
- a presentation layer cannot remove the limitation.

## 6.2 Pagination and complete population

A projection cannot claim a complete population unless:

- all required pages/partitions are retrieved or otherwise proven complete;
- duplicates and cursor restarts are resolved;
- late changes during pagination are handled under the declared consistency contract;
- excluded/unavailable segments are disclosed.

## 6.3 External sources

Every load-bearing external component retains:

- authoritative external source identity;
- source version or exact observation basis;
- observed/fetched time;
- freshness threshold/version;
- conformance state;
- conflict/reconciliation state;
- materialization/reconstruction limitation.

A provider’s current pointer or mutable report cannot establish an exact historical source version without P1.6-compliant reconstruction/materialization.

## 6.4 Indeterminate effects

If `EFFECT_INDETERMINATE` may affect a projection/report:

- the definition states inclusion/exclusion policy;
- included and excluded positions are separately quantified/classified where material;
- no total may appear unconditional if it depends on unresolved external effect existence;
- a later resolution may trigger recalculation and, where previously issued/relevant, restatement assessment.

---

# 7. Definition and change classification

Every change is classified before activation.

## 7.1 `PRESENTATION_ONLY_CHANGE`

Examples:

- typography;
- spacing;
- non-semantic layout;
- file format conversion;
- visual ordering that does not alter grouping, emphasis or decision meaning;
- corrected spelling that does not change controlled terminology.

Rules:

- semantic report/projection version may remain;
- presentation/template/artifact version changes;
- prior artifact remains preserved if issued;
- no values/member identities change.

## 7.2 `NON_SEMANTIC_METADATA_CHANGE`

Examples:

- internal owner/contact;
- explanatory note with no interpretation change;
- corrected reference link;
- implementation documentation.

Rules:

- definition semantic version may remain only if no load-bearing meaning changes;
- change history remains traceable.

## 7.3 `PROSPECTIVE_SEMANTIC_CHANGE`

A meaning change applies only from an explicit effective period/date onward.

Examples:

- new metric population for future tenders;
- new quality threshold for future reporting periods;
- new classification rule for newly created cases;
- new event family relevant only after activation.

Rules:

- new definition version;
- exact applicability/effective period;
- old results retain old meaning;
- mixed-version aggregate behavior is explicit.

## 7.4 `RETROSPECTIVE_SEMANTIC_RESTATEMENT`

A newly accepted semantic rule is intentionally applied to historical source facts.

Examples:

- corrected formula definition;
- inclusion rule determined to have been semantically wrong;
- newly accepted event type changes historical balance meaning;
- corrected FX-purpose interpretation;
- corrected double-count rule.

Rules:

- new definition version;
- explicit historical applicability/recalculation scope;
- `RestatementRecord` required for affected issued/reliance-bearing results;
- original results remain preserved;
- no silent dashboard replacement.

## 7.5 `SOURCE_FACT_CORRECTION`

An owning domain or authoritative external source corrects/reverses/supersedes a source fact under frozen correction semantics.

Rules:

- projection definition may remain unchanged;
- new projection execution/result reflects corrected source history under declared cut;
- affected issued/reliance-bearing reports undergo materiality/restatement assessment;
- original source/report history remains.

## 7.6 `LATE_ARRIVING_SOURCE_FACT`

A source fact was valid for an earlier effective period but recorded/received later.

Rules:

- effective-time and recorded-time projections may differ legitimately;
- current reconstruction includes it according to declared cut basis;
- prior issued snapshots remain historically accurate to their known/source cut unless the report’s stated basis promised later-effective completeness;
- restatement policy determines whether a new report is required.

## 7.7 `IDENTITY_OR_MAPPING_CORRECTION`

A source identity or mapping used by a projection changes under governed correction.

Rules:

- historical contribution use is preserved;
- affected aggregation/attribution is recalculated under an explicit corrected basis;
- no silent movement of prior results between supplier/project/component identities;
- issued reports require restatement assessment where material.

## 7.8 `MIGRATION_LIMITATION_REMEDIATION`

Previously reference-only, unknown or migration-limited data becomes better qualified or natively accepted.

Rules:

- prior limited result remains preserved;
- new executions expose improved quality/completeness;
- historical semantic meaning cannot be fabricated;
- restatement identifies the limitation change and whether values changed.

## 7.9 `IMPLEMENTATION_DEFECT_FIX`

The physical calculation implementation failed to execute the accepted semantic definition correctly.

Rules:

- semantic definition version may remain unchanged only if the accepted meaning was already unambiguous and the implementation was demonstrably non-conforming;
- defect, affected executions/results and corrected execution identity are recorded;
- issued/reliance-bearing results require restatement/withdrawal assessment;
- this classification cannot be used to hide an ambiguous or changed semantic rule.

## 7.10 `SOURCE_CONFORMANCE_OR_EVIDENCE_CHANGE`

Provider/connector/evidence conformance changes current confidence or reconstruction ability.

Rules:

- historical bindings are not silently invalidated or rebound;
- future capability may be limited/blocked;
- current projection quality/limitation may change;
- affected historical reports retain their original basis with newly visible evidence/conformance limitation where appropriate;
- restatement occurs only if values/meaning or permitted reliance changes under a governed decision.

---

# 8. Projection semantic-version rules

A new `ProjectionDefinitionVersion` is mandatory when any load-bearing projection meaning changes, including:

- dependent metric definition/version;
- source event/fact family;
- source authority basis;
- source semantic-version compatibility;
- projection grain or result grain;
- contribution/population resolution;
- inclusion/exclusion;
- grouping/dimensional hierarchy;
- formula/calculation order;
- point/flow/time/as-of basis;
- actual/status family;
- calendar/timezone;
- currency/FX purpose/conversion stage;
- quality threshold or quality propagation;
- mixed-time/completeness behavior;
- indeterminate-effect treatment;
- correction/rebuild/restatement behavior;
- access/disclosure/residency;
- explicit decision use or non-meaning;
- historical applicability of a new event type;
- anti-double-count contribution path.

The following alone do not require a semantic projection version:

- cache technology;
- warehouse engine;
- query language;
- index design;
- parallelization strategy;
- serializer implementation where semantic output is unchanged;
- presentation format.

Physical optimization must pass reproducibility/conformance tests against the same semantic version.

---

# 9. Report semantic-version rules

A new `ReportDefinitionVersion` is mandatory when any of the following changes materially:

- report purpose or permitted decision use;
- mandatory semantic member set;
- member population/scope;
- metric/projection semantic version;
- total/subtotal/grouping meaning;
- time/as-of/cut behavior;
- actual/status/currency/comparability basis;
- quality/limitation disclosure requirements;
- access/audience/disclosure policy;
- issue eligibility;
- restatement/supersession behavior;
- controlled terminology affecting interpretation.

A presentation-only revision may use the same semantic report version only if:

- exact semantic member/result identities are unchanged;
- values are unchanged;
- member ordering does not change decision meaning;
- limitations are not reduced, obscured or reworded materially;
- no new implied conclusion is introduced;
- artifact/template version is preserved separately.

Changing a label from “certified value” to “paid value,” changing a date label from “generated” to “as of,” hiding excluded indeterminate amounts, or changing a denominator explanation is semantic, not presentation-only.

---

# 10. Recalculation semantics

## 10.1 Recalculation creates a new result

Every recalculation produces:

- a new `ProjectionExecutionId`;
- new result identities;
- exact cause classification;
- exact source/definition/config cut;
- prior execution lineage;
- difference summary where comparable.

It never edits prior execution/results in place.

## 10.2 Same definition, changed sources

Where authoritative source facts changed under the same semantic definition:

- the projection definition version remains;
- the new result reflects the new declared source cut;
- live/current projections may show the new result;
- prior report snapshots remain unchanged;
- restatement assessment is required for affected issued/reliance-bearing snapshots.

## 10.3 Same sources, changed definition

Where source history is unchanged but semantic meaning changes:

- new metric/projection/report definition version is required;
- a recalculation under the new version is not presented as the old result;
- historical application must be prospective or explicitly retrospective;
- issued reports require restatement/supersession treatment where affected.

## 10.4 Rebuild equivalence

A physical full or incremental rebuild is equivalent only if it yields the same governed result/member/quality state under the same semantic version and source cut.

If results differ:

- block silent replacement;
- classify source-cut difference, implementation defect, non-determinism, version mismatch, evidence loss or unknown divergence;
- preserve both executions and investigation history.

## 10.5 Failed/partial rebuild

A failed or partial rebuild:

- cannot replace a last known complete current projection without visible stale/failed status;
- cannot produce an issue-eligible snapshot unless the report explicitly permits and discloses the limitation;
- preserves exact failed/partial scope and error state;
- never implies zero or no change.

---

# 11. Restatement semantics

## 11.1 Restatement trigger

Restatement assessment is mandatory when a later change may materially alter an issued, externally shared, approved, relied-on or decision-critical report/result, including:

- source correction/reversal;
- late-arriving material fact;
- semantic definition correction/change applied historically;
- identity/mapping correction;
- anti-double-count correction;
- FX/calendar/calculation-policy correction;
- implementation defect;
- migration limitation remediation;
- evidence/conformance change affecting permitted reliance;
- resolution of material `EFFECT_INDETERMINATE` position;
- previously unknown/partial population becoming complete;
- access/redaction error.

## 11.2 Materiality does not erase history

A versioned `RestatementPolicy` may determine whether a change requires:

- no external restatement but internal recalculation history;
- visible revised/current result only;
- formal restated report;
- withdrawal and replacement;
- supplemental correction notice;
- owning-domain or governance escalation.

The policy cannot:

- mutate the prior snapshot;
- hide a material change;
- relabel a semantic change as formatting;
- reverse source-domain truth;
- claim no difference where comparability is unavailable.

## 11.3 Restatement classes

Every restatement uses one primary cause class:

- `SOURCE_CORRECTION_RESTATEMENT`;
- `LATE_DATA_RESTATEMENT`;
- `SEMANTIC_DEFINITION_RESTATEMENT`;
- `IDENTITY_MAPPING_RESTATEMENT`;
- `MIGRATION_QUALITY_RESTATEMENT`;
- `IMPLEMENTATION_DEFECT_RESTATEMENT`;
- `EVIDENCE_CONFORMANCE_RESTATEMENT`;
- `INDETERMINATE_EFFECT_RESOLUTION_RESTATEMENT`;
- `ACCESS_DISCLOSURE_RESTATEMENT`;
- `COMPOSITE_MULTI_CAUSE_RESTATEMENT` with enumerated causes.

## 11.4 Restated result relationship

A restated report/result must state:

- original snapshot/result identity;
- restated snapshot/result identity;
- cause;
- affected member/time/scope;
- old and new definition versions;
- source cut difference;
- value/state/quality difference where comparable;
- whether the original remains valid evidence of what was issued/known;
- whether current reliance must use the restatement;
- unresolved limitations;
- issue/communication status.

## 11.5 No silent current-link substitution

A link previously shared to an issued report cannot silently render the latest restated report under the old snapshot identity.

Allowed patterns include:

- immutable old snapshot plus visible superseded/restated notice;
- stable report-family landing page listing versions;
- explicit redirect that preserves and exposes the original identity and relationship;
- separate latest-current link that is never represented as the original issued artifact.

---

# 12. Issuance, publication, supersession and withdrawal

## 12.1 Snapshot establishment

A report snapshot freezes when it is:

- formally issued/published/exported for external or governed internal reliance;
- approved/signature-bound where required;
- attached to a governed decision/evidence binding;
- otherwise designated immutable under the report definition.

Draft previews may be replaced by new executions before freeze, but prior relied-on/communicated drafts may still require evidence preservation under P1.6.

## 12.2 Issue versus generation

Distinct:

- report execution completed;
- snapshot established;
- artifact generated;
- artifact issued/exported;
- delivery/receipt/acknowledgment;
- owning-domain reliance/action.

No issue or report distribution automatically creates a commercial effect unless an owning-domain rule separately does so.

## 12.3 Supersession

Supersession means a later snapshot/report is designated the governing current reference for a stated purpose.

It does not:

- delete the earlier snapshot;
- alter what was issued;
- rewrite prior source cuts;
- imply the earlier report was fraudulent or invalid unless explicitly stated;
- automatically reverse decisions previously made from it.

## 12.4 Withdrawal

Withdrawal is an explicit governed state with reason and authority.

It may be used for:

- confidentiality/access error;
- invalid calculation/semantic defect;
- wrong audience/disclosure;
- duplicate or accidental issue;
- governing decision to cease reliance.

Withdrawal:

- preserves snapshot/artifact identity and history;
- restricts future use/access according to policy;
- does not delete source facts or reverse business decisions automatically;
- may require replacement/restatement/notice.

## 12.5 PublicationIntent inheritance

Where a report snapshot/artifact is published through P1.7 integration/email channels:

- exact snapshot/artifact identity is bound to immutable `PublicationIntent`;
- retry uses the original artifact/recipient basis;
- restated/replacement report requires a new publication;
- target/audience changes cannot be hidden as a retry.

---

# 13. Report/export artifact integrity

Every load-bearing artifact binds:

- exact `ReportSnapshotId`;
- artifact format/version;
- content identity/integrity assertion;
- exact member/attachment set;
- generation/template/formatter/serializer versions where material;
- locale/timezone/currency display policy;
- limitation/disclosure text version;
- redaction profile;
- issue/export occurrence;
- source/report as-of information;
- supersession/restatement/withdrawal status.

## 13.1 Spreadsheet exports

A spreadsheet export must distinguish:

- authoritative/projection values;
- formulas included for transparency versus authoritative calculation source;
- editable presentation cells versus governed snapshot values;
- hidden rows/filters;
- excluded/partial data;
- source and definition versions.

Editing a downloaded spreadsheet never changes the product report or source truth.

If a re-uploaded edited workbook is accepted for any purpose, it enters as new external evidence/proposal/import under P1.6/P1.7 and never silently replaces the original snapshot.

## 13.2 CSV/structured exports

Structured exports include:

- schema/version;
- source/report snapshot identity;
- field semantic definitions or references;
- row/member identities;
- units/currencies/time basis;
- quality/limitation fields;
- completeness/pagination manifest;
- access/disclosure classification.

## 13.3 Human-readable reports

Human-readable artifacts must visibly expose at minimum where material:

- report title/version;
- report snapshot identity or traceable reference;
- as-of/source cut;
- generated/issued time separately;
- metric/projection version references;
- currency/FX basis;
- completeness/freshness/limitations;
- restated/superseded/withdrawn status;
- confidential/access classification.

---

# 14. Reproducibility and evidence-disposition levels

P1.8 does not require indefinite retention of every payload. It requires honest reconstruction capability under P1.6 retention/disposition rules.

Every report snapshot declares one current reproducibility level.

## 14.1 `EXACT_RECONSTRUCTABLE`

The exact semantic member set, source cut, definitions, source facts/evidence and generation basis remain available to reproduce the result/artifact within accepted deterministic tolerance.

## 14.2 `VALUE_REPRODUCIBLE_SOURCE_LIMITED`

Values/member set can be reproduced from retained authoritative history, but some original source payload or presentation evidence is no longer available.

Limitations are explicit.

## 14.3 `SNAPSHOT_VERIFIABLE_NOT_RECALCULABLE`

The exact issued snapshot/artifact and integrity/provenance remain, but source data needed for a fresh recalculation has been legitimately disposed or is unavailable.

The product can verify what was issued but cannot claim to regenerate it from current retained sources.

## 14.4 `LINEAGE_ONLY_LIMITED`

Only minimum permitted identity, definition, issue, disposition, value summary or tombstone lineage remains.

Exact value/member/artifact reconstruction is unavailable and must not be implied.

## 14.5 `RECONSTRUCTION_BLOCKED_OR_UNKNOWN`

Required source/definition/integrity basis is missing, conflicting or untrusted.

The report remains identifiable as a historical occurrence if evidence permits, but exact reliance/reconstruction is blocked or unknown.

A later retention or conformance change may reduce reproducibility level, but it never silently changes the historical report result or substitutes current data.

---

# 15. Source correction and temporal reconstruction

## 15.1 Effective-time view

An effective-time reconstruction answers what business-effective facts/effects apply at the stated cut under the declared correction/restatement basis.

It may include a correction recorded later if the reconstruction policy asks for the corrected effective position.

## 15.2 Recorded-time view

A recorded-time reconstruction answers what facts/events were recorded/known in the product by the stated recorded cut.

A later correction is excluded until its recorded time unless an explicit “current corrected interpretation of historical period” view is requested.

## 15.3 Known-at/issued basis

An issued report snapshot preserves its exact source cut and known/available basis at issue, even if a later current effective-time reconstruction differs.

The later corrected position does not make the original issue disappear; it may trigger a restatement.

## 15.4 Backdating

A backdated source-domain fact/correction:

- preserves its recorded time;
- uses governed effective-time authority;
- affects projections according to their temporal basis;
- cannot rewrite the report’s issue time or prior known-at cut;
- may require restatement assessment.

---

# 16. New event types and projection evolution

A newly introduced event/fact type must declare for every affected projection:

- compatible projection versions;
- prospective-only or retrospective applicability;
- historical source availability;
- contribution and anti-double-count behavior;
- correction/reversal treatment;
- result quality when historical coverage is incomplete;
- recalculation/restatement scope;
- ADR/change basis.

Default when unspecified:

- no historical applicability;
- block activation for affected load-bearing projection;
- do not silently include the new event type in current or historical totals.

A new event type may legitimately change a historical projection only through an explicit new projection definition/version and controlled restatement/recalculation decision.

---

# 17. Identity, hierarchy and aggregation correction

Where supplier, project, package, allocation, component, legal-entity or other identity/hierarchy mapping changes:

- original mapping/version used by each execution remains reconstructable;
- corrected mapping creates a new projection execution under explicit basis;
- historical results are not silently moved between buckets;
- double-count/contribution identity is re-evaluated;
- cross-project/portfolio comparability is re-evaluated;
- issued snapshots undergo restatement assessment where material;
- access/disclosure implications are checked before showing corrected aggregates.

A current hierarchy view cannot be used to claim that an old issued report used the same hierarchy.

---

# 18. Quality and limitation propagation

Projection/report quality cannot be stronger than its material source/member basis unless an accepted deterministic rule justifies the derived classification.

Every projection/report defines:

- component quality inputs;
- blocking versus warning limitations;
- quality aggregation rule;
- incomplete population treatment;
- mixed-time treatment;
- stale/unavailable source treatment;
- migration/evidence limitation treatment;
- reconciliation/identity conflict treatment;
- indeterminate-effect treatment;
- restricted/redacted-source treatment;
- issue eligibility by quality state.

Hard rules:

- missing is not zero;
- partial is not complete;
- stale is not current;
- mixed-time is not simultaneous;
- migration-limited is not native history;
- snapshot-verifiable is not recalculable;
- an inaccessible source does not automatically permit disclosure of its contribution through an aggregate;
- a presentation layer cannot suppress a mandatory limitation;
- restatement cannot claim improved certainty where evidence remains unresolved.

---

# 19. Access, disclosure, redaction and residency

## 19.1 Source-derived access

Report access is evaluated against:

- tenant/project/ContractingAuthorityContext;
- report audience policy;
- source fact/evidence sensitivity;
- aggregation-disclosure rule;
- external-party grant where applicable;
- legal/confidentiality/redaction restrictions;
- residency/export constraints.

## 19.2 Aggregate disclosure

An aggregate may be disclosed without source-row access only where an explicit accepted aggregation-disclosure policy proves that:

- restricted facts cannot be reconstructed or inferred beyond allowed risk;
- small-cell or unique-value disclosure is controlled;
- cross-tenant or cross-project leakage is impossible;
- supplier confidentiality is preserved;
- dimension drill-down is bounded;
- report purpose permits it.

Default: source restrictions propagate.

## 19.3 Redacted report artifacts

A redacted artifact is a derived representation of one report snapshot.

It binds:

- original snapshot identity;
- redaction profile/version;
- exact redacted member/field treatment;
- authority and purpose;
- integrity/content identity;
- access/distribution history.

Redaction does not create a new unredacted semantic truth and cannot silently alter metric meaning.

## 19.4 Residency and export

Report generation/export cannot move tenant-hosted data outside the declared residency/export boundary merely because the output is aggregated or “reporting data.”

Every report/export path remains classified under P1.4/P1.6/P1.7 residency and disclosure rules.

---

# 20. Live/current report behavior

A live/current report must visibly expose:

- report/metric/projection semantic versions;
- evaluation/source cut;
- last successful projection build where material;
- stale/partial/mixed-time/source-unavailable state;
- current versus issued/restated status;
- applicable limitations;
- whether values are current authoritative projections, external observations, scenarios or inferences.

It cannot:

- present itself as the previously issued snapshot;
- hide that formulas/definitions changed;
- omit a material rebuild failure;
- retain old cached values while showing a new “last updated” timestamp;
- show a current hierarchy against historical values without disclosure;
- permit manual value/status edits.

Annotations/comments remain separate evidence or collaboration content and do not change the metric/result.

---

# 21. Chat and future AI handoff

A chat or future AI response referencing reports/projections must identify or resolve:

- metric/projection/report key and semantic version;
- exact result/snapshot identity where historical or load-bearing;
- live versus issued versus restated status;
- as-of/source cut;
- quality/completeness/freshness limitations;
- source/authority class;
- restatement/supersession status;
- citations to source/result/evidence permitted for the user.

It may:

- summarize;
- compare compatible results;
- explain a restatement;
- identify limitations;
- state that a historical result cannot be reconstructed exactly;
- abstain.

It may not:

- silently substitute latest values for an asked historical report;
- claim causation from projection movement;
- hide changed definitions;
- answer “all” from partial membership;
- turn a control observation into business status;
- create or approve a restatement verbally;
- infer restricted source details from aggregates beyond policy.

P1.9 owns interaction design. P1.10 owns reasoning/evaluation/autonomy.

---

# 22. Conformance and activation tests

A projection/report definition version cannot become active for load-bearing use unless all applicable tests pass.

## T1 — source-authority conformance

Every source dependency preserves authority, identity, version and correction meaning.

## T2 — metric dependency conformance

All dependent metric versions are accepted and compatible.

## T3 — source-cut reproducibility

The query/as-of/consistency/population basis is explicit and reproducible to the declared level.

## T4 — time and actual-family conformance

Effective/recorded/point/flow/actual/status semantics are explicit and non-collapsing.

## T5 — calculation and anti-double-count conformance

Grouping, contribution identity and totals cannot duplicate economic/scope contributions.

## T6 — quality/limitation conformance

Partial, stale, mixed-time, migration/evidence-limited, reconciliation-open and indeterminate conditions propagate visibly.

## T7 — semantic-version conformance

Every load-bearing change has the correct presentation, metadata, prospective or retrospective classification.

## T8 — recalculation conformance

Rebuilds create new executions/results and never edit prior results.

## T9 — restatement conformance

Issued/reliance-bearing results have explicit materiality/restatement treatment.

## T10 — issued-snapshot conformance

Snapshot/member/source-cut/artifact identities freeze and never point silently to current content.

## T11 — artifact integrity conformance

Exports preserve exact snapshot, schema/template/content identity and limitation meaning.

## T12 — access/disclosure/residency conformance

Reports do not leak restricted or cross-tenant information through rows, dimensions, small cells, exports or AI summaries.

## T13 — evidence/disposition conformance

Reproducibility level is honest and cannot overclaim disposed/unavailable source evidence.

## T14 — event-evolution conformance

New event types have explicit projection compatibility and historical applicability.

## T15 — no-authority conformance

Projection/report/restatement state cannot directly write business/commercial truth.

## T16 — no-second-XL conformance

The contract does not require a generic BI, warehouse, report-builder, data-lake, MDM or AI-insight platform.

---

# 23. Mandatory hostile scenarios

At minimum audit:

1. a formula changes after a report was issued;
2. a new event type is added and would change historical balances;
3. a source correction changes a prior certified amount;
4. a late-arriving effective-dated event appears after month-end issue;
5. a report URL previously shared now renders current data;
6. a PDF is reformatted without changing values;
7. a label changes from certified to paid;
8. a warehouse rebuild produces a different total under the same source cut/version;
9. an incremental rebuild misses corrected events;
10. a partial rebuild replaces the last complete cache;
11. a source query is paginated while records are changing;
12. portfolio members have different source cuts;
13. ERP payment data becomes stale after report generation;
14. a provider current pointer no longer exposes the historical source version;
15. evidence payload is legitimately disposed after issue;
16. exact issued PDF survives but source rows do not;
17. a report is recalculated under the same semantic definition after source correction;
18. a semantic formula defect is incorrectly labelled implementation defect;
19. an implementation bug produces wrong results under an unambiguous definition;
20. supplier identity mapping changes after reports were issued;
21. one Commitment contribution moves between package/project hierarchies;
22. FX purpose changes retrospectively;
23. an indeterminate external effect later resolves as posted;
24. an indeterminate effect remains permanently unresolved;
25. migrated legacy data becomes better qualified;
26. a redacted external report omits mandatory limitations;
27. a spreadsheet export is edited and re-uploaded;
28. a structured export omits schema/source-cut identity;
29. an old subscriber receives a retry after a restated report exists;
30. a report is withdrawn for wrong audience but business decisions already relied on it;
31. a current hierarchy is applied to an old issued report;
32. a small aggregate reveals one supplier’s restricted price;
33. chat answers a historical question using the latest current result;
34. AI says a corrected report proves causation;
35. report annotations are mistaken for corrected values;
36. team attempts to build a generic dashboard/report designer;
37. team attempts to treat warehouse rows as authoritative business state;
38. A0–A3 runs without warehouse, connector or AI and still issues reconstructable reports.

---

# 24. Candidate ADR impact

This contract develops candidate **ADR-0034 — Projection, report snapshot and restatement semantics**.

Candidate decision:

> Adopt immutable versioned MetricDefinition, ProjectionDefinition and ReportDefinition semantics; identified executions and source-cut manifests; immutable ReportSnapshots and artifacts; explicit change classification; recalculation as new result history; and restatement/supersession/withdrawal without silent mutation of prior issued results or source truth.

ADR-0034 remains proposed until P1.8 integrated hostile review and final reconciliation.

This contract does not reopen accepted upstream ADRs.

---

# 25. Exit claim for this candidate

This v0.1 candidate is ready for integration with the later P1.8 time/status/actual, quality, catalogue, aggregation, export and query/chat contracts when:

- object identities and distinctions remain coherent under integration;
- no later contract introduces a second writer or silent formula drift;
- time and quality taxonomies bind without implementation defaults;
- issued-report and evidence-disposition semantics remain P1.6-compatible;
- projection changes remain versioned and restatement remains explicit;
- hostile audit finds no route to mutate or silently replace prior report meaning;
- product code remains locked.

P1.8 remains ACTIVE.

P1.9+ remains LOCKED.

Product code remains LOCKED / NOT STARTED.
