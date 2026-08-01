# P1.10 — Claude Round 2 Watch Closure v1.0

**Date:** 2026-08-01  
**Status:** CLOSED / INCORPORATED INTO P1.10 FREEZE

---

## W-87 — Tenant-authorized source admission

A tenant may add a source only by selecting an activated product-registered `AISourceClassVersion` and satisfying its admission/conformance contract.

Every admitted source binds:

- source-class key/version;
- allowed capability/use;
- authority and evidence class;
- tenant/project/principal scope;
- access, confidentiality, residency and retention;
- file/content type and parser/retrieval controls;
- identity/version/freshness requirements;
- mandatory validation/quarantine;
- context-coverage role;
- limitations and revocation.

Tenant-provided labels, URLs, files or connectors cannot create new source semantics. Unregistered or nonconforming sources remain excluded, quarantined evidence or manual input outside the AI capability. Admission does not make the source authoritative.

## W-88 — Provider/model profile equivalence

Every selectable provider/model profile carries its own:

- exact model/provider/version/region;
- compatibility declaration;
- capability-specific source/tool/output constraints;
- privacy/residency/retention/training posture;
- resource/latency limits;
- current `EvaluationSufficiencyDisposition`;
- adversarial-suite validity;
- activation/expiry/retirement state.

A tenant/provider switch never inherits another profile's evaluation. Only a current `SUFFICIENT_PASS` profile may activate for that capability/effective profile. Otherwise the system abstains, disables or uses manual/deterministic fallback.

## W-89 — Monotonicity recheck timing

`ConfigurationMonotonicityCheck` runs:

- before initial enablement;
- on every tenant configuration change;
- on capability-definition version change;
- on prompt/instruction/tool/source-policy change;
- on authority/review/confirmation change;
- on provider/model/profile change;
- on context/evaluation/resource-policy change;
- on isolation/residency/retention/training change;
- after migration/import of configuration;
- before reactivation following suspension or expired conformance.

Any failed or unavailable check blocks activation and in-flight use under the changed profile. Previous completed outputs retain original lineage and limitations.

## W-90 — Capability version versus proposal freshness

When a capability version changes:

1. the capability-version transition disposition governs all outstanding runs, drafts and proposals;
2. each proposal's `ProposalFreshnessPolicyVersion` then evaluates its exact source/target/context/configuration lineage;
3. a proposal may remain reviewable only when the transition explicitly permits compatibility and the freshness check passes;
4. otherwise it becomes `STALE_REVIEW_REQUIRED`, `INVALIDATED` or historical-only;
5. no proposal silently migrates, rebinds to a new prompt/model/tool/policy or inherits a new authority ceiling.

## W-91 — Evidence/prototype gate adjudication

Validation gates V1 and V2 require a recorded `ValidationGateDecision` by a cross-functional adjudication panel containing at least:

- product/domain architecture owner;
- independent research/validation owner not responsible for defending the candidate design;
- procurement practitioner representative;
- supplier/external-participant representative for supplier-facing findings;
- accessibility/UX reviewer where interaction meaning is assessed.

A person may fill more than one role only where independence remains credible and the limitation is recorded.

The decision binds:

- participant/sample evidence;
- protocol and question set;
- raw observations and coded findings;
- definition of critical versus non-critical misunderstanding;
- disagreements and minority view;
- pass/fail/repeat/revise/kill disposition;
- architecture/product hypotheses affected;
- conflicts of interest;
- approvers and date.

`Zero critical meaning misunderstandings` means no participant in the final qualifying round demonstrates a misunderstanding that could cause unauthorized action, wrong commercial meaning, false submission/receipt meaning, hidden limitation, evidence/authority confusion or unsafe recovery. Ambiguous classification is treated as critical until independently resolved.

## Final disposition

W-87–W-91 are closed and incorporated into the controlling P1.10 freeze. They add bounded registered-source admission, profile-specific evaluation, continuous monotonicity checks, explicit proposal transition rules and independent validation adjudication without creating a source, provider, evaluation or research platform.