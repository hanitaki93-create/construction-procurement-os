# P1.5 — Authority, Lifecycle & Concurrency Kernel v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE INTEGRATED CANDIDATE / NOT FROZEN  
**Parent:** `P1_5_MONEY_CORRECTION_TEMPORAL_KERNEL_V0_1.md`  
**Primary ADRs:** ADR-0008, ADR-0009, ADR-0023  
**Inherited accepted:** ADR-0018, ADR-0020, ADR-0024  
**Product code:** LOCKED

---

## 1. Purpose

Define the common deterministic control contract that makes P1.5 commercial state changes safe across:

- commitment formation;
- commitment change/instruction;
- receipt/return;
- claim/assessment/certification;
- retention/advance/recovery release/effect;
- correction/finality;
- closeout;
- configuration/authority changes;
- retries/concurrent actors;
- human/legal numbering.

The goal is not to create a general workflow engine. The goal is to ensure every load-bearing transition has one bounded path from request → authorization → invariant validation → single effective domain event → auditable result.

No workflow vendor, DB lock mechanism or message broker is selected.

---

# 2. State-change contract

Every state-changing business operation must resolve semantically to:

`CommandRequest`
`→ current identity/security check`
`→ bound policy/config resolution`
`→ workflow/approval outcome if required`
`→ deterministic domain invariant evaluation`
`→ concurrency/idempotency check`
`→ atomic effective domain transition`
`→ immutable event/audit/evidence linkage`
`→ projections/integration notifications`

No UI, workflow node, agent or connector bypasses this path.

---

# 3. Command contract

Every load-bearing domain command defines:

- command name/purpose;
- target domain identity/identities;
- tenant/project/ContractingAuthorityContext;
- requesting principal;
- represented party where applicable;
- current required permissions/security capability;
- bound policy/configuration versions;
- input/evidence references;
- expected state/version/preconditions;
- idempotency identity;
- deterministic guards/invariants;
- approval outcome requirements;
- effective business-time rule;
- monetary/calculation policy where relevant;
- emitted domain event(s);
- economic effect;
- reversibility/correction path;
- audit result.

This semantic command contract is the future agent/tool action surface.

---

# 4. Workflow boundary

## W01 — workflow routes, collects and resolves authorization work

Workflow/control may:

- create tasks;
- assign/reassign ball-in-court;
- collect approvals/rejections/returns;
- evaluate bounded routing conditions;
- enforce deadlines/escalation rules;
- collect required evidence/acknowledgment;
- produce an approval/control outcome.

## W02 — workflow does not own domain transition

A workflow outcome is consumed by the owning domain command/service.

Workflow cannot directly set:

- commitment effective value;
- certified amount;
- retention/advance balance;
- receipt quantity;
- allocation consumption;
- payment/accounting fact;
- other commercial truth.

## W03 — workflow outcome can expire/become unusable

An approval outcome may be valid only for:

- target object/version;
- bounded command/type;
- policy version;
- conditions/context;
- validity period where defined.

If target state/config materially changes before execution, the domain command may require re-evaluation/reapproval.

## W04 — return/rework does not imply destructive rollback

Returning a task/case changes workflow/control state only unless a separate governed domain correction/reversal is required.

---

# 5. ADR-0008 workflow breadth alternatives

## WB-1 — generalized tenant-authored BPM

Arbitrary nodes/transitions/scripts/actions.

**Reject for V1.**

Creates configuration/testing gravity, can bypass domain guards and threatens second XL.

## WB-2 — module-specific hard-coded workflows only

Each domain owns completely separate approval/routing implementation.

**Reject as sole approach.**

Duplicates DOA/delegation/task/audit primitives and creates inconsistent control semantics.

## WB-3 — bounded shared control primitives + domain-owned transitions

Shared deterministic control vocabulary:

- approval step/group;
- sequential/parallel approval;
- threshold/DOA routing;
- delegation;
- conditional required reviewer based on bounded typed facts;
- return/request-info;
- task/ball-in-court;
- expiry/escalation;
- compliance/technical prerequisite;
- override with explicit authority/reason/evidence where product policy permits.

Domain modules define which commands require which bounded policies and revalidate invariants at execution.

**LEADING CANDIDATE.**

---

# 6. Configuration breadth — ADR-0009 candidate boundary

