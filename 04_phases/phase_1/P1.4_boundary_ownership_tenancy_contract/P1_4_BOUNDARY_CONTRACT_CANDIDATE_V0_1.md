# P1.4 — Boundary, Ownership & Tenancy Contract — Consolidated Candidate v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / EXTERNAL HOSTILE REVIEW REQUIRED  
**P1.4:** ACTIVE  
**P1.5+:** LOCKED  
**Product code:** LOCKED

---

## 1. Purpose and precedence

This is the coherent P1.4 freeze candidate to be attacked before P1.4 PASS.

It consolidates the workplan, alternatives, authority inventory and detailed contracts after internal remediation.

Where a detailed v0.2 artifact exists, it supersedes its v0.1 predecessor:
- `P1_4_TENANT_LEGAL_ENTITY_PROJECT_CONTRACT_V0_2.md` supersedes v0.1;
- `P1_4_IDENTITY_AUTHORIZATION_EXTERNAL_GRANT_CONTRACT_V0_2.md` supersedes v0.1;
- `P1_4_EVIDENCE_LIFECYCLE_RESIDENCY_CONTRACT_V0_2.md` supersedes v0.1.

Other detailed candidate contracts remain current:
- `P1_4_OWN_MIRROR_REFERENCE_OUT_CONTRACT_V0_1.md`;
- `P1_4_EFFECTIVE_DATED_CONFIGURATION_BINDING_V0_1.md`;
- `P1_4_ACCOUNTING_INTEGRATION_AUTHORITY_CONTRACT_V0_1.md`.

Earlier artifacts remain historical evidence of the decision process and internal audit; they do not override this consolidated candidate.

No database/schema/code design is selected.

---

# 2. Boundary contract

## B01 — Tenant

**Tenant = customer isolation/configuration/security boundary.**

A tenant may contain multiple legal entities. Tenant is not automatically a legal entity, branch, BU or project.

Cross-tenant access and cross-tenant business-data discovery are denied by default.

## B02 — Operating organization / legal entities / project

The OS represents only the organizational/legal structure needed to resolve procurement/commercial authority.

A project belongs to exactly one tenant.

A project/transaction uses an explicit **ContractingAuthorityContext** when contracting/legal authority is load-bearing.

The context normally identifies one legal entity, but may represent an evidence-backed bounded multi-party/unincorporated contracting arrangement without creating a generalized JV platform.

Historical transactions bind the context/version that governed them.

## B03 — Branch/BU/JV

Branch/BU becomes an authority scope only if it affects access/DOA, project assignment, numbering/configuration, accounting mapping or operating responsibility.

JV/multi-party structures are modeled only to the degree needed to express actual contracting authority.

No generic HR/corporate hierarchy or JV collaboration product is created.

## B04 — Tenant isolation

No tenant may see or infer another tenant's:
- organization/project relationships;
- users/roles/delegations;
- supplier relationships;
- bids/prices;
- qualification/performance;
- evidence;
- grants;
- awards/commitments/commercial positions;
- accounting/integration mappings;
- configuration/analytics.

The existence of another tenant relationship to the same human/supplier identity is itself private by default.

## B05 — Internal human identity

A technical authentication identity may be reusable, but internal business authority exists only through tenant/context-scoped membership, role, delegation, DOA/compliance and domain rules.

Current security capability is checked for each new action; historical actions preserve the authority context that governed them.

## B06 — External organization/contact identity

V1 supplier/subcontractor **business relationships are tenant-private**.

The same real-world supplier may exist independently in multiple tenants.

Cross-tenant supplier network/master, qualification sharing, price history, evidence sharing and grant sharing are `OUT`.

A reusable technical external login may authenticate separately to multiple tenant grants, but it exposes no tenant relationship directory/discovery by default.

## B07 — Internal authorization versus external grant

Internal authorization and external grants may reuse bounded principal/authentication/audit primitives but are separate semantic authorization models.

**Hard invariant:** possession of an external grant can never satisfy or bypass internal P09 permission, role, delegation, DOA, compliance or deterministic domain-command authorization.

External grants are tenant + resource/action scoped, least privilege, expiring/revocable and provenance preserving.

## B08 — Buyer-on-behalf capture

Buyer-on-behalf capture preserves:
- acting internal principal;
- represented external organization/contact;
- source channel/evidence;
- explicit representation status;
- later supplier confirmation as a separate fact where needed.

It is never rewritten as direct supplier authentication.

## B09 — Persistent supplier account

Persistent supplier signup is optional, not required for tender participation.

Guest/email/account/buyer-on-behalf paths may coexist.

Account linking does not rewrite historical actor provenance and does not import cross-tenant history/grants.

---

# 3. System authority contract

## B10 — Authority vocabulary

