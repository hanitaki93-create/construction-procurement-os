# Construction Procurement OS — P2.2 Self-Service Build Program Overlay v1.0

**Date:** 2026-08-08  
**Status:** FROZEN PROSPECTIVE OVERLAY  
**Authority:** CHG-SSS-001 v1.0  
**Historical P2.2:** preserved and reconstructable; this overlay controls only prospective implementation changed by CHG-SSS-001  
**B01:** unchanged  
**P07 gates:** V4 unchanged  
**AI gates:** V6 unchanged

---

# 1. Governing rule

The frozen historical P2.2 build program remains part of the project record.

For implementation after CHG-SSS-001, this overlay supersedes only the following prospective matters:

- B02 scope gains self-service/SaaS kernel responsibilities and first conventional product surfaces;
- first human-facing conventional surfaces move into their owning B04–B09 blocks;
- B10 becomes cross-domain internal UX/onboarding/Quick-Start consolidation rather than the first complete internal UI;
- B11 becomes external UX consolidation/hardening rather than the first external semantic implementation;
- B12 gains fixed product dashboards and non-authoritative product analytics;
- B14 gains public self-service abuse/sender-reputation release hardening;
- B15 becomes deterministic self-service release validation under SSV-2/SSV-3 rather than owning old V1/V2 throwaway validation;
- SSV-1 is a mandatory final-PASS condition for B02 and B04–B12;
- legacy V1/V2 prospective build lock is superseded by CHG-SSS-001;
- V4, V5 and V6 retain their existing meanings.

Everything else inherits frozen P2.1/P2.2 and the Phase-1 master package.

No block may answer an unresolved load-bearing semantic question by implementation convenience.

---

# 2. Prospective dependency graph

```text
B01 Engineering Foundation [UNCHANGED]
 └─ B02 Platform + Self-Service/SaaS Kernel + First UI [SSV-1]
     └─ B03 Async/Event/Publication/Reconciliation + Usage/Event Support
         └─ B04 Evidence/Files/Issued Artifacts/Communication + UI [SSV-1]
             └─ B05 Requirements/Allocation + UI [SSV-1]
                 └─ B06 Sourcing/RFQ/Response Schema/Grants/Issue + UI [SSV-1]
                     └─ B07 Supplier Submissions/Revisions/Buyer Capture + UI [SSV-1]
                         └─ B08 Normalization/Comparison + UI [SSV-1]
                             └─ B09 Recommendation/Approval/AwardDecision/Handoff + UI [SSV-1]
                                 ├─ B10 Internal UX/Onboarding/Quick-Start Consolidation [SSV-1]
                                 └─ B11 External UX Consolidation/Hardening [SSV-1]
                                     └─ B12 Reporting/Dashboards/Search/Export/Product Analytics [SSV-1]
                                         └─ B13 Integration/Migration/Provider-Neutral Email
                                             └─ B14 NFR/Security/Restore/Abuse/Release Hardening [V5]
                                                 └─ B15 Deterministic Self-Service Release Validation [SSV-2/SSV-3]
                                                     ├─ B16 P07 Commitment/Change Baseline [V4]
                                                     │   └─ B17 P07 Claims/Certification/Correction/Reporting [V4]
                                                     └─ B18 AI Capability Substrate/Capabilities [V6]
```

B10 and B11 may develop in parallel only after stable B09 operation/transport/disclosure contracts.

B12 closes after the internal/external UX dependencies it consumes are stable.

SSV-4 is a release authorization after the required build/gate evidence; it is not an implementation block.

SSV-5 is post-release commercial evidence; it is not an implementation prerequisite.

---

# 3. SSV-1 block-completion rule

The applicable SSV-1 set is:

`B02, B04, B05, B06, B07, B08, B09, B10, B11, B12`

Any later block that introduces or materially changes a consequential human-facing semantic surface joins the set under CHG-SSS-001. The set is extensible, never reducible.

For an applicable block:

`implementation`
`→ local invariant/security/NFR evidence`
`→ RollingComprehensionCheckpoint`
`→ final BlockCompletionEvidenceManifest`
`→ PASS`
`→ successor unlock`

The checkpoint is part of block PASS, not a parallel successor-only lock.

B03 remains outside the initial set only while it has no consequential human-facing semantic surface.

---

# 4. B01 — Engineering Foundation & Runtime Skeleton

**Disposition:** UNCHANGED.