V1 configuration may control bounded dimensions with explicit type/version/audit semantics, including as applicable:

- DOA/approval thresholds;
- role/permission assignments;
- project/legal/entity mappings;
- supplier contextual eligibility rules from supported rule types;
- numbering policies;
- monetary calculation policies/profiles;
- supported tax/FX policy profiles;
- requirement/cost-attribution gates;
- commitment-kind capability profiles;
- external authority mappings/freshness thresholds;
- selected lifecycle policy switches where domain-safe;
- residency/retention settings already bounded upstream.

V1 does **not** allow arbitrary tenant-authored:

- code/scripts;
- data mutation rules;
- event types;
- financial formulas;
- state machines;
- authorization language;
- records-retention policy engine;
- agent authority logic.

Configuration is versioned/effective/auditable and cannot redefine frozen domain invariants.

**ADR-0009 leading direction: constrained typed configuration, not broad no-code platform.**

---

# 7. Internal authorization contract

For every new domain action:

1. authenticate current principal;
2. resolve active tenant membership/context;
3. evaluate current permission/role;
4. evaluate active delegation where relevant;
5. load bound governing approval/policy version for the case/action;
6. verify required approval outcome(s);
7. evaluate current compliance/eligibility/technical gates;
8. re-evaluate domain invariants;
9. execute only if current security capability still permits action.

Historical approval/policy binding cannot preserve revoked current access.

External grant can never satisfy this internal authorization path.

---

# 8. DOA / approval semantics

## A01 — approval policy version is load-bearing

Policy version defines required authority path for a bounded decision/command.

## A02 — approval authority is contextual

Authority may depend on:

- tenant/legal entity;
- project/business scope;
- amount/value basis;
- transaction type;
- currency/conversion basis where threshold comparison requires it;
- risk/exception category;
- other bounded supported dimensions.

## A03 — approval amount basis must be explicit

A policy cannot simply say “approve if amount ≤ X” without defining which governed amount drives the threshold, for example:

- award contractable amount;
- commitment original/effective amount;
- change delta;
- current commitment after change;
- certificate gross/net amount;
- recovery amount.

Exact per-domain basis is policy configuration/specification, not UI inference.

## A04 — parallel approval outcomes

Where multiple approvals are required, domain execution occurs only when the policy's completion condition is satisfied.

Concurrent approvers do not each create the domain event.

## A05 — delegated authority

Delegation must preserve:

- delegator;
- delegate;
- scope;
- effective interval;
- limit/constraints;
- provenance/authority to delegate.

Delegation does not rewrite historical actor identity.

---

# 9. Ball-in-court and tasks

A task/ball-in-court record answers:

> who is expected to act next under the current control process?

It is not domain state truth.

Task completion may produce:

- evidence;
- approval outcome;
- acknowledgment;
- command request.

A task can be cancelled/reassigned/expired without reversing the underlying commercial transaction.

Actual procurement/commercial milestone status derives from domain events where possible.

---

# 10. Lifecycle architecture principle

P1.5 does not force one universal status machine across PO/subcontract/tender/claim/etc.

Instead every SPINE transaction defines:

- **identity lifecycle** — existence/supersession/closure;
- **business-effectiveness axis** — proposed/pre-effective/effective/ended where applicable;
- **domain-specific operational states**;
- **control/approval state** separately;
- **external/integration state** separately;
- **derived status projections** separately.

No single overloaded `status` field may collapse these axes.

---

# 11. Commitment lifecycle candidate

This is a semantic axis, not final UI status list.

## Pre-effective

Preparation/draft exists but no supplier obligation.

Allowed outcomes:

- continue preparation;
- approve/authorize;
- abandon/cancel draft;
- make effective when guards pass.

## Effective/open

Supplier obligation exists.

May receive:

- changes/instructions;
- fulfilment events;
- claims/assessments/certifications;
- releases/recoveries;
- corrections;
- suspension/holds if supported;
- close/termination actions.

## Ended

No ordinary new performance/commitment expansion actions unless explicit post-close correction/recovery/warranty process permits them.

End reason is explicit, for example as supported:

- completed/closed;
- cancelled before performance where legally valid;
- terminated;
- expired;
- superseded/replaced.

End reason must not be collapsed into one generic `CLOSED` meaning where consequences differ.

---

# 12. Change/instruction lifecycle candidate