`OWN / MIRROR / REFERENCE / OUT` describes system authority/custody, not legal title/IP rights.

Authority is assigned at load-bearing fact/field/event grain.

One fact/event has one authoritative writer/source at a time.

### OWN
OS is authoritative; changes through bounded validated domain actions with required provenance/history.

### MIRROR
Externally authoritative truth copied locally; not independently editable as competing truth; source/freshness/conflict explicit where load-bearing.

### REFERENCE
External authority remains outside; OS stores external identity plus enough source/version/effective/freshness provenance for safe use.

### OUT
Business truth remains outside V1; only bounded interface/existence acknowledgement where separately required.

## B11 — Derived positions

Derived values are not a fifth authority class and are not independently editable.

Examples include current approved commitment, retention/advance position, actual procurement milestone and non-response status.

## B12 — Deployment-profiled authority

Project master, requisition/planning source, budget/cost structure, scheduling and selected accounting/master facts may be `OWN`, `MIRROR` or `REFERENCE` by deployment.

The deployment binds exactly one authoritative source/version/effective profile per load-bearing fact.

No dual master.

A0–A3 does not require a named connector to establish that profile.

## B13 — Authority transfer

Authority transfer requires governed cutover with old/new authority, effective point, reconciliation/disposition and in-flight treatment.

Historical provenance is not rewritten and indefinite dual-master state is forbidden.

---

# 4. Evidence / lifecycle / residency

## B14 — Governed transaction evidence

The OS owns integrity/provenance of captured product-governed transaction evidence, including tender releases, bid/quote revisions, clarifications, approvals/awards and activated downstream commercial evidence.

Supplier remains source principal; `OWN` custody does not assert IP/legal ownership.

## B15 — External evidence authority

CDE/ERP/bank/legal/master records remain `REFERENCE` or narrowly `MIRROR` when externally authoritative.

The OS owns the exact supplier-facing release copy/version it issued, even when upstream source documents came from an external CDE.

## B16 — Immutability and supersession

Load-bearing source evidence is not edited in place to change history.

New revisions/supersession/correction events preserve prior provenance while retained.

Immutability does not mean compulsory perpetual storage after all valid retention bases expire.

## B17 — Offboarding

Offboarding separates:
- future access/capability;
- mutable profile/contact/account data;
- required historical transaction/configuration truth.

Revocation/deactivation does not erase prior governed actions.

Eligible personal/contact/account data may be minimized without falsifying transaction history.

## B18 — Retention and disposition

Retention requires explicit bounded basis. No `keep forever` default and no arbitrary tenant-authored records-policy language.

Payload disposition is allowed only when basis/dependencies permit and must not reverse historical domain events.

Specific jurisdictional durations are not frozen in P1.4.

## B19 — Sensitivity/access classification

Sensitivity/access classification is bounded recorded metadata with provenance.

Fixed deterministic checks may consume it.

It does not become arbitrary tenant-authored authorization, retention, redaction, legal-hold or information-governance policy language.

## B20 — Residency

V1 has a tenant-level **declared primary residency region** for product-hosted tenant/business/evidence data included in the product residency commitment.

P1.4 does not pre-design backup/DR/telemetry physical placement.

Later NFR architecture must explicitly classify those categories against the declared commitment; hidden exceptions are not allowed.

External-system residency remains outside OS control.

No UAE/GCC localization requirement is asserted here.

## B21 — Region migration

Residency-region change is governed/effective-dated with source/destination, cutover, in-flight treatment and migration evidence.

External references are not falsely treated as migrated product-hosted data.

---

# 5. Effective-dated/configuration binding

## B22 — Historical interpretability

Historical actions use the authority/config state that governed them, not today's current configuration.

## B23 — Decision-policy binding

Load-bearing policy/config versions such as DOA, ComparisonSchema, evaluation FX/tax basis and integration authority map are bound to the relevant case/event.

Full tenant configuration is not copied into every transaction.

## B24 — Live security capability versus bound policy

A pending approval may remain bound to its policy version, while a person's current membership/delegation/security capability is still checked before a new action.

Policy binding does not freeze revoked security capability.

## B25 — Organizational/legal effective dating

Project↔ContractingAuthorityContext, relevant role/delegation scope, authority mappings and residency cutovers preserve effective history.

Silent rebinding of load-bearing in-flight instances is forbidden; explicit migration/re-evaluation is required where legitimate.

## B26 — Physical temporal model deferred

P1.4 requires semantic valid/effective/version binding but does not require universal bitemporal tables, event sourcing or full-config snapshots.

---

# 6. Accounting and integration boundary

## B27 — Split authority

The OS owns procurement/commercial truth required by its activated domains.

External accounting/ERP may remain authoritative for accounting facts.

P08 owns authority mapping, transport/reconciliation state and evidence — not accounting ledgers.

