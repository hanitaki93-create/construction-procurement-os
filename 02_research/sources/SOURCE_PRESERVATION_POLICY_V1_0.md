# Source Preservation Policy v1.0

**Purpose:** Prevent mutable external documentation from becoming unreproducible architecture evidence without turning every background competitor page into a P1.0 archival workload.

## 1. Preservation threshold

External source preservation is mandatory **before evidence from that source may support an ACCEPTED ADR, ACCEPTED requirement, or frozen architecture artifact**.

For decision-bearing external evidence, `sources.csv.archived_ref` must identify an immutable/content-addressed capture or durable archive reference and record capture date/hash where available.

Acceptable preservation forms include:
- repository-retained PDF/text/WARC capture;
- content-addressed snapshot retained in project storage;
- durable third-party archival snapshot with immutable timestamp/reference;
- official versioned documentation artifact whose exact version remains retrievable.

The capture must preserve enough context to reproduce the evidence claim, not merely the URL.

## 2. Background/deferred sources

A mutable external source may remain without an archive capture while all of the following are true:
- the related evidence is background, pain-signal, inherited-unverified or deferred to P1.3;
- it does not support an ACCEPTED ADR/REQ or frozen architecture conclusion;
- its original URL, access date and exact locator are retained where it has been verified.

If such evidence is later promoted to decision-bearing status, the source must be re-opened, re-verified, preserved, and only then used by the accepting ADR/REQ.

This rule deliberately avoids reintroducing exhaustive competitor-processing into P1.0.

## 3. Source drift

If a live source no longer matches the verified evidence claim:
- do not silently edit history;
- retain the old EVD and source-access metadata;
- mark/supersede/contest the evidence as appropriate;
- create a new source/EVD for the changed current state where relevant.

## 4. Current P1.0 posture

No current ACCEPTED product/domain ADR depends on mutable external competitor documentation.

- ADR-0001 is supported by archived internal project/audit inputs.
- ADR-0002 is an internal architecture decision about requiring a commercial event substrate; detailed semantics remain future work.
- ADR-0024 adopts only two irreversible substrate constraints and is supported by internal retrofit analysis (`EVD-0198`, `EVD-0199`).

External Procore/ProcurePro/Autodesk/Aconex/Unifier/CMiC/Trimble evidence currently informs **PROPOSED** future ADRs and cannot freeze architecture by itself.

Therefore retroactively archiving every background/deferred competitor page is not a P1.0 completion dependency. Preservation becomes mandatory at the exact point mutable external evidence becomes decision-bearing.

## 5. Audit rule

CP-05 must fail if:
- an ACCEPTED ADR/REQ or frozen architecture statement relies on mutable external evidence with no preserved source;
- a source has drifted but the project still presents the old claim as current verified truth;
- a deferred/background source is silently treated as preserved architecture evidence.
