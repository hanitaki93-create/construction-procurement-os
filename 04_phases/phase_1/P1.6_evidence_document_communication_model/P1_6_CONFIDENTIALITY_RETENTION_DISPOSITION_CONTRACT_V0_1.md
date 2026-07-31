# P1.6 — Confidentiality, Retention, Redaction & Disposition Contract v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.6  
**Product code:** LOCKED

---

# 1. Purpose

Define how evidence/document/communication data is classified, accessed, retained, restricted, redacted, minimized, disposed, exported and handled after termination without rewriting historical business truth or turning P1.6 into enterprise records management, legal hold/eDiscovery or a generic policy engine.

---

# 2. Core separation

P1.6 distinguishes:

1. **business/domain scope** — project/tender/Commitment/counterparty/resource relationship;
2. **current authorization** — P09/domain membership/role/grant/security capability;
3. **sensitivity/disclosure metadata** — bounded facts used by deterministic access checks;
4. **retention basis** — why content/metadata must or may remain retained;
5. **preservation dependency** — a specific active transaction/contract/dispute/audit/security dependency preventing disposal;
6. **restriction/redaction** — limiting access or creating a derived disclosure representation;
7. **payload disposition/minimization** — legitimate removal of eligible content/data;
8. **historical domain truth** — retained business event/meaning, which is not reversed by evidence disposal.

No one concept substitutes for another.

---

# 3. Sensitivity and disclosure metadata

## C01 — bounded metadata, not policy language

Evidence may carry product-supported classification/disclosure metadata sufficient for deterministic authorization and issue/capture behavior.

Candidate semantic dimensions include:

- confidentiality/sensitivity class;
- owning domain/resource scope;
- counterparty/participant scope where relevant;
- source principal/organization scope;
- externally issued/intended-recipient scope;
- sealed/restricted-before-domain-event condition where owned by the relevant domain;
- personal/contact-data indicator where needed for later privacy/NFR handling.

These dimensions do not form a tenant-authored policy programming language.

## C02 — authorization remains external to the evidence object

Evidence metadata can inform fixed deterministic checks, but current access is decided through current P09/domain authorization and external-grant semantics.

A classification such as `CONFIDENTIAL` does not grant or deny access by itself.

## C03 — source/participant isolation

Supplier bid/qualification/evidence visibility must preserve tenant/resource/participant boundaries.

A supplier's evidence cannot become visible to another supplier merely because both participate in the same TenderEvent.

Thread, folder, pack or content similarity cannot widen authorization scope.

## C04 — domain timing conditions

Where evidence visibility changes after a domain event, such as tender close/opening or approval, the condition belongs to the owning domain policy/event.

P1.6 stores the evidence/classification/binding needed for enforcement but does not invent a second workflow/timing engine.

---

# 4. Retention basis semantics

## R01 — retention always has a basis

Retention of load-bearing evidence/payload/communication data must be supportable by one or more active bounded bases such as frozen P1.4 categories:

- active transaction/contractual dependency;
- customer contract/configured requirement;
- verified applicable legal/regulatory requirement;
- active dispute/audit dependency with valid basis;
- bounded security/audit requirement.

No `KEEP_FOREVER` default exists.

## R02 — RetentionBasisRef

A retained category/item may bind a typed/versioned `RetentionBasisRef` or equivalent semantic reference identifying as applicable:

- basis type;
- source/authority;
- scope/category/item relation;
- effective start;
- trigger/end condition;
- configured/legal duration where established;
- source/version/provenance;
- review/verification status where externally/legal sourced.

Exact physical representation and jurisdictional durations remain later legal/product/configuration work.

## R03 — multiple bases

More than one valid basis may apply.

Eligibility for payload disposition occurs only when all applicable active retention/preservation dependencies for that payload/data scope are resolved/expired or a lawful overriding action exists.

## R04 — derived retention state

Current retention eligibility is a derivation over active bases/dependencies and data scope.

It is not an independently editable `retain=true/false` truth.

---

# 5. Preservation dependency without a legal-hold platform

## P01 — bounded PreservationDependency

