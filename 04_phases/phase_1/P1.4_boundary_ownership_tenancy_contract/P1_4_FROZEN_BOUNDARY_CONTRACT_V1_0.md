# P1.4 — Boundary, Ownership & Tenancy Contract — FROZEN v1.0

**Date:** 2026-07-30  
**Status:** PASS / FROZEN  
**P1.4:** CLOSED  
**P1.5:** UNLOCKED  
**Product code:** LOCKED / NOT STARTED

---

## 1. Freeze scope

This document is the canonical semantic freeze for P1.4.

It consolidates the accepted boundary decisions from:

- the P1.4 workplan and alternatives matrix;
- load-bearing authority inventory;
- OWN/MIRROR/REFERENCE/OUT contract;
- tenant/legal-entity/project contract and remediation;
- identity/authorization/external-grant contract and remediation;
- evidence/offboarding/residency contract and remediation;
- effective-dated/configuration binding contract;
- accounting/integration authority contract;
- internal hostile audit and recheck;
- Claude hostile audit round 1;
- external-audit remediation R01–R12;
- internal post-remediation recheck;
- Claude hostile audit round 2 PASS.

Earlier candidate/remediation files remain decision-history evidence but do not override this frozen contract.

This freeze defines **meaning, ownership, authority and boundary**. It does not select database tables, API shapes, physical temporal storage, connector vendors, authentication vendors or product code.

---

# 2. Frozen invariants

## F01 — Tenant

Tenant is the customer isolation/configuration/security boundary.

A tenant may contain multiple legal entities. Tenant is not automatically a legal entity, branch, BU, JV or project.

A project belongs to exactly one tenant.

Cross-tenant business-data access, discovery and inference are denied by default.

## F02 — ContractingAuthorityContext

Where contracting/legal authority is load-bearing, a project/transaction binds an explicit `ContractingAuthorityContext`.

Normal case: one legal entity.

Where real evidence requires it, the context may represent a bounded multi-party/unincorporated contracting arrangement.

It does not create a generalized JV platform and does not imply cross-tenant sharing.

Historical transactions bind the exact context/version that governed them.

## F03 — Branch / BU / JV scope

Branch/BU/JV structure is represented only to the degree required for procurement/commercial authority, access/DOA, project assignment, numbering/configuration, accounting mapping or operating responsibility.

No generic enterprise HR/corporate-hierarchy/JV-collaboration subsystem is created.

A multi-party `ContractingAuthorityContext` expresses contracting authority only. It grants no product-mediated partner access by itself.

## F04 — Tenant isolation

No tenant may see or infer another tenant's:

- organization/project relationships;
- users, memberships, roles or delegations;
- supplier relationships;
- bids/prices;
- qualification/performance;
- evidence;
- grants;
- awards/commitments/commercial positions;
- accounting/integration mappings;
- configuration/analytics.

The existence of another tenant relationship to the same human or supplier identity is itself private by default.

## F05 — Cross-tenant derived/model-mediated isolation

Tenant isolation covers **direct disclosure and indirect effect**.

By default, tenant business data must not create, improve or influence another tenant's:

- outputs/recommendations;
- mappings/rankings;
- benchmarks;
- supplier/contractor scores;
- embeddings/retrieval corpus;
- agent memory/context;
- fine-tuned/adaptive model behaviour;
- cross-tenant statistical/derived commercial intelligence.

This rule binds all processing paths, including product-owned processing, third-party model invocation and sub-processors.

A shared foundation model, model service, tool, codebase or agent implementation may serve multiple tenants. Shared executable/infrastructure is allowed; shared learned tenant business knowledge is not allowed by default.

Tenant business context must remain isolated per authorized invocation.

## F06 — Future shared-learning / benchmarking extension

Cross-tenant aggregate/statistical/benchmark/model-mediated learning from tenant business data is OUT of the default V1 tenant boundary.

A later capability may introduce it only as a separately governed product mode with explicit participation/contractual basis, purpose, permitted data categories, aggregation/de-identification boundary, re-identification protection, lineage/provenance, future-use/withdrawal/termination rules and no authority bypass.

Ordinary tenant consent, ordinary AI usage or generic service terms are insufficient authorization for cross-tenant business learning.

