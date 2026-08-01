# P1.7 — Import, Export & Migration Contract v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Define how data/evidence/config/transactions enter, leave or transition between systems without fabricating provenance, bypassing domain lifecycles, duplicating effects or collapsing product/external authority.

This contract does not select ETL tooling, file formats, migration vendor, staging database or cutover technology.

---

# 2. Import/migration classes

Every inbound operation declares exactly one primary class.

## M1 — BOOTSTRAP_REFERENCE_DATA

Initial tenant/project/supplier/master/config/reference setup before or alongside live use.

Examples:

- project directory;
- supplier/contact seed;
- UOM/currency/cost-code references;
- approved configuration/policy basis.

Does not import historical transaction truth unless separately classified.

## M2 — CURRENT_OPEN_TRANSACTION

Transfers an in-flight transaction expected to continue under product lifecycle.

Requires explicit current state, historical basis, authority/cutover and missing-history treatment.

## M3 — HISTORICAL_TRANSACTION_FULL

Imports enough source events/evidence/versions/authority/time to represent historical transaction semantics under supported product history.

## M4 — HISTORICAL_REFERENCE_ONLY

Registers legacy/external history as explicit reference/summary/limited fact because target invariants cannot be satisfied fully.

It cannot masquerade as native complete domain history.

## M5 — CURRENT_EXTERNAL_FACT_FEED

Imports/observes externally authoritative current facts such as accounting posting/payment/master data under an AuthorityMapping.

## M6 — EVIDENCE_ARCHIVE_IMPORT

Captures/registers in-scope EvidenceVersions/references/communications under P1.6 without automatically creating domain facts.

## M7 — PROPOSAL/STAGING_IMPORT

Creates reviewable proposals/mappings/staged rows, not authoritative domain state.

## M8 — EXPORT/HANDOFF

Produces bounded data/evidence/event/package/manifest for another system/party.

No generic migration/import class exists.

---

# 3. ImportRun / MigrationRun

Every run has immutable identity and binds:

- tenant/scope;
- class M1–M8;
- source system/export/file/version;
- source authority/owner;
- source extraction time/as-of context;
- operation/schema/mapping/config versions;
- target project/ContractingAuthorityContext;
- source-to-target identity mapping set;
- evidence/materialization policy;
- validation rules;
- atomic/partial behavior;
- cutover/effective period where applicable;
- item plan/checkpoints;
- result manifest;
- errors/quarantine/exclusions;
- actor/authority;
- retry/resume/correction lineage;
- source/copy disposition plan.

Changing source file/mapping/rules creates a new run/version, not silent mutation of a completed manifest.

---

# 4. MigrationItem

Every row/object/event/evidence unit has stable item identity and result:

- source item/object/version key;
- source content/integrity reference;
- target candidate identity;
- mapping status;
- validation status;
- authority classification;
- time/effective mapping;
- evidence/provenance completeness;
- transformation classification;
- target result/event/reference;
- error/quarantine/exclusion reason;
- retry/correction history.

Bulk totals never replace item-level outcomes.

---

# 5. Source provenance minimum

Preserve as available/required:

- source system/tenant/account;
- source object/event/document identity;
- source version/revision;
- source principal/organization;
- source recorded/effective/document/observed time semantics;
- extraction/export time;
- source field/value/raw representation;
- source evidence/locator;
- source authority mode;
- transformation/mapping version;
- importer/run/actor.

Missing provenance is represented as missing/limited, never generated from current metadata or guessed.

---

# 6. Identity mapping

## I01 — mapping classes

- `EXACT_VERIFIED`;
- `GOVERNED_ACCEPTED`;
- `PROPOSED_AMBIGUOUS`;
- `UNRESOLVED`;
- `INTENTIONALLY_SEPARATE`;
- `LEGACY_REFERENCE_ONLY`.

## I02 — no weak merge

Names, phone, email, VAT number, document number, row order, amount or fuzzy similarity cannot alone merge supplier/transaction/evidence identity when collision/ambiguity exists.

## I03 — technical versus tenant relationship identity

