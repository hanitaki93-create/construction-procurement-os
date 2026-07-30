# P1.4 — Effective-Dated Configuration Binding Contract v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / EXTERNAL AUDIT PENDING

---

## 1. Core decision

Historical procurement/commercial truth must be interpretable using the **authority/configuration state that governed the action**, not by resolving every historical event against today's settings.

P1.4 therefore requires effective-dated/version-bound semantics for load-bearing configuration while deferring the physical temporal storage model to P1.5.

This materially constrains ADR-0019 and ADR-0020 without selecting universal bitemporal persistence.

---

## 2. No universal live-current lookup

The following are rejected as universal behavior:
- historical approval resolves against today's DOA;
- historical project transaction resolves against today's legal-entity mapping;
- old integration event resolves against today's authority map;
- historical quote comparison resolves against current FX/tax/rounding configuration;
- old external action becomes valid because a current grant/account exists;
- project region/history is inferred only from today's hosting region.

Current configuration may be used for current operations, but it cannot silently reinterpret load-bearing history.

---

## 3. No full-configuration snapshot requirement

P1.4 also rejects copying the entire tenant configuration into every transaction.

A load-bearing action binds only the **relevant governing versions/facts** required to explain:
- who was authorized;
- which legal/project context applied;
- which commercial/evaluation policy applied;
- which external authority/source mapping applied;
- which configuration materially determined the result.

This keeps historical reproducibility without configuration explosion.

---

## 4. Four semantic configuration classes

### Class A — Decision/policy configuration

Examples:
- DOA/approval policy;
- ComparisonSchema;
- FX/tax evaluation basis used for a snapshot;
- commercial rule/version when it determines a commitment/valuation result;
- integration authority map used for export/reconciliation;
- numbering/config scope where a number is assigned.

Rule:
- bind the relevant version/effective state to the case/event;
- later policy change does not silently alter the completed historical result.

### Class B — Live access/security capability

Examples:
- current tenant membership;
- account/session status;
- external grant validity/revocation;
- active security restriction.

Rule:
- evaluated live for a new action;
- historical use preserves the prior authorization/grant evidence;
- revocation may stop future action immediately without rewriting actions already validly completed.

Security capability is not frozen merely because a business case is in flight.

### Class C — Organizational/legal authority relationships

Examples:
- project ↔ legal entity;
- role/delegation assignment;
- branch/BU authority scope;
- tenant residency region;
- project/master-data authority source.

Rule:
- effective-dated;
- each action resolves the relationship valid for that action/effectiveness point;
- completed transactions preserve that binding when the relationship later changes.

### Class D — External source/freshness state

Examples:
- ERP project/cost-code mirror;
- external technical approval status;
- accounting posting/payment status;
- master-schedule date.

Rule:
- the product records the source/version/freshness context used by a load-bearing decision;
- future source changes do not rewrite what was observed/relied on historically;
- current actions may require fresh data according to domain-specific rules.

---

## 5. In-flight approval/DOA rule

An approval case binds the relevant approval-policy version and the authority context needed to explain its decisions.

Default rule:
- a policy change does not silently rewrite a pending case;
- existing case continues under its bound policy unless an authorized migration/re-evaluation action explicitly changes the governing policy;
- migration/re-evaluation must preserve the old version, new version, reason, actor and effect on prior approvals;
- live membership/delegation revocation may still prevent a person from taking a new action even when the case policy is older.

Thus **policy binding** and **current actor capability** are separate checks.

---

## 6. Role/delegation history

For a historical approval/action, the OS must be able to establish enough context to answer:
- which principal acted;
- which tenant membership existed;
- which role/authority scope applied;
- which delegation existed, if any;
- which DOA/policy version applied;
- whether the action was valid under that bound context.

The OS does not need a full HR history product. It retains only authorization-relevant historical context.

---

## 7. Project/legal-entity changes

Project/legal-entity relationship is effective-dated.

A legal-context change:
- applies prospectively from its effective point;
- does not silently move old awards/commitments/accounting facts;
- may require explicit treatment of in-flight sourcing/approval/commitment work;
- preserves the prior legal context for historical interpretation.

P1.5 will define concrete state-transition/storage mechanics.

---

## 8. External grant validity

An external grant has explicit validity and revocation semantics.

Historical action binds:
- grant identity/version;
- resource/action scope;
- external principal/represented organization;
- validity state at action time;
- authentication/capture provenance.

Later account creation, grant renewal or revocation does not rewrite the prior action's authorization basis.

---

## 9. Integration authority-map changes

Integration authority mapping is version/effective-dated.

Every load-bearing sync/reconciliation event can identify the governing authority profile used for:
- source/target ownership;
- direction;
- mappings;
- freshness rules;
- conflict/correction ownership.

Changing the authority map:
- affects new operations from the governed effective point;
- does not retroactively make an old mirror an authority;
- requires controlled cutover/reconciliation if authority itself transfers systems.

---

## 10. Comparison and monetary basis binding

P05/P06 history must not resolve through current live evaluation settings.

A frozen ComparisonSnapshot preserves/binds the material basis needed to reproduce the decision, including applicable:
- source bid revision;
- comparison schema version;
- mappings/adjustments;
- FX source/rate/fixing date;
- tax basis;
- rounding-policy reference/calculation basis where load-bearing;
- technical approval/reference version used.

Exact monetary representation/calculation order remains ADR-0022/P1.5.

---

## 11. Residency binding

Tenant hosting region is effective configuration.

A governed migration preserves:
- source region;
- destination region;
- cutover/effective time;
- migration authorization/evidence;
- any operational restrictions/reconciliation.

Historical region provenance remains interpretable after migration.

This does not imply a jurisdiction-specific residency legal rule.

---

## 12. Numbering/configuration scope

P1.4 requires a number/document generated under a legal/entity/configuration context to remain explainable under that context.

Exact sequence/gap/concurrency allocation is deferred to ADR-0023/P1.5.

A later configuration change cannot retroactively re-number existing records.

---

## 13. Configuration migration rule

Where an in-flight instance may legitimately move to a new governing configuration, migration is an explicit action.

Minimum semantics:
1. old bound version/context;
2. proposed new version/context;
3. migration reason/authority;
4. validation of existing actions/results;
5. treatment of already completed approvals/actions;
6. effective migration point;
7. preserved audit lineage.

Silent rebinding is forbidden for load-bearing rules.

---

## 14. Physical-model boundary

P1.4 does not mandate:
- bitemporal tables everywhere;
- event sourcing everywhere;
- snapshot copies of full config;
- one universal temporal library/data model.

P1.5 may choose selective snapshots, effective-dated records, event references or transaction/valid-time structures as long as the semantic contract above is satisfied.

---

## 15. Internal result

**CANDIDATE PASS — historical authority and in-flight configuration behavior are explicit enough to prevent P1.5 from relying on mutable current configuration.**

External hostile review remains required.