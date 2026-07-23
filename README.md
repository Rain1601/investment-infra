# Investment Infra

Data and evidence infrastructure for investment research agents.

Investment Infra sits between financial information sources and research agents. Its first goal is not to produce investment conclusions, but to make the inputs to those conclusions traceable, comparable, reviewable, and reusable.

## Principles

- Evidence before conclusions.
- Provenance travels with every derived record.
- Facts, claims, and estimates remain distinct.
- Conflicts are preserved, not silently overwritten.
- Human review is part of the data lifecycle.
- Schemas evolve from real company examples rather than an abstract universal model.

## Phase 1

Phase 1 uses NVIDIA as the reference company. The example will establish a professional data flow for one bounded research cycle:

```text
source discovery
  → raw capture
  → structured records
  → cross-checks and conflicts
  → thesis impact
  → analyst review
```

This repository currently contains design artifacts and example scaffolding only. It intentionally does not include a production ingestion pipeline or investment recommendations.

## Repository layout

```text
docs/design/               Design decisions and the Phase 1 workflow
schemas/v0.1/              Versioned JSON Schema for investment records
examples/nvidia/           NVIDIA coverage manifest and dataset skeleton
```

Start with:

- [Phase 1 design](docs/design/phase-1.md)
- [Core data model](docs/design/data-model.md)
- [Verification workflow](docs/design/verification-workflow.md)
- [NVIDIA example](examples/nvidia/README.md)

## Current boundary

Investment Infra is not a market-data vendor, a document summarizer, a portfolio-management system, or an autonomous investment decision-maker. It is the evidence layer that allows agents and analysts to understand where information came from, what it means, where sources disagree, and how a thesis changed.
