# P1.9 — Internal Hostile Audit v0.1

**Date:** 2026-08-01  
**Verdict:** `FAIL — four narrow semantic blockers require remediation before Claude.`

---

# 1. Audit scope

Attacked the integrated candidate across operation interaction, navigation, approval, external participation, evidence, reporting limitations, queues, recovery, accessibility, chat coexistence and A0–A3 golden thread.

Not audited as blockers: frontend framework, pixels, component library, database/cache/search, exact WCAG testing, renderer, AI model or product code.

---

# 2. Blockers

## BL-P19-01 — lost response before recovery identity reaches user

### Failure

The candidate requires stable InvocationId/LogicalCommandId/ResultRecoveryView, but does not require a user/device-visible continuation identity to exist before the effect-bearing submit leaves the client/channel.

### Scenario

User confirms AwardDecision issue. The request reaches the server and may establish the effect, but the connection drops before the response returns. The user has no visible identifier and opens the page again. Search by recent activity may be incomplete or restricted. The UI can either offer blind resend or leave the user stuck.

### Why semantic

Whether the next action is lookup or new command depends on stable identity existing before uncertainty. Physical transport cannot choose this safely.

### Narrow remediation

Add `InteractionContinuationAnchor` generated/reserved before effect-bearing submission and bound to operation/context/target/idempotency identity. It must survive page/session loss through a safe conventional recovery route. If the request never reached acceptance it may be resumed/retried under the same anchor; if possibly accepted it resolves to result lookup/reconciliation, never blind new command.

---

## BL-P19-02 — external captured content versus valid organizational submission is open

### Failure

External model preserves source/actor/assurance limitations but does not close when email/shared-mailbox/buyer-on-behalf content is:

- evidence captured only;
- a valid tender response;
- provisional pending supplier confirmation;
- invalid due to missing authority/terms/addendum acknowledgment.

### Scenario

An estimator sends pricing from a shared mailbox after an addendum. Sender identity is technically weak; no explicit terms acknowledgment exists. Buyer captures it. One implementation marks the bid Submitted and eligible for comparison; another keeps it as evidence-only. Both fit the candidate.

### Why semantic

This changes response population, compliance/readiness, comparison eligibility and later recommendation/award basis.

### Narrow remediation

Add versioned `ExternalSubmissionAcceptancePolicy` and per-submission `ExternalSubmissionDisposition` with closed classes: CAPTURED_EVIDENCE_ONLY, PROVISIONAL_PENDING_CONFIRMATION, VALID_SOURCE_SUBMISSION, REJECTED_INVALID, WITHDRAWN/SUPERSEDED. Policy binds required organization/contact assurance, terms/addendum acknowledgment, mandatory fields, channel, buyer-on-behalf and confirmation requirements. Only VALID_SOURCE_SUBMISSION enters the governed response population.

---

## BL-P19-03 — load-bearing disclosure placement/parity remains interpretable

### Failure

The candidate requires same decision surface and export/chat survival, but does not close which disclosure elements must be inline, adjacent, expandable or prohibited from secondary navigation for each surface/use.

### Scenario

A compact approval card shows “AED 84.2m” and a small “partial” badge. Clicking opens population detail. The approve button is on the card. The implementation argues the limitation is on the same surface and one click away; another blocks approval and shows “19/20 evaluated — not total” inline. Both fit current wording.

### Why semantic

Presentation determines whether user is approving a total or subset. P1.8 explicitly made limitation rendering load-bearing.

### Narrow remediation

Add versioned `DisclosurePlacementPolicy`/`SurfaceDisclosureProfile` with closed placement classes and mandatory inline fields by surface/use. Decision-critical value state, prohibited-use consequence and current reliance block must be inline/adjacent to the value/action and cannot be deferred to tooltip, badge-only, drill or secondary page. Export/chat parity must be testable against the same semantic bundle.

---

## BL-P19-04 — bulk dependency, stop/continue and unknown-effect semantics are incomplete

### Failure

`BulkActionPlan` names all-or-nothing versus independent items, ordering and per-item result, but does not close dependent-item execution and what happens when an early item becomes indeterminate.

### Scenario

Bulk issue to ten suppliers uses independent recipients but one shared issued artifact/version. Recipient 3 becomes effect-indeterminate. Does processing continue to recipients 4–10, stop, or block because artifact/sequence policy treats the batch as one publication set? Different choices alter external effects and fairness.

### Why semantic

This is not queue technology. It determines operation identity, external effect and recovery.

### Narrow remediation

Add `BulkExecutionPolicy` with closed modes: ATOMIC_DOMAIN_SET, INDEPENDENT_ITEMS_CONTINUE, INDEPENDENT_ITEMS_STOP_ON_BLOCKING, ORDERED_DEPENDENT. Bind dependency graph, per-item LogicalCommandId/PublicationIntent, stop condition, indeterminate behavior, compensation/correction limits, confirmation summary and final aggregate outcome. Unknown effect cannot be hidden or retried as a batch.

---

# 3. Non-blocking watches

- W-62 — localized operation labels must retain canonical term/identity and not translate two distinct outcomes into one label.
- W-63 — external contact/grant transfer should define notification/acknowledgment to old/new contacts without making delivery proof authority.
- W-64 — manual fallback availability/support timing is deployment evidence, not universal SLA; surface unsupported state honestly.
- W-65 — mobile may not support dense comparison productivity, but safe decision/decline/help/fallback must remain; later release scope must declare supported tasks.
- W-66 — copy/paste/clipboard can leak restricted values; later security/UI design needs controlled export/clipboard policy.
- W-67 — reauthentication expiry during confirmation must preserve draft/preview safely without executing or losing evidence.

---

# 4. Gates

- G1 operation mapping — FAIL due BL-P19-01/04.
- G2 proposal/command/effect distinction — PASS.
- G3 navigation/no second root — PASS.
- G4 approval/authority — PASS.
- G5 evidence layers — PASS.
- G6 limitation laundering — FAIL due BL-P19-03.
- G7 issued/current/restated/reliance — PASS.
- G8 restricted data — PASS.
- G9 external low-friction/no network — PASS.
- G10 external grant/attribution — FAIL due BL-P19-02.
- G11 queues/no GRC — PASS.
- G12 recovery/bulk/unknown effect — FAIL due BL-P19-01/04.
- G13 accessibility/localization — PASS candidate.
- G14 conventional no-chat/no-connector — PASS.
- G15 regression/XL — PASS.
- G16 audit readiness — FAIL pending remediation.

---

# 5. Regression

- P1.1–P1.8 reopening: NO.
- second XL: CLEAN.
- A0–A3 activation: CLEAN except external response acceptance and lost-response recovery need semantic closure.
- product code: LOCKED.

---

# 6. ADR posture

- ADR-0016 — KEEP PROPOSED / blocking BL-P19-02.
- ADR-0038 — KEEP PROPOSED / blocking BL-P19-01/04.
- ADR-0039 — candidate accept.
- ADR-0040 — KEEP PROPOSED / blocking BL-P19-03.
- ADR-0041 — KEEP PROPOSED until recovery parity closes.

P1.10 remains locked.