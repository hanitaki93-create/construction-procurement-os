# P1.7 — Capability-Neutral Extension Contract v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Define how deterministic services, imports, connectors, chat interfaces, AI tools and future agents attach to the frozen domain/evidence substrate without assuming any optional capability is reliable, permanent or required.

This contract freezes extension meaning and authority, not model quality, vendor, orchestration or UX.

---

# 2. Core invariant

The product has one deterministic semantic capability substrate.

A capability consumer may be:

- human UI;
- internal deterministic service;
- scheduled/batch service;
- file/import process;
- external connector;
- chat interface;
- specialized AI tool;
- single agent;
- multi-agent coordinator.

The consumer changes **who/what requests the operation**, not:

- domain authority;
- guards/invariants;
- evidence requirements;
- idempotency;
- result meaning;
- tenant isolation;
- correction semantics.

No consumer receives privileged hidden mutations.

---

# 3. Registered capability classes

Every exposed operation is registered as exactly one primary class.

## Q — QUERY

Reads authoritative records/projections/evidence under authorization.

Properties:

- no domain state change;
- result declares projection/schema/version/as-of context where material;
- may return partial/paginated/limited results;
- does not imply permission to act on returned data;
- source/evidence links may be included for explanation/citation.

## P — PROPOSAL

Creates a non-authoritative versioned proposal/draft/derived result.

Properties:

- result has explicit proposal identity/version/status;
- exact source inputs/evidence/locators/config/tool execution provenance where load-bearing;
- no business effect;
- may be reviewed, corrected, rejected, superseded or accepted through a separate bounded command;
- model/tool confidence is not domain authority;
- accepted domain result remains distinct from proposal history.

## C — COMMAND

Requests a bounded owning-domain transition.

Properties:

- deterministic domain validation;
- ordinary current authority/security;
- expected version/precondition;
- stable logical command/idempotency identity;
- evidence/config/authority binding;
- explicit outcome;
- same semantics regardless of initiator.

## A — ASYNC_OPERATION

Starts or tracks work whose result is not immediate.

Properties:

- operation acceptance ≠ business completion;
- stable operation identity;
- explicit progress/result state;
- terminal result may be query result, proposal, command outcome, import/export/migration result or evidence observation;
- cancellation semantics, if supported, do not silently reverse completed domain facts;
- retries do not create duplicate effects.

No unregistered fifth class exists.

---

# 4. CapabilityDefinition

Every capability exposed to UI/API/connector/chat/agent has a versioned `CapabilityDefinition` or equivalent semantics containing at minimum:

- stable capability key;
- human-readable purpose;
- primary class Q/P/C/A;
- owning domain/service boundary;
- semantic input contract version;
- semantic output/result contract version;
- required tenant/project/resource/context;
- allowed initiator classes;
- required authority/capability/grant;
- evidence/source/config prerequisites;
- idempotency/retry behavior;
- synchronous/asynchronous behavior;
- bulk/per-item semantics;
- data sensitivity/residency classification reference;
- side-effect declaration;
- manual/deterministic fallback where capability is optional;
- activation/lifecycle state;
- compatibility/deprecation information.

CapabilityDefinition is not an endpoint URL, prompt, model, code module or UI button.

---

# 5. Capability lifecycle

A capability version has exactly one lifecycle state:

- `DEFINED_DISABLED` — contract exists but cannot be invoked;
- `EXPERIMENTAL` — available only in controlled scopes; no reliability claim;
- `ENABLED_REVIEW_REQUIRED` — may produce query/proposal/result, with mandatory human/domain review before effect;
- `ENABLED_BOUNDED_AUTOMATION` — may invoke specifically permitted bounded commands under a frozen policy/profile;
- `DEPRECATED` — existing consumers may transition; new use restricted;
- `RETIRED` — cannot be newly invoked; history remains reconstructable.

These states describe availability/governance, not model accuracy.

P1.10 may add evaluation/confidence/autonomy conditions but cannot bypass these lifecycle meanings.

---

# 6. Expansion, reduction and replacement

## E01 — adding capability

A new capability may be introduced prospectively if it maps to existing frozen domain/query/proposal/command semantics or undergoes controlled architecture change for genuinely new domain meaning.

It cannot reinterpret historical events.

## E02 — reducing/disablement

A capability may be disabled, scoped down or changed from bounded automation to review-required without breaking deterministic/manual operations.

Pending operations receive explicit cancelled/failed/manual-review disposition according to their contract.

## E03 — replacement

A model/tool/provider implementation may be replaced behind a stable capability version only when output meaning/provenance/quality contract remains compatible.

If semantic behavior changes, create a new capability/output version.

Historical proposal/derived results retain the implementation/tool/model/config identity that produced them.

## E04 — retirement

Retiring a capability does not delete prior invocation, proposal, result, evidence or accepted-domain lineage.

## E05 — no mandatory optional layer

Core deterministic/manual workflow cannot depend on an EXPERIMENTAL or optional AI capability.

A tenant may operate with all AI/agent capabilities disabled.

---

# 7. Capability invocation context

Every invocation carries/resolves as applicable:

- tenant;
- project/resource/ContractingAuthorityContext;
- authenticated principal;
- acting/represented principal;
- initiator class and identity;
- capability key/version;
- requested operation class;
- input payload/version;
- source EvidenceVersion/SourceLocator references;
- governing config/policy/version;
- correlation/causation;
- logical invocation/idempotency key;
- requested scope/limits;
- data-access purpose where required.

