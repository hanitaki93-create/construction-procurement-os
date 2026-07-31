# P1.6 — Document Revision, Issue & Supersession Contract v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.6  
**Product code:** LOCKED

---

# 1. Purpose

Define how working documents, captured source revisions, product-generated artifacts, issued copies, addenda, withdrawals, corrected reissues and supersession behave without creating edit-in-place historical ambiguity or a full CDE/document-management platform.

---

# 2. Document role classes

These are semantic roles, not mandatory tables/types.

## D01 — WORKING_DRAFT

An internal working representation not yet externally issued/submitted and not yet a load-bearing basis.

A working draft may be mutable under ordinary authoring behavior.

P1.6 does not require every keystroke/autosave to become immutable evidence.

However, before a working draft becomes load-bearing through issue, submission, approval, governed reliance or another qualifying event, the exact relied-on state must be frozen as an EvidenceVersion.

## D02 — SOURCE_CAPTURED

An exact captured revision received from an external/internal source principal.

Examples:

- supplier quote revision;
- consultant approval letter;
- delivery note;
- subcontractor claim;
- external CDE-issued drawing revision.

A captured source revision is immutable in evidentiary meaning.

Later correction/revision creates a new source EvidenceVersion or explicit correction relationship; it does not edit the historical captured version.

## D03 — PRODUCT_GENERATED

A product-generated representation derived from authoritative domain facts and/or evidence.

It is not automatically issued or authoritative merely because generated.

Generation may be repeated while non-load-bearing.

When used as load-bearing basis or externally issued, the exact generated state is frozen as an EvidenceVersion with generation/domain basis provenance as applicable.

## D04 — PRODUCT_ISSUED

The exact immutable artifact/version intentionally issued by the OS through a governed issue action.

Examples:

- TenderRelease;
- Addendum;
- Award/notification letter where supported;
- commitment/change/certificate artifact where issued by the OS;
- transmittal package.

The OS owns integrity/provenance of the exact issued copy/version.

Issue does not automatically prove delivery, receipt, acknowledgment or acceptance.

## D05 — DERIVED_REPRESENTATION

A convenience rendering/extraction/translation/preview/export derived from another EvidenceVersion.

Examples:

- OCR text;
- image thumbnail;
- normalized PDF rendering;
- extracted spreadsheet data;
- translated view;
- print/export copy.

A derived representation cannot silently replace the source EvidenceVersion as source truth.

If it becomes load-bearing, preserve its derivation relationship and original source location/version.

---

# 3. Version freeze trigger

## V01 — no archive-every-edit requirement

Ordinary drafting/collaboration may remain mutable while non-load-bearing.

## V02 — mandatory freeze trigger

The exact state must become an immutable EvidenceVersion before or atomically with any of the following where it makes the artifact load-bearing:

- supplier/internal submission accepted into a governed transaction;
- product external issue/release;
- recommendation/approval reliance;
- AwardDecision reliance;
- Commitment/change/instruction/certification reliance;
- domain correction reliance;
- external handoff;
- signature/seal/timestamp/delivery validation attached to the content;
- any other P1.4 load-bearing test trigger.

## V03 — immutable meaning, not immutable payload forever

Frozen EvidenceVersion identity/meaning/history is immutable while retained.

Payload retention remains subject to valid P1.4 retention/disposition rules.

Legitimate payload disposal does not permit rewriting the historical version metadata into another version.

---

# 4. Revision and relationship vocabulary

## R01 — REVISION_OF

New source/product version that belongs to the same logical evidence lineage and updates/replaces earlier content for future relevant use.

Prior version remains historical.

Revision does not automatically invalidate prior decisions that legitimately used the earlier version.

## R02 — SUPERSEDES

The new version becomes the operative/current evidence version for a declared future/use context.

Supersession is contextual and effective-dated where material.

It does not rewrite which version governed a past decision.

## R03 — ADDENDUM_TO

A supplemental issued/source artifact modifies, clarifies or adds to another issued/source artifact without necessarily reproducing the entire predecessor content.

An addendum must bind the exact base artifact/version(s) it affects.

