# B02 SSV-1 Practitioner Exercise Packet v1.0

**Status:** DEFERRED TO OPERATIONAL-MVP VALIDATION UNDER CHG-0008 — DO NOT EXECUTE AGAINST CURRENT SHELL  
**Purpose:** preserve the mandatory practitioner-validation exercise for execution once CPOS exposes a genuinely representative procurement operating surface.

## Why execution is deferred

Owner review of the deployed B02 dashboard confirmed that the current shell does not yet provide enough meaningful user states/actions for a valid practitioner exercise. Project creation is functional, but role/state differentiation and procurement-domain workflows are not yet representative enough to produce useful independent usability/comprehension evidence.

Accordingly, CHG-0008 moves SSV-1 from an immediate B02 blocker to the first operational-MVP/user-validation stage. The requirement is deferred, not waived.

## Participant eligibility

When the exercise is activated, each participant must be a real non-builder construction practitioner familiar enough with contractor procurement/commercial work to judge whether the surface is understandable without builder coaching.

Record for each participant:

- participant code (P1/P2/P3+; no sensitive personal details required in repository evidence);
- construction role/function;
- years or practical level of relevant experience;
- confirmation they did not build CPOS;
- date of exercise.

## Activation criteria for the test surface

Do not run SSV-1 until the product surface supports a meaningful subset of real procurement operation, including enough of the following to test comprehension rather than placeholders:

- usable identity/session entry;
- meaningful role/authority differentiation;
- project/workspace context;
- subscription/access restriction states where relevant;
- real procurement-domain actions and navigation;
- visible business-approval/authority behavior distinct from product entitlement;
- sufficient end-to-end workflow to let a practitioner form a realistic opinion of CPOS.

The exact task list should be refreshed against the then-current MVP before participants execute it.

## Preserved baseline tasks

These tasks remain a useful baseline but are **not the final operational-MVP script yet**:

1. Identify the active company/tenant and the current user context.
2. Identify whether the account currently has full command access or restricted read/export access.
3. Identify the current project list.
4. Create a new project using a supplied project code and project name.
5. Identify where membership/role information is shown and explain who appears able to administer the workspace.
6. Explain, in their own words, what would happen to new command actions if the subscription became suspended/expired while historical information still had to remain available.
7. Identify which visible areas are not yet functional product domains and should not be mistaken for completed procurement functionality.

## Evidence capture per participant

Record:

- task result: PASS / PASS WITH ASSISTANCE / FAIL;
- time-to-comprehension or material hesitation notes where useful;
- any label/navigation/state that caused misunderstanding;
- whether the participant could distinguish product entitlement/access from business approval authority;
- whether the participant understood that historical/read/export access can remain while new entitled commands are restricted;
- exact assistance given, if any;
- proposed UI wording/placement fix for any repeated confusion.

## Future SSV-1 disposition

Do not mark SSV-1 PASS until at least three eligible practitioners have completed the refreshed operational-MVP exercise and the evidence supports the acceptance standard.

| Participant | Eligible | Tasks passed without builder coaching | Material confusion | Disposition |
|---|---|---|---|---|
| P1 | DEFERRED | DEFERRED | DEFERRED | DEFERRED |
| P2 | DEFERRED | DEFERRED | DEFERRED | DEFERRED |
| P3 | DEFERRED | DEFERRED | DEFERRED | DEFERRED |

**Current disposition:** `SSV-1 DEFERRED — activate at first genuinely operational procurement MVP under CHG-0008.`

The owner is expected to perform intensive alpha/product acceptance throughout development. Owner testing is valuable but does not replace the later independent practitioner cohort because the owner materially shaped CPOS requirements and product decisions.