Historical B01 implementation/audit remains authoritative.

No CHG-SSS-001 concept is retrofitted into B01.

B01 final acceptance remains required before formal B02 authorization.

---

# 5. B02 — Platform + Self-Service/SaaS Kernel + First UI

## Objective

Create the only legal tenant/business execution substrate, add the bounded SaaS control plane, establish self-service bootstrap and ship the first conventional product surfaces without introducing procurement-domain tables.

## Owns — inherited platform kernel

- tenant/project/legal entity/principal/session/context;
- role/delegation/DOA/external-grant primitives;
- fail-closed execution context / FORCE RLS;
- invariant-register/coverage activation and reverse mappings;
- effective-dated family inventory;
- OperationRegistry;
- QUERY/PROPOSAL/COMMAND/ASYNC_OPERATION envelopes;
- idempotency/continuation/preview/confirmation/typed outcome;
- concurrency/guard/expected-version/retry framework;
- audit/security separation;
- governed bootstrap operations.

## Owns — CHG-SSS-001 additions

### Identity/bootstrap

- verified authentication identity binding without hardcoding the provider;
- idempotent `TenantBootstrapIntent`;
- tenant creation;
- minimum company/legal context;
- initial OWNER membership;
- safe retries/lost-result/concurrent-bootstrap behavior;
- one identity participating in multiple tenants without identity=authority collapse.

### SaaS control plane

- ProductOfferingVersion;
- EntitlementDefinitionVersion;
- UsageMeasureDefinitionVersion where retained as separate registry;
- TenantSubscription;
- SubscriptionLifecycleOccurrence;
- MeteredUsageOccurrence;
- derived ResolvedEntitlementSnapshot;
- effective-period non-overlap;
- entitlement command-time revalidation;
- product entitlement distinct from business authority;
- manual governed Enterprise activation;
- read/export/offboarding floor semantics.

### Minimum product surfaces

- sign-in/auth callback shell sufficient for selected provider later;
- signup/bootstrap;
- company/tenant context;
- first project creation/context;
- user/membership administration within authority;
- subscription/account state;
- clear restriction/expiry states.

### B02 internal checkpoints

- B02-C1 Identity/Tenant Bootstrap;
- B02-C2 Subscription/Entitlement Core;
- B02-C3 Usage/Lifecycle/Offboarding;
- B02-C4 Self-Service Product Surface.

Internal checkpoints do not unlock B03.

## Excludes

- procurement requirement/RFQ/supplier-response semantics;
- evidence acceptance;
- P07;
- AI;
- generic billing/accounting;
- generic auth platform;
- generic entitlement platform;
- named ERP/CDE connectors;
- unrestricted public supplier invitations.

## Gate

In addition to inherited B02 gates:

- hostile tenant/RLS isolation;
- bootstrap retry/lost-response/concurrency;
- tenant != legal entity;
- identity != business authority;
- effective-period overlap races;
- stale entitlement cannot authorize command;
- preview invalidation on material entitlement change;
- accepted-command entitlement binding;
- append-only usage/adjustment derivation;
- no mutable allowance balance;
- expiry/downgrade does not rewrite history;
- public-account surface reveals no cross-tenant data;
- B02-C1–C4 PASS;
- SSV-1 RollingComprehensionCheckpoint PASS;
- independent block review.

---

# 6. B03 — Async/Event/Publication/Reconciliation + Usage/Event Support

Historical B03 ownership remains.

CHG addition:

- async processing support for usage occurrences where the usage-producing operation is asynchronous;
- billing-provider observations/reconciliation when such a provider is introduced at this stage;
- tenant/resource quotas needed by later self-service abuse controls.

Rules:

- billing-provider observation never directly writes entitlement;
- usage emission is idempotent/correlated;
- no mutable usage balance;
- timeout/absence remains no proof of no effect.

No human-facing SSV-1 checkpoint is required unless B03 later introduces a consequential human semantic surface.

---

# 7. B04 — Evidence/Files/Issued Artifacts/Communication + UI

Historical semantic ownership remains.

Add first conventional surfaces for:

- upload/file capture;
- evidence status;
- evidence/source/version viewer;
- issued artifact visibility;
- communication occurrence/status where available.

SSV-1 must test source/evidence/version/status comprehension.

---

# 8. B05 — Requirements/Allocation + UI

Historical semantic ownership remains.

Add first conventional surfaces for:

- authorized requirement source;
- RequirementAllocation;
- optional ProcurementPackage;
- amendment/supersession;
- scope overlap requiring controlled human resolution.

FT-10 safe form remains controlling.

SSV-1 must test requirement versus allocation/package meaning and authority.

---

# 9. B06 — Sourcing/RFQ/Response Schema/Grants/Issue + UI

Historical semantic ownership remains.

Add first conventional surfaces for:

- supplier/contact selection;
- RFQ/tender event;
- response-schema content;
- recipients/channels;
- dates/deadlines/addenda;
- preview/confirmation;
- issue;
- ExternalTaskGrant status/revoke/transfer where permitted.

Apply first-public-offering grant-duration/invitation-volume dispositions before public release, not as hardcoded universal numbers.

SSV-1 must test draft versus issued state, recipient scope, grant meaning, deadline/addendum and consequential issue semantics.

---

# 10. B07 — Supplier Submissions/Revisions/Buyer Capture + UI

Historical semantic ownership remains.

Add first internal and required external response surfaces for:

- response capture;
- buyer-on-behalf capture;
- source principal versus capture actor;
- revision history;
- receipt/disposition;
- attachment evidence;
- late/withdrawn/superseded/quarantined states.

No persistent supplier account is required.

SSV-1 must test source/capture/assurance/revision/receipt meaning.

---

# 11. B08 — Normalization/Comparison + UI

Historical semantic ownership remains.

Add first conventional comparison surfaces preserving four layers:

1. supplier source;
2. normalized representation;
3. buyer adjustment/evaluation;
4. supplier-confirmed contractable basis where applicable.

Quick Compare may feed this block only through the CHG-SSS-001 promotion boundary.

A non-load-bearing Quick Compare scratch workspace cannot be a ComparisonSnapshot.

SSV-1 must specifically test source-versus-derived, buyer-adjustment and governed-versus-scratch comprehension.

---

# 12. B09 — Recommendation/Approval/AwardDecision/Handoff + UI

Historical semantic ownership remains.

Add first conventional surfaces for:

- recommendation/supporting basis;
- approval/conditional approval;
- DOA/delegation consequence;
- approval invalidation;
- AwardDecision;
- re-tender/reject;
- handoff.

SSV-1 must test approval != AwardDecision != Commitment and stale/changed proposal behavior.

---

# 13. B10 — Internal UX/Onboarding/Quick-Start Consolidation

B10 is no longer the first owner of B05–B09 business UI semantics.

It owns cross-domain internal productization:

- coherent navigation/information architecture;
- onboarding and first-value guidance;
- Quick Compare entry experience;
- Quick RFQ entry experience;
- project/home workflow surfaces;
- saved views where bounded;
- action-required experience;
- consistent preview/confirmation/continuation/outcome;
- mobile-responsive web;
- Arabic/RTL;
- accessibility;
- error/recovery consistency;
- design-system hardening.

It may not create alternate domain truth/operations.

**SSV-1 is mandatory.**

The checkpoint must specifically test that users do not mistake:

- Quick Compare scratch output for governed ComparisonSnapshot;
- proposed/draft content for issued/established content;
- AI/source extraction for supplier truth;
- convenience navigation for business authority.

---

# 14. B11 — External UX Consolidation/Hardening

B11 consolidates/hardens the external participation experience over B06/B07 semantics.

Owns:

- opaque grant-token exchange/scoped session;
- coherent external task experience;
- no-account flow;
- response/revision/upload/status;
- decline/no-bid/help;
- optional persistent external workspace boundary;
- email/file/manual fallback coordination;
- mobile/RTL/accessibility;
- anti-phishing/clear buyer/supplier context disclosures.

No supplier subscription is required for an invited ordinary task.

**SSV-1 is mandatory.**

Checkpoint must test external grant scope, actor/represented-principal understanding, receipt/disposition, no-account path and forwarding/revocation expectations.

---

# 15. B12 — Reporting/Dashboards/Search/Export/Product Analytics

Historical P1.8 reporting semantics remain.

Owns additionally:

- fixed Home/Action Required dashboard;
- Project Procurement dashboard;
- Tender/RFQ Coverage;
- Comparison/Approval/Supplier views;
- non-authoritative product analytics event stream;
- activation/first-value/retention instrumentation definitions.

No generic BI builder.

Commercial entitlement may make a dashboard unavailable, but when shown it cannot silently remove business rows and present a smaller set as the full population.

