# Verification workflow

Verification is a staged process, not a single confidence score.

## 1. Capture

- Save the original artifact before extraction.
- Record source, publication time, capture time, URI, checksum, media type, and license/access notes.
- Never replace a captured document when a revised version appears.

## 2. Classify

Determine whether extracted information is a `fact`, `claim`, or `estimate`. If the type is uncertain, keep it in review rather than forcing it into `fact`.

## 3. Normalize

Align entity, metric, unit, currency, period, accounting basis, and information date. Preserve original labels and values alongside normalized fields.

## 4. Run deterministic checks

Examples:

- checksum and duplicate detection;
- document/reporting-period alignment;
- unit and currency compatibility;
- table arithmetic and subtotal checks;
- GAAP versus non-GAAP separation;
- pre-event versus post-event expectation snapshots.

## 5. Cross-check

Compare equivalent records from independent or differently situated sources. Results are classified as:

- `match`;
- `rounding_difference`;
- `definition_difference`;
- `version_difference`;
- `material_conflict`;
- `not_comparable`.

Source authority is contextual. A regulatory filing may be authoritative for reported financials while an exchange feed is authoritative for a market price. No global five-star score decides every question.

## 6. Explain disagreement

Before arbitration, test whether the disagreement is caused by time, definition, basis, period, currency, or version. Forecast conflicts should retain the assumptions that drive the difference.

## 7. Review

Material conflicts, thesis-changing evidence, and low-confidence extractions enter analyst review. The reviewer records a decision and rationale; the system does not silently rewrite history.

## 8. Feed back

Outcomes update:

- extraction and normalization rules;
- source track records by domain and task;
- recurring conflict patterns;
- thesis status;
- future agent evaluation cases.

## Review states

```text
draft → machine_checked → analyst_approved
                    ↘ disputed
                    ↘ rejected

approved records may later become superseded
```

`unresolved` is a valid conflict outcome, not a system failure.
