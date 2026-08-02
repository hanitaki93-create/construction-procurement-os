# B01 F5 Verification Marker

This marker triggers final verification after the dependency graph, source formatting and frozen-prompt conformance surface were normalized.

## Conformance remediation included in this candidate

- restored the exact `playwright-core@1.61.1` peer required by the release-image deploy graph;
- added the required private `@cpos/testkit` workspace with bounded timing, barrier and isolated-schema primitives;
- prohibited production imports of `@cpos/testkit` through the executable architecture gate;
- added the required root `test:integration` command;
- made the root manifest gate require the complete B01 workspace and command surfaces;
- made full verification prove frozen-lockfile integrity before all other checks;
- added stable repository indexes for architecture and integration proof.

Required authoritative lanes:

- complete workspace verification;
- PostgreSQL 18.4 hostile regression;
- versioned object, ClamAV and OTLP regression;
- Chromium, Firefox, WebKit and mobile browser proof;
- four non-root OCI image build and smoke;
- secret and dependency audit;
- source/image CycloneDX SBOM generation;
- high/critical container vulnerability scan;
- repository reverse-patch and scoped infrastructure rollback proof.

This file carries no runtime or product behavior. B02 remains locked.
