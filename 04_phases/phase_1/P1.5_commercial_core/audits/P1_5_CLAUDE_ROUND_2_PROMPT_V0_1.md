# P1.5 — Claude Round-2 Audit Instructions v0.1

**Date:** 2026-07-31  
**Status:** READY FOR EXTERNAL RECHECK  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

Claude round 1 returned FAIL on three blockers:

- BL-14 certificate-tax authority profile;
- BL-15 non-component CommercialEffectVector conservation grain;
- BL-16 lifecycle completeness without a named closed transaction register.

Current canonical remediation artifacts:

- `P1_5_CLAUDE_ROUND1_REMEDIATION_V0_1.md`
- `P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md`
- `P1_5_TRANSACTION_TRANSITION_SUPPLEMENT_V0_1.md`
- `P1_5_INTEGRATED_CORE_CANDIDATE_V0_3.md`
- `audits/P1_5_INTERNAL_RECHECK_AFTER_CLAUDE_R1_V0_1.md`

Internal recheck result: PASS; all three Claude blockers closed internally; no ADR status changed; P1.6 remains locked.

External review must independently test:

1. tax fact authority: product commercial certificate tax versus external statutory tax facts;
2. exact two-class EffectSubject model: COMPONENT(EconomicComponentKey) or OBLIGATION(ObligationEffectKey), with closed dimension/subject rules;
3. conservation across component/obligation lineages, minimum over-credit, advance versus gross certification and governed component mapping;
4. closed TX-001..TX-056 transaction membership and full nine-field transition contract;
5. prospective admission rule for future load-bearing transactions/capability profiles;
6. regression against P1.1–P1.4, one-XL and A0–A3 constraints;
7. ADR impact and P1.6 readiness.

Claude does not have repository access. The actual review input is the self-contained round-2 packet delivered alongside these repo artifacts.

Required final verdict:

`PASS — P1.5 Commercial Core can close; proceed to final ADR reconciliation/checkpoint and unlock P1.6.`

or

`FAIL — P1.5 remains open; blockers below must be remediated.`
