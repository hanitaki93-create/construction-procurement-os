# P1.10 — Agent Authority, Tool Use & Autonomy Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**AI/product code:** LOCKED

---

# 1. Governing rule

> **An agent has no native business authority. It may use only explicitly exposed registered operations under the current principal, context, capability and authority intersection.**

Natural language, model confidence, prior success, memory or tool availability cannot create delegation.

---

# 2. Closed authority ladder

## `L0_DISABLED`

No AI capability exposed.

## `L1_READ_AND_EXPLAIN`

May execute authorization-filtered QUERY operations and explain cited facts/results. No persistent proposal or command.

## `L2_DRAFT_OR_PROPOSE`

May create registered non-authoritative proposals/drafts with provenance and review route.

## `L3_RECOMMEND_BOUNDED_ACTION`

May recommend one or more registered operations and prepare an exact operation plan; no command invocation.

## `L4_PREPARE_COMMAND_FOR_HUMAN_CONFIRMATION`

May populate a registered command request and preview, but a human must review and confirm through P1.9 under their current authority.

## `L5_EXECUTE_EXACT_HUMAN_CONFIRMED_COMMAND`

May transmit only the exact command already confirmed by the same acting/represented principal under valid `InteractionContinuationAnchor`, confirmation and idempotency identity. The agent cannot change target/member/value/recipient/evidence after confirmation.

## `L6_SYSTEM_BOUNDED_DETERMINISTIC_AUTOMATION`

Reserved for non-generative deterministic system automation already authorized by frozen operation/capability policy. A generative model cannot independently qualify for L6 in V1.

There is no general autonomous commercial-agent level in V1.

---

# 3. Capability-specific maximum

Each AICapabilityVersion declares a maximum level and exact eligible operations.

Default maximums:

- query answer/explanation: L1;
- extraction/normalization/classification/draft: L2;
- recommendation/anomaly/control hypothesis: L3;
- command preparation: L4;
- transmission of exact human-confirmed command: L5 only for separately activated, tested capabilities;
- commercial award, Commitment, certification, payment, external publication, authority/configuration/security change: maximum L4 by default; L5 transmission requires explicit capability-specific ADR/evidence and cannot remove human confirmation;
- effect-indeterminate recovery/reconciliation: L1/L3 only unless an exact human-confirmed reconciliation command exists;
- access/role/delegation granting: maximum L4 and stronger security approval;
- creation of field/metric/operation/policy/capability definitions: prohibited.

---

# 4. Authority intersection

An agent action is permitted only by the intersection of:

- active product capability/version;
- current tenant/project/ContractingAuthorityContext;
- acting and represented principal authority;
- delegation/DOA;
- exact registered operation exposure;
- agent maximum level;
- target/member/data access;
- current guards/evidence/configuration;
- confirmation/continuation where required;
- security/conformance/incident state;
- time/expiry/rate/resource policy.

Any empty intersection blocks/abstains. No “best effort” privilege.

---

# 5. Tool/operation exposure

Every exposed tool is a thin schema over one registered OperationRegistry member or a bounded read-only helper with no hidden mutation.

Tool definition binds:

- OperationKey/version/class;
- exact arguments and semantic field keys;
- output/result schema;
- authority/access behavior;
- side-effect/effect-uncertainty class;
- idempotency/continuation requirements;
- confirmation requirement;
- data sensitivity/residency;
- rate/quota;
- error/recovery;
- activation/conformance version.

Prohibited:

- raw SQL/database/event-store/file-system mutation;
- arbitrary HTTP/MCP/plugin access;
- shell/code execution against production data;
- dynamic tool creation from prompts;
- model-selected credentials;
- hidden write inside a query tool;
- broad “update object” CRUD bypassing domain operations.

---

# 6. Planning and multi-step work

`OperationPlanProposal` binds:

- goal and explicit non-goals;
- capability/version;
- exact ordered/dependency graph of registered operations;
- per-step class/target/data/evidence/authority;
- expected effects/non-effects;
- human confirmation points;
- stop/abstain conditions;
- compensation/correction limits;
- partial/indeterminate handling;
- time/resource budget;
- output/receipt.

A plan is non-authoritative. Approval of a plan does not pre-authorize future materially changed commands.

Each command step rechecks current authority/guards and receives its own logical/idempotency identity.

