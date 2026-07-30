# P1.4 — Evidence Lifecycle, Offboarding & Residency Contract v0.2

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / REMEDIATED / EXTERNAL AUDIT PENDING  
**Supersedes:** `P1_4_EVIDENCE_LIFECYCLE_RESIDENCY_CONTRACT_V0_1.md`  
**Remediation:** closes internal-audit BL-03.

---

## 1. Core decision

The OS separates immutable/reconstructable transaction history from mutable access/account/contact/operational data.

Offboarding revokes capability and permits eligible minimization/disposition without rewriting commercial history.

Neither destructive-history deletion nor perpetual retention without basis is an accepted default.

---

## 2. Evidence authority boundary

For product-governed transactions, the OS owns the integrity/provenance of captured transaction evidence such as:
- tender releases/addenda;
- bid/quote submissions/revisions;
- clarifications/confirmations;
- comparison/approval/award evidence;
- P07 commitment/change/receipt/claim/assessment/certification/recovery evidence when those domains are active;
- buyer-on-behalf source evidence;
- bounded external-grant history.

The OS references or narrowly mirrors externally authoritative CDE/ERP/bank/legal/master records.

This remains an evidence substrate, not CDE/records-management scope.

---

## 3. Version/supersession rule

Load-bearing source evidence is not edited in place to change history.

Changes use new source revision, supersession, governed correction, or updated external reference with prior source/version context retained for the applicable retention period.

Supplier source truth, buyer normalization and buyer evaluation adjustment remain distinct.

---

## 4. Bounded lifecycle categories

### A — Governed transaction history/evidence

History-preserving while an applicable retention basis remains active. Access may be revoked independently. Later eligible payload disposition does not reverse the historical domain event.

### B — Mutable account/contact/access data

May be revoked/minimized/deleted when eligible. Historical transaction attribution retains only the principal/role/org/time/provenance necessary to explain governed actions, subject to its own valid basis.

### C — Governing configuration/authority history

Relevant historical versions remain interpretable for the transactions they governed.

### D — External references/mirrors

External authority stays external. A transaction that relied on an external record preserves the minimum source/version/effective/freshness provenance required to explain that reliance.

### E — Derived caches/search/indexes

Disposable/rebuildable; never separate evidence authority.

### F — Secrets/tokens/session material

Revoked/deleted according to security lifecycle and not retained merely for business-history preservation.

---

## 5. Retention-basis contract

Retention uses explicit bounded basis families, potentially including:
- active transaction/contractual dependency;
- customer contract/configured product requirement;
- verified applicable legal/regulatory requirement;
- active dispute/audit dependency with valid customer basis;
- bounded security/audit requirement for access/action history.

P1.4 defines no jurisdiction-specific duration.

No arbitrary tenant-authored records schedule, classification policy language or legal-hold platform is introduced.

---

## 6. Disposition

Evidence payload disposition is permitted only when the applicable basis/dependency permits it and the action is authorized.

A bounded disposition fact may be retained where needed, but that fact must itself follow a valid retention/minimization basis; it is not a loophole for retaining unnecessary personal data forever.

Disposition does not erase the fact that a historical domain event occurred.

---

## 7. Tenant offboarding

Minimum semantic sequence:
1. stop new ordinary tenant operations at the agreed cutoff;
2. revoke active internal/external access;
3. export/return data where contractually supported/required;
4. move still-required transaction/configuration history to non-operational retained state;
5. delete/minimize eligible profile/contact/secret/cache data;
6. retain only data with explicit continuing basis;
7. dispose retained data when basis/dependencies clear.

A retained historical record does not require a live active tenant workspace.

---

## 8. User/contact/supplier offboarding

Removing an internal user or external contact/account revokes future capability without erasing prior governed actions.

Current profile/contact data may be minimized when eligible while stable historical attribution/provenance remains only to the extent justified by its own basis.

Supplier relationship deactivation stops ordinary future use without deleting prior bids/awards/evidence.

---

## 9. Sensitivity/access classification boundary

Classification is bounded recorded metadata with provenance.

Fixed deterministic product checks may consume it.

It does not create:
- arbitrary tenant-authored authorization rules;
- arbitrary retention rules;
- redaction engine;
- enterprise information-governance policy language;
- legal hold/eDiscovery;
- CDE/records-management suite.

Retention basis and authorization remain separate explicit concepts.

---

## 10. Declared tenant-data residency scope

V1 adopts a **tenant-level declared primary residency region for the product-hosted tenant/business/evidence data categories included in the product's residency commitment**.

P1.4 freezes the semantic requirement that the residency boundary be explicit and tenant-level by default. It does **not** pre-design every infrastructure replica or NFR data category.

Rules:
- in-scope tenant/business/evidence data has a declared primary residency region;
- legal entities/projects inside one tenant do not independently choose arbitrary regions by default;
- any allowed backup, DR replica, processing path or service copy outside the declared primary region/scope must be explicitly defined by later architecture/contract rather than silently assumed;
- security/operational telemetry, backups, service metadata and other NFR categories are neither silently exempt nor silently forced into the same physical rule by P1.4 — P1.9/NFR work must classify them against the declared residency commitment;
- external authoritative systems remain outside OS residency control and their location must not be misrepresented as product-hosted residency;
- cross-tenant network analytics/global aggregation is not a V1 assumption.

This is a product boundary, **not a claim that UAE/GCC law requires localization in a particular region**.

Any jurisdiction-specific obligation requires current authoritative legal/contractual evidence.

---

## 11. Region migration

A tenant's declared primary residency region may change only through governed migration/cutover.

Minimum semantics:
1. authorized migration;
2. source/destination region;
3. effective cutover/version;
4. in-flight operation assessment;
5. retained evidence/config history treatment;
6. external references remain external;
7. migration evidence retained;
8. source-region copies/replicas handled according to the declared migration/security/retention design rather than left as silent authoritative duplicates.

Physical replication/DR mechanics remain later NFR design.

---

## 12. External-record disappearance/change

A load-bearing transaction relying on an external record preserves enough provenance to explain what it relied on at the time, which may include external ID, version/revision, effective state, observed time and hash where useful.

When the OS itself issues a supplier-facing release, the exact issued transaction basis is product-owned evidence even when upstream master documents came from an external CDE.

The OS does not clone the full external repository.

---

## 13. Rejected directions

Rejected:
- hard-delete tenant commercial history on offboarding;
- keep every tenant datum forever by default;
- classification-driven general retention engine;
- full CDE/records management/legal-hold/eDiscovery;
- claim that the OS controls external-system residency;
- per-project arbitrary residency region in V1;
- hidden cross-region replication inconsistent with the declared product commitment;
- prematurely declaring all backups/telemetry/NFR metadata physically region-local without later architecture classification;
- global cross-tenant supplier/evidence analytics by default.

---

## 14. Remediation result

**BL-03 CLOSED:** P1.4 now freezes an explicit tenant-level declared residency boundary without prematurely deciding backup/DR/telemetry physical architecture or making a UAE/GCC localization claim.

Immutable evidence/offboarding/retention/classification decisions remain coherent.

**CANDIDATE PASS / EXTERNAL AUDIT PENDING.**