A supported in-scope dispute, audit, contractual, security or correction process may create a bounded preservation dependency referencing specific:

- transaction/domain scope;
- EvidenceRecord/EvidenceVersion categories/items;
- start/basis/authority;
- end/review condition.

## P02 — not generic eDiscovery/legal hold

P1.6 does not provide:

- organization-wide custodian discovery;
- arbitrary legal query languages;
- enterprise litigation-hold workflows;
- eDiscovery collection/review/production;
- records schedule authoring.

A broader legal/records system may remain external and provide a bounded preservation basis/reference.

## P03 — preservation does not widen viewing rights

A preservation dependency can prevent disposal without granting ordinary user access to the preserved evidence.

Retention and authorization remain separate.

---

# 6. Restriction, redaction and derived disclosure

## D01 — access restriction

Restricting access changes who may access evidence under current authorization; it does not alter the source EvidenceVersion content/history.

## D02 — redacted representation

Where a partially redacted/disclosed copy is required, create a derived representation linked to the original EvidenceVersion rather than modifying the source evidence in place.

Preserve as applicable:

- source EvidenceVersion;
- redaction action/authority/basis;
- redaction scope/type;
- derived representation ContentIdentity;
- disclosure recipient/context;
- time/version.

The redacted copy is not the unredacted source.

## D03 — redaction authority

Redaction requires bounded authorization/basis under the supported process.

Evidence classification alone cannot authorize arbitrary redaction.

## D04 — redaction does not rewrite past reliance

If a past AwardDecision/Commitment/Certification relied on the original unredacted source, later creation of a redacted representation does not change which source version governed the historical event.

---

# 7. Payload minimization and disposition

## X01 — payload disposition

A payload/content representation may be disposed only when:

- all applicable bases/dependencies permit it;
- current authorized actor/process is valid;
- required transaction-history meaning can remain intact under frozen P1.4 tombstone semantics;
- any required export/return/migration step has been completed where applicable.

## X02 — disposition does not reverse domain history

Deleting/minimizing an evidence payload cannot:

- undo a TenderRelease;
- withdraw a BidSubmission;
- reverse an AwardDecision;
- change Commitment value;
- reverse a certificate;
- change accounting/payment truth.

The owning domain requires its own correction/reversal action.

## X03 — DispositionRecord

Where payload is legitimately disposed but historical business meaning remains, preserve only the minimum justified non-payload record needed to explain as applicable:

- EvidenceRecord/EvidenceVersion identity;
- source/principal/governing version sufficient for retained reconstruction purpose;
- related retained domain event;
- disposition action/time;
- authority/basis;
- disposed payload/category scope;
- outcome/verification.

The DispositionRecord/tombstone itself requires a valid retention/minimization basis.

## X04 — no metadata-retention loophole

P1.6 cannot retain a near-complete shadow copy of disposed content under the label `metadata` merely to avoid disposition.

Minimum retained metadata must be justified by the surviving basis/reconstruction need.

## X05 — partial data minimization

Where mutable personal/contact/profile information can be minimized while historical attribution remains required, preserve only the bounded historical principal/reference facts necessary to avoid falsifying the transaction history.

Do not rewrite historical actor/source identity into anonymous or different actors unless the supported legal/product process explicitly requires a representational transformation that preserves audit meaning.

---

# 8. External authoritative evidence after local disposition

## E01 — external reference may survive local payload disposal

If local captured payload is eligible for disposal while an externally authoritative version remains validly referenced, the retained reference must still satisfy the surviving reconstruction need and retention basis.

## E02 — external availability is not guaranteed

P1.6 cannot assume a CDE/ERP/vendor URL remains accessible forever.

If exact reconstruction after local disposal depends entirely on an external source, that dependency/authority must be explicit before disposal.

## E03 — no control of external deletion

The OS does not control external retention/deletion.

External source unavailability later does not permit fabrication of the historical source content.

---

# 9. Post-termination retained state

## T01 — tenant remains historical scope anchor

Tenant termination/offboarding does not erase historical tenant/project/context identity.

## T02 — former access does not survive automatically

Former memberships, supplier grants and user roles do not remain active merely because evidence is retained.

