# P1.5 — Transaction Transition Supplement v0.1

**Date:** 2026-07-31  
**Status:** CANDIDATE COMPLETENESS SUPPLEMENT / EXTERNAL RECHECK REQUIRED  
**Register:** `P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md`  
**Purpose:** supply full nine-field semantic transition contracts for load-bearing members added or materially sharpened after the original P01–P12 lifecycle matrix.

All commands inherit current tenant/principal security, bound policy/config where applicable, domain revalidation, evidence/provenance and audit requirements.

| TX | Source state/context | Command/action | Guards/invariants | Authority/control | Result event/state | Economic effect | Correction/reversal | Concurrency/idempotency | Evidence/config/version |
|---|---|---|---|---|---|---|---|---|---|
| TX-022 Direct source | proposed/revised DirectSourceDecisionBasis | `MakeDirectSourceAwardDecisionEffective` | valid requirement/allocation; supplier context/eligibility; supplier contractable basis; supported direct-source reason; required DOA/exception approvals | P06 domain command + P09 control | ordinary `AwardDecision` with direct-source route provenance | `NONE` | withdraw/supersede before conflicting Commitment; later correction through governed award path | stable logical decision id; expected basis/version; single effective award effect | source quote/basis, justification, approvals, eligibility/compliance versions |
| TX-026 Economic component mapping | Commitment/profile effective; source identities available | `DefineEconomicComponentMapping` / governed split/merge/reclassify | supported profile; no conflicting recognition lineage; prior contribution preserved; mapping does not reset cumulative value | P07 domain authority | stable EconomicComponentKey mapping/version/lineage | `CLASSIFICATION`; no new value merely from mapping | superseding mapping or explicit reclassification preserving old lineage; never delete prior contribution | stable mapping id; expected Commitment/profile version; atomic mapping across affected identities | source component identities, reason, authority, profile/version, predecessor mapping |
| TX-040 Invoice/match | immutable supplier invoice evidence captured | `EvaluateInvoiceMatch` | current source invoice revision; applicable Commitment/profile; relevant receipt/certification refs; authority/freshness sufficient | P07/P08 bounded match service | `InvoiceMatchResult` matched or typed exception | `NONE` | new invoice/credit-note evidence, receipt/commercial/integration correction, bounded exception acceptance, then reevaluation | match basis hash/id; deterministic reevaluation per source/version; no duplicate resolution effect | invoice revision, Commitment/component, receipt/certificate, tax/mapping profile versions |
| TX-043 External posted/payment/tax fact | external authoritative fact absent/stale/current | ingest/refresh authoritative external fact | configured authority profile; source identity; freshness/conflict rule; mapping valid | external system authoritative; P08 transport/reconciliation only | MIRROR/REFERENCE version + freshness/conflict state | `EXTERNAL_ACCOUNTING`, not P07 effect | external correction creates new authoritative source fact/ref; product does not edit source truth | source event/id/version uniqueness; repeated sync idempotent | external record id/version/effective date/observed time/authority profile |
| TX-047 Procurement milestone plan/forecast/confirm | canonical lineage exists; milestone profile active | record/revise planned/forecast/confirmed milestone | supported milestone type; authorized planner/source; no rewrite of actual event | P10 planning authority or external profile | new milestone planning/confirmation version | `NONE` | supersede planning version; history retained | milestone identity + expected version | anchor lineage, date type, source, profile/version, reason |
| TX-048 Actual milestone | canonical domain event occurs OR authoritative external actual received | derive/record actual milestone | event/source qualifies for milestone type; authority profile clear | owning domain event or external authoritative source; P10 projection | actual milestone projection/fact | `NONE` | source event correction or authoritative external revision; no manual overwrite | source-event identity prevents duplicate actual | source event/ref/version/effective time/observed time |
| TX-053 Authority transfer | one current authoritative source/profile | `CutOverAuthorityProfile` | authorized change; old/new source explicit; conflicts reconciled/dispositioned; in-flight treatment explicit | P1.4 authority-governance control | new authority profile effective from cutover; old profile historical | `NONE` by itself | new governed transfer; never retroactively erase old authority | one effective profile per fact/period; cutover idempotency | old/new authority, effective point, conflict disposition, migration evidence |
| TX-054 Evidence redaction/tombstone/disposition | retained evidence payload + valid basis/status | `RedactOrDisposeEvidencePayload` | action legally/contractually permitted; valid authority; dependent history assessed; minimum provenance rule satisfied | evidence/retained-state authority | payload restricted/disposed + immutable action/tombstone evidence | `NONE`; domain event unchanged | restore only if retained recoverable source and authorized; otherwise new evidence, never fabricate old payload | stable evidence/action id; repeated request returns same disposition result | evidence id/version, authority, basis, time, scope, tombstone relationship |
| TX-055 Post-termination export/minimization/disposition | tenant operationally terminated; retained-state basis exists | `ExecuteRetainedStateAction` | post-termination authority derived from contract/lawful instruction/verified legal basis; former membership/grant insufficient | retained-state disposition authority | export/minimization/disposition record; tenant remains historical scope anchor | `NONE` | new authorized retained-state action only; no operational tenant reactivation implied | action id + retained-state version; export package/version idempotent | contract/legal basis, scope, exported/disposed set, destination boundary where material |
| TX-056 Residency migration | tenant has current declared region + authorized migration plan | `ExecuteResidencyCutover` | source/destination valid; authorized plan; in-flight treatment; retained evidence/config treatment; copy/replica disposition defined | tenant residency governance | new residency region effective + migration evidence | `NONE` | new governed migration; no silent rollback | migration/cutover id; single effective region profile per period | old/new region, effective cutover, affected categories, migration/copy-disposition evidence |

---

# Tax calculation inside certification — TX-033 refinement

Where certification uses an activated product-owned commercial certificate-tax profile:

- `MakeCertificationEffective` calculates `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` only under the bound `MonetaryCalculationPolicy` and tax-purpose profile;
- the resulting commercial certificate tax effect uses the EffectSubject class permitted by the closed dimension/subject matrix;
- statutory tax-point/invoice/credit-note/liability facts are not created by that certificate command;
- if the product-owned certificate tax calculation is not activated, certification emits no product-owned tax effect.

The authority profile is therefore known before the command executes; certification cannot decide ad hoc whether tax is product-owned.

---

# Completeness statement

The original P01–P12 lifecycle matrix plus this supplement, the direct-source/invoice hardening and the Claude round-1 remediation provide the nine-field semantic contract for every current register member.

A future register member must carry the same contract before activation.
