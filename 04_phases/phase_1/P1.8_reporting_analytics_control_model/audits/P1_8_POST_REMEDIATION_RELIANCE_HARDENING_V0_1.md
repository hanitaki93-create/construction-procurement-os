# P1.8 — Post-Remediation Subsequent-Reliance Hardening v0.1

**Date:** 2026-08-01  
**Status:** CONTROLLING HARDENING FOR INTERNAL RECHECK  
**P1.8:** ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED

---

# 1. Problem

A ReportSnapshot/ArtifactVersion may have been permitted and issued for a declared use at time T1.

At a later time T2:

- source access may be revoked;
- evidence/reconstruction level may degrade;
- connector/provider conformance may fail;
- a metric/report definition may be deprecated;
- a security/legal/disclosure policy may change;
- a restatement/supersession notice may exist;
- current decision authority may differ.

The immutable issue-time assessment cannot be reused automatically as current permission or current fitness for reliance.

---

# 2. Distinct assessments

## 2.1 `IssueTimeReportUseAssessment`

Immutable assessment performed for the original ReportExecution/ReportSnapshot/issue.

It binds:

- ReportDecisionUseProfile/version then governing;
- exact member results and quality vectors at issue;
- issue-time access/disclosure/evidence/reconstruction state;
- issue-time policy/configuration;
- audience/context;
- permitted/limited/blocked disposition;
- issue eligibility.

It remains historical evidence of why issue was permitted or blocked at that time.

## 2.2 `SubsequentRelianceAssessment`

A new assessment required when an existing ReportSnapshot/ArtifactVersion is proposed for a new load-bearing reliance, decision, approval, external issue or audit use after its original issue.

It binds:

- existing snapshot/artifact identity;
- original IssueTimeReportUseAssessment;
- current relying principal/tenant/project/ContractingAuthorityContext;
- current intended DecisionUseProfile/version;
- current access/security/legal/disclosure/residency policy;
- current restatement/supersession/withdrawal state;
- current reconstruction/evidence/conformance limitation;
- current definition support/deprecation state;
- whether source/current truth has materially diverged;
- required notices/limitations;
- disposition:
  - `RELIANCE_PERMITTED`;
  - `RELIANCE_PERMITTED_WITH_LIMITATIONS`;
  - `RELIANCE_BLOCKED`.

---

# 3. Historical versus current meaning

A later blocked reliance:

- does not mutate the snapshot;
- does not retroactively make the original issue unauthorized;
- does not change values or quality recorded at issue;
- does not reverse decisions made historically;
- may require owning-domain review/correction for a new consequence.

A prior permitted issue:

- does not grant perpetual access;
- does not grant permission for a different decision use;
- does not override current source restrictions or security policy;
- does not prove the snapshot remains the latest/restated position;
- does not permit reliance after withdrawal/supersession without assessment.

---

# 4. Reliance triggers

A SubsequentRelianceAssessment is required at minimum when:

- an old report is cited in a new approval/AwardDecision/Commitment/certification/payment process;
- an old report is reissued to a new audience;
- an old export is used for external contractual/audit submission;
- current reconstruction level is lower than at issue;
- a restatement/supersession/withdrawal exists;
- access or disclosure policy changed;
- metric/report definition is deprecated/retired;
- connector/evidence conformance changed;
- the requested use differs from the original use profile;
- current authority/security requires revalidation.

Simple historical viewing may use ordinary access checks without a new load-bearing reliance assessment where policy permits.

---

# 5. Current-truth divergence

A historical snapshot may remain authentic while differing from current/restated truth.

Subsequent reliance must state:

- historical issued value;
- current/restated value if authorized and relevant;
- divergence/correction/restatement lineage;
- whether the intended decision requires historical or current perspective;
- reconstruction limitations.

No current value silently replaces the snapshot, and no old snapshot silently substitutes for current truth.

---

# 6. Chat/agent boundary

When a user or agent cites an old report for a new action:

- treat the report as historical evidence/context;
- run current authority and SubsequentRelianceAssessment;
- disclose supersession/restatement/quality changes;
- do not execute a command from the old report’s issue-time permission;
- route any action through current P1.7 bounded command guards.

Session memory or possession of the artifact is not current authority.

---

# 7. Hostile scenarios

1. report issued validly, user later loses project access;
2. report issued before evidence disposal;
3. reconstruction level later degrades;
4. report later restated;
5. old report cited for new award approval;
6. report issued for monitoring, reused for approval;
7. report issued internally, forwarded externally;
8. metric definition retired;
9. provider conformance fails;
10. legal disclosure policy changes;
11. original decision remains historically valid;
12. current decision requires newer position;
13. chat recalls old value;
14. agent tries to act using old approval pack;
15. artifact possession used as access claim.

---

# 8. Disposition

This hardening closes the temporal reliance gap without reopening P1.4–P1.7 or creating report authority.

It must be included in the internal recheck and Claude packet.