## B28 — Product commercial authority

When P07 is activated, product authority includes effective commitment baseline/change and relevant procurement/commercial receipt/claim/assessment/certification/recovery events and derived contractual positions.

ERP representation is not co-master.

A0–A3 may instead stop at AwardDecision/external handoff without activating P07.

## B29 — External accounting authority

Where external accounting exists, AP invoice posting/liability, payment/cash, bank facts, GL journals, accounting close and job-cost/accounting postings remain external `MIRROR/REFERENCE/OUT` concerns.

The OS may own invoice evidence/match/exception facts without becoming AP.

## B30 — Certification versus posting

Commercial certification and accounting posting are distinct.

ERP rejection does not erase product commercial truth unless a governed domain correction is actually required.

## B31 — Budget/cost structure

Budget/cost master may be product or external authority by deployment profile.

The transaction's attribution binding is product-owned and preserves the source/context/version it used.

ADR-0011 exact mandatory-attribution transition remains later work.

## B32 — Connector

Connector is never business authority because it transformed/moved data.

Transport/mapping/reconciliation states are operational metadata.

## B33 — Integration rejection

At minimum classify `DATA_DEFECT`, `TRANSPORT_OR_MAPPING_DEFECT`, `TEMPORAL_RESTRICTION`, `EXTERNAL_AUTHORITY_RETURN` before correction.

Do not mutate commercial truth merely to make synchronization pass.

## B34 — Staleness

Load-bearing mirrors/references expose source/freshness/conflict state.

Domain rules decide whether stale data warns, blocks, requires refresh or is irrelevant.

No universal real-time requirement is imposed.

---

# 7. P07 and one-XL protection

## B35 — RequirementAllocation

RequirementAllocation is a product-domain authority for procurement-scope consumption only; it is not a commercial/accounting value ledger.

FT-02/06/10 exact mechanics remain falsifiable.

## B36 — Workflow/evidence/integration are not commercial truth

Workflow approval state, evidence metadata and integration status cannot become commitment/payment/balance authority.

## B37 — Derived balance guard

Current commercial positions are derived/event-backed; no independently edited duplicate balance competes with P07 or external accounting authority.

## B38 — One-XL

**P07 remains the only independent XL gravity well.**

P08/P09/evidence/tenancy/integration stay bounded supporting substrates.

Full GL/AP/cash, CDE, WMS, CPM, supplier network, legal-claims/banking and generalized BPM remain outside the independent V1 gravity boundary.

---

# 8. First monetization rail

## B39 — A0–A3 independence

A0–A3 remains:

`requirement/MR/package → RFQ/tender → supplier response capture → normalization/comparison → recommendation/approval → AwardDecision → external handoff`

It must remain usable without:
- P07 execution;
- direct-source execution surface;
- ERP/CDE connector;
- persistent supplier account/network;
- CPM/BPM platform;
- inventory/WMS;
- advanced AI;
- customer-designed ontology.

## B40 — onboarding burden

Target remains standard configuration to first live tender ≤5 working days from clean inputs and zero bespoke named connector prerequisite.

---

# 9. Explicit later-owned items that do not block P1.4

The following remain open without leaving P1.4 authority ambiguous:
- ADR-0003 final physical structural root;
- ADR-0004 PO/Subcontract/Framework/CallOff physical composition;
- FT-02/06/10 exact RequirementAllocation/conservation mechanics;
- FT-09/CR-02 exact rectification capacity state mechanics;
- ADR-0011 exact mandatory cost-attribution transition;
- ADR-0015 physical posting/reversal/correction model;
- ADR-0019/0020 physical temporal/config storage implementation;
- ADR-0022 money representation/rounding/calculation order;
- ADR-0023 numbering/concurrency/fiscal algorithm;
- exact jurisdictional retention/residency legal obligations and durations;
- connector vendors/protocols;
- authentication vendor/protocol;
- physical database/schema/object design.

These items must implement this boundary contract rather than redefine authority by convenience.

---

# 10. ADR posture

No ADR status is changed by this candidate before external hostile review.

The candidate materially constrains/proposes closure direction for ADR-0005, ADR-0006, ADR-0008, ADR-0009, ADR-0012, ADR-0014, ADR-0018, ADR-0019, ADR-0020 and ADR-0021, and remains consistent with accepted ADR-0024.

Any ADR acceptance/change should be performed only after P1.4 external review/remediation confirms the corresponding decision.

---

# 11. Internal candidate verdict

**INTERNAL FREEZE CANDIDATE — READY FOR NARROW INTERNAL RECHECK, NOT YET P1.4 PASS.**

P1.5 and product code remain locked until external hostile review has no unresolved blocker and the final P1.4 verdict/checkpoint is recorded.