Historical interpretation may require base + applicable addenda set.

## R04 — REPLACES

A new artifact/version is declared to replace another artifact/version as the operative artifact, normally with a reason and effective context.

Replacement does not delete the predecessor.

## R05 — WITHDRAWS

A governed action marks a source/issued version as withdrawn from future reliance under the declared context.

Withdrawal is a separate fact.

It cannot erase historical receipt, issue or reliance that already occurred.

## R06 — CORRECTED_REISSUE

A new issued version corrects an error in a previously issued artifact.

Preserve:

- predecessor issued EvidenceVersion;
- correction reason;
- domain correction/change basis if business meaning changed;
- issue actor/action;
- exact new version;
- recipients/transmittal relationship;
- whether predecessor is withdrawn/superseded and from what effective point.

Changing document text is not itself a valid business correction if the underlying domain truth also requires correction.

## R07 — EQUIVALENT_REPRESENTATION_OF

A technically different representation is governed as equivalent to another version for a declared purpose.

Example: a rendered PDF representation of an immutable source record.

Equivalence must be proven/supported; it is not inferred by filename or visual similarity.

---

# 5. Current/operative version is a projection

## C01 — no editable `current_document`

“Current”, “operative”, “latest submitted”, “latest issued” and similar status are derived from version/relationship/effective history under a declared context.

No independently editable `current` flag may compete with revision/supersession history.

## C02 — latest is not always governing

A later revision may exist while an earlier revision remains the basis for:

- an already frozen ComparisonSnapshot;
- an AwardDecision;
- a Commitment;
- a historical certificate;
- a dispute/correction.

P1.6 must preserve exact binding to the version actually used.

A UI/report may show “latest supplier revision” and “governing award revision” simultaneously because they answer different questions.

---

# 6. Issued artifact semantics

## I01 — issue is a governed evidence action

Issuing an artifact creates an immutable issue fact binding:

- exact EvidenceVersion;
- issuing tenant/project/context;
- issuing principal/domain action;
- source/generated basis as applicable;
- intended recipient/addressee set or transmission envelope;
- issue time/effective context;
- applicable numbering/document identifier;
- supporting signature/seal/timestamp evidence where present.

Issue is not delivery.

## I02 — exact issued copy is preserved

The exact supplier/counterparty-facing version issued by the OS is product-governed evidence.

Regenerating the same business record later using a new template, new master data, current date, current exchange rate or current configuration does not recreate the original issued artifact.

The original issue must remain reconstructable under its captured/generated version and bound domain/config basis.

## I03 — generated document provenance

Where exact reconstruction of a product-generated artifact depends on generated content rather than merely a stored payload, preserve enough generation provenance as applicable:

- domain record/event version(s);
- EvidenceVersion inputs;
- template/document-definition version;
- calculation/formatting policy version where load-bearing;
- issue/generation time;
- resulting content identity.

P1.6 does not mandate regeneration as the retention method. An immutable issued payload may be simpler.

## I04 — numbering does not equal version identity

Display document number/reference is not EvidenceVersion identity.

Same document number may have revisions/addenda; numbering follows frozen ADR-0023 semantics.

## I05 — cancellation/void

An issued artifact may later be cancelled/voided/withdrawn through a governed action.

The issue fact remains historical.

A cancelled document is not physically rewritten to look as if it was never issued.

---

# 7. Pack / composition semantics

## P01 — bounded composition

A release/issue pack may bind exact member EvidenceVersions plus role/order/context.

Examples:

- tender release pack;
- addendum pack;
- subcontract issue pack;
- certificate package.

P1.6 supports composition only to preserve transaction evidence and issue history; it does not create a general folder/tree/CDE taxonomy requirement.

## P02 — issued pack is immutable membership

Once issued, the exact member set/order/roles are frozen for that issue.

Updating a member later does not mutate the prior issued pack.

A new pack/reissue/addendum is required.

## P03 — external linked members

An issued pack may include externally authoritative referenced documents.

If a referenced member is load-bearing, the issue must bind a reconstruction-safe exact external version anchor or immutable local captured copy according to the evidence identity contract.

