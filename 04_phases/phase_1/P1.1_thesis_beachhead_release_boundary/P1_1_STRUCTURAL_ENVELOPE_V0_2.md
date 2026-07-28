# P1.1-A — Structural Envelope v0.2

**Status:** PROVISIONAL / NOT FROZEN  
**Supersedes for current P1.1 reasoning:** commercial wording in `P1_1_BEACHHEAD_CANDIDATES_V0_1.md` and integrated draft v0.1.

## Purpose

P1.1 defines the structural environment the architecture must accommodate and the sampling filter P1.2 will use. It does **not** prove a market segment or product-market fit.

## Initial deployment/sampling boundary

### Jurisdiction profile

- Initial deployment/evidence jurisdiction: **UAE**.
- The architecture must represent jurisdiction-dependent tax/commercial policy, legal-entity identity, vendor compliance evidence, currency and contract/commercial terms without hardcoding UAE-only semantics.
- P1.5 Ceiling Test remains responsible for proving the model can expand beyond one country without ontology rewrite.

### Tender regime boundary

- Initial sampling/deployment focuses on **private-sector contractor procurement**.
- Public-sector procurement procedure/compliance is not assumed absent from the long-term architecture; its additional tender/award controls remain an explicit future evidence question.

### Contracting posture

Primary P1.2 sampling posture:
- contractor acting downstream as buyer/issuer of material orders and/or subcontracts;
- contractor may also sit upstream under a client/main-contract relationship.

**Architecture rule:** contracting posture is a modelled attribute/relationship, not a hardcoded tenant type. A specialist contractor, main contractor or other buying organization must not require a new core ontology merely because its position in the contract chain differs.

### Organization/authority shape

The envelope must accommodate:
- one or more legal entities/branches/business units where present;
- dedicated or shared procurement responsibility;
- project/site demand originators;
- QS/commercial/management approval participation;
- explicit authority/DOA depth rather than assuming a fixed organization size.

### Currency exposure

The model must support:
- AED operating/reporting context;
- supplier/commitment currencies that may differ from the reporting/budget currency;
- explicit FX/tax/rounding semantics later in P1.5.

No specific transaction volume is an architecture assumption.

### Accounting posture range

P1.1 must accommodate a range from:
- structured accounting with weak procurement integration;
- through ERP/job-cost systems that own substantial financial truth;
- to cases where operational commitment truth is maintained partly outside accounting.

`ADR-0005` remains PRIMARY_REQUIRED. P1.1 may define interfaces but may not decide product-vs-accounting ownership of AP/GL/invoice/payment truth.

### External-party posture

Suppliers/subcontractors are first-class external participants in sourcing/evidence flows. V1 may use task-focused secure access rather than requiring persistent portal membership.

## Explicitly not architecture constraints

The following are **not** P1.1 architecture constraints:
- `mid-market` label;
- revenue band;
- 5–25 projects or any fixed concurrency range;
- willingness to pay;
- pricing;
- sales cycle;
- commercial implementation model;
- claim that UAE is the commercially optimal market.

Project concurrency may be used as a P1.2 sampling variable and measured observation, but cannot justify architectural simplification by itself.

## P1.2 sampling implication

P1.2 should intentionally sample variation across:
- project concurrency;
- organization/approval depth;
- main-contractor vs specialist-contractor posture;
- accounting/ERP posture;
- material-heavy vs subcontract-heavy procurement.

The goal is to discover which structural variables change the workflow—not to validate a pre-selected commercial persona.