A reusable supplier technical identity may map to tenant-private SupplierRelationship/context. Import cannot turn global/source identity into cross-tenant business relationship authority.

## I04 — display numbers

Legacy document/reference numbers may be preserved as legacy/external display refs. They do not become target sequence identity automatically or violate frozen numbering rules.

---

# 7. Domain-state creation

## D01 — no direct state assignment

Import/migration cannot simply write:

- status = awarded/approved/paid/completed;
- current amount/balance;
- latest document;
- active Commitment;
- certified actual;
- payment actual;
- current authority.

## D02 — native domain reconstruction

To create native domain history, the run must invoke supported migration/domain actions that preserve:

- lifecycle/event membership;
- effective/recorded times;
- governing authority/config versions;
- evidence/RelianceBindings;
- commercial effects/conservation;
- correction lineage;
- idempotency.

## D03 — legacy state acceptance

Where full reconstruction is not possible, product may create an explicit `LEGACY_OPENING_STATE`/external-reference/limited-history construct only if later architecture/domain supports it prospectively and its semantics are frozen.

P1.7 cannot invent a generic opening balance/state that bypasses P1.5.

Until such a construct is frozen, classify as HISTORICAL_REFERENCE_ONLY or block.

---

# 8. Commercial/accounting actual separation

Migration must not collapse:

- physical actual;
- progress/claim actual;
- assessed actual;
- certified commercial actual;
- accounting-posted actual;
- invoice/AP liability;
- payment/cash actual.

If a legacy field called `actual` does not identify its authority/meaning, it remains ambiguous/quarantined/reference-only until resolved.

No mapping convenience can create a P07 effect from accounting/payment data or vice versa.

---

# 9. Historical time

Preserve distinct:

- source document date;
- source effective time;
- source recorded/posted time;
- source modified time;
- extraction time;
- import observed time;
- product migration recorded time;
- target effective time/period.

Missing source times are explicit.

Import timestamp cannot silently substitute for historical effective/recorded time.

Backdating requires supported migration/domain action and evidence/basis.

---

# 10. Evidence migration

For each load-bearing historical source:

- exact EvidenceVersion/SourceLocator where available;
- source principal/attribution;
- source version/integrity;
- external ReconstructionAnchorTest or local immutable capture;
- legacy link/reference/materialization policy;
- RelianceBinding to target event where full native history exists;
- limitation if payload/version/location unavailable.

A current CDE link cannot be imported as historical award evidence unless it anchors the exact relied-on version.

Evidence archive import alone creates no award/Commitment/certificate state.

---

# 11. Configuration and authority migration

Historical domain events bind the governing source/target policy/config/authority version or explicit legacy-reference limitation.

Current tenant config cannot be applied retroactively to interpret legacy events without an explicit mapping/version.

Authority migration identifies:

- represented legal entity/context;
- roles/delegations/approval matrix evidence;
- effective period;
- internal versus external grants;
- source limitations.

A source user role string does not automatically grant current product authority.

---

# 12. Validation outcomes

Every item resolves to one:

- `VALIDATED_ACCEPTED`;
- `VALIDATED_REFERENCE_ONLY`;
- `PROPOSAL_REVIEW_REQUIRED`;
- `REJECTED_SCHEMA`;
- `REJECTED_AUTHORITY`;
- `REJECTED_BUSINESS_INVARIANT`;
- `UNRESOLVED_IDENTITY`;
- `UNRESOLVED_EVIDENCE`;
- `UNRESOLVED_TIME`;
- `DUPLICATE_EXISTING`;
- `CONFLICT_EXISTING`;
- `QUARANTINED_UNKNOWN`;
- `EXCLUDED_DECLARED`.

No silent row discard.

---

# 13. Partial, atomic and resumable behavior

Run declares:

- atomic all-or-nothing;
- item-partial;
- dependency-group atomicity;
- ordering/dependency graph;
- checkpoints;
- completed item immutability;
- retry of failed items;
- compensation/forward correction for external side effects;
- aggregate derived state.

A crash/restart uses original run/mapping/config versions.

Changed source/mapping creates a new run or governed remediation version.

---

