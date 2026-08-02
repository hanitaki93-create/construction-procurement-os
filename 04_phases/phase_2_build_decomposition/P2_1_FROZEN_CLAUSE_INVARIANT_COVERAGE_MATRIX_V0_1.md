# P2.1 — Frozen-Clause to Invariant Coverage Matrix v0.1

**Date:** 2026-08-02  
**Status:** 92/92 COMPLETE CANDIDATE / INTERNAL AUDIT PENDING  
**Source:** Phase 1 frozen master package and corrected MR-001–MR-092 disposition set  
**Register:** `P2_1_INVARIANT_REGISTER_V0_1.md`

---

# 1. Completeness rule

Every frozen MR row receives exactly one of these dispositions:

- one or more controlling `INV-*` entries;
- `HYPOTHESIS_ONLY` with mandatory external-validation owner;
- `LEGAL_PARAMETER` with legal evidence owner and no invented value;
- `ACCESSIBILITY_TARGET` with physical proof owner;
- `CONTROL_REQUIREMENT` with build/traceability enforcement.

An empty or implied mapping is a freeze failure.

Detailed phase-frozen clauses that refine an MR row remain inherited in full. The clause-level supplement in §3 registers known load-bearing sub-invariants that are more specific than the MR wording.

---

# 2. MR-001–MR-092 coverage

| MR | Coverage disposition | Owning block / proof |
|---|---|---|
| MR-001 | `HYPOTHESIS_ONLY` — UAE contractor beachhead requires field evidence | B15 / V1 |
| MR-002 | INV-001 | B01/B15 no-optional-dependency suite |
| MR-003 | INV-002 | B15/B16 sole-XL scan |
| MR-004 | INV-003 | B05–B09 ownership tests |
| MR-005 | `CONTROL_REQUIREMENT` — requirement/ADR/clause/test traceability | B01 manifests + every block + B15 |
| MR-006 | INV-004 | project-state/authorization gate |
| MR-007 | INV-005 | B02 context/RLS/operation proof |
| MR-008 | INV-006 | B02/B06/B11 authority substitution tests |
| MR-009 | INV-007, INV-008 | B02 one-writer/effective-range exclusion |
| MR-010 | INV-009 | B02/B04/B12/B13/B18 no-authority paths |
| MR-011 | INV-010, INV-011 | B02/B14/B18 version/effective-range proof |
| MR-012 | INV-012 | B02 governed bootstrap |
| MR-013 | INV-013 | B02/B12/B14/B18 isolation proof |
| MR-014 | INV-014, INV-086 | B14 residency/copy inventory |
| MR-015 | INV-015, INV-016, INV-017 | B05 allocation conservation |
| MR-016 | INV-018 | B07/B08 layer non-substitution |
| MR-017 | INV-019 | B09/B16 transition separation |
| MR-018 | INV-020 | B16 one Commitment core |
| MR-019 | INV-021 | B16 orthogonal axes |
| MR-020 | INV-023, INV-024 | B16/B17 conservation/effect algebra |
| MR-021 | INV-022 | B16/B17 effect subject constraint |
| MR-022 | INV-025 | B01/B08/B12/B16/B17 exact-decimal proof |
| MR-023 | INV-026 | B17/B13 fact-family separation |
| MR-024 | INV-027 | B12/B17 actual-family compatibility |
| MR-025 | INV-028 | B03/B08/B17 append-only correction |
| MR-026 | INV-029 | B02/B09/B16 workflow non-authority |
| MR-027 | INV-030, INV-031 | B02 numbering identity/concurrency |
| MR-028 | `LEGAL_PARAMETER` — exact GCC/statutory values require accepted evidence | B16/legal profile before assertion |
| MR-029 | INV-032 | B16 visible attribution/suspense |
| MR-030 | INV-035 | B04 and all domain operations |
| MR-031 | INV-036, INV-045 | B04 identity/payload/restore proof |
| MR-032 | INV-037 | B04/B12 issued immutability |
| MR-033 | INV-038 | B04/B13 communication fact separation |
| MR-034 | INV-039, INV-040 | B04 canonical snapshot/effect once |
| MR-035 | INV-041 | B04/owning-domain correction path |
| MR-036 | INV-042, INV-045 | B04/B14 lifecycle/restore |
| MR-037 | INV-043 | B04/B13/B18 untrusted-content boundary |
| MR-038 | INV-046 | B02 closed operation classes |
| MR-039 | INV-047 | B02/B08/B18 proposal non-authority |
| MR-040 | INV-048 | B02+ operation/write manifest |
| MR-041 | INV-049 | B03/B13 record-type separation |
| MR-042 | INV-050 | B03/B13 immutable publication intent |
| MR-043 | INV-051 | B03 seven-stage effect machine |
| MR-044 | INV-052, INV-053 | B03/B13 indeterminacy/no-retry |
| MR-045 | INV-054 | B13 connector non-co-master |
| MR-046 | INV-055 | B13 migration no-fabrication |
| MR-047 | INV-056 | B06–B15 manual/provider-neutral floor |
| MR-048 | INV-057, INV-069 | B12 definition/source-cut binding |
| MR-049 | INV-058 | B12 product operator registry |
| MR-050 | INV-059, INV-023 | B12/B17 contribution identity/conservation |
| MR-051 | INV-060, INV-061 | B12 population/complete-zero proof |
| MR-052 | INV-062 | B12 block/subset/range closed outcome |
| MR-053 | INV-063 | B12 temporal/actual compatibility |
| MR-054 | INV-064 | B12 quality/use monotonicity |
| MR-055 | INV-065 | B12 immutable report history |
| MR-056 | INV-066 | B12 subsequent reliance |
| MR-057 | INV-067 | B12 aggregate conservation/comparability |
| MR-058 | INV-068 | B12 tenant-private derived analytics |
| MR-059 | INV-070 | B10/B11 interaction-class enforcement |
| MR-060 | INV-071 | B02/B10/B11 preview/confirmation binding |
| MR-061 | INV-072 | B02/B10/B11 pre-transmission continuation |
| MR-062 | INV-073 | B02/B10/B11 bulk mode contract |
| MR-063 | INV-074 | B10/B12 derived navigation/queue |
| MR-064 | INV-075 + `HYPOTHESIS_ONLY` adoption evidence | B11 implementation; B15/V1 validation |
| MR-065 | INV-076, INV-077 | B06/B07/B11/B12 response admission |
| MR-066 | INV-078 | B06/B08 product-owned field semantics |
| MR-067 | INV-079 | B08 explicit normalization acceptance |
| MR-068 | INV-080 | B10/B11/B12 disclosure parity |
| MR-069 | `ACCESSIBILITY_TARGET` — WCAG/mobile/Arabic/RTL physical proof | B10/B11/B14 |
| MR-070 | INV-081 | B10/B11/B18 conventional equivalent |
| MR-071 | INV-082 | B14 measurable NFR registry |
| MR-072 | INV-082 | B14 workload/percentile envelope |
| MR-073 | INV-083 | B02–B04/B14 semantic RPO0 |
| MR-074 | INV-084 | B03/B04/B14 restore/degradation |
| MR-075 | INV-085 | B01/B14 telemetry non-authority/privacy |
| MR-076 | INV-086 | B14/B18 all-copy lifecycle/isolation |
| MR-077 | INV-087 | B04/B13/B14 finite resource semantics |
| MR-078 | INV-088 | B14 release/in-flight compatibility |
| MR-079 | INV-089 | B18 product-owned AI registry |
| MR-080 | INV-090 | B18 monotonic tenant configuration |
| MR-081 | INV-091 | B18 exact AI provenance |
| MR-082 | INV-092 | B18 context completeness grammar |
| MR-083 | INV-093 | B18 current SUFFICIENT_PASS activation |
| MR-084 | INV-094 | B18 L0–L6 authority ceiling |
| MR-085 | INV-095 | B18 intersection-only/pause |
| MR-086 | INV-096 | B14/B18 AI tenant/provider isolation |
| MR-087 | INV-097 | B15/B18 AI-off completeness |
| MR-088 | INV-098 | B15 ordered gate graph |
| MR-089 | INV-099 | B15/V1 sample and independent decision |
| MR-090 | INV-100 | B15/V2 comprehension gate |
| MR-091 | INV-101 | B15 zero-invention thin-slice gate |
| MR-092 | INV-102 | B15 validation-status non-substitution |