A chat or agent cannot rely on hidden conversational context to substitute for these fields.

---

# 8. Proposal acceptance boundary

A proposal may never become authoritative by:

- high confidence;
- repeated model agreement;
- user viewing it;
- export/download;
- connector delivery;
- absence of correction;
- timeout;
- agent declaration of success.

Acceptance requires a named bounded domain command/action with:

- explicit proposal version/input reference;
- current authority;
- current target-state/precondition validation;
- evidence/config binding;
- accepted/corrected values;
- resulting domain event/record;
- history linking proposal to authoritative result.

A human correction can be captured as proposal revision or command input; it does not rewrite source evidence.

---

# 9. BOQ/package/RFQ capability family

Potential capability keys may include, without asserting reliability:

- `ReadBOQSource` — Q or A;
- `ExtractBOQLines` — P/A;
- `ProposeNormalizedRequirementLines` — P;
- `ProposeRequirementAllocationMapping` — P;
- `ProposeProcurementPackages` — P;
- `CreateProcurementPackageFromAcceptedMapping` — C;
- `GenerateRFQDraft` — P/A;
- `FreezeTenderRelease` — C;
- `IssueTenderRelease` — C/A depending communication path.

Hard rules:

- extraction retains exact source/locator provenance;
- package proposal cannot consume scope until accepted through domain command;
- package proposal never changes RequirementAllocation directly;
- generated RFQ is draft until frozen/issued;
- unsupported/unmapped/ambiguous rows remain explicit;
- deterministic/manual creation remains available;
- one capability may be disabled without collapsing the chain.

---

# 10. Query/explanation readiness

A future chat/assistant should be able to invoke registered queries such as:

- list unresolved supplier responses;
- explain supplier eligibility result;
- reconstruct award basis;
- trace value to source EvidenceVersion/SourceLocator;
- show pending communication/integration/migration state;
- explain why command was rejected;
- show source freshness/conflict;
- compare proposal versus authoritative result.

Query results distinguish:

- authoritative facts;
- projections/as-of state;
- source evidence;
- derived/proposal content;
- external facts/freshness;
- unresolved/unknown limitations.

An answer generator may summarize the result but cannot change the result classification.

---

# 11. Capability discovery

UI/chat/agent clients may discover capabilities only through an authorization-filtered registry/view.

Discovery returns as applicable:

- capability key/version/class;
- allowed current scope;
- required inputs;
- confirmation/review requirement;
- sync/async behavior;
- output type;
- activation/deprecation state;
- limitations/manual fallback;
- whether action is currently unavailable due to connector/dependency state.

Discovery does not grant authority.

Clients cannot invoke undisclosed/raw internal mutations.

---

# 12. Failure and uncertainty

Capability results use explicit states, including as applicable:

- success;
- no result;
- partial;
- ambiguous;
- unsupported;
- review required;
- stale dependency;
- unavailable/degraded;
- rejected;
- conflict;
- quarantined;
- cancelled;
- duplicate/replayed.

A capability may abstain or return unresolved output.

It must not fabricate completion or certainty to fit a requested schema.

P1.10 owns confidence/evaluation policy, but P1.7 guarantees result contracts can represent uncertainty and limitation.

---

# 13. Manual fallback

For every optional connector/AI/agent-assisted capability in A0–A3, the architecture identifies a deterministic/manual fallback such as:

- manual structured entry;
- controlled file import;
- buyer-on-behalf evidence capture;
- ordinary domain screen/action;
- bounded export/manual external handoff;
- manual review/correction of proposal.

Fallback may be slower. It must preserve the same authoritative domain/evidence semantics.

---

# 14. Tenant isolation

Capability invocation, retrieval, cache, tool execution, proposal history and evaluation data are tenant/context scoped under frozen ADR-0026.

A shared capability implementation/model may exist, but one tenant’s business data cannot influence another tenant’s output unless a future separate governed participation mode exists.

Capability registry/discovery cannot leak another tenant’s enabled features, sources, records or connector state.

---

# 15. One-XL guard

This contract does not create:

- generic plugin marketplace platform;
- agent orchestration platform;
- workflow/no-code automation system;
- universal tool registry product;
- AI evaluation platform;
- enterprise integration bus.

It defines only the minimum semantic registration/access boundary needed to keep optional capabilities replaceable and safe.

**P07 sole XL: preserved.**  
**A0–A3 minimal/manual path: preserved.**

---

# 16. Hostile tests

1. BOQ package model disabled tomorrow — manual package creation still valid? REQUIRED.
2. Model v2 maps rows differently — historical v1 proposal/acceptance reconstructable? REQUIRED.
3. Chat invokes hidden database update — impossible because no capability? REQUIRED.
4. Agent calls command twice — one logical command/effect? REQUIRED.
5. High-confidence proposal times out awaiting review — cannot auto-accept? REQUIRED.
6. Capability retired while async operation runs — explicit disposition, no silent loss? REQUIRED.
7. Tenant disables AI — ordinary sourcing rail still works? REQUIRED.
8. New specialized agent uses same capability as UI — same authority/guards? REQUIRED.
9. Query returns external stale fact — result labels freshness/authority? REQUIRED.
10. Generated RFQ downloaded but never issued — remains draft/proposal? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
