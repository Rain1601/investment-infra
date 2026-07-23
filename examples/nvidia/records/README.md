# Structured records

Records in this directory conform to `schemas/v0.1/investment-record.schema.json`.

Planned dataset files:

```text
sources.json           Present: verified source identities
documents.json
facts.json
claims.json
estimates.json
evidence.json
conflicts.json
theses.json
```

Files may be split later when volume demands it. Phase 1 prioritizes inspectability over storage optimization.

`seed.example.json` is synthetic and validates relationships among record types. Replace it with collected data only after the research cycle and source inventory are frozen.