Where withdrawal cannot technically remove already-learned influence, participation terms and product semantics must state the actual achievable effect rather than promise impossible retroactive unlearning.

A0–A3 cannot depend on such a mode.

## F07 — Operational telemetry

Cross-tenant service-operational telemetry may support platform security, reliability, capacity and performance only where bounded so it does not become a substitute channel for tenant business data, commercial intelligence, supplier-network history or relationship discovery.

Telemetry-category classification belongs to later NFR/AI architecture under this rule.

---

# 3. Identity and authorization

## F08 — Internal identity

A technical authentication identity may be reusable.

Internal business authority exists only through tenant/context-scoped membership, role, delegation, DOA/compliance and deterministic domain authorization.

Current security capability is checked before each new state-changing action.

Historical actions preserve the authority/policy context that governed them.

## F09 — External organization/contact identity

Supplier/subcontractor business relationships are tenant-private in V1.

The same real-world supplier may exist independently in multiple tenants.

Cross-tenant supplier master/network, shared qualification, price history, evidence history and grant history are OUT by default.

A reusable technical external login may authenticate to independently authorized grants in multiple tenants, but provides no tenant relationship directory/discovery.

## F10 — Internal authorization versus external grant

Internal authorization and external grants may reuse bounded authentication/principal/audit primitives but are separate semantic authorization models.

**Hard invariant:** an external grant can never satisfy or bypass internal P09 permission, role, delegation, DOA, compliance or deterministic domain-command authorization.

External grants are tenant + resource/action scoped, least privilege, expiring/revocable and provenance-preserving.

## F11 — Buyer-on-behalf capture

Buyer-on-behalf capture preserves:

- acting internal principal;
- represented external organization/contact;
- source channel/evidence;
- explicit representation status;
- later supplier confirmation as a separate fact where required.

Buyer-on-behalf history is never rewritten as direct supplier authentication.

## F12 — Persistent supplier account

Persistent supplier signup is optional, not required for tender participation.

Guest/email/account/buyer-on-behalf paths may coexist.

Account linking does not rewrite historical actor provenance and cannot import another tenant's history or grants.

## F13 — Within-tenant AI/agent context

Within a tenant, AI/agent access is still limited to the business context the invocation/principal is authorized to access.

Shared tenant membership or a shared `ContractingAuthorityContext` does not automatically widen access across projects, BUs, counterparties or evidence sets.

Agents inherit no authority merely because data exists in the same tenant.

---

# 4. Authority model

## F14 — Authority classes

`OWN / MIRROR / REFERENCE / OUT` describes system authority/custody, not legal title, copyright, contractual ownership or IP rights.

Authority is assigned at the **load-bearing fact/field/event grain**.

At any effective point, each load-bearing fact/event has one authoritative source/writer.

### OWN

The OS is authoritative for the identified fact/event/history inside the declared scope.

Mutation uses bounded validated domain/service actions, required provenance and history-preserving correction.

### MIRROR

Externally authoritative truth copied locally for operational use.

A mirror is not independently editable as competing truth.

Source, freshness, conflict and correction ownership are explicit where load-bearing.

### REFERENCE

External authority remains outside.

The OS stores external identity plus enough source/version/effective/freshness provenance for safe historical/operational use.

A free-text URL alone is insufficient for a load-bearing external record.

### OUT

Business truth is outside V1 authority. A bounded dependency, external ID, status or handoff may still be represented without building the external subsystem.

## F15 — Load-bearing test

A fact, event, evidence item, policy or configuration value is **load-bearing** when at least one is true:

1. a governed decision, authorization, eligibility result, comparison outcome, valuation, contractual/commercial position, domain transition or external handoff depended on it; or
2. changing/omitting it could change the permitted/resulting outcome for the same relevant inputs; or
3. without its governing value/source/version/effective context, a later authorized reader could not reconstruct/explain why the governed outcome occurred.

Commercially significant truth under ADR-0024 is automatically load-bearing.

Non-commercial security/authority facts may also be load-bearing under this test.

A value is not load-bearing merely because it is displayed, cached, searchable, convenient or present in tenant configuration.

## F16 — Reconstruction audience

For P1.4/ADR-0014, `later authorized reader` means an actor legitimately entitled to reconstruct the in-scope governed outcome, including as applicable:

- authorized tenant governance/audit personnel;
- authorized operator/approver handling correction, review or dispute workflows;
- external counterparty/reviewer/regulator only where contract, law or the supported product process makes that review in scope.

The OS need not preserve arbitrary information for hypothetical readers with no valid entitlement or product/legal basis.

## F17 — Load-bearing consequences

For a load-bearing fact/policy/configuration, preserve as applicable:

- authority source/writer/class;
- governing version/revision;
- effective/valid context;
- provenance/source identity;
- relevant freshness/conflict state for external values;
- binding between the governed case/event and that basis.

P1.5 may catalogue concrete facts by domain/object but may not redefine this semantic test for implementation convenience.

If a fact is later discovered to have been wrongly catalogued as non-load-bearing, missing historical provenance is not fabricated. The deficiency is recorded, the catalogue corrected prospectively, and any legitimate reconstruction limitation remains explicit.

## F18 — Derived positions

Derived values are not a fifth authority class and are not independently editable business truth.

Examples include current approved commitment, retention/advance position, actual procurement milestone and non-response state.

## F19 — Deployment-profiled authority

Project master, requisition/planning source, budget/cost structure, scheduling and selected accounting/master facts may be OWN/MIRROR/REFERENCE by deployment.

The deployment binds exactly one effective authority profile per load-bearing fact.

No dual master.

A0–A3 does not require a named connector to establish the profile.

## F20 — Authority transfer

Authority may transfer only through governed cutover with old/new authority, effective point/version, reconciliation/disposition, in-flight treatment and preserved historical provenance.

Indefinite dual-master state is forbidden.

---

# 5. Evidence, retention and residency

## F21 — Governed transaction evidence

The OS owns integrity/provenance of captured product-governed transaction evidence, including as applicable:

- tender releases/addenda;
- supplier submissions/revisions;
- clarifications/confirmations;
- comparison/approval/award evidence;
- P07 commitment/change/receipt/claim/assessment/certification/recovery evidence when activated;
- buyer-on-behalf evidence;
- bounded external-grant history.

Supplier remains source principal. System `OWN` custody does not assert underlying IP/legal ownership.

## F22 — External evidence

Externally authoritative CDE/ERP/bank/legal/master records remain REFERENCE or narrowly MIRROR.

The OS owns the exact supplier-facing release copy/version it issued, even where upstream master documents came from an external system.

The OS does not become a general CDE/records-management platform.

## F23 — Evidence immutability / supersession

Load-bearing source evidence is not edited in place to rewrite history.

New revision, supersession or governed correction preserves prior provenance while retained.

Immutability does not require perpetual storage after valid retention bases expire.

## F24 — Offboarding

Offboarding separates:

- future capability/access;
- mutable profile/contact/account data;
- required historical transaction/configuration truth.

Revocation does not erase prior governed actions.

Eligible personal/contact/account data may be minimized without falsifying history.

## F25 — Retention/disposition

Retention requires explicit bounded basis, such as:

- active transaction/contractual dependency;
- customer contract/configured requirement;
- verified applicable legal/regulatory requirement;
- active dispute/audit dependency with valid basis;
- bounded security/audit requirement.

No keep-forever default and no arbitrary tenant-authored enterprise records-policy language.

Payload disposition occurs only when basis/dependencies permit and authorization exists.

Disposition does not reverse historical domain events.

Jurisdiction-specific durations remain legal/contractual evidence inputs.

## F26 — Disposition tombstone

Where an evidence payload is legitimately disposed but the historical domain event remains under a valid basis, preserve a minimal non-payload evidence/disposition record sufficient to explain as applicable:

- that the evidence existed/was relied on;
- source/principal and governing identity/version;
- authorized disposition action/time/basis;
- relationship to the retained event.

The tombstone itself requires a valid retention/minimization basis and is not a perpetual-retention loophole.

## F27 — Post-termination retained-state authority

Tenant operational termination does not erase the tenant as historical scope anchor.

Where retention survives termination, offboarding binds a post-termination disposition authority derived from applicable customer contract, lawful instruction or verified legal/regulatory basis.

Former memberships/external grants do not remain active merely because retained records exist.

Retained-state export, minimization and disposition remain bounded authorized audited operations.

## F28 — Sensitivity/access classification

Sensitivity/access classification is bounded recorded metadata with provenance.

Fixed deterministic product checks may consume it.

It does not become arbitrary tenant-authored authorization, retention, redaction, legal-hold/eDiscovery or information-governance policy language.

Retention basis and authorization remain separate concepts.

## F29 — Declared residency region

V1 has a tenant-level declared primary residency region for product-hosted tenant/business/evidence data categories included in the product residency commitment.

Legal entities/projects inside one tenant do not choose arbitrary independent regions by default.

P1.4 does not pre-design backup/DR/telemetry/service-metadata topology.

Later NFR architecture must explicitly classify those categories against the declared product commitment. Hidden exceptions are forbidden.

External-system residency remains outside OS control.

P1.4 asserts no UAE/GCC localization requirement.

## F30 — Region migration

Residency-region change is governed/effective-dated with source/destination, cutover/version, in-flight treatment, retained evidence/configuration treatment, migration evidence and source-copy/replica disposition under the declared migration/security/retention design.

Physical replication/DR mechanics remain later NFR design.

## F31 — Bounded export / return

Tenant offboarding may include bounded export/return of in-scope tenant data where contractually supported or required.

Export/return does not create a general CDE/records-management product.

It preserves enough scope/version/provenance to identify what was handed off and records the boundary where material.

The OS does not claim destination-system residency, retention or authority after governed handoff.

Exact portability formats and jurisdictional obligations remain later product/legal/NFR work.

---

# 6. Effective dating / configuration binding

## F32 — Historical interpretability

Historical actions use the authority/configuration state that governed them, not today's current configuration.

## F33 — Decision-policy binding

Load-bearing policy/configuration versions such as DOA, ComparisonSchema, evaluation FX/tax basis and integration authority map bind to the relevant case/event.

Full tenant configuration is not copied into every transaction.

## F34 — Bound policy versus live security

A pending case may remain bound to its policy version while the actor's current membership/delegation/security capability is checked before each new action.

Policy binding cannot preserve revoked access.

## F35 — Effective organizational/legal binding

Project↔ContractingAuthorityContext, relevant role/delegation scope, authority mappings and residency cutovers preserve effective history.

Silent rebinding of load-bearing in-flight instances is forbidden.

Explicit migration/re-evaluation is required where legitimate.

## F36 — Physical temporal model deferred

P1.4 requires semantic effective/version binding and historical interpretability.

It does not mandate universal bitemporal tables, event sourcing or full-config snapshots.

---

# 7. Accounting and integration authority

## F37 — Split authority

The OS owns procurement/commercial truth required by its activated domains.

External accounting/ERP may remain authoritative for accounting facts.

P08 owns authority mapping, transport/reconciliation state and evidence — not accounting ledgers.

## F38 — P07 product commercial truth

When P07 is active, product authority includes effective commitment baseline/change and relevant commercial receipt/claim/assessment/certification/recovery events and derived contractual/commercial positions.

ERP representation is not co-master.

A0–A3 may stop at AwardDecision/external handoff without activating P07.

## F39 — External accounting truth

Where external accounting exists, AP invoice posting/liability, payment/cash, bank facts, GL journals, accounting close and job-cost/accounting postings remain external MIRROR/REFERENCE/OUT concerns.

The OS may own invoice evidence/match/exception facts without becoming AP.

## F40 — Certification versus posting

Commercial certification and accounting posting are distinct.

ERP rejection does not erase product commercial truth unless a governed domain correction is actually required.

## F41 — Budget/cost structure

Budget/cost master may be product or external authority by deployment profile.

Transaction attribution binding is product-owned and preserves source/context/version used.

Exact mandatory-attribution transition remains ADR-0011/later work.

## F42 — Connector

Connector/middleware is never business authority merely because it transformed or moved data.

Transport/mapping/reconciliation state is operational metadata.

## F43 — Integration rejection

At minimum classify rejection as:

- `DATA_DEFECT`;
- `TRANSPORT_OR_MAPPING_DEFECT`;
- `TEMPORAL_RESTRICTION`;
- `EXTERNAL_AUTHORITY_RETURN`;

before correction.

Do not mutate commercial truth merely to make synchronization pass.

## F44 — Staleness

Load-bearing MIRROR/REFERENCE values expose source/freshness/conflict state.

Domain rules decide whether stale data warns, blocks, requires refresh or is irrelevant.