## T03 — retained-state actions use explicit post-termination authority

Post-termination export, minimization, restriction or disposition requires authority derived from applicable contract, lawful instruction or verified legal/regulatory basis.

## T04 — operator/service access

Any operator/support access to retained evidence remains bounded, auditable and justified by the retained-state/service/security basis.

P1.6 does not grant blanket internal access to terminated-tenant records.

---

# 10. Export / return boundary

## O01 — bounded export/return

Where contractually supported/required, export/return may package in-scope evidence/document/communication data with enough version/provenance/relationship metadata to identify what was handed off.

## O02 — export manifest

A bounded export may preserve an export manifest/evidence identifying as applicable:

- tenant/scope;
- included EvidenceRecords/Versions/categories;
- export format/version;
- source/reference relationships;
- time/actor/authority;
- destination/handoff reference;
- exclusions/known inaccessible references;
- integrity proof for exported package where supported.

## O03 — destination is outside OS authority

After governed handoff, OS does not claim destination retention, residency, access or authority.

## O04 — no full records portability platform

P1.6 only defines enough export/return semantics to satisfy bounded product/offboarding needs.

Exact standard formats and large-scale migration tooling remain P1.7/P1.10/later implementation.

---

# 11. Residency category handoff

P1.6 identifies evidence-related data categories that P1.10/NFR must classify against frozen residency commitments, including as applicable:

- evidence payloads/attachments;
- MessageEnvelope bodies/headers;
- EvidenceRecord/EvidenceVersion metadata;
- SourceLocator data;
- DerivedObservations/extraction provenance;
- signature/seal/timestamp/delivery ValidationEvidence;
- redacted representations;
- disposition/tombstone records;
- export package/manifests.

P1.6 does not choose storage region, backup/DR topology or telemetry handling.

---

# 12. Confidential issue/share semantics

## S01 — intended recipient evidence

Externally issued evidence binds intended recipient/addressee scope through the Transmittal/CommunicationOccurrence.

## S02 — disclosure copy does not grant future access

Sending a document to a recipient is evidence of disclosure/issue under that occurrence.

It does not create a permanent portal/resource authorization grant unless a separate external-grant action exists.

## S03 — revoke future access ≠ revoke historical disclosure

Revoking a portal grant can remove future product access but cannot rewrite the fact that an artifact was previously issued/delivered/disclosed.

---

# 13. A0–A3 minimum

First-live-tender operation needs only bounded defaults for:

- evidence/resource scope;
- supplier-participant isolation;
- exact issue/response evidence;
- basic sensitivity/access metadata;
- default/customer-configured bounded retention basis sufficient for the transaction;
- later disposition capability.

It does not require enterprise records schedules, DLP, historical email archive, legal hold or CDE migration.

---

# 14. One-XL check

Classification is metadata, not policy engine.

Retention is bounded basis/dependency, not enterprise records management.

Preservation is scoped dependency, not eDiscovery.

Redaction is derived representation/action, not content-authoring platform.

Export is bounded handoff, not CDE portability suite.

**SECOND XL: CLEAN.**  
**A0–A3: CLEAN.**

---

# 15. Hostile tests

1. Supplier bid remains confidential from competing supplier? REQUIRED.
2. Tender closes and buyer access changes under domain rule — evidence layer does not own tender timing? REQUIRED.
3. Evidence has active dispute basis but user loses access — retained but not viewable? REQUIRED.
4. Source PDF is redacted for external disclosure — original remains historical source; redacted copy is derived? REQUIRED.
5. Payload disposed after bases expire — domain event remains; minimal tombstone only? REQUIRED.
6. `metadata` cannot preserve the entire disposed body? REQUIRED.
7. Tenant terminates — former admin cannot access retained evidence merely due old role? REQUIRED.
8. Export delivered to customer — destination retention/residency not claimed by OS? REQUIRED.
9. External CDE source was locally disposed and later disappears — no fabricated source; dependency/risk explicit? REQUIRED.
10. Preservation basis prevents deletion but does not grant access? REQUIRED.

This artifact remains subject to integrated P1.6 hostile audit.
