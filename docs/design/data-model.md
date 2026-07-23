# Core data model

## Why these records exist

Investment research mixes fundamentally different kinds of information. A reported revenue figure, a CEO forecast, and a sell-side estimate may refer to the same company and period, but they do not have the same meaning. Collapsing them into a paragraph or vector store destroys information needed for verification.

Version `v0.1` therefore models eight record types.

| Record | Meaning |
| --- | --- |
| `source` | The organization, person, system, or publication providing information |
| `document` | An immutable captured artifact from a source |
| `fact` | A directly observable value or statement anchored to a document location |
| `claim` | A proposition asserted by a named actor |
| `estimate` | A forecast value with an information-date snapshot and assumptions |
| `evidence` | A typed relationship that supports, contradicts, qualifies, or updates a target |
| `conflict` | A first-class set of records that cannot yet be reconciled |
| `thesis` | A falsifiable investment proposition and its current review state |

## Shared invariants

Every record has:

- a stable ID;
- a record type and schema version;
- creation time;
- creator identity (`human`, `agent`, or `pipeline`);
- a review status.

Derived records also carry their direct inputs and transformation metadata. Model name, prompt version, parser version, or code version are recorded when applicable.

## Time semantics

Financial data needs more than one timestamp:

- `published_at`: when the source released the information;
- `as_of`: the information set a forecast or document represents;
- `period`: the fiscal or calendar period being described;
- `captured_at`: when Investment Infra acquired it;
- `created_at`: when the structured record was created.

These fields must not be substituted for one another. In particular, pre-earnings consensus and post-earnings revised consensus are different snapshots.

## Provenance

A fact is incomplete without a document ID and locator. A document is incomplete without a source ID, checksum, capture time, and original URI. Derived evidence must identify the record it came from and the target it affects.

Provenance describes origin; it does not itself prove truth.

## Conflict semantics

Conflicts are not limited to numerical disagreement. The initial taxonomy is:

- `value`: different values for a supposedly equivalent metric;
- `definition`: labels appear equivalent but definitions differ;
- `period`: fiscal or calendar periods are misaligned;
- `basis`: GAAP, non-GAAP, constant-currency, or other basis differs;
- `version`: one source supersedes or restates another;
- `forecast`: future outcomes differ because assumptions differ;
- `interpretation`: sources agree on facts but disagree on meaning.

A conflict may be resolved, partially resolved, or unresolved. Resolution never deletes the original observations.

## Thesis linkage

Evidence can target a claim, estimate, conflict, or thesis. A thesis must include a falsification condition. This prevents the system from becoming a one-way archive of supporting material and gives agents an explicit route for finding disconfirming evidence.

## Identity and units

Phase 1 uses stable entity IDs from the company manifest. Financial values must retain:

- original label;
- normalized metric identifier;
- value and unit;
- currency when relevant;
- reporting basis;
- period;
- source locator.

Normalization creates comparability while preserving the source expression.
