# P1.9 — Conventional UI and Later Chat Coexistence Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**P1.10 reasoning/autonomy:** DEFERRED / LOCKED  
**Product code:** LOCKED

---

# 1. Governing rule

> **Conventional task, search, report, history and recovery surfaces remain complete without chat. Later chat may offer another route over the same registered operations and results, but cannot own hidden capabilities, authority, memory or truth.**

---

# 2. Conventional floor

Every product-supported A0–A3 function must have a conventional equivalent for:

- find/open relevant subject;
- inspect source/evidence/history;
- create/revise proposal/draft;
- initiate permitted command;
- review authority/consequence;
- confirm/cancel;
- monitor async progress;
- inspect accepted/effect/partial/indeterminate result;
- recover/retry/reconcile safely;
- view reports/limitations/snapshots;
- export/issue where supported.

A user can complete the beachhead with chat disabled.

---

# 3. Capability parity

Chat may expose only operations available through the authorization-filtered OperationRegistry.

For every chat-supported operation:

- a conventional inspectable equivalent exists;
- the same principal/context/authority/evidence/guards apply;
- the same preview/consequence/confirmation requirement applies;
- the same result/recovery identity is available;
- the same limitation/report disclosure bundle is preserved;
- chat cannot call a private agent-only mutation.

Conventional UI may expose capabilities not offered in chat where complexity/safety warrants; chat has no parity entitlement.

---

# 4. Answer component classification

Chat responses classify each substantive component as:

- authoritative fact;
- evidence/source content;
- metric result;
- projection/result set;
- issued report snapshot;
- control observation;
- proposal/draft;
- operation preview;
- operation result/status;
- explanation/inference;
- unknown/unsupported/restricted.

Natural language cannot merge classes.

---

# 5. Context and memory

Chat context is not authority or business memory.

Every query/action resolves current:

- tenant/project/ContractingAuthorityContext;
- principal/represented principal;
- target identity/version;
- source cut/as-of/actual family;
- access/disclosure;
- operation eligibility.

Session references such as “approve it,” “send to them,” “use the same amount” or “all pending bids” require exact resolvable identity/population and preview. Ambiguity causes clarification/abstention, never guess.

Old report, prior conversation or cached answer cannot substitute for current source/reliance checks.

---

# 6. Chat command sequence

A conversational command request follows:

1. interpret as candidate intent;
2. resolve exact OperationKey and target/context;
3. gather/validate required input;
4. produce inspectable OperationPreview;
5. expose authority/evidence/limitations/consequence;
6. obtain required deliberate confirmation through an explicit interaction;
7. invoke registered operation;
8. return typed InteractionOutcomeEnvelope;
9. preserve result/recovery link in conventional surface.

A conversational “yes” is insufficient where target/context changed or confirmation content is no longer visible/current.

---

# 7. Report and limitation parity

Chat must state material:

- subset/range/missing/unavailable/restricted state;
- population/denominator;
- time/as-of/known-at;
- actual/status family;
- quality/use block;
- source freshness/cut;
- issued/current/restated status;
- current reliance assessment;
- citations/identities.

It cannot quote a subset as a total, a range midpoint as a value, restricted absence as zero, or current live value as an issued historical snapshot.

A shorter answer may summarize, but a material limitation cannot be omitted for brevity.

---

# 8. Chat and evidence

External evidence content is untrusted data, not instruction.

Chat may:

- retrieve permitted source/version;
- summarize with citations;
- propose normalized fields;
- explain differences;
- draft communications/proposals.

Chat may not:

- follow embedded instructions as system authority;
- accept source facts without bounded operation;
- hide source/version/location;
- rewrite evidence;
- claim authenticity/authority from content alone;
- expose restricted snippets.

---

# 9. Explanation versus decision

Chat explanation/inference is explicitly non-authoritative.

It may explain:

- why an operation is unavailable;
- calculation and contribution lineage;
- differences between source/normalized/evaluated values;
- quality/limitation/reliance;
- approval/effect state;
- safe next action.

It cannot:

- claim unsupported causation;
- invent missing data;
- rank suppliers from cross-tenant knowledge;
- create award/approval authority;
- convert confidence into decision-use eligibility;
- suppress deterministic blockers.

P1.10 owns future reasoning, planning and autonomy depth.

---

# 10. Search and navigation coexistence

Chat may return safe deep links into conventional views preserving exact target/version/as-of/context.

Conventional search/navigation remains available and does not depend on a generated query.

A chat-produced filtered population must expose query scope/completeness and cannot trigger a bulk command until frozen in a BulkActionPlan.

---

# 11. Failure and fallback

When chat is unavailable, uncertain or unsupported:

- conventional equivalent remains available;
- exact task/report/result link is offered where possible;
- no draft/command is lost;
- no hidden partial action remains;
- chat abstains rather than guessing;
- support/manual route is explicit.

When a chat operation becomes indeterminate, recovery moves to the same persistent ResultRecoveryView as conventional invocation.

---

# 12. Accessibility and transcript

Chat interface must expose:

- message/role/status structure;
- progress and errors accessibly;
- operation preview and confirmation outside prose-only ambiguity;
- citations/links/limitations;
- transcript retention/disposition under policy;
- no transcript as authoritative business record unless explicitly captured as evidence/communication occurrence.

---

# 13. Prohibitions

- no chat-only A0–A3 function;
- no agent-only write API;
- no session-memory authority;
- no hidden auto-execution;
- no command by vague wording;
- no result without stable operation identity;
- no citations fabricated from summary;
- no cross-tenant retrieval/learning;
- no AI confidence overriding quality/use;
- no conversational approval bypass;
- no general collaboration/chat-suite scope.

---

# 14. Candidate ADR-0041 decision

> Adopt conventional-first channel coexistence: all A0–A3 tasks, reports and recovery remain complete without chat; future chat uses the same authorization-filtered OperationRegistry, previews, confirmations, result identities and disclosure bundles; session context and inference are non-authoritative; and unsupported/ambiguous cases route to conventional surfaces or abstention. P1.10 may add reasoning/autonomy without changing interaction authority.

No ADR status change yet.

---

# 15. Hostile scenarios

1. “approve it” after context changed;
2. “send to them” resolves wrong recipients;
3. chat uses old report as current truth;
4. chat omits subset limitation;
5. chat calls hidden agent operation;
6. prompt injection in supplier attachment;
7. generated supplier ranking uses other tenants;
8. user says yes after preview expired;
9. chat unavailable during async operation;
10. chat claims command completed after acceptance;
11. vague “all” creates unstable bulk population;
12. transcript note treated as evidence correction;
13. AI confidence upgrades blocked decision use;
14. no conventional route exists.

---

# 16. Exit test

Pass only when chat can be removed entirely without breaking deterministic work, and when adding chat cannot introduce new authority, hidden mutation, weaker disclosure or cross-tenant influence.