# 14. Duplicate detection

Duplicate analysis may use:

- exact source system/object/version;
- stable migration item/run identity;
- product target identity;
- domain business key under frozen rules;
- content identity plus source/context;
- event/command/effect lineage;
- explicit reconciliation.

Amount/date/name/hash alone cannot merge commercial effects or evidence histories.

Duplicate current external observation may update capture/sync history; it cannot create another domain effect.

---

# 15. In-flight cutover

Cutover contract declares:

- authority source before/after cutover;
- cutover effective time/period;
- write freeze/read-only windows if any;
- final source extraction/checkpoint;
- in-flight transaction classes;
- commands accepted/rejected/queued during cutover;
- external callback/event handling;
- dual-write prohibition;
- reconciliation before activation;
- rollback/forward strategy;
- old connector/source disposition.

No moment may have two authoritative writers for the same load-bearing fact/effective period.

---

# 16. Rollback and correction

## R01 — pre-activation rollback

If target imported state has not become authoritative/live, run may be abandoned/rolled back under manifest while preserving audit/quarantine history.

## R02 — post-activation

After target events/facts become authoritative, do not delete/rewrite history to “roll back”. Use owning-domain correction/reversal/supersession or forward migration correction.

## R03 — mapping correction

Corrected identity/value/time/evidence mapping preserves original run/item/result and creates corrected mapping/result lineage.

## R04 — source correction after migration

New source correction is a new external observation/import/correction input, not edit of original migrated evidence/event.

---

# 17. Export and handoff

An export binds:

- tenant/scope/as-of/projection/version;
- authority classifications;
- included facts/events/evidence versions;
- external/reference limitations;
- file/schema/version;
- filters/exclusions;
- actor/authority;
- generation time;
- content/integrity manifest;
- destination/handoff occurrence;
- result/status.

Export does not transfer product authority unless a separate governed cutover/transfer occurs.

Destination modifications are external facts, not edits to product history.

---

# 18. Source/copy disposition

After migration/export:

- source-system retention/deletion is external unless governed cutover contract applies;
- local staging files/temp copies follow P1.6 retention/disposition;
- target evidence/materialization follows explicit basis;
- no promise that external destination/source remains available;
- disposition action cannot erase migration manifest/domain history.

---

# 19. AI-assisted migration

AI/fuzzy extraction/mapping may produce proposals only.

Preserve:

- exact source row/document/location;
- model/tool/config execution;
- proposed mapping/value;
- uncertainty/alternatives;
- human/domain acceptance/correction;
- final target result.

AI cannot fabricate missing history, source version, authority or dates.

---

# 20. A0–A3 minimal import/export

First deployment may use:

- bounded CSV/XLSX supplier/project/reference bootstrap;
- manual validation;
- product-native live transactions from activation date;
- legacy documents as EvidenceVersions/reference-only;
- structured award/handoff export.

Full historical migration is not required for first tender.

---

# 21. One-XL guard

This is not:

- generic ETL/no-code mapping platform;
- MDM/data-cleaning product;
- data warehouse;
- migration consultancy framework;
- universal archive importer.

It defines bounded product migration invariants only.

**P07 sole XL: preserved.**

---

# 22. Hostile tests

1. Legacy `actual=500k` unknown type — cannot map to certified/paid? REQUIRED.
2. Historical award has current CDE link only — reference limitation or block, no exact reliance claim? REQUIRED.
3. Same supplier name maps to two companies — unresolved, no merge? REQUIRED.
4. Open Commitment imported by status assignment — prohibited unless supported lifecycle/opening-state semantics? REQUIRED.
5. Batch 70/100 valid — explicit item results/no silent discard? REQUIRED.
6. Migration rerun after source file changed — new run/version, no mutation of old manifest? REQUIRED.
7. Cutover receives source write after final extraction — reconciliation/in-flight rule, no dual writer? REQUIRED.
8. Post-live rollback requested — domain corrections, not deletion? REQUIRED.
9. AI invents missing quote revision — impossible/explicit unknown? REQUIRED.
10. First tender launches with no historical migration — valid minimal profile? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