A live mutable link is not enough.

---

# 8. Signature/seal/timestamp relationship

## S01 — attached to exact version

Electronic signature, seal, timestamp and validation evidence bind to the exact EvidenceVersion/representation they authenticate.

They cannot float to a later revision.

## S02 — signature does not bypass domain authority

Valid signature/seal evidence may support attribution/intention/integrity.

It does not automatically create:

- internal approval;
- AwardDecision;
- Commitment;
- change effectiveness;
- certificate effectiveness;
- payment/accounting truth.

Those require the bounded domain transition and applicable authority.

## S03 — signature validation history

Where signature/seal validation is load-bearing, preserve validation result/context sufficiently to reconstruct what was relied on at the time, including provider/certificate/status/time evidence as applicable.

Later certificate expiry/revocation does not silently rewrite the historical validation fact; current validity and historical validity are separate questions.

Exact trust-service mechanics remain later implementation/legal configuration.

---

# 9. Source revision versus domain correction

## B01 — evidence revision is not business-state correction

A supplier may revise a quote, invoice or claim.

That new source EvidenceVersion does not automatically change:

- comparison;
- award;
- Commitment;
- certification;
- accounting posting;
- payment.

The owning domain decides whether/how the new evidence is accepted and causes a governed transition.

## B02 — business correction may need new evidence

A governed domain correction may produce or require a corrected/reissued document.

The evidence artifact reflects the corrected business event but does not substitute for the domain correction event itself.

## B03 — evidence withdrawal after reliance

If a source version is withdrawn after a governed outcome relied on it:

- preserve the withdrawal fact;
- do not rewrite the earlier reliance;
- owning domain determines whether reevaluation/correction is required;
- evidence history supports the decision.

---

# 10. Tender-specific proof

## T01 — TenderRelease

Each issued TenderRelease is an immutable exact EvidenceVersion or issued pack version.

## T02 — Addendum

Each addendum binds the exact TenderRelease/version it modifies and is itself an immutable issued EvidenceVersion.

The effective tender basis for a supplier response is the applicable release + addenda set under the tender rules/time.

## T03 — supplier response revisions

Each load-bearing supplier response revision is an immutable SOURCE_CAPTURED EvidenceVersion with source principal and receipt/capture provenance.

Later revisions do not rewrite earlier revisions.

## T04 — comparison/award bindings

ComparisonSnapshot and AwardDecision bind exact supplier EvidenceVersion(s) and locators/basis used.

The existence of a later quote revision does not silently reprice a frozen comparison/award.

---

# 11. Retention/disposition interaction

## RD01 — superseded is not automatically disposable

Supersession/withdrawal does not itself terminate retention basis.

Prior versions may remain required by active transaction, contract, dispute/audit or configured/legal basis.

## RD02 — valid disposal preserves version history semantics

Where payload disposal becomes valid, preserve minimal disposition/tombstone metadata per P1.4 without falsifying the version/issue/supersession history.

---

# 12. One-XL / A0–A3 check

This contract supports exact releases, responses, comparison/approval evidence and AwardDecision without requiring full document management.

No generic folder model, collaborative editor, check-in/check-out, enterprise taxonomy, CDE workflow or legal archive is introduced.

**SECOND XL: CLEAN.**  
**A0–A3: CLEAN.**

---

# 13. Hostile tests

1. RFQ Release Rev0 issued, then Addendum 1 — Rev0 remains reconstructable? REQUIRED.
2. Supplier quote `Q-15.pdf` Rev0 and Rev1 same filename — distinguishable? REQUIRED.
3. Award used Rev0 even though Rev1 arrived later — exact historical basis retained? REQUIRED.
4. Old issued PDF regenerated with new template — forbidden as substitute for original issue? YES.
5. Signed version revised later — signature cannot float to new version? YES.
6. Pack member updated after issue — old pack membership unchanged? YES.
7. Supplier withdraws quote after award — withdrawal does not erase award basis; domain decides consequence? YES.
8. Mutable external CDE drawing linked in tender pack — exact version anchor/capture required? YES.

This artifact remains subject to integrated P1.6 hostile audit.
