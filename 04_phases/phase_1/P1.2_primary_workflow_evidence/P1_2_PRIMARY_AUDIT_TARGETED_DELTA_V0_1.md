# P1.2 — Targeted Primary-Audit Delta v0.1

**Status:** ACTIVE / COMPLEMENTS `P1_2_EXTERNAL_CASE_INTAKE_V0_1.md`  
**Purpose:** focus independent evidence collection on the P01–P12 seams most capable of falsifying the provisional model, without leading participants with our architecture vocabulary.

## 1. Relationship to existing intake

The existing intake remains authoritative for:
- case eligibility;
- sampling;
- blind workflow reconstruction;
- artifact request;
- truth-location test;
- unmatched observation prompt;
- real bid-leveling requirement.

This artifact adds only a **risk-weighted challenge layer** after the P01–P12 provisional map.

Do not show participants this matrix or the internal object names before raw capture.

## 2. Highest-value falsification targets

### T01 — What actually limits duplicate procurement?

Blind evidence goal:
- determine what prevents the same requirement from being tendered/awarded twice;
- determine whether remaining/unprocured scope is quantity-based, line-based, package-based, budget-based or mostly manual.

Evidence that would challenge the model:
- no stable requirement identity before award;
- duplicate-control exists only at PO/accounting level;
- package-led procurement never reconciles to later requisitions;
- scope is routinely intentionally duplicated/shared without explicit partitioning.

Maps to:
- S01/S02/S09;
- B5/B6;
- ADR-0003/0023.

### T02 — What makes a PO/subcontract “real” internally?

Blind evidence goal:
- identify the exact business event/document/status that creates commercial obligation;
- distinguish approval, issuance, signature, acknowledgment, ERP posting and legal formation.

Evidence that would challenge the model:
- award approval itself is universally treated as commitment;
- accounting posting is the only accepted commitment truth;
- issued PO and signed subcontract have fundamentally incompatible formation semantics that cannot share even a semantic commitment baseline.

Maps to:
- S08;
- ADR-0004/0005/0018.

### T03 — Can current contract value be reconstructed from history?

Blind evidence goal:
- observe original value, approved changes, pending changes and current value;
- determine whether amendments overwrite or append.

Evidence that would challenge the model:
- normal practice requires destructive restatement with no useful change lineage;
- current approved value includes categories other than original + effective approved changes that our model cannot represent;
- accounting and commercial teams use incompatible definitions of “current commitment”.

Maps to:
- S10/S11/S15/S22;
- ADR-0015/0005.

### T04 — How does real subcontract certification handle unapproved/pending change?

Blind evidence goal:
- capture claim, assessment, certification and payment behavior when work has progressed but VO/change approval is incomplete.

Evidence that would challenge the model:
- certified earned value routinely includes pending work under a separate contractual mechanism not represented by approved baseline/change logic;
- provisional sums/re-measurement/revaluation create legitimate certification states outside current candidate ceiling;
- retention/advance practice contradicts the proposed earned/payable separation.

Maps to:
- S13/S14;
- ADR-0015/0018.

### T05 — Where is the accounting/commercial boundary in practice?

Blind evidence goal:
- ask who owns commitment value, invoiced value, paid value, retention, advance, cost code and posted changes;
- identify synchronization failures and reconciliations.

Evidence that would challenge the model:
- contractor expects procurement system to own full AP/payment ledger;
- ERP cannot coexist without deep two-way posting before procurement is usable;
- important commercial truth exists only in accounting and cannot be reconstructed from procurement events;
- authority changes dynamically in a way OWN/MIRROR/REFERENCE cannot represent.

Maps to:
- S15/S16/C04;
- ADR-0005/0021.

### T06 — How does long-lead procurement begin before formal requisition?

Blind evidence goal:
- capture real elevator/AC/façade/switchgear/etc. package before detailed MR;
- identify the planning artifact, authorization and later reconciliation.

Evidence that would challenge the model:
- early procurement has no identifiable authorized basis until PO;
- planning and requisition are independent with no reconciliation;
- long-lead tracking requires a distinct persistent lifecycle that cannot be represented by current planning/allocation/package/milestone relationships.

Maps to:
- S02/S19;
- ADR-0007.

### T07 — Where does technical approval actually gate procurement?

