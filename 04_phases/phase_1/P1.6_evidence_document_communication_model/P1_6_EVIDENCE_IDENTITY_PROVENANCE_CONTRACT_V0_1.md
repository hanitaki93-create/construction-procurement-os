# P1.6 — Evidence Identity & Provenance Contract v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.6  
**Product code:** LOCKED

---

# 1. Purpose

Define the semantic identities required to prove what evidence existed, who/what originated it, which exact version was used, where a value came from, how it was captured/issued/referenced and how it relates to a governed domain outcome.

This contract does not choose file/object storage, hashing implementation, OCR/model stack, CDE connector, database schema or UI.

---

# 2. Core thesis

P1.6 separates:

1. **evidence business identity** — the evidentiary source/version used or produced in a business context;
2. **content identity/integrity** — whether bytes/rendered content are identical or demonstrably unchanged;
3. **source principal** — who/what originated or issued the source;
4. **capture/communication occurrence** — when/how the evidence entered or left the OS;
5. **source location** — exact external/local/document/page/section/region reference where the relied-on fact came from;
6. **domain binding** — why the evidence matters to a governed fact/event/decision;
7. **derived observation** — machine/human extraction or interpretation based on source evidence, never source truth by itself.

None of these may be silently collapsed into another.

---

# 3. Candidate semantic primitives

Physical entities/tables are not implied by these names.

## E01 — EvidenceRecord

A durable OS evidentiary identity representing one business-evidence item/lineage within tenant scope.

Examples:

- supplier quotation lineage;
- tender release lineage;
- signed subcontract artifact lineage;
- delivery note lineage;
- progress-claim evidence lineage;
- external authority record reference lineage.

An `EvidenceRecord` does not by itself mean the evidence is current, valid, authentic, accepted or authoritative for a domain outcome.

## E02 — EvidenceVersion

An immutable identity for one exact captured/source/issued revision of an EvidenceRecord.

A new EvidenceVersion is required when a load-bearing source revision/content state changes.

An EvidenceVersion preserves as applicable:

- tenant/project/context scope;
- EvidenceRecord identity;
- source revision/version identifier where provided;
- source principal;
- source system/channel/context;
- capture/issue/import provenance;
- captured/issued timestamp observations;
- content identity/integrity evidence;
- source locator(s);
- supersession/withdrawal/invalidity relationships;
- external source/version/freshness context where applicable.

An EvidenceVersion is not edited in place to represent a later revision.

## E03 — ContentIdentity

A technical/content identity or integrity proof capable of distinguishing/validating an exact representation.

It may be implemented later with cryptographic hash, signature/seal validation, provider-native immutable version identity, canonical representation proof or another supported mechanism.

Hard semantics:

- same ContentIdentity does not prove same source principal;
- same ContentIdentity does not prove same business occurrence;
- same ContentIdentity does not prove truth or authority of the content;
- different technical representations do not necessarily mean different business evidence if a governed equivalence/representation relation is proven;
- hash algorithm/storage form is not frozen here.

## E04 — SourcePrincipalRef

Identifies the natural person, legal person, organization relationship, system, automated source or represented external party that originated/issued the evidence.

Source principal is distinct from:

- the internal user who captured/imported it;
- transport/email/CDE provider;
- external-grant authentication identity;
- buyer-on-behalf actor;
- approver who later consumed it.

A source principal may be known, asserted, verified, authenticated or uncertain according to evidence quality. P1.6 must preserve that distinction where load-bearing.

## E05 — CaptureObservation

Records a provenance-bearing observation that an EvidenceVersion was captured/imported/received or made available to the OS through a specific channel/path.

A single EvidenceVersion may have multiple CaptureObservations.

Examples:

- same supplier quote attached to email and later uploaded to portal;
- external CDE version referenced and later locally captured;
- buyer-on-behalf upload followed by supplier confirmation.

CaptureObservation does not create a second EvidenceVersion solely because the same exact source version arrived again.

## E06 — SourceLocator

A locator identifies where the relied-on source information exists inside or outside an evidence version.

As applicable it may contain:

- external system/object ID;
- external version/revision ID;
- original source document identifier;
- page/sheet/section/paragraph/table/cell/line;
- geometric/region locator for visual artifacts;
- attachment/member identity;
- source URL/path as an auxiliary locator;
- source timestamp/effective context;
- observed/fetched time for external references.

A locator is not authority by itself.

A free-text URL alone is insufficient for a load-bearing external source.

## E07 — EvidenceBinding

A typed relation between an EvidenceVersion/SourceLocator and a canonical domain fact/event/decision or another evidentiary action.

Candidate bounded roles:

- `SOURCE_BASIS` — evidence directly relied on to derive/decide a governed fact;
- `ISSUED_OUTPUT` — evidence artifact produced/issued by a governed domain action;
- `SUPPORTING_EVIDENCE` — relevant support but not sole governing basis;
- `VALIDATION_EVIDENCE` — signature/seal/timestamp/delivery/verification evidence;
- `CORRECTION_EVIDENCE` — evidence supporting a governed correction/supersession;
- `TRANSMISSION_EVIDENCE` — evidence of issue/send/receipt/acknowledgment occurrence;
- `ANCILLARY_REFERENCE` — contextual reference not itself load-bearing basis.

P1.6 does not create a generic arbitrary knowledge graph. Binding types are product-supported and domain actions determine when a binding is required.

## E08 — DerivedObservation

A provenance-bearing observation extracted, interpreted, mapped, classified or proposed from source evidence by a human, deterministic parser, AI/model/tool or external process.

It preserves as applicable:

- exact source EvidenceVersion;
- exact SourceLocator;
- derivation/tool/model/config execution identity sufficient for supported reconstruction;
- proposed/extracted value;
- confidence/quality indicator only where later architecture supports it;
- actor/process identity;
- time;
- later acceptance/correction/rejection/transformation linkage.

A DerivedObservation is not supplier source truth and is not a P07 commercial effect.

P1.10 owns broader AI confidence/orchestration/agent design.

## E09 — ValidationEvidence

Evidence about authenticity, integrity, identity, time or delivery of another evidence version/communication occurrence.

Examples:

- electronic-signature/seal validation;
- authentication-certificate validation;
- qualified timestamp reference;
- qualified delivery proof;
- provider-native integrity proof;
- manual validation result where supported.

ValidationEvidence does not automatically prove business authority, contractual acceptance or truth of the signed content.

Internal P09/domain authorization remains separate.

---

# 4. Evidence identity rules

## I01 — filename is never identity

Filename, subject line, folder path or display title cannot be the durable identity of load-bearing evidence.

Two different versions may share a filename; one version may exist under multiple filenames.

## I02 — content equality does not collapse business identity

Two EvidenceVersions with the same ContentIdentity may remain distinct where source principal, source revision family, business context or evidentiary occurrence is different.

Example:

Two suppliers submit the same manufacturer datasheet bytes. The content may be identical; the evidentiary submissions are not the same supplier evidence event.

## I03 — repeated capture does not automatically create a new source version

If the same exact source version is received repeatedly through email/portal/CDE, preserve multiple CaptureObservations/CommunicationOccurrences while maintaining one EvidenceVersion where source identity/version equivalence is proven.

If equivalence is uncertain, do not merge merely because bytes match.

## I04 — business deduplication is provenance-based

A deduplication decision may consider:

- tenant/project/context;
- source principal;
- source document/revision ID;
- source channel/correlation IDs;
- content identity;
- timestamps;
- source relationship;
- explicit supplier/system confirmation.

Hash equality alone cannot merge business evidence histories.

## I05 — source lineage is optional but explicit

EvidenceVersions may be linked as revisions/supersessions/replacements of one EvidenceRecord where a real source/business lineage exists.

P1.6 must not fabricate a revision lineage merely because documents look similar.

---

# 5. External evidence references

## X01 — reconstruction-safe load-bearing external evidence

Where a governed outcome depends on externally authoritative evidence, the evidence basis must have an exact reconstruction anchor through at least one supported path:

### Path A — stable external version anchor

Preserve:

- external authoritative system;
- stable object ID;
- stable version/revision identity;
- source principal/authority;
- locator;
- effective/source context where material;
- observed/fetched time and freshness/conflict state where material.

### Path B — immutable local evidentiary capture

Where permitted, preserve an immutable captured representation of the exact external source version plus external origin/version/locator provenance.

The local capture proves what the OS relied upon; it does not transfer business authority from the external source to the OS.

## X02 — mutable URL alone is not sufficient

A mutable external URL/path with no stable version anchor and no immutable capture cannot be the sole `SOURCE_BASIS` for a load-bearing governed outcome requiring exact later reconstruction.

It may remain `ANCILLARY_REFERENCE` or unresolved evidence dependency.

P1.6 does not permit a later implementer to choose silently whether such a URL was “good enough”.

## X03 — inaccessible later source

If an external source becomes unavailable after a valid historically reconstruction-safe reference/capture existed:

- historical domain truth is not reversed;
- the external availability/freshness state may change;
- retained local evidence/tombstone/reference history remains under its valid basis;
- reconstruction limits are explicit if the governing payload is no longer legitimately retained.

---

# 6. Source principal / representation rules

## S01 — buyer-on-behalf

For buyer-on-behalf capture preserve:

- internal acting principal;
- represented external organization/contact;
- source channel/evidence;
- representation status;
- supplier confirmation/revision separately where required.

