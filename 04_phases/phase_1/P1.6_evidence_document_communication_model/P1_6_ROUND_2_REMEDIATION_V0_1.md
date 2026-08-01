# P1.6 — Claude Round 2 Remediation v0.1

**Date:** 2026-08-01  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Parent verdict:** `audits/P1_6_CLAUDE_ROUND_2_VERDICT_V0_1.md`  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Close:

- BL-P16-05 — `OBSERVATION_COMPLETES_EFFECT` must establish an immutable domain fact once rather than leave effectiveness recomputable from the current evidence-observation set;
- W-35 — no in-place amendment of issued communication rules;
- W-36 — no hidden P1.6 timeout/auto-lapse for never-satisfied rules;
- W-37 — one qualifying observation type does not imply prerequisite communication facts;
- W-38 — per-addressee final-action/effect granularity;
- W-39 — version-bound business calendar/time basis.

These clauses supersede any inconsistent wording in v0.1–v0.3 P1.6 candidates.

---

# 2. R09 — first satisfaction establishes one immutable domain fact

Under `OBSERVATION_COMPLETES_EFFECT`, the owning-domain profile declares that the qualifying communication condition itself completes a previously authorized pre-effective business basis.

## R09.1 — establishment boundary

At the **first valid satisfaction** of the frozen `CommunicationSatisfactionRule`:

1. the qualifying observation set and derived satisfaction/effective time are evaluated under the exact frozen rule/version;
2. one bounded owning-domain effect/event is established;
3. the domain event stores/binds:
   - exact pre-effective basis/version;
   - exact `CommunicationSatisfactionRule` version;
   - exact qualifying observation identity or identities;
   - satisfaction derivation/addressee/channel result;
   - exact derived effective time;
   - owning-domain causal/event identity;
   - governing authority/config/policy versions;
4. that domain fact/effective time becomes immutable historical truth except through an explicit bounded owning-domain correction/withdrawal/supersession action.

The established domain event is not a projection over the current evidence-observation set.

## R09.2 — evidence correction cannot silently undo effect

After establishment, any later:

- provider callback retraction;
- observation correction;
- observation invalidation;
- authenticity challenge;
- duplicate reconciliation;
- late discovery of missing/earlier/later communication evidence;
- connector replay or source-system restatement;

creates or updates evidence/observation/correction history only.

It does **not** automatically:

- recompute whether the established domain event exists;
- reverse it;
- withdraw it;
- move its historical effective time;
- rewrite the exact evidence basis originally consumed.

## R09.3 — consequent business response is domain-owned

If corrected/retracted/late evidence means the established domain event may be legally, contractually or procedurally defective, the owning domain must execute a supported bounded action such as:

- investigate/reconcile communication basis;
- record control/evidence variance;
- withdraw/cancel/supersede prospectively;
- reverse/correct under the domain’s history-preserving correction semantics;
- reissue and establish a new effective event;
- preserve original and corrected positions for dispute/audit.

P1.6 supplies the corrected evidence and provenance.

P1.6 does not decide or emit the domain correction.

## R09.4 — late evidence does not retime established effect

Late-discovered evidence that would have caused an earlier or later satisfaction time does not automatically retime an already-established event.

The owning domain may, only through an explicit supported correction/re-evaluation action:

- retain original effective time and record variance;
- correct the effective time where legally/contractually supported;
- withdraw/supersede/reissue;
- preserve both original recorded and corrected asserted time with causal history.

No silent backdating/forward-dating occurs.

## R09.5 — no P1.6 action emits or reverses domain effect

P1.6 actions may:

- record/correct/retract communication observations;
- preserve validation/freshness/conflict history;
- expose satisfaction-rule evaluation evidence;
- notify/enable owning-domain actions.

They may never directly:

- establish the final P01–P12/P09 domain effect;
- reverse it;
- cancel it;
- retime it;
- change its commercial consequence.