Blind evidence goal:
- identify submission/consultant/client approval timing relative to tender, recommendation, PO, manufacturing, delivery and payment.

Evidence that would challenge the model:
- technical approval is inseparable from the tender/contract commercial object rather than an external dependency;
- full submittal lifecycle ownership is operationally mandatory for procurement control;
- approval revision lineage cannot be represented by reference/interface semantics.

Maps to:
- S20;
- P12 boundary.

### T08 — What does “closeout” really mean?

Blind evidence goal:
- trace final account, final delivery/certification, retention, guarantees, warranty/DLP, invoices and payment.

Evidence that would challenge the model:
- contractor uses a single close state with no operational value in separating obligations;
- security/warranty obligations require a separate transactional system rather than tracked conditions/evidence;
- termination/substitution creates a missing core lifecycle.

Maps to:
- S21;
- P11 boundary.

### T09 — How are already-approved mistakes corrected?

Blind evidence goal:
- obtain one real case where wrong price, quantity, cost code, certificate, GRN or change was discovered after approval/posting.

Evidence that would challenge the model:
- routine correction is destructive overwrite with no reversible evidence and this is accepted operationally;
- accounting closed-period rules require a correction pattern incompatible with event/reversal lineage;
- procurement and accounting corrections cannot remain linked.

Maps to:
- S22/S24/S25;
- ADR-0015/0019/0023.

## 3. Artifact priority after the provisional map

Beyond the already-required bid-leveling artifact, the most discriminating artifacts are now:

### Tier A — structural falsification

1. real PO/subcontract approval + issue/signature chain;
2. original commitment + one approved variation/amendment;
3. subcontract progress claim/certification with retention/advance where possible;
4. long-lead procurement schedule/package initiated before MR;
5. ERP/accounting reconciliation evidence or screenshot/export showing authority conflict.

### Tier B — interface falsification

6. partial GRN with rejection/return and matching invoice context;
7. consultant/material submittal approval chain tied to procurement action;
8. retention/bond/warranty closeout evidence;
9. correction/reversal/void/counter-document for a prior approved transaction.

### Tier C — useful context

10. vendor prequalification/eligibility records;
11. tender addendum and bid revision chain;
12. approval/DOA matrix;
13. procurement schedule/status tracker.

## 4. Evidence scoring for architecture decisions

For each seam, classify resulting evidence:

- `PRIMARY_CORROBORATED` — raw case directly supports candidate invariant;
- `PRIMARY_CONTRADICTED` — raw case materially conflicts;
- `PRIMARY_VARIANT` — different mechanism but representable without structural change;
- `PRIMARY_UNOBSERVED` — case does not exercise the seam;
- `AMBIGUOUS` — participant/artifacts conflict or evidence insufficient.

Do not convert `PRIMARY_VARIANT` to corroboration merely because the current model can be configured to imitate it.

## 5. Contradiction escalation rule

A primary contradiction triggers:

1. preserve raw evidence and terminology;
2. identify exact affected seam(s) in `P1_2_CROSS_PROCESS_CHALLENGE_MATRIX_V0_1.md`;
3. classify revision risk R1/R2/R3;
4. test whether it is organization-specific variant or structural failure using another independent case;
5. update relevant ADR evidence ledger;
6. only then modify provisional model.

One surprising case should not automatically rewrite architecture; repeated or irreconcilable evidence should.

## 6. Sampling refinement

The existing 3–5 case target remains.

To maximize information rather than similarity, seek deliberate contrast:

- one UAE main contractor with mixed PO + subcontract work;
- one procurement-heavy specialist contractor;
- one organization with strong ERP/job-cost integration;
- one package/long-lead-heavy workflow;
- one subcontract/commercial-administration-heavy case where possible.

The same case may satisfy multiple contrasts.

## 7. Current primary-audit objective

Do not attempt to prove all P01–P12 details.

The next independent cases should answer whether the current **load-bearing seams** survive reality:

`requirement authority`
`→ sourcing/bid truth`
`→ award/commitment formation`
`→ change/receipt/certification`
`→ accounting coexistence`
`→ technical/schedule/closeout dependencies`

If those seams survive materially different contractors, later structural design gains legitimate confidence.

If they fail, change the architecture before build.