Axes:

- proposed/requested;
- under review/negotiation;
- authorized instruction/provisional effect where separately valid;
- approved/agreed effective change;
- rejected/withdrawn;
- superseded/corrected.

An instructed/provisional path may coexist with commercial agreement status; do not force it into a single linear state sequence.

---

# 13. Claim/assessment/certification lifecycle candidate

Supplier claim lifecycle:

- draft external/buyer-on-behalf capture;
- submitted/effective source revision;
- superseded/revised;
- withdrawn where legitimate.

Buyer assessment lifecycle:

- preparation;
- reviewed/authorized;
- effective assessment;
- superseded/corrected.

Certification lifecycle:

- preparation/calculation;
- approval/control pending;
- effective/finalized for ordinary edit;
- corrected/reversed/adjusted through governed event;
- external accounting accepted/rejected/posted as separate axis.

Claim return/rejection does not equal certificate reversal.

---

# 14. Goods fulfilment lifecycle candidate

Per receipt/fulfilment fact as applicable:

- expected/open quantity/component;
- delivered evidence;
- accepted quantity;
- rejected quantity;
- returned/reversed quantity where real;
- closed fulfilment component.

Cumulative accepted/rejected/returned projections derive from receipt events.

A later commercial certification/accounting axis remains separate.

---

# 15. Finality and correction reachability

Any lifecycle state described as final/closed must still define whether these commands remain legal:

- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- reclassification;
- physical reversal where real;
- retention/security release;
- recovery;
- audit/redaction/tombstone.

“Closed” cannot mean “database row can never receive linked correction history.”

---

# 16. Concurrency model — semantic guarantees

## CC01 — immutable internal identity

Every load-bearing aggregate/event/command has stable internal identity independent of display number.

## CC02 — command idempotency

Retried equivalent command requests must not create duplicate economic effects.

A semantic idempotency identity is required for high-risk commands.

## CC03 — expected-state/version check

A command evaluates against the current authoritative state/version or equivalent causal precondition.

If the state materially changed since user/agent prepared the command, execution fails/re-evaluates rather than silently applying stale intent.

## CC04 — atomic invariant + event effect

The invariant check and authoritative state/event effect must be atomic at the required business boundary.

Physical locking/transaction mechanism is later implementation.

## CC05 — multi-identity conservation

Operations that affect multiple allocation leaves/components/commitments must preserve conservation atomically or through a protocol that cannot expose a valid-looking double-consumed state.

This is especially important for:

- RequirementAllocation split/merge;
- multi-award scope partition;
- commitment formation against allocation;
- quantity receipt tolerance;
- cross-component certification allocation.

## CC06 — approval races

Multiple approvals may complete concurrently, but exactly one domain transition/economic effect becomes effective for one intended command/version.

## CC07 — stale approval

If the target materially changes after approval, command policy decides whether approval remains valid, requires re-evaluation or requires new approval.

No approval token authorizes arbitrary future versions.

---

# 17. High-risk idempotency catalogue v0.1

At minimum require explicit idempotency/single-effect semantics for:

- tender release issue/addendum issue;
- bid ingestion/revision identity;
- AwardDecision effectiveness;
- RequirementAllocation split/merge/reconcile;
- commitment formation;
- commitment effective change;
- authorized work instruction effectiveness;
- goods receipt/return;
- assessment effectiveness where cumulative;
- certification effectiveness;
- retention release;
- advance recoupment/correction;
- recovery/contra effectiveness;
- commercial correction/reversal;
- commitment close/termination;
- configuration/authority migration;
- data residency migration;
- export/disposition/redaction action;
- display-number allocation where number is load-bearing.

---

# 18. Numbering model — ADR-0023

## N01 — internal identity versus display number

Immutable internal technical/business identity is separate from human/legal display number.

Changing numbering policy never changes internal identity or historical links.

## N02 — numbering policy is versioned configuration

A display number policy defines as applicable:

- document/transaction family;
- tenant scope;
- legal entity;
- project;
- business unit/branch where legitimate;
- fiscal/calendar scope;
- prefix/suffix/format;
- sequence rule;
- gap policy;
- allocation milestone;
- cancellation/reuse policy;
- backdating rule.

## N03 — no universal gapless promise

Gapless numbering is not assumed by default.