Security/business authorization continues filtering inaccessible records and must be disclosed through the frozen population/quality semantics.

**SSV-1 is mandatory.**

Checkpoint must test complete/partial/stale/restricted/indeterminate, subset/total and action-required meaning.

---

# 16. B13 — Integration/Migration/Provider-Neutral Email

Historical ownership remains.

No named connector becomes mandatory for A0–A3.

Subscription billing providers, future ERP/accounting, scheduling, CDE, e-signature and email providers all reuse P1.7 adapter/authority/reconciliation semantics.

No generic iPaaS.

---

# 17. B14 — NFR/Security/Restore/Abuse/Release Hardening [V5]

Historical B14 ownership remains and does not waive predecessor-local evidence.

Add consolidation/hardening for:

- public signup rate/abuse envelope;
- outbound invitation quotas;
- AI/storage/resource abuse controls;
- bounce/complaint suppression;
- supplier report/suppression;
- sender-reputation isolation;
- subscription/billing-provider failure modes;
- public offering task-duration/invitation-volume enforcement;
- incident/offboarding runbooks for self-service release.

Exact provider topology remains physical.

V5 retains its historical meaning.

---

# 18. B15 — Deterministic Self-Service Release Validation [SSV-2/SSV-3]

B15 prospectively no longer owns the old mandatory V1/V2 throwaway evidence sequence.

Owns:

- SSV-2 integrated deterministic A0–A3 validation;
- SSV-3 external-participation release validation;
- onboarding/activation/first-value instrumentation;
- supplier-completion instrumentation;
- deterministic golden-thread pack;
- release configuration/export/support tooling;
- aggregation/reference of all prior SSV-1 ValidationGateDecision records;
- deterministic self-service release candidate.

Gate:

- all predecessors final PASS;
- all applicable SSV-1 checkpoints PASS;
- zero architecture invention;
- A0–A3 complete with AI/named connectors/P07 disabled;
- SSV-2 PASS;
- SSV-3 PASS where public external participation is included;
- architecture/build/comprehension/security/AI/commercial claims remain separate.

SSV-4 occurs after the required release evidence; it is not B15 implementation work.

---

# 19. B16/B17 — P07 [V4]

Historical P07 ownership/gates remain unchanged.

FT-02, FT-06 and FT-09/CR-02 remain assigned to the affected P07 implementation/activation boundaries under CHG-SSS-001.

V4 remains P07 feasibility.

---

# 20. B18 — AI [V6]

Historical AI substrate/authority/evaluation semantics remain unchanged.

B18 may be commercially prioritized after deterministic self-service validation, but no AI capability activates without its required V6 evaluation status.

AI remains optional and removable from deterministic A0–A3.

---

# 21. Quick Start physical ownership

Quick Start is split intentionally:

- B10 owns acquisition/onboarding UX;
- B04 owns uploaded evidence;
- B05/B06 own requirement/RFQ promotion;
- B07 owns valid supplier-source capture;
- B08 owns governed normalization/comparison;
- B09 owns recommendation/approval/AwardDecision.

No Quick Start screen may become a parallel domain owner.

---

# 22. Subscription/effect ownership

B02 owns subscription/entitlement commercial access state.

B03 owns async observations/reconciliation where required.

B13 owns named provider adapters when introduced.

A billing provider never directly owns CPOS entitlement.

Subscription state never owns procurement fact meaning.

---

# 23. Block-completion evidence additions

For every affected block, `BlockCompletionEvidenceManifest` must additionally record as applicable:

- CHG-SSS-001 version;
- SSV gate records;
- delivered conventional surfaces;
- entitlement interactions;
- product-analytics event definitions;
- external-task commercial-limit interactions;
- public abuse controls;
- no-regression proof for deterministic A0–A3.

For SSV-1 blocks, the final manifest must reference the exact PASS `ValidationGateDecision`.

---

# 24. Authorization

CHG-SSS-001 / SSV-0 is frozen PASS.

Historical V1/V2 pre-build authorization wording is superseded prospectively for the self-service path.

Formal B02 implementation authorization requires:

1. B01 final PASS / owner acceptance;
2. explicit project-owner implementation authorization.

No legacy V1/V2 condition remains a separate prerequisite.

---

# 25. Final non-claim

This overlay defines how the approved architecture is built after the subscription-native change.

It is not PMF, production certification or commercial proof.
