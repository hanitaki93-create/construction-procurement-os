# P1.2 Review C — Final Verdict

**Status:** PASS / CLOSED FOR EXTERNAL ARCHITECTURE CRITIQUE  
**Date:** 2026-07-29  
**Scope:** P09–P12 + complete P01–P12 graph/boundaries  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY-FALSIFIABLE / NOT FROZEN

## External verdict

`PASS — full graph coherent; proceed to primary challenge/closure work`

## Closed finding

### BL-09 — buyer-side entitlement / recovery

Closed.

Binding distinction:

`Buyer entitlement/recovery ≠ EffectiveCommitmentChange ≠ reduction of certified gross earned value`

The graph now supports bounded buyer-side entitlement/recovery truth for LDs, backcharges/contra-charges, defect/rectification recovery, termination/replacement-cost recovery, security/bond calls and similar evidenced contractual recoveries.

Recovery may reduce payable/settlement or create external accounting consequences without rewriting:
- supplier-agreed contract price;
- effective supplier-side changes;
- gross certified earned value.

Cross-commitment recovery is permitted where another supplier performs replacement/rectification work. The replacement commitment remains legitimate positive cost; recovery against the defaulting supplier remains a separate contractual entitlement.

## Review C whole-graph results

- **SECOND-XL:** CLEAN — P07 remains the only intended XL gravity well.
- **MISSING CORE PROCESS:** NONE — P01–P12 is complete enough for the current operating hypothesis.
- **FIRST LIVE TENDER:** CLEAN — narrow sourcing may terminate at AwardDecision without P07–P12 implementation.
- **REVIEW A/B REGRESSION:** NO.
- **PRIMARY REVERSIBILITY:** CLEAN, with predeclared falsification targets required before capture.
- **P1.1 REOPEN:** NO.

## CR-02 — rectification procurement allocation rule

**Status:** REQUIRED BEFORE P07 FULFILLMENT IMPLEMENTATION / DOES NOT BLOCK PRIMARY CHALLENGE.

When replacement/rectification procurement is required because source fulfillment is defective, the replacement commitment must still reconcile to RequirementAllocation authority.

Two bounded cases:

### Reversible source fulfillment

Where the original fulfillment can be validly reversed/released — for example rejected/returned goods or governed decertification/reversal — the source allocation capacity may return through the applicable history-preserving reversal mechanism.

The replacement/rectification commitment consumes that restored capacity.

No double consumption is created.

### Irreversible source fulfillment

Where original fulfillment/earned value remains valid historical truth and cannot be reversed merely because defects later require rectification, source capacity does **not** silently return.

Additional replacement/rectification procurement requires governed requirement-basis expansion or another explicitly authorized scope-capacity mechanism before the replacement commitment binds additional scope.

The buyer recovery against the defaulting supplier remains separate from the additional procurement authorization and separate from the replacement supplier's positive commitment cost.

### Binding invariant

> Replacement/rectification procurement may not bypass scope conservation merely because its cost is recoverable from another supplier.

The recovery relation and the procurement-authorization relation are separate.

## Review C accepted simplifications/boundaries

- compliance evaluation defaults to event/evidence + derived state;
- bidder selection/eligibility/invitation progression stays on TenderParticipant history/state;
- reconciliation exception is derived from integration events; operational remediation case is outside financial truth;
- actual schedule milestone is a canonical event/projection, while forecast/supplier-confirmed dates are versioned planning records;
- tasks/notifications/escalations are outside the truth graph;
- no domain invariant may depend on task existence/status;
- P09 remains bounded built-in control, not arbitrary BPM;
- P10 permits bounded local deterministic forecast derivation but not dependency-network/CPM propagation;
- P11 recovery remains contractual entitlement/evidence, not general claims/legal management;
- P12 remains a bounded technical-approval dependency interface.

## P09 residual boundary

Gate classes permitting override must be defined at product level.

Deployment/customer configuration may operate only inside the semantic limits of those fixed gate classes.

A deployment cannot convert a hard domain/legal invariant into an overridable rule.

## P10 residual boundary

Forecast derivation must not become recursive dependency-network scheduling.

Later implementation must explicitly cap/define whether derived forecasts may chain. Any chaining that behaves as project dependency propagation belongs outside P10.

## ADR posture

The following are no longer directionless but are not finally closed:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

- ADR-0003 structural root / requirement authority;
- ADR-0008 workflow generality;
- ADR-0013 event-derived status;
- ADR-0014 provenance depth;
- ADR-0019 effective dating;
- ADR-0021 integration authority/staleness.

ADR-0022 remains open, with deterministic rounding now a hard-invariant dependency where tolerance/conversion uses it.

## Primary challenge rule

Review A/B/C PASS proves internal structural coherence only.

It does **not** prove correspondence to contractor reality.

Primary evidence may reopen any passed architecture finding where higher-authority observations contradict the model.

## Gate consequence

External architecture critique is complete.

P1.2 now moves to primary challenge/closure work.

P1.2 remains open until the primary-evidence closure criteria are satisfied.

P1.3 remains locked until P1.2 formally closes.