---

# 3. Clause-level supplement

The following frozen clauses are more specific than the corresponding MR summary and therefore receive explicit register entries:

| Frozen clause family | Register entry | Source / owner |
|---|---|---|
| Minimum/residual credit equals min(qualifying, residual) with no carry-forward | INV-033 | P1.5 BL-17 / B16–B17 |
| One active exclusive normalized scope / no overlap | INV-034 | P1.5 Review A BL-02 / owning module |
| Evidence capture state never implies evidence acceptance | INV-044 | P1.6 / B04 |
| Cross-store accepted/issued reference must resolve or expose deficiency | INV-045 | P1.6/P1.10 / B04/B14 |
| Effect-indeterminate worker lease cannot ordinary-retry | INV-053 | P1.7 / B03 |
| Exact reproducible report source cut | INV-069 | P1.8 / B12 |
| Effective-period one-writer/configuration/profile non-overlap | INV-008/INV-011 | P1.4 and cross-phase version contracts / B02+ |
| Communication satisfaction canonicalization/effect once | INV-039/INV-040 | P1.6 / B04 |
| Guard row must exist before lock | register §3.1 | Claude W-112 / B01/B02/owning blocks |
| One global guard acquisition order | register §3.2 | Claude W-113 / B01/B02 |

---

# 4. Reverse-completeness compiler

Freeze/build CI must load:

1. the frozen MR/phase-clause source manifest;
2. this coverage matrix;
3. `InvariantRegisterVersion`;
4. `PhysicalWriteOwnershipManifest`;
5. `OperationRegistry` and `ConcurrencyProfileVersion`;
6. every block completion manifest.

It fails when:

- a frozen source row has no coverage disposition;
- a registered invariant has no owner/mechanism/test;
- a participating mutable object or operation omits the invariant reverse reference;
- a mutable effective-dated object lacks overlap disposition;
- a block reports a newly encountered invariant without register reconciliation;
- a builder attempts to classify a semantic invariant as an implementation detail.

---

# 5. Matrix result

- MR rows mapped: **92/92**;
- rows without disposition: **0**;
- clause-level supplements registered: **10 families**;
- legal/hypothesis/accessibility/control rows with explicit owners: **all**;
- concurrency-sensitive register entries without enforcement obligation: **0 claimed**;
- new architecture gaps: **0 claimed**, subject to hostile audit.