Even when `OBSERVATION_COMPLETES_EFFECT` is used, the architecture meaning is:

> communication first satisfies a frozen guard; a bounded owning-domain establishment operation/event records the effect once with that causal evidence.

This operation may execute synchronously with the observation transaction or asynchronously/idempotently after it, but the resulting effect remains an owning-domain fact.

---

# 3. R10 — idempotent establishment and race handling

## R10.1 — stable establishment identity

The first-satisfaction domain event uses a stable logical establishment identity derived from or bound to:

- pre-effective domain basis;
- `CommunicationSatisfactionRule` version;
- applicable addressee scope;
- effect family.

Duplicate callbacks, connector replay, retries or concurrent qualifying observations cannot create duplicate domain effects.

## R10.2 — first valid satisfaction snapshot

Where several observations arrive concurrently, the establishment action atomically selects/binds the first rule-satisfying evidence snapshot/time under the frozen rule.

Later evidence may demonstrate source/provider timestamp error, but correction follows R09.3–R09.4 rather than live recomputation.

## R10.3 — effect persistence delay

If the observation set satisfied the rule at time T but the owning-domain event is durably recorded later:

- the event binds the satisfaction evidence and historical effective time T or governed offset result;
- persistence time remains separately observable;
- retries return the same event/effective time.

---

# 4. R11 — issued CommunicationSatisfactionRule is immutable

Once its pre-effective basis/artifact is issued or communication has begun, the `CommunicationSatisfactionRule` is immutable for that issuance.

The word “silently” is removed as a qualifier.

No governed action may amend in place:

- required addressee set;
- addressee quantifier;
- channel quantifier;
- allowed/required channels;
- qualifying observation type;
- satisfaction/effective-time rule;
- governed offset/calendar/timezone;
- completion mode.

Required change uses owning-domain lifecycle:

1. withdraw/cancel/supersede the pre-effective basis/issue as permitted;
2. preserve prior issue/attempt/observation history;
3. create a new pre-effective basis/version;
4. bind a new CommunicationSatisfactionRule;
5. issue/recommunicate the new exact artifact/transmittal.

A dissolved/ineligible bidder or wrong addressee in `ALL_REQUIRED_ADDRESSEES` is not removed from the old rule in place.

---

# 5. R12 — never-satisfied conditions remain pending until domain action

If a frozen rule never satisfies because an addressee/channel is unreachable or the required response never occurs:

- the pre-effective basis remains pending/pre-effective under its owning-domain lifecycle;
- P1.6 may expose failure, bounce, aging and unresolved satisfaction evidence;
- P1.6 does not auto-lapse, auto-withdraw, auto-reclassify quantifiers or infer alternate channels;
- any timeout, expiry, cancellation, withdrawal, supersession or reissue is an explicit owning-domain rule/action with bound policy/version.

This does not introduce a third communication-effectiveness pattern.

---

# 6. R13 — qualifying observation type does not imply prerequisite facts

A profile may bind one terminal qualifying observation type while separately requiring other communication evidence/invariants.

Example:

A rule requiring both delivery and written acknowledgment may bind `ACKNOWLEDGMENT` as the terminal qualifying observation, but must also explicitly require a matching `DELIVERY_RECEIPT` or another supported delivery proof if delivery is independently required.

Because no communication fact implies another:

- acknowledgment does not prove delivery;
- content acceptance does not prove the configured dispatch channel;
- read/open does not prove receipt acknowledgment;
- delivery does not prove content agreement.

The frozen `CommunicationSatisfactionRule` therefore contains as applicable:

- one terminal qualifying observation type used for satisfaction time; and
- an explicit closed prerequisite-observation set/guard where the governing rule requires multiple facts.

No implementation may infer prerequisite facts from the terminal observation.

---

# 7. R14 — per-addressee completion/final action remains per addressee

With `PER_ADDRESSEE_INDEPENDENT`:

## R14.1 — OBSERVATION_COMPLETES_EFFECT

Each addressee satisfaction establishes one addressee-scoped owning-domain effect/event/time through the R09 establishment rule.

No global event is inferred merely because one or some addressees satisfy.

## R14.2 — OBSERVATION_ENABLES_FINAL_ACTION

The enabled discretionary owning-domain action is addressee-scoped unless the domain explicitly defines a separate bounded aggregate command and its guards.

One addressee’s satisfaction does not authorize action for another addressee.

## R14.3 — aggregate views

`none/some/all satisfied/effective` are projections over addressee-scoped facts.

They are not independent business writers.

---

# 8. R15 — version-bound calendar/time semantics

Any business calendar or timezone basis used by `AFTER_GOVERNED_OFFSET` is load-bearing and binds an exact versioned configuration artifact/reference before issue.

Preserve as applicable:

- calendar identity/version;
- timezone identity/version/basis;
- working/non-working days;
- holiday/exceptions set/version;
- day-boundary/cutoff rule;
- offset duration/unit;
- governing contract/policy/config source;
- calculation/result/effective-time provenance.

A later calendar/holiday/timezone configuration update cannot silently change the established or pending issued rule.

For a pending issued basis, the frozen calendar version remains governing unless the basis is withdrawn/superseded and reissued under R11.

Exact calendar engine/library implementation remains later physical design.

---

# 9. Hostile examples

## H01 — provider retracts one delivery callback

At 14:00 Tuesday, all required addressees satisfy and Instruction I becomes effective through one owning-domain establishment event.

On Thursday, provider retracts one callback as spurious.

Result:

- retraction becomes evidence correction/history;
- I does not silently disappear or retime;
- owning domain opens variance/correction/withdrawal process if required;
- original effect and causal evidence remain reconstructable.

## H02 — late earlier observation discovered

Instruction recorded effective Tuesday 14:00. On Friday an external log reveals all requirements had actually satisfied Tuesday 13:45.

Result:

- late evidence is recorded;
- historical effect remains 14:00 until explicit owning-domain correction decides otherwise;
- no projection-based retroactive retiming.

## H03 — duplicate callbacks race

Two channels produce satisfying callbacks concurrently.

Result:

- one stable establishment event;
- one frozen first-satisfaction evidence snapshot/time under the rule;
- later callbacks remain observation history.

## H04 — bidder dissolved after addendum issue

Bidder was in frozen `ALL_REQUIRED_ADDRESSEES` set, then becomes ineligible/dissolved before delivery.

Result:

- old rule is not edited;
- owning domain withdraws/supersedes and reissues if the governing tender process allows;
- prior issue/attempt evidence remains.

## H05 — permanently unreachable guarantor

Contractor and guarantor are both required; guarantor never receives notice.

Result:

- basis remains pending;
- P1.6 records failures;
- no P1.6 timeout/auto-lapse;
- owning domain decides withdrawal/reissue/other supported action.

## H06 — delivery + acknowledgment required

Acknowledgment arrives but no valid delivery evidence exists.

Result:

- terminal acknowledgment alone is insufficient because prerequisite delivery guard is explicit;
- no implication is inferred.

## H07 — per-addressee final action

Three JV partners use `PER_ADDRESSEE_INDEPENDENT + OBSERVATION_ENABLES_FINAL_ACTION`.

Only Partner A satisfies.

Result:

- only Partner A’s final action becomes enabled;
- Partners B/C remain pending;
- no global action is inferred.

---

# 10. Closure claim

- BL-P16-05 → closed by R09/R10.
- W-35 → closed by R11.
- W-36 → closed by R12.
- W-37 → closed by R13.
- W-38 → closed by R14.
- business-calendar watch → closed by R15.

P1.6 remains ACTIVE pending internal recheck + Claude Round 3.

P1.7+ remains LOCKED.

Product code remains LOCKED.
