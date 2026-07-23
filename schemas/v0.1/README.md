# Schema v0.1

`investment-record.schema.json` defines the initial record envelope and eight record types used by the NVIDIA example.

The schema is intentionally small:

- it captures semantics required for provenance and review;
- it does not prescribe a database;
- it allows additive metadata while the reference workflow is still being discovered;
- breaking changes will create `v0.2` rather than mutating historical data.

`examples/nvidia/records/seed.example.json` is a synthetic, schema-valid relationship example. It demonstrates IDs and links only; it is not NVIDIA research data.
