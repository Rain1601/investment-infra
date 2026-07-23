# Phase 1: NVIDIA reference dataset

## Objective

Use one real company to discover the minimum data model and review workflow required by an investment research agent.

The phase is successful when an analyst or agent can inspect a material NVIDIA record and answer:

1. Where did it come from?
2. What reporting period and information date does it describe?
3. Is it a reported fact, a claim, or an estimate?
4. Has it been independently checked?
5. Does another source disagree, and why?
6. Which thesis pillar does it support, contradict, or qualify?

## Scope

The first research cycle is deliberately bounded to:

- NVIDIA company filings and investor-relations material;
- one latest completed earnings cycle selected at collection time;
- the matching earnings call and presentation;
- pre-earnings expectations when legally accessible;
- a small set of industry evidence needed to interpret the cycle;
- an analyst review trail.

"All NVIDIA data" is treated as a coverage question, not a scraping promise. The example manifest records what is in scope, collected, missing, inaccessible, or intentionally excluded.

## Deliverables

1. A source register and immutable document inventory.
2. Structured `fact`, `claim`, and `estimate` records.
3. Evidence links from records to thesis pillars.
4. Explicit conflict sets with unresolved states allowed.
5. A review log recording automated checks and analyst decisions.
6. A short coverage report describing known gaps.

## Non-goals

- Predicting NVIDIA's stock price.
- Producing a buy or sell recommendation.
- Replacing licensed providers such as Bloomberg, FactSet, or Wind.
- Covering NVIDIA's entire history or full supply chain.
- Automatically selecting a single truth when sources encode different definitions or assumptions.
- Building a database service, vector index, or agent runtime in Phase 1.

## Iteration rule

The schemas in `schemas/v0.1` are hypotheses. A field should be added only when the NVIDIA workflow demonstrates a concrete need. Breaking changes create a new schema version instead of rewriting prior records in place.