If a deployment/legal/document type genuinely requires constrained gap behaviour, that is an explicit verified policy with implementation burden accepted.

Otherwise retries/cancellation must not corrupt transactional correctness merely to hide gaps.

## N04 — allocation at governed milestone

Number allocation occurs at a defined business milestone for each number family, such as issue/effectiveness/finalization, rather than arbitrary object creation unless evidence requires early reservation.

## N05 — retries return same number for same logical allocation command

Idempotent retry cannot consume multiple numbers for one successful logical issue/effectiveness action.

## N06 — allocated historical numbers are never silently reused

Cancellation/void may leave an auditable unused/void number according to policy.

Reuse is forbidden unless a specific verified policy safely permits it; default is no reuse.

## N07 — effective-date/fiscal rule explicit

If numbering sequence depends on fiscal period/calendar, policy specifies whether period derives from business-effective date, issue date or another governed date.

Backdated action cannot silently allocate a number under a historical sequence if policy disallows it.

---

# 19. ADR-0023 candidate direction

Candidate decision:

> Separate immutable internal identity from human/legal display numbering. Use versioned bounded numbering policies defining scope, format, sequence, gap rule, allocation milestone, fiscal-date rule and cancellation/reuse behaviour. Default architecture does not promise gapless sequences; verified gap constraints are explicit policy. High-risk state changes use idempotent command identity plus expected-state/version/conservation checks so retries and concurrent approvals cannot create duplicate economic effects or duplicate numbers.

ADR-0023 remains `PROPOSED` pending hostile concurrency scenarios.

---

# 20. Configuration-change concurrency

When a load-bearing policy changes while cases are active:

- old cases retain bound version unless explicit migration/re-evaluation occurs;
- live security still checked;
- new cases use new version according to effective rule;
- migration is itself idempotent/audited;
- two conflicting policy versions cannot both govern the same bounded action silently.

Bulk migration cannot create hidden commercial events.

---

# 21. Agent/tool authority

Future agents use the same command contracts.

An agent invocation must have:

- tenant/principal/context;
- permitted tool/command scope;
- current authorization;
- evidence/provenance inputs;
- idempotency identity;
- human approval where policy requires it.

Agents may:

- prepare draft commands;
- propose changes;
- collect evidence;
- perform deterministic calculations;
- trigger authorized bounded commands.

Agents cannot:

- mutate records directly;
- manufacture approval outcome;
- bypass current security;
- create custom domain states/events;
- reuse one tenant's context/learned private state for another.

---

# 22. GT-1 authority/lifecycle check — subcontract

Sequence:

- tender/award approval under bound policy;
- AwardDecision effective once;
- subcontract preparation;
- commitment approval;
- `MakeCommitmentEffective` once against current allocation/version;
- claims submitted as supplier-source revisions;
- assessments/certifications each under bound policy;
- concurrent approvers cannot double-certify;
- changes invalidate/re-evaluate stale pending approval where policy says material;
- closeout leaves correction/release reachability.

**PASS candidate.**

---

# 23. GT-2 authority/lifecycle check — long-lead PO

- early planned requirement/allocation;
- award;
- PO number allocated at configured issue/effectiveness milestone;
- retry returns same logical number/effect;
- receipt quantity checked against current commitment/tolerance;
- duplicate delivery-message retry cannot double-receive;
- technical gate may block receipt/acceptance/next action without CDE ownership;
- external payment status separate.

**PASS candidate.**

---

# 24. GT-3 authority/lifecycle check — certification

- claim revision immutable;
- assessment preparation does not change certified position;
- parallel approval results collected;
- final `MakeCertificationEffective` command revalidates current commitment/component/prior certification/period/monetary policy;
- single effective certification event;
- later correction uses correction command, not edit;
- external ERP rejection leaves product certification intact unless separate domain correction.

**PASS candidate.**

---

# 25. GT-4 authority/lifecycle check — instructed variation

- instruction request routed under bounded policy;
- issuer authority checked at action time;
- one effective instruction event;
- later commercial negotiation may continue separately;
- provisional certification uses exact instruction/valuation basis;
- agreed change command revalidates current commitment and reconciles prior provisional lineage;
- stale approval cannot apply after materially conflicting commitment change without policy-valid re-evaluation.

**PASS candidate.**

---

# 26. Hostile concurrency scenarios

## HCC-1 — double click commitment issue

