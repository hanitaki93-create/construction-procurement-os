# B01 F5 Verification Marker

This marker triggers final verification on the normalized F5 dependency graph and formatted source.

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
