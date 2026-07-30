# P1.4 — External Audit Remediation v0.1

**Date:** 2026-07-30  
**Status:** REMEDIATION CANDIDATE / EXTERNAL RE-AUDIT REQUIRED  
**P1.4:** ACTIVE  
**P1.5+:** LOCKED  
**Product code:** LOCKED

---

## 1. Purpose and precedence

This artifact records the binding remediation to the first external Claude hostile audit of `P1_4_BOUNDARY_CONTRACT_CANDIDATE_V0_1.md`.

Claude returned `FAIL` on two narrow P1.4 blockers:
- BL-12 — cross-tenant derived, aggregate and model-mediated use was undefined;
- BL-13 — `load-bearing` governed the authority model without a selection test.

This remediation also closes three non-blocking ambiguities where doing so is cheap and prevents implementation drift:
- evidence tombstone semantics after payload disposition;
- post-termination disposition authority;
- ContractingAuthorityContext does not imply JV/partner access.

It adds a bounded export/return seam without creating CDE/records-management scope.

This artifact **supersedes the affected semantics** in candidate v0.1 where they differ. All unaffected B01–B40 clauses remain in force.

No database/schema/API/code design is selected.

---

# 2. BL-12 remediation — cross-tenant derived, aggregate and model-mediated use

## R01 — tenant isolation covers mediated use, not only disclosure

The B04 tenant-isolation rule applies to both **direct disclosure** and **indirect use** of tenant business data.

By default in V1, tenant business data must not be used to create, improve or influence another tenant's:
- outputs;
- recommendations;
- mappings;
- rankings;
- benchmarks;
- supplier/contractor scores;
- embeddings or retrieval corpus;
- agent memory/context;
- fine-tuned or adaptive model behavior;
- cross-tenant statistical/derived commercial intelligence.

This applies even where no source record is directly shown to another tenant.

Examples prohibited by default:
- training an adaptive mapping model on Tenant A comparison corrections and using the learned behavior for Tenant B;
- cross-tenant price benchmarking derived from tenant bids/awards;
- supplier reliability scoring derived from multiple tenants' private histories;
- a shared vector index, agent memory or retrieval store containing tenant business content.

## R02 — shared model executable is allowed; shared tenant business knowledge is not

The same foundation model, model service, deterministic tool, codebase or agent implementation may serve multiple tenants **provided tenant business context remains isolated per authorized invocation** and tenant business content does not silently enter cross-tenant memory, retrieval, adaptive learning, training/fine-tuning or benchmark state.

This preserves future single-agent or multi-agent architectures without creating a supplier/data network by accident.

A shared model executable is not itself a cross-tenant business-data authority.

## R03 — future shared-learning / benchmarking mode is an explicit extension

Cross-tenant aggregate, statistical, benchmark or model-mediated learning from tenant business data is **OUT of the default V1 tenant boundary**.

A later capability may introduce it only as a separately governed product mode with, at minimum:
- explicit tenant participation/contractual basis;
- explicit purpose and permitted data categories;
- defined de-identification/aggregation boundary appropriate to the use;
- prevention of tenant/supplier relationship re-identification beyond the agreed product contract;
- source/lineage/provenance sufficient to audit how shared learning was produced;
- explicit rules for new data, future use and withdrawal/termination effects;
- no ability to bypass tenant-specific authorization or business-truth authority.

P1.4 does not require that extension to exist, and A0–A3 cannot depend on it.

Implementation may not silently reinterpret ordinary tenant consent, ordinary AI usage or generic service terms as permission for cross-tenant business learning.

## R04 — operational telemetry boundary

Cross-tenant service-operational telemetry may be used for platform security, reliability, capacity and performance only when it is bounded so that it does not become a substitute channel for tenant business data, commercial intelligence, supplier-network history or relationship discovery.

Later NFR/AI work must classify telemetry categories explicitly. The existence of operational telemetry does not relax B04/B06.

**BL-12 remediation result:** tenant isolation now covers direct, derived, aggregate, statistical and model-mediated use while preserving optional future AI/shared-learning expansion behind an explicit boundary.

---

# 3. BL-13 remediation — test for `load-bearing`

## R05 — load-bearing definition

A **fact, event, evidence item, policy or configuration value is load-bearing** when at least one of the following is true:

1. a governed decision, authorization, eligibility result, comparison outcome, valuation, contractual/commercial position, domain state transition or external handoff **depended on it**; or
2. changing or omitting it could change the permitted/resulting outcome for the same relevant inputs; or
3. without its governing value/source/version/effective context, a later authorized reader could not reconstruct or explain **why** the governed outcome occurred.

`Commercially significant` truth under ADR-0024 is automatically load-bearing. Load-bearing also includes non-commercial authority/security facts where they satisfy the test.

## R06 — consequences of being load-bearing

Where a fact/policy/configuration is load-bearing, the architecture must preserve the semantics needed for the relevant use, including as applicable:
- authority source/writer/class;
- governing version/revision;
- effective/valid context;
- provenance/source identity;
- relevant freshness/conflict state for external values;
- the binding between the governed case/event and that basis.

The exact physical representation remains P1.5/later work.

## R07 — non-load-bearing values

A value is not made load-bearing merely because it is displayed, cached, searchable, convenient or present in tenant configuration.