Two identical requests arrive.

Idempotency identity + atomic effectiveness produces one commitment event/number.

**PASS by candidate contract.**

## HCC-2 — two users split same allocation simultaneously

Both read 100 available; each tries consume 70.

Expected-state/conservation atomicity must reject/re-evaluate one path; cannot expose 140 active consumption.

**PASS requirement; physical mechanism later.**

## HCC-3 — certification approved while change becomes effective

Certificate calculation prepared against commitment version V4; change V5 becomes effective before certificate command.

Domain command detects material version mismatch. Policy determines revaluation/reapproval rather than certifying stale basis silently.

**PASS candidate.**

## HCC-4 — user approval then permission revoked

Historical approval may remain recorded, but final command checks live security of executing actor and any policy-required current capability.

Revoked approver does not retain future capability merely because case uses older policy.

**PASS inherited.**

## HCC-5 — retry after timeout, number already allocated

Same logical command/idempotency identity returns existing successful result/number rather than allocating next sequence.

**PASS candidate.**

## HCC-6 — backdated issue crosses fiscal sequence

Number policy evaluates allowed effective/issue date and fiscal sequence rule; disallowed backdating fails or uses governed exception rather than silently inserting historical number.

**PASS candidate; policy specifics later.**

---

# 27. Ceiling Test implications

- multi-entity numbering/DOA can differ through policy context;
- JV/multi-party contracting authority remains explicit;
- different fiscal numbering/period semantics do not require new ontology;
- authority changes in flight use bound policy + migration/re-evaluation;
- cross-country vendor context remains relationship-specific;
- multi-currency approval thresholds can bind explicit conversion basis.

No generalized BPM or duplicate ledger required.

**Ceiling preview: CLEAN.**

---

# 28. Closed Sub-graph implications

A0–A3 can use bounded sourcing/approval commands without P07.

P07 goods and subcontract slices can share command/control primitives while omitting unimplemented capability profiles.

Workflow engine need not be fully general for future modules to add new domain commands/policies.

Numbering policy can be configured per implemented document family.

**Closed Sub-graph preview: CLEAN.**

---

# 29. One-XL audit

- shared workflow/control primitives remain bounded substrate;
- configuration remains typed product policy, not no-code platform;
- concurrency/idempotency is correctness substrate;
- numbering is bounded infrastructure;
- tasks are not domain truth;
- P07 remains commercial XL.

**SECOND XL: CLEAN.**

---

# 30. Candidate ADR directions surviving kernel

## ADR-0008

Bounded shared control/approval/task primitives + domain-owned state transitions.

**Survives.**

## ADR-0009

Constrained typed/versioned/auditable configuration; no arbitrary code/workflow/formula/state-machine language.

**Survives.**

## ADR-0023

Separate internal identity/display number; versioned numbering policy; idempotent command + expected-version/conservation guarantees; gapless only where explicitly verified.

**Survives.**

No ADR status changes yet.

---

# 31. Remaining open issues before integrated freeze candidate

## O-ALC-01 — exact aggregate/version boundaries

Need entity dictionary to state which identities carry independent concurrency version versus participate in multi-identity atomic invariants.

## O-ALC-02 — approval policy catalogue by domain

Need concrete award/commitment/change/certification/release approval bases and amount semantics.

## O-ALC-03 — config profile catalogue

Need prove bounded configuration covers V1 without hidden scripting pressure.

## O-ALC-04 — numbering legal/regional evidence

Any V1 gapless/fiscal/legal numbering claim requires evidence; no universal claim is made here.

## O-ALC-05 — lifecycle catalogue

Need complete SPINE transition matrix with guard/authority/economic effect/event/reversibility.

---

# 32. Next integrated step

Create:

`P1_5_INTEGRATED_CORE_CANDIDATE_V0_1.md`

It should consolidate:

- structural candidates;
- economic kernel;
- money/correction/temporal kernel;
- authority/lifecycle/concurrency kernel;
- explicit open ADR/evidence debts;
- entity/identity candidate dictionary;
- canonical derived balance definitions;
- SPINE transition contract skeleton;
- GT-1–GT-4 results;
- Ceiling Test full run;
- Closed Sub-graph full run;
- hostile internal audit readiness.

Only after that consolidation should P1.5 consider ADR promotion/freeze candidates.