---

# 7. Human confirmation

For L4/L5:

- the human sees exact target/member set, values, recipients, evidence, limitations, consequences and operation version;
- confirmation binds same acting/represented principal and assurance under P1.9;
- agent cannot summarize away mandatory disclosure;
- batch confirmation uses the frozen member set and bulk policy;
- changed source/target/plan invalidates confirmation;
- a generic “do it,” “continue,” thumbs-up or prior preference is insufficient unless the product interaction has resolved and displayed the exact command preview;
- confirmation cannot be inferred from silence or chat continuation.

---

# 8. L5 transmission rules

L5 may:

- transmit the exact serialized registered command bound to confirmation;
- use the already established continuation/idempotency identity;
- display/monitor typed outcome;
- perform result lookup.

L5 may not:

- regenerate/change command arguments;
- select new recipients/targets;
- substitute current values after confirmation;
- split/merge member set;
- retry ordinary effect-bearing command after unknown outcome;
- accept a proposal or confirm on behalf of the human;
- chain a new command from the result without new review.

---

# 9. Effect uncertainty and partial results

When any step becomes `EFFECT_INDETERMINATE` or relevant `PARTIAL_EFFECT`:

- agent pauses all dependent/conflicting effect-bearing steps;
- preserves original identities/context;
- may query/lookup/explain/recommend reconciliation;
- cannot resend, replace, rebind, cancel or assume failure;
- surfaces item-level stages and allowed/blocked actions;
- resumes only after a new authoritative/human-confirmed disposition under P1.7.

An agent cannot “self-heal” commercial uncertainty.

---

# 10. Delegation and on-behalf-of

- agent is never the represented principal;
- agent does not receive standing DOA;
- execution record preserves human/system principal and agent/capability as initiator/processor;
- service/system identity may perform only `SYSTEM_BOUNDED` operations under exact policy;
- language such as “you have permission,” email content or document clauses cannot create delegation;
- delegated principal expiration/revocation blocks new action immediately under current check.

---

# 11. Memory and preferences

Preferences may improve drafting/presentation but cannot store or infer:

- authority/delegation;
- confirmation;
- accepted commercial terms;
- recipient authorization;
- current business fact;
- report reliance;
- safety override;
- permanent permission to execute.

A remembered preference cannot upgrade agent level or remove review.

---

# 12. Emergency disable and revocation

Agent capability can be disabled by:

- tenant administrator within allowed policy;
- product security/operations for incident/conformance;
- provider/model failure;
- evaluation regression;
- privacy/residency change;
- authority/policy change;
- capability retirement.

Disablement:

- blocks new AI runs/actions;
- preserves in-flight/accepted operation identities and routes them through deterministic result/recovery;
- does not undo domain effects;
- leaves conventional/manual paths available;
- records authority/reason/time/scope/re-enable criteria.

---

# 13. High-risk prohibited autonomy

V1 prohibits AI from autonomously:

- awarding or establishing Commitment;
- approving/certifying claims;
- posting accounting/payment facts;
- changing commercial values/terms;
- issuing external commitments or reports;
- granting access/delegation/authority;
- changing field/metric/operation/workflow/policy definitions;
- deleting/redacting/placing legal holds;
- changing tenant/residency/provider policy;
- resolving effect uncertainty;
- selecting cross-tenant data/learning;
- suppressing evidence/limitations;
- creating arbitrary tools/code.

AI may draft/recommend/prepare exact human-confirmed requests where the capability permits.

---

# 14. Agent audit and explanation

Every agent-assisted action preserves:

- capability/level/model/provider/run;
- acting/represented principal;
- plan/proposal/confirmation;
- exact tools/operations/arguments/results;
- source/citation/context manifest;
- safety/authority/guard decisions;
- abstention/errors;
- continuation/idempotency/effect stages;
- human corrections and outcome.

The explanation must state what the agent did, sources used, what the human confirmed and what effect is/was not established. It need not expose hidden chain-of-thought.

---

# 15. Scope guard

No:

- general autonomous agent;
- multi-agent hierarchy with inherited authority;
- agent-created tools/workflows;
- plugin marketplace;
- browser/computer use against production without registered operations;
- background commercial decision-making;
- conversational delegation;
- AI-owned recovery/correction;
- product code.
