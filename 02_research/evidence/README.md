# Evidence Register

Evidence is stored in stable ID ranges rather than one ever-growing CSV.

## Current inherited retro-file snapshot

- `retrofile/EVD_0001_0045.csv`
- `retrofile/EVD_0046_0090.csv`
- `retrofile/EVD_0091_0135.csv`
- `retrofile/EVD_0136_0178.csv`
- `retrofile/EVD_0179.csv`

The inherited v0.1 set occupies `EVD-0001` through `EVD-0178`. `EVD-0179` was added during CP-01 to make the first contradiction claim-to-claim traceable.

## Canonical evidence schema

`evidence_id, claim, source_ids, source_locator, claim_type, grade, confidence, status, related_sections, related_req_ids, notes`

`source_locator` must identify the exact page/section/timestamp/help-article location once a claim is verified. During retro-file migration, `PENDING_A2_EXACT_LOCATOR` explicitly means the location has not yet been verified.

Current claim types include:
- `INTERNAL_ARCHITECTURE_FACT`
- `PRODUCT_MECHANICS_CLAIM`
- `PRODUCT_CAPABILITY_CLAIM`
- `USER_OR_MARKET_PAIN_CLAIM`
- `ARCHITECTURAL_INFERENCE`
- `INHERITED_CONCLUSION_HYPOTHESIS`

P1.2 may add controlled primary-workflow claim types through the normal schema/change process.

## Status meaning

`PROPOSED` means not yet source-verified. `CONTESTED` means an inherited conclusion or claim is explicitly disputed or demoted. Verification may move a claim to `SUPPORTED`, `CONTESTED`, `WITHDRAWN`, or `SUPERSEDED`.

## Rule

Evidence IDs are permanent. Verification updates status, confidence, source linkage, and exact locator; it does not renumber the claim. New evidence continues with the next unused EVD ID.
