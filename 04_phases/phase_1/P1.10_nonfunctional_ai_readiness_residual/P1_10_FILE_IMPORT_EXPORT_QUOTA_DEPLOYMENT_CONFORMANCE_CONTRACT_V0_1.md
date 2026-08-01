# P1.10 — Files, Imports, Exports, Quotas, Deployment & Conformance Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **Every resource-intensive or externally supplied workload has a declared bound, durable identity and typed overflow/degradation path; deployment or provider changes cannot silently change semantic behavior.**

---

# 2. File classes

Every accepted file binds one class:

- `EVIDENCE_DOCUMENT`;
- `IMAGE_EVIDENCE`;
- `STRUCTURED_IMPORT_FILE`;
- `STRUCTURED_EXPORT_FILE`;
- `ISSUED_REPORT_ARTIFACT`;
- `ARCHIVE_CONTAINER`;
- `EMAIL_MESSAGE_OR_ATTACHMENT`;
- `AI_INPUT_REFERENCE`;
- `UNSUPPORTED_OR_QUARANTINED`.

File class does not prove truth, safety, authenticity or acceptance.

---

# 3. V1 default file limits

Unless a stricter capability/profile applies:

- individual normal evidence file: ≤100 MB synchronous-upload path;
- supported large evidence file: ≤500 MB async path;
- per external submission: ≤100 files and ≤2 GB total;
- per internal evidence capture operation: ≤250 files and ≤5 GB total;
- email-captured message plus attachments: ≤100 MB total per message; larger content requires alternate governed upload;
- image pixel count: ≤100 megapixels after metadata validation;
- PDF page count: ≤5,000;
- spreadsheet: ≤100 worksheets, ≤1,000,000 cells per worksheet and ≤100,000 governed import rows per operation;
- CSV/structured row import: ≤100,000 rows per operation;
- generated single export: ≤1,000,000 rows or 5 GB, whichever occurs first;
- larger scopes use segmented manifests or typed unsupported/limit outcome.

Limits are versioned capability policy, not parser defaults.

---

# 4. Archive/decompression controls

- only registered archive formats;
- no recursive archive beyond depth 2;
- maximum 10,000 entries;
- maximum expanded size 5 GB or 20× compressed size, whichever is lower;
- path traversal, symlink/device/special-file entries prohibited;
- encrypted/password-protected archives require a supported separate policy or are quarantined;
- nested archive and decompression budget enforced before extraction;
- timeout/resource exhaustion yields typed quarantine/unsupported state, never partial clean acceptance.

---

# 5. Malware and untrusted-content pipeline

Pipeline:

`durable untrusted capture → metadata/type validation → isolation/quarantine → malware/content scan → parser-specific validation → capability proposal → explicit acceptance/use`

Rules:

- scan status is versioned with engine/signature/policy identity;
- scan clean does not prove safe business content;
- scan unavailable/timeout remains unscanned/quarantined;
- external content never executes macros/scripts/embedded code in trusted context;
- active content disabled or separately sandboxed;
- parser runs under resource/time/network isolation;
- AI sees external content as untrusted data and cannot obey embedded instructions;
- later threat-intelligence update may trigger rescan/limitation without rewriting historical use/effect automatically.

---

# 6. Supported structured-import semantics

Import profile binds:

- exact capability/schema/version;
- file type/encoding/locale;
- row/member identities;
- required registered semantic fields;
- validation and bounded conversion policies;
- max rows/columns/size;
- duplicate/correction behavior;
- proposal/preview/submit operations;
- partial/bulk policy;
- evidence and source locator;
- result/reconciliation/export manifest.

Unknown columns/values remain evidence or explicit unmapped proposal; they never become load-bearing fields automatically.

---

# 7. Export completeness and integrity

Every export binds:

- export definition/version;
- principal/scope/access;
- exact source cut and populations;
- row/member/file counts;
- included/excluded/restricted categories;
- format/schema/version;
- manifest and per-file checksum;
- pagination/segmentation;
- status: complete, partial known, partial unknown, blocked or failed;
- retry/resume identity;
- retention/expiry and sensitivity.

A size limit cannot silently truncate. Partial export is not complete and cannot be issued as full data package.

---

# 8. Quota classes

Quotas are explicit by tenant/capability/profile:

