# Structured records

Records in this directory conform to `schemas/v0.1/investment-record.schema.json`.

Planned dataset files:

```text
sources.json           Present: verified source identities
documents.json         Present: four SEC rendered-snapshot records
facts.json             Present: 14 source-specific GAAP fact records
claims.json            Present: five normalized management claims
estimates.json         Present: five Q2 FY2027 management estimates
evidence.json          Present: one assumption-to-estimate link
conflicts.json
theses.json
```

Files may be split later when volume demands it. Phase 1 prioritizes inspectability over storage optimization.

`seed.example.json` is synthetic and validates relationships among record types. Replace it with collected data only after the research cycle and source inventory are frozen.
