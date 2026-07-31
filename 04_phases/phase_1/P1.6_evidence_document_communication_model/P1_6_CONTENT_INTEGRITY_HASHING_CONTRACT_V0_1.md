# P1.6 — Content Integrity & Hashing Contract v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.6  
**Product code:** LOCKED

---

# 1. Purpose

Define what hashing/integrity means for P1.6 evidence without confusing technical content identity with source authenticity, business authority, legal truth or evidence business identity.

This contract does not select a cryptographic algorithm, storage vendor, signing provider, timestamp provider or validation library.

---

# 2. Core rule

Hash/integrity proof answers:

> “Is this exact retained/observed representation the same content representation whose integrity proof was recorded?”

It does **not** answer:

- who authored it;
- whether the author was authorized;
- whether its statements are true;
- whether the document was accepted;
- whether the document created a contract/commercial effect;
- whether two business evidence submissions are the same evidentiary occurrence.

Those require separate provenance/authenticity/authority/domain semantics.

---

# 3. IntegrityAssertion

A load-bearing retained/captured representation may bind one or more immutable `IntegrityAssertion` records or equivalent semantics.

Each assertion identifies as applicable:

- EvidenceVersion;
- exact representation/payload identity;
- integrity method/type;
- algorithm/scheme identifier + version where applicable;
- resulting digest/value/reference;
- time/actor/system of calculation/validation;
- source/provider of an external integrity value where applicable;
- validation result/status;
- predecessor/revalidation relationship.

Hash algorithm/version is part of the assertion meaning.

---

# 4. Exact representation boundary

## H01 — hash exact representation by default

A digest over source bytes identifies those exact bytes.

If the same logical document also has:

- normalized PDF;
- OCR text;
- rendered image;
- translated copy;
- decompressed/extracted member;
- canonical structured representation,

those are separate representations with separate integrity assertions and explicit derivation/equivalence relationships.

## H02 — no hidden canonicalization

P1.6 does not permit a later implementation to silently normalize line endings, metadata, PDF structure, spreadsheet formulas, image encoding or archive order and still call the resulting digest the source-content hash.

Any canonicalized representation must be explicitly typed and linked to the source representation.

## H03 — member/attachment integrity

Where an archive/pack/message contains independently load-bearing members, the pack/message and member EvidenceVersions may each have their own integrity assertions.

A container hash alone does not give a stable business identity to each member.

---

# 5. Hash equality and deduplication

## D01 — hash equality is insufficient for business merge

Equal digest/content identity does not prove:

- same source principal;
- same submission occurrence;
- same revision lineage;
- same intended recipient/context;
- same business effect.

Evidence deduplication uses provenance/context rules from the Evidence Identity contract.

## D02 — hash inequality does not automatically mean new business revision

Technical re-encoding/representation change can produce different bytes without changing the underlying source/business content if a supported equivalence relationship is established.

P1.6 therefore keeps ContentIdentity separate from EvidenceVersion business lineage.

---

# 6. Rehash / algorithm agility

## A01 — integrity algorithm can evolve without rewriting evidence identity

If an integrity algorithm/scheme is deprecated, strengthened or supplemented, the same retained EvidenceVersion may receive a new `IntegrityAssertion` calculated/validated under the new method.

This does not create a new source EvidenceVersion solely because the integrity method changed.

## A02 — preserve old assertion history

New integrity assertions supplement/supersede validation confidence for future use but do not erase which assertion/method was historically available or relied on.

## A03 — rehash requires trusted source payload

A new digest may be calculated only from the exact retained/validated representation whose continuity is established.

If the original payload is unavailable, P1.6 cannot fabricate a stronger digest from a screenshot/text transcription/other derivative and claim it protects the original bytes.

---

# 7. External integrity assertions

External systems/trust services may provide:

- provider-native content hash;
- immutable version ID;
- electronic signature/seal validation;
- qualified timestamp;
- delivery proof;
- audit-log integrity proof.

P1.6 may preserve/reference these as ValidationEvidence/IntegrityAssertion with provider/source/version context.

An external digest is not product authority merely because it is stored locally.

---

# 8. Signature/seal interaction

A signature/seal may authenticate/integrity-bind a specific representation under its validation semantics.

P1.6 still preserves the exact signed EvidenceVersion/representation.

A detached/embedded signature relationship must identify the exact content it covers.

Validation of the signature/seal does not replace:

- source principal/business relationship checks;
- signatory authority checks;
- internal P09 approval;
- bounded domain effectiveness.

---

# 9. Disposition interaction

## X01 — hash is metadata and still needs retention basis

A digest/IntegrityAssertion is not automatically retained forever after payload disposal.

Its surviving retention must be justified by the remaining tombstone/reconstruction/security basis.

## X02 — digest cannot recreate disposed content

A retained hash may prove equality if a candidate copy is later produced, but it cannot reconstruct the disposed payload itself.

The system must not present a digest as though the source content remains available.

## X03 — disposed source plus derivative

If an original payload is legitimately disposed while a derived/redacted representation remains, the derivative must retain its own identity/integrity and the historical relation to the disposed source/tombstone.

It cannot be relabeled the original.

---

# 10. Generated/issued artifact integrity

For PRODUCT_ISSUED EvidenceVersion, record integrity over the exact issued representation before/atomically with issue so later resend/export can prove it is the same issued content.

A later regenerated representation with a new template/config is not equivalent merely because it describes the same domain record.

If exact byte preservation is not the chosen physical strategy, later design must provide a reconstruction/integrity mechanism satisfying the same semantic contract and P1.6 gate.

---

# 11. External mutable reference

A mutable URL with a current hash captured today does not prove the URL will serve the same source version tomorrow.

For load-bearing external evidence, reconstruction safety still requires:

- stable external version anchor; or
- immutable local capture of exact source version.

A hash can strengthen that anchor/capture but does not replace source-version identity.

---

# 12. A0–A3 minimum

A0–A3 only requires integrity semantics for exact captured/issued load-bearing versions used in sourcing/award.

It does not require:

- blockchain anchoring;
- qualified timestamp for every file;
- digital signature on every message;
- external notarization;
- enterprise content-addressable storage.

---

# 13. One-XL check

Integrity assertions support evidence identity; they do not create an independent evidence ledger or commercial authority.

**SECOND XL: CLEAN.**  
**A0–A3: CLEAN.**

---

# 14. Hostile tests

1. Same hash, two suppliers — business evidence remains distinct? REQUIRED.
2. Same PDF visually re-saved with different bytes — no false claim of byte identity? REQUIRED.
3. OCR text hash exists — cannot be called source PDF hash? REQUIRED.
4. Hash algorithm changed — new assertion without new EvidenceVersion? REQUIRED.
5. Original payload disposed — hash cannot be shown as source content still available? REQUIRED.
6. Issued tender PDF regenerated later — new bytes cannot substitute for original issue? REQUIRED.
7. Mutable CDE link + hash today — still requires stable version/capture for load-bearing basis? REQUIRED.

This artifact remains subject to integrated P1.6 hostile audit.