- concurrent sessions;
- interactive requests;
- commands and async operations;
- external task access/submissions;
- file bytes/count;
- stored evidence;
- structured import rows;
- report/export executions and bytes;
- connector calls/backlog;
- search/index usage;
- AI requests/tokens/cost/storage;
- telemetry/debug capture.

Quotas never change authority, population or truth meaning.

---

# 9. Rate-limit response

Every rate limit returns:

- capability/limit key and version;
- scope and measured usage;
- reset/retry time where safe;
- whether request was accepted;
- continuation/result identity if accepted;
- preserved external attempt time where applicable;
- allowed fallback/escalation;
- no-effect/unknown-effect semantics.

HTTP/status technology is physical; semantic response is mandatory.

No generic retry instruction for possibly accepted effect-bearing work.

---

# 10. Fairness and deadline priority

- per-tenant isolation prevents one tenant exhausting all shared capacity;
- safety-critical continuation/result lookup and external submission attempt capture have reserved capacity;
- deadline-priority cannot bypass authority or validation;
- queued heavy reports/exports/imports yield before command/evidence durability;
- AI is the first capacity class disabled;
- emergency temporary quota increase is versioned, time-bounded, authorized and monitored;
- commercial pricing/tier policy is outside P1.10, but physical limits cannot be hidden.

---

# 11. Deployment profiles

Closed semantic profiles:

- `V1_CORE_DETERMINISTIC` — mandatory A0–A3/manual-file/reporting floor;
- `V1_EMAIL_CORE_CONFORMING` — selected provider-neutral email adapter;
- `V1_SELECTED_CONNECTOR` — one or more evidenced connector profiles;
- `P07_ACTIVE` — commercial core capability active;
- `AI_ASSISTIVE` — read/draft/proposal AI only;
- `AI_COMMAND_PREPARATION` — eligible human-confirmed command preparation;
- `NON_PRODUCTION_SANDBOX` — isolated test/demo with explicit non-authoritative data and no production effect.

No profile can remove mandatory authority/evidence/idempotency/disclosure substrate.

---

# 12. Release and rollout identity

Every deployment/release binds:

- release/build identity and source provenance;
- schema/configuration/operation/metric/field/connector/AI capability versions;
- migration requirements;
- compatibility matrix;
- security/dependency evidence;
- feature/capability activation set;
- rollout population;
- health/rollback gates;
- rollback and data-forward-compatibility rule;
- operator/approval/time.

A deployment may change physical implementation without changing semantic versions only when conformance proves behavior unchanged.

---

# 13. Rollout stages

- development/internal test;
- isolated automated/hostile test;
- non-production tenant-like validation;
- shadow/read-only where applicable;
- limited pilot cohort;
- controlled percentage/tenant rollout;
- general availability;
- retirement/deprecation.

High-risk authority, connector, migration, field/schema, monetary, report-restatement or AI-command changes require limited pilot and explicit rollback evidence.

---

# 14. Rollback and kill switch

- optional connector/AI/search/report/import capability can be disabled without losing core A0–A3;
- rollback cannot mutate already established domain/effect history;
- incompatible forward schema/data requires roll-forward correction rather than unsafe binary rollback;
- in-flight operations retain original version/capability binding;
- kill switch has scope, authority, reason, time, customer/dependency impact and recovery criteria;
- disabling AI cannot strand an authoritative operation because AI never owns it.

---

# 15. Conformance evidence

Every activated implementation/provider binds a versioned conformance profile with:

- supported capabilities/operations/data classes;
- authority and effect criteria;
- limits and failure modes;
- security/privacy/residency posture;
- test suite and last evidence time;
- deviations/limitations;
- current state: conforming, limited, degraded, blocked, deprecated or retired;
- cutover/rollback/reconciliation behavior.

Conformance change affects future/current confidence and eligibility, not historical truth.

---

# 16. Compatibility and migration

- semantic versions and stored facts are backward-interpretable under accepted compatibility policy;
- load-bearing incompatible change requires migration/dual-read/projection-version or explicit block;
- no direct state rewrite to make a release pass;
- migration follows P1.7 manifests/acceptance profiles;
- old clients/templates receive typed stale/incompatible response;
- API/UI/chat use the same capability/version compatibility.

---

# 17. Scope guard

No:

- generic file storage/CDE;
- arbitrary ETL/data-prep platform;
- quota/billing platform;
- generic API gateway product;
- feature-flag/configuration platform;
- deployment orchestrator product;
- supplier data exchange/network;
- AI/model platform;
- product code.