Typical non-load-bearing examples may include UI presentation preferences, transient caches, non-governing analytics display choices and operational metrics that did not determine an in-scope governed outcome.

If a previously non-load-bearing value is later promoted into a governing rule/input, that promotion is effective prospectively or through an explicit governed migration/re-evaluation. It does not silently rewrite historical meaning.

## R08 — catalogue responsibility

P1.5 may catalogue concrete load-bearing facts by object/domain, but it may **not redefine this test by implementation convenience**.

Examples already known to satisfy the test in relevant contexts include:
- ContractingAuthorityContext;
- DOA/policy version;
- supplier source submission/revision used for evaluation;
- ComparisonSchema;
- evaluation FX/tax basis where used;
- AwardDecision basis;
- commitment/change/valuation basis when P07 is active;
- integration authority map where an external fact governed the decision;
- load-bearing external-record version/freshness context.

**BL-13 remediation result:** the authority/provenance/version-binding domain is now selected by a semantic test rather than an undefined adjective or an exhaustive enumeration.

---

# 4. Non-blocking watch hardening

## R09 — evidence payload disposition tombstone

When an evidence payload is disposed while the associated historical domain event remains retained under a valid basis, the event is not reversed and a minimal non-payload evidence/disposition record remains sufficient to explain:
- that the evidence existed and was relied on where relevant;
- its source/principal and governing identity/version where needed;
- the authorized disposition action/time/basis;
- the relationship to the retained domain event.

The tombstone/minimum provenance record is itself subject to valid retention/minimization basis. It is not a perpetual-retention loophole.

## R10 — post-termination retained-state authority

Tenant operational termination does not erase the tenant as the historical scope anchor for retained records.

Where a retention basis survives operational termination, offboarding must bind a **post-termination disposition authority** derived from the applicable customer contract, lawful instruction or verified legal/regulatory basis.

Ordinary former tenant memberships or external grants do not remain active merely because retained records exist.

Any retained-state export, minimization or disposition remains a bounded, authorized and audited operation.

The exact organizational/operator assignment is deployment/contract/legal configuration, not a new records-management subsystem.

## R11 — ContractingAuthorityContext does not imply partner access

A multi-party/JV/unincorporated `ContractingAuthorityContext` expresses contracting authority only.

It does **not** automatically grant product-mediated access to any partner, participant or related organization.

Access still requires an explicit tenant-scoped internal membership/authorization or external grant under B05–B09.

No JV partner gains visibility into another party's procurement evidence merely because both participate in the same contracting authority context.

## R12 — bounded export / return seam

Tenant offboarding may include bounded export/return of in-scope tenant data where contractually supported or required.

Export/return:
- does not convert the OS into a general CDE/records-management platform;
- preserves enough scope/version/provenance to identify what was handed off;
- records the handoff boundary where material;
- does not imply the OS controls destination-system residency, retention or authority after the governed handoff.

Exact portability formats and jurisdictional obligations remain later product/legal/NFR work.

---

# 5. AI/agent expansion interpretation

These remediations intentionally preserve an AI-heavy future.

Allowed architectural direction:

`deterministic tenant-scoped truth + bounded domain actions + authority/provenance bindings`
`→ APIs/events/tools`
`→ one or many agents`

Agents may later:
- extract;
- normalize;
- compare;
- draft;
- monitor;
- reconcile;
- coordinate specialist agents;
- propose governed domain actions.

But agents do not gain permission to:
- bypass tenant isolation;
- learn from private tenant business history for another tenant by default;
- turn agent memory into an undeclared cross-tenant data network;
- write arbitrary commercial/accounting truth;
- bypass P09/DOA/domain guards;
- create a hidden second ledger.

A future explicit shared-learning mode remains possible without changing ordinary tenant truth ownership.

---

# 6. ADR implications — candidate only, no status changes yet

The external audit considered semantic closure supportable for:
- ADR-0012 external vendor identity/access;
- ADR-0014 document provenance ownership/depth;
- ADR-0021 field-level integration authority/staleness;
- ADR-0020 configuration binding in flight, contingent on closing BL-13;
- ADR-0005 accounting/commercial ownership seam;
- ADR-0018 workflow-to-financial-state seam.

This remediation closes the BL-13 contingency semantically.

ADR-0003/0004/0006/0008/0009/0010/0011/0015/0019/0022/0023 remain open on later physical breadth/model/evidence questions.

A new standalone residency ADR is reasonable because the tenant-level declared primary region and governed migration semantics are customer-contractual architecture decisions independent of physical DR topology. **Do not change the canonical ADR log until the external re-audit confirms P1.4 PASS and final ADR reconciliation is performed.**

---

# 7. Re-audit criteria

External re-audit should answer only whether:
1. BL-12 is closed without blocking future AI/agent expansion;
2. BL-13 is closed without forcing exhaustive early modelling;
3. R09–R12 introduce no second XL or records-management/JV/network scope;
4. P1.1/P1.2/P1.3 inheritance remains clean;
5. A0–A3 activation remains independent;
6. P1.5 can now choose physical representation without choosing the meaning/ownership of truth.

P1.4 remains ACTIVE until the external re-audit and final ADR/checkpoint reconciliation pass.