The internal actor never becomes the supplier source principal merely because they uploaded the evidence.

## S02 — authenticated external submission

Authentication proves the submitting principal under the relevant external grant/authentication context.

It does not automatically prove:

- legal authority to bind the supplier for every action;
- content accuracy;
- internal buyer approval;
- contract formation.

Those remain domain/legal/control facts.

## S03 — automated system origin

An EvidenceVersion may originate from an automated system/service.

Preserve source system/authority identity and, where required, the person/legal organization on whose behalf the system acted.

Transport processor/intermediary is not the originator merely because it handled the message/file.

---

# 7. Source location and value lineage

## L01 — load-bearing value locator

When a governed value/decision depends on a specific part of an evidence version, the EvidenceBinding must be able to identify the relevant source location at a precision sufficient for supported reconstruction.

Examples:

- quote total on page 3;
- line item/unit rate in a table row;
- tender condition in clause 8;
- certificate value in a schedule row;
- email statement in a specific message body;
- spreadsheet value in sheet/cell/range.

P1.6 does not require one universal locator syntax for every media type; it requires a typed/versioned locator semantics.

## L02 — locator survives representation changes

A derived text/OCR/rendering locator cannot replace the original source locator where the derivation itself may change.

Where a normalized/derived representation is used for navigation, preserve its relationship to the original EvidenceVersion/location.

## L03 — source-to-domain chain

For a load-bearing governed value where applicable:

`EvidenceVersion + SourceLocator`
`→ [DerivedObservation(s)]`
`→ normalization/evaluation/assessment fact under owning domain`
`→ bounded approval/domain command`
`→ authoritative domain fact/event`

The provenance chain may skip intermediate layers that did not occur, but must never invent them retroactively.

---

# 8. Integrity/authenticity/authority separation

## A01 — integrity

Integrity evidence addresses whether the content/representation is unchanged or matches an identified source representation.

## A02 — authenticity/attribution

Authenticity/attribution evidence addresses whether the evidence is attributable to the stated principal/system under the applicable evidence basis.

## A03 — authority

Business/domain authority addresses whether that principal/action could create the claimed business effect.

These are separate.

A perfectly intact signed PDF may still be signed by a person lacking contractual authority.

A valid external signature cannot satisfy internal P09 approval.

## A04 — truth

Neither integrity nor signature validation proves that every factual assertion inside the document is true.

P1.6 preserves evidence; the owning domain decides how that evidence can support a governed fact/decision.

---

# 9. Retention/disposition interaction

## R01 — evidence identity may outlive payload only under valid basis

Where payload disposition is legitimate while a historical domain event remains, preserve only the minimum justified non-payload EvidenceVersion/DispositionRecord metadata required by frozen P1.4 tombstone semantics.

Do not retain source content indefinitely merely to preserve an EvidenceRecord ID.

## R02 — no provenance fabrication after disposal

If later reconstruction requires content that was legitimately disposed under the governing basis, do not fabricate or silently infer the missing source.

Expose the valid disposition history and resulting reconstruction limit.

---

# 10. A0–A3 minimum evidence profile

The first sourcing rail needs only enough P1.6 primitives to support:

- requirement/RFQ source evidence;
- exact issued tender release/addendum version;
- supplier response revisions/source principal;
- source locator for compared values where load-bearing;
- normalization/evaluation/approval evidence bindings;
- AwardDecision evidence;
- external handoff evidence where applicable.

It does not require:

- enterprise document migration;
- CDE connector;
- historic email ingestion;
- trust-service provider integration;
- AI extraction;
- full text indexing;
- legal-hold configuration;
- persistent supplier account.

---

# 11. One-XL check

This contract creates no independent evidence ledger competing with P07/domain truth.

EvidenceVersion records what source existed/was relied on/was issued.

EvidenceBinding explains the relationship.

Only bounded domain actions create procurement/commercial truth.

**P07 sole XL: preserved.**  
**A0–A3 independence: preserved.**

---

# 12. Candidate hostile tests

1. Same filename, different supplier quote revision — distinguishable? YES by EvidenceVersion/source revision/provenance.
2. Same bytes from two suppliers — not merged? YES.
3. Same supplier revision via email and portal — one evidence version plus multiple occurrences where equivalence proven? YES.
4. Mutable CDE URL used for award — blocked as sole load-bearing basis unless stable external version or local immutable capture exists? YES.
5. AI extracts wrong price then human corrects — original evidence, machine observation, correction/acceptance and final domain basis all reconstructable? REQUIRED.
6. Signed PDF from unauthorized employee — signature evidence cannot create business authority? YES.
7. Evidence payload later disposed — retained domain event remains, minimal disposition/provenance record only under valid basis? YES.

This artifact is an internal candidate and remains subject to integrated P1.6 hostile audit.
