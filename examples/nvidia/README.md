# NVIDIA example

This directory is the first reference dataset for Investment Infra. It is a workflow fixture, not an investment report.

## Research question

Can an agent assemble and maintain a reviewable evidence package for one NVIDIA earnings cycle without collapsing reported facts, management claims, external estimates, and analyst interpretation?

## Dataset states

The manifest tracks each planned source as:

- `planned`;
- `verified_available`;
- `captured`;
- `blocked`;
- `excluded`;
- `superseded`.

This makes coverage gaps visible. Missing licensed research is recorded as missing rather than replaced with uncited web summaries.

## Layout

```text
manifest.json       Stable entity identity, scope, and dataset status
source-plan.md      Source roles and collection priorities
raw/                Rules for immutable source artifacts
records/            Structured records conforming to schema v0.1
reviews/            Cross-checks, conflicts, and analyst decisions
```

## Intended flow

1. Freeze the target earnings cycle in `manifest.json`.
2. Register sources before collecting documents.
3. Capture original artifacts and hashes outside Git when files are large or licensed.
4. Commit metadata and structured records, never restricted source files.
5. Separate facts, claims, and estimates.
6. Create evidence links and conflict records.
7. Route material issues to analyst review.
8. Publish a coverage report with unresolved gaps.

## Current state

`cycle_frozen`: FY2027 Q1 is the fixed research cycle and primary documents have been discovered. No source artifact has been captured or extracted yet.

`records/seed.example.json` is synthetic and exists only to verify schema relationships.
