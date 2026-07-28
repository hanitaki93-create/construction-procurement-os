# P1.1 Hostile Critique 01 — Dispositions

**Date:** 2026-07-28  
**Verdict received:** SOUND WITH CORRECTIONS  
**P1.1 status:** NOT FROZEN

## Accepted corrections

1. Replace commercial beachhead wording with an architecture-relevant structural envelope.
2. Remove `mid-market` and the `5–25 concurrent projects` range from architecture constraints. Concurrency may be used only as P1.2 sampling/measurement context.
3. Model contracting posture explicitly rather than hardcoding every tenant as a main contractor.
4. Any scope classification depending on an unresolved `PRIMARY_REQUIRED` ADR remains provisional and names the ADR dependency.
5. Change AP/GL ownership from `OUT` to `INTERFACE-ONLY / ADR-0005 dependent`; implementation remains outside V1 unless later evidence changes the ownership seam.
6. Clarify WEDGE-03 as a minimum secure tender-response surface, not a broad supplier portal. Broad supplier portal remains OUT.
7. Add budget/cost structure, vendor/compliance state, and valuation/progress event to the closed graph; state certification/payment boundaries explicitly; authority/approval is a cross-cutting edge property.
8. Replace the scalar 230.2/240 burden score with two ordinal axes: implementation cost and retrofittability. Add a measurable onboarding constraint: time-to-first-live-tender.
9. Restate WEDGE-01 structurally rather than as a market/product slogan.
10. Re-test every SPINE row: SPINE only if removal breaks the closed lifecycle or the area is a retrofit-impossible substrate.
11. General workflow engine may remain OUT only if V1 approval/routing uses durable shared/versioned primitives that can become a constrained profile of later general workflow rather than a throwaway hardcoded path.
12. Inventory may remain OUT only if V1 receipt/GRN is explicitly a commercial receipt/valuation event and not a stock ledger event.

## Accepted unknowns

P1.1 does not decide willingness to pay, pricing, sales cycle, implementation commercial model, commercially optimal geography, company-size band, project-volume band, dominant contracting posture, or whether the hypothesized commitment-truth pain exists in practice.

## Items retained

Do not cut jurisdiction profile, multi-posture contracting representation, first-class external identity substrate, budget/cost baseline, valuation/progress event substrate, or the `INTERFACE-ONLY` classification instrument.

## Roadmap impact

No roadmap change. These corrections modify only the provisional P1.1 boundary artifacts before freeze.