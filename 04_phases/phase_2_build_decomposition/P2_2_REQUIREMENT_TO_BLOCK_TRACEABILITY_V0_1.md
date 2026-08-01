# P2.2 — Requirement-to-Build-Block Traceability v0.1

**Date:** 2026-08-02  
**Status:** COMPLETE CANDIDATE / INTERNAL AUDIT PENDING  
**Requirements:** MR-001–MR-092  
**Blocks:** B01–B18

---

# 1. Rule

`Primary block` owns implementation and completion evidence. `Supporting blocks` provide dependencies, UI/export proof, hardening or later optional extensions.

No requirement is satisfied merely because a block mentions it. The named block gate must include executable acceptance evidence.

---

| MR | Primary block | Supporting blocks / gate |
|---|---|---|
| MR-001 | B15 | V1 external evidence |
| MR-002 | B09 | B10–B15 deterministic proof |
| MR-003 | B15 | B16–B17 remain V4-gated |
| MR-004 | B05 | B06–B10 regression |
| MR-005 | B01 | all block manifests + B15 |
| MR-006 | B01 | project-state authorization gate |
| MR-007 | B02 | all later blocks inherit context |
| MR-008 | B02 | B06/B11 external grants |
| MR-009 | B02 | module ownership manifests all blocks |
| MR-010 | B02 | B03/B04/B12/B13/B18 regression |
| MR-011 | B02 | B14 release compatibility |
| MR-012 | B02 | bootstrap operations |
| MR-013 | B02 | B14/B18 isolation proof |
| MR-014 | B14 | B02 residency context |
| MR-015 | B05 | B06–B09 |
| MR-016 | B08 | B07 source truth |
| MR-017 | B09 | B16 confirms Commitment separation |
| MR-018 | B16 | V4 gate |
| MR-019 | B16 | B17 regression |
| MR-020 | B16 | B17 property/conservation tests |
| MR-021 | B16 | B17 |
| MR-022 | B08 | B02 numeric kernel; B16/B17 P07 |
| MR-023 | B17 | B13 accounting seam |
| MR-024 | B12 | B17 P07 actuals |
| MR-025 | B03 | B08/B17 domain correction tests |
| MR-026 | B09 | B02 operation kernel |
| MR-027 | B02 | B06/B16 numbering profiles |
| MR-028 | B16 | ADR-0010 legal gate before assertion |
| MR-029 | B16 | ADR-0011 non-SPINE detail |
| MR-030 | B04 | all domain blocks evidence binding |
| MR-031 | B04 | B14 restore proof |
| MR-032 | B04 | B12 issued reports |
| MR-033 | B04 | B13 provider observations |
| MR-034 | B04 | B03 effect kernel |
| MR-035 | B04 | B17 correction regression |
| MR-036 | B14 | B04 lifecycle implementation |
| MR-037 | B04 | B13/B18 hostile content tests |
| MR-038 | B02 | all blocks |
| MR-039 | B02 | B08/B18 proposals |
| MR-040 | B02 | ownership tests all blocks |
| MR-041 | B03 | B04/B13 |
| MR-042 | B03 | B13 adapters |
| MR-043 | B03 | all external-effect blocks |
| MR-044 | B03 | B13 |
| MR-045 | B13 | B03 substrate |
| MR-046 | B13 | B04 evidence limitations |
| MR-047 | B13 | B06/B11/B15 no-provider proof |
| MR-048 | B12 | B17 P07 metrics |
| MR-049 | B12 | product registry in B02 |
| MR-050 | B12 | B17 correction contributions |
| MR-051 | B12 | B07/B08 population sources |
| MR-052 | B12 | B10/B11 disclosure |
| MR-053 | B12 | B17 P07 time/actuals |
| MR-054 | B12 | B10 presentation |
| MR-055 | B12 | B04 artifacts; B17 P07 |
| MR-056 | B12 | B10/B11 disclosure |
| MR-057 | B12 | B14 load/access proof |
| MR-058 | B12 | B02 tenant isolation |
| MR-059 | B10 | B11 external interactions |
| MR-060 | B02 | B10/B11 browser proof |
| MR-061 | B10 | B02 continuation; B11 external proof |
| MR-062 | B02 | B10/B11 UI proof |
| MR-063 | B10 | B12 control queues |
| MR-064 | B11 | B15 external validation |
| MR-065 | B07 | B11 receipt/task UI |
| MR-066 | B08 | B07 structured source |
| MR-067 | B08 | B04 provenance |
| MR-068 | B12 | B10/B11/exports |
| MR-069 | B10 | B11/B14/B15 physical validation |
| MR-070 | B10 | B11 and B18 AI-off |
| MR-071 | B14 | instrumentation begins B01 |
| MR-072 | B14 | B03 queue load; B12 reports |
| MR-073 | B14 | B02/B03 transaction proof |
| MR-074 | B14 | B03 async recovery |
| MR-075 | B14 | OTel bootstrap B01 |
| MR-076 | B14 | B04/B18 copies/provider paths |
| MR-077 | B14 | B04 file pipeline |
| MR-078 | B14 | all in-flight/versioned blocks |
| MR-079 | B18 | metadata seams prepared B02 |
| MR-080 | B18 | B14 runtime proof |
| MR-081 | B18 | B04 source/evidence lineage |
| MR-082 | B18 | B12 population/disclosure grammar |
| MR-083 | B18 | B15 evaluation infrastructure |
| MR-084 | B18 | B02 command/confirmation kernel |
| MR-085 | B18 | B03 effect-indeterminate kernel |
| MR-086 | B18 | B14 tenant/provider isolation proof |
| MR-087 | B15 | B18 removal/disable test |
| MR-088 | B15 | project-state gates |
| MR-089 | B15 | V1 ValidationGateDecision |
| MR-090 | B15 | V2 prototype comprehension |
| MR-091 | B15 | B01–B14 block evidence |
| MR-092 | B15 | release/reporting honesty |