No universal real-time requirement is imposed.

---

# 8. P07 / one-XL protection

## F45 — RequirementAllocation

RequirementAllocation owns procurement-scope consumption only.

It is not a commercial/accounting value ledger.

FT-02/06/10 exact mechanics remain falsifiable.

## F46 — Workflow/evidence/integration are not commercial truth

Workflow/task/approval state, evidence metadata and integration status cannot become commitment/payment/balance authority.

## F47 — Derived commercial balances

Current commercial positions are event-backed/derived.

No independently edited duplicate balance may compete with P07 or external accounting authority.

## F48 — One-XL

**P07 remains the only independent XL gravity well.**

P08/P09/evidence/tenancy/identity/integration/AI-isolation remain bounded supporting substrates/constraints.

No independent V1 gravity well is introduced for full GL/AP/cash, CDE, WMS, CPM, supplier network, legal-claims/banking, generalized BPM, records management or cross-tenant AI data network.

---

# 9. First monetization rail

## F49 — A0–A3 independence

A0–A3 remains:

`requirement/MR/package → RFQ/tender → supplier response capture → normalization/comparison → recommendation/approval → AwardDecision → external handoff`

It remains usable without:

- P07 execution;
- direct-source execution surface;
- ERP/CDE connector;
- persistent supplier account/network;
- CPM/BPM platform;
- inventory/WMS;
- advanced AI;
- cross-tenant shared-learning mode;
- customer-designed ontology.

## F50 — Onboarding burden

Standard configuration to first live tender remains targeted at ≤5 working days from clean inputs.

Bespoke named connectors required before first live tender remain zero.

---

# 10. AI/agent expansion boundary

The frozen direction deliberately supports a future AI-heavy architecture:

`deterministic tenant-scoped truth + bounded domain actions + authority/provenance bindings`

`→ APIs/events/tools`

`→ one or many agents`

Agents may later extract, normalize, compare, draft, monitor, reconcile, coordinate specialist agents and propose governed domain actions.

Agents do not gain permission to bypass tenant isolation, internal authorization, DOA/domain guards, evidence/provenance, authority ownership or P07/accounting boundaries.

Agents do not write arbitrary commercial/accounting truth.

Agent memory/retrieval/adaptive state does not become an undeclared cross-tenant business-data network.

This boundary is intended to preserve expansion, de-scoping, model replacement and multi-agent evolution without redesigning core truth ownership.

---

# 11. Explicit later-owned items

These remain open without reopening P1.4 semantic authority:

- ADR-0003 physical procurement structural root;
- ADR-0004 PO/Subcontract/Framework/CallOff physical composition;
- FT-02/06/10 exact RequirementAllocation/conservation mechanics;
- FT-09/CR-02 rectification capacity mechanics;
- ADR-0006 connector depth/deployment choices;
- ADR-0008 workflow breadth;
- ADR-0009 configuration breadth;
- ADR-0010 GCC commercial/regulatory evidence debt;
- ADR-0011 exact mandatory cost-attribution transition;
- ADR-0015 physical posting/reversal/correction model;
- ADR-0019 physical temporal implementation;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 numbering/concurrency/fiscal algorithm;
- exact jurisdictional retention/residency obligations/durations;
- residency category catalogue and NFR topology;
- export portability formats;
- connector vendors/protocols;
- authentication vendors/protocols;
- per-invocation context-partition mechanics;
- retrieval/memory partition implementation;
- concrete P1.5 load-bearing catalogue;
- physical database/schema/object design.

These later designs must implement this frozen boundary rather than redefine the meaning/ownership of truth by convenience.

---

# 12. Closure result

Internal hostile audit: initial narrow FAIL → remediation → PASS.  
Claude hostile audit round 1: FAIL on BL-12/BL-13.  
Remediation R01–R12: completed.  
Internal post-remediation recheck: PASS.  
Claude hostile audit round 2: **PASS / blockers none / G1–G9 PASS / SECOND XL CLEAN / A0–A3 CLEAN / P1.5 READY AFTER FINAL CHECKPOINT.**

**FINAL P1.4 RESULT: PASS / FROZEN.**

P1.5 may now design physical commercial-core structures against this semantic contract.

Product code remains locked until the governing Phase 1 roadmap explicitly reaches the build transition.
