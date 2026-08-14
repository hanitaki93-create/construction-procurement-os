# CPOS File / Attachment / Issued Artifact Provenance Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## Why this is first-spine architecture

The clean V2 rebuild starts from accepted B03 and does not inherit rejected B04 evidence/document implementation. File identity, version provenance and exact issued-artifact binding are therefore missing implementation substrate and must be rebuilt explicitly; they cannot be assumed to survive from the rejected wave.

## User meaning

Users work with **Documents, Attachments, Tender Files, Quotations, Certificates, Scope Annexures, Issued RFQs, Orders and Contracts**. They do not need to understand internal evidence ontology.

## Core objects

### FileAsset
- immutable file/content identity;
- tenant/project/business context;
- filename/media type/size/hash;
- storage locator through provider-neutral object-store adapter;
- upload/scan/verification state;
- uploader/source/channel and timestamps.

### BusinessAttachment
Binds a FileAsset to a business object with document type/purpose, display title, optional revision/reference and lifecycle visibility. The same physical content may be referenced in multiple valid contexts without duplicating truth.

### SourceDocumentVersion
For supplier quotations, licences, drawings/specifications and other source-bearing records, preserve exact version/revision/source location and relation to structured captures.

### IssuedArtifactVersion
Immutable rendered/assembled business artifact with:
- document class/business number/revision;
- exact source object versions;
- template/version/locale;
- exact attachment/annexure membership;
- render inputs/content hash;
- issuer/time;
- supersession relation.

## Controls

- issued artifacts are immutable;
- replacing an attachment creates a new version/reference where business meaning changes;
- structured extracted values cite the exact SourceDocumentVersion/location where available;
- access follows tenant/project/business-object authorization;
- object-store location never becomes business identity;
- deletion/retention policy cannot silently erase load-bearing commercial history.

## User surfaces

Contextual attachments/documents panels, document preview/download, version history, issued-document register and exact source links from comparison/AI extraction.

## Acceptance

A buyer uploads a supplier quotation PDF, later receives Rev 02, compares both versions, issues an RFQ with six exact annexures, issues an addendum that replaces one drawing, and can later reproduce exactly which files belonged to each issued version and which quotation page/value supported a comparison entry.