---

# 2. Block coverage counts

Primary ownership:

- B01: MR-005, MR-006
- B02: MR-007–MR-013, MR-027, MR-038–MR-040, MR-060, MR-062
- B03: MR-025, MR-041–MR-044
- B04: MR-030–MR-035, MR-037
- B05: MR-004, MR-015
- B06: no standalone MR primary; implements required sourcing portion of MR-002/MR-047 and supplies B07–B09
- B07: MR-065
- B08: MR-016, MR-022, MR-066, MR-067
- B09: MR-002, MR-017, MR-026
- B10: MR-059, MR-061, MR-063, MR-069, MR-070
- B11: MR-064
- B12: MR-024, MR-048–MR-058, MR-068
- B13: MR-045–MR-047
- B14: MR-014, MR-036, MR-071–MR-078
- B15: MR-001, MR-003, MR-087–MR-092
- B16: MR-018–MR-021, MR-028, MR-029
- B17: MR-023
- B18: MR-079–MR-086

B06 has no single exclusive MR because sourcing lifecycle requirements are composed across MR-002, MR-030–MR-035, MR-047, MR-064–MR-067 and the frozen golden threads. Its block contract remains mandatory and cannot be merged away.

---

# 3. Disposition coverage

- 66 FULLY_TRACED requirements have implementation blocks.
- 19 PHYSICAL_PROOF_REQUIRED requirements have explicit proof blocks, predominantly B10–B15/B18.
- 5 EXTERNAL_VALIDATION_REQUIRED requirements are owned by B11/B15 and remain authorization gates rather than assumed truth.
- MR-028 remains legal evidence debt assigned to the gated P07/legal profile.
- MR-029 remains the named non-SPINE detail inside B16.
- 0 requirements are unmapped.

---

# 4. Golden-thread block coverage

| Golden-thread family | Main blocks |
|---|---|
| GT-01 ordinary material | B05–B10/B12/B15 |
| GT-02 subcontract tender | B05–B12/B15 |
| GT-03 imported/long-lead | B05–B09/B12/B13 |
| GT-04 addendum/revision | B06–B08/B10/B11 |
| GT-05 reject/re-tender | B06/B09/B10 |
| GT-06 AwardDecision/manual handoff/P07 off | B09/B10/B13/B15 |
| GT-07/08 commercial/P07 | B16–B17 |
| GT-09 compliance expiry | B04/B06/B12 |
| GT-10 communication effect | B03/B04/B13 |
| GT-11 migration | B04/B13/B14 |
| GT-12 connector indeterminacy | B03/B13/B14 |
| GT-13 correction/restatement | B12/B16/B17 |
| GT-14 security release | B16/B17 |
| GT-15 report reliance | B12 |
| GT-16 partial/restricted metric | B12/B10/B11 |
| GT-17 buyer capture | B04/B07/B11 |
| GT-18 untrusted import | B04/B07/B08/B13 |
| GT-19 outage/restore | B03/B04/B14 |
| GT-20 AI incomplete context/off | B12/B15/B18 |

---

# 5. Traceability result

- requirements mapped: 92/92;
- requirements without primary block: 0;
- physical-proof rows without proof block: 0;
- external-validation rows without decision gate: 0;
- Phase 1 architecture gaps introduced: 0 claimed, subject to hostile audit.