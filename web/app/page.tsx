import type { Metadata } from "next";
import nvidiaData from "../generated/nvidia.json";

const {
  manifest: manifestData,
  inventory: inventoryData,
  sources: sourcesData,
  documents: documentsData,
  facts: factsData,
  claims: claimsData,
  estimates: estimatesData,
  evidence: evidenceData,
  crossCheck: crossCheckData,
  outlookReview: outlookReviewData,
} = nvidiaData;

export const metadata: Metadata = {
  title: "NVIDIA Evidence Trace — Investment Infra",
  description:
    "A source-first view of how NVIDIA investment data is acquired, normalized, checked, and qualified.",
};

type Fact = (typeof factsData)[number];
type Estimate = (typeof estimatesData)[number];
type Claim = (typeof claimsData)[number];
type Document = (typeof documentsData)[number];

const metricNames: Record<string, string> = {
  "company.revenue": "Revenue",
  "company.cost_of_revenue": "Cost of revenue",
  "company.gross_profit": "Gross profit",
  "company.operating_expenses": "Operating expenses",
  "company.operating_income": "Operating income",
  "company.net_income": "Net income",
  "company.earnings_per_share_diluted": "Diluted EPS",
  "company.gross_margin": "Gross margin",
};

function metricName(metricId: string) {
  return metricNames[metricId] ?? metricId.replace("company.", "").replaceAll("_", " ");
}

function formatValue(value: number, unit: string) {
  if (unit === "USD_million") return `$${value.toLocaleString("en-US")}M`;
  if (unit === "USD_per_share") return `$${value.toFixed(2)}`;
  if (unit === "percent") return `${value.toFixed(1)}%`;
  return `${value.toLocaleString("en-US")} ${unit}`;
}

function sourceLabel(documentId: string) {
  if (documentId.includes("10q")) return "SEC 10-Q";
  if (documentId.includes("release")) return "Filed release";
  return "CFO commentary";
}

const facts = factsData as Fact[];
const estimates = estimatesData as Estimate[];
const claims = claimsData as Claim[];
const documents = documentsData as Document[];
const factMap = new Map(facts.map((fact) => [fact.id, fact]));
const documentMap = new Map(documents.map((document) => [document.id, document]));

export default function Home() {
  const coverage = manifestData.coverage;
  const pipeline = [
    {
      step: "01",
      label: "Discover",
      value: coverage.discovered_documents,
      detail: "official artifacts located",
      state: "complete",
    },
    {
      step: "02",
      label: "Capture",
      value: coverage.captured_rendered_snapshots,
      detail: "hashed DOM snapshots",
      state: "partial",
    },
    {
      step: "03",
      label: "Extract",
      value:
        coverage.extracted_fact_records +
        coverage.extracted_claim_records +
        coverage.extracted_estimate_records,
      detail: "typed investment records",
      state: "complete",
    },
    {
      step: "04",
      label: "Cross-check",
      value: coverage.cross_checked_metrics,
      detail: "GAAP metrics matched",
      state: "complete",
    },
    {
      step: "05",
      label: "Verify",
      value: 0,
      detail: "independent sources connected",
      state: "open",
    },
  ];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Investment Infra home">
          <span className="brand-mark">II</span>
          <span>Investment Infra</span>
        </a>
        <nav aria-label="Page sections">
          <a href="#pipeline">Pipeline</a>
          <a href="#facts">Facts</a>
          <a href="#outlook">Outlook</a>
          <a href="#gaps">Gaps</a>
        </nav>
        <span className="version">dataset v{manifestData.dataset_version}</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            NVIDIA · FY2027 Q1 · FROZEN SNAPSHOT
          </div>
          <h1>
            Evidence before
            <br />
            conclusion.
          </h1>
          <p className="lede">
            A traceable view of where NVIDIA investment data came from, how it
            was transformed, and what remains unverified.
          </p>
        </div>

        <aside className="trust-card">
          <div className="trust-card-head">
            <span>Evidence status</span>
            <span className="status-pill status-amber">PARTIAL</span>
          </div>
          <div className="trust-score">
            <span className="score-value">4</span>
            <span className="score-unit">captured documents</span>
          </div>
          <div className="score-track">
            <span style={{ width: "57%" }} />
          </div>
          <dl>
            <div>
              <dt>Source authority</dt>
              <dd>Primary</dd>
            </div>
            <div>
              <dt>Internal consistency</dt>
              <dd className="good">7 / 7 matched</dd>
            </div>
            <div>
              <dt>Independent verification</dt>
              <dd className="warning">Not established</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="pipeline-section" id="pipeline">
        <div className="section-heading">
          <div>
            <span className="section-index">01</span>
            <h2>Data lineage</h2>
          </div>
          <p>Every record carries its source, transformation, and review state.</p>
        </div>

        <div className="pipeline">
          {pipeline.map((item, index) => (
            <div className="pipeline-item" key={item.label}>
              <div className={`pipeline-node ${item.state}`}>
                <span>{item.step}</span>
              </div>
              <div className="pipeline-content">
                <span className="pipeline-label">{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.detail}</small>
              </div>
              {index < pipeline.length - 1 && (
                <span className="connector" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="boundary-note">
          <span className="boundary-icon">!</span>
          <div>
            <strong>Consistency is not independence.</strong>
            <p>{crossCheckData.source_independence.reason}</p>
          </div>
        </div>
      </section>

      <section className="source-section">
        <div className="section-heading">
          <div>
            <span className="section-index">02</span>
            <h2>Source register</h2>
          </div>
          <p>Authority, access method, license scope, and capture state stay attached.</p>
        </div>

        <div className="source-grid">
          {sourcesData.map((source) => {
            const sourceDocuments = inventoryData.documents.filter(
              (document) => document.source_id === source.id,
            );
            return (
              <article className="source-card" key={source.id}>
                <div className="source-topline">
                  <span className="source-type">{source.source_type}</span>
                  <span className="status-pill status-green">PRIMARY</span>
                </div>
                <h3>{source.name}</h3>
                <p>{source.authority_notes}</p>
                <dl className="source-meta">
                  <div>
                    <dt>Access</dt>
                    <dd>{source.access_method}</dd>
                  </div>
                  <div>
                    <dt>License</dt>
                    <dd>{source.license_scope}</dd>
                  </div>
                  <div>
                    <dt>Artifacts</dt>
                    <dd>{sourceDocuments.length}</dd>
                  </div>
                </dl>
                <div className="artifact-list">
                  {sourceDocuments.map((document) => (
                    <a
                      href={document.original_uri}
                      target="_blank"
                      rel="noreferrer"
                      key={document.inventory_id}
                    >
                      <span>{document.document_type}</span>
                      <small>{document.status.replaceAll("_", " ")}</small>
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="facts-section" id="facts">
        <div className="section-heading">
          <div>
            <span className="section-index">03</span>
            <h2>Reported facts</h2>
          </div>
          <p>Normalized values retain both original disclosures and exact locators.</p>
        </div>

        <div className="table-shell">
          <div className="table-summary">
            <div>
              <span className="status-pill status-green">MACHINE CHECKED</span>
              <strong>{crossCheckData.summary.matches} exact matches</strong>
            </div>
            <span>USD millions, except per-share data</span>
          </div>
          <div className="facts-table" role="table" aria-label="GAAP metric cross-check">
            <div className="table-row table-head" role="row">
              <span role="columnheader">Metric</span>
              <span role="columnheader">10-Q</span>
              <span role="columnheader">Release</span>
              <span role="columnheader">Result</span>
              <span role="columnheader">Trace</span>
            </div>
            {crossCheckData.checks.map((check) => {
              const first = factMap.get(check.fact_ids[0]);
              const second = factMap.get(check.fact_ids[1]);
              if (!first || !second) return null;
              const firstDocument = documentMap.get(first.document_id);
              return (
                <div className="table-row" role="row" key={check.metric_id}>
                  <strong role="cell">{metricName(check.metric_id)}</strong>
                  <span role="cell">{formatValue(first.value, first.unit)}</span>
                  <span role="cell">{formatValue(second.value, second.unit)}</span>
                  <span role="cell" className="match">
                    <span>✓</span> Match
                  </span>
                  <a
                    role="cell"
                    href={firstDocument?.original_uri}
                    target="_blank"
                    rel="noreferrer"
                    className="trace-link"
                    title={`${first.locator.table} — ${first.locator.row}`}
                  >
                    Source ↗
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="outlook-section" id="outlook">
        <div className="section-heading">
          <div>
            <span className="section-index">04</span>
            <h2>Management outlook</h2>
          </div>
          <p>Numeric estimates are separated from assumptions and qualitative claims.</p>
        </div>

        <div className="outlook-layout">
          <div className="estimate-panel">
            <div className="panel-label">
              <span>ESTIMATES</span>
              <small>{estimates.length} records</small>
            </div>
            {estimates.map((estimate) => (
              <article className="estimate-row" key={estimate.id}>
                <div>
                  <span>{metricName(estimate.metric_id)}</span>
                  <small>
                    {estimate.forecast_period.label}
                    {"basis" in estimate && estimate.basis
                      ? ` · ${estimate.basis}`
                      : ""}
                  </small>
                </div>
                <strong>
                  {"approximate" in estimate && estimate.approximate ? "~" : ""}
                  {formatValue(estimate.value, estimate.unit)}
                </strong>
                <div className="estimate-source">
                  <span>{sourceLabel(estimate.document_id)}</span>
                  <small>{estimate.review_status.replaceAll("_", " ")}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="claim-panel">
            <div className="panel-label">
              <span>CLAIMS & ASSUMPTIONS</span>
              <small>{claims.length} records</small>
            </div>
            {claims.map((claim) => (
              <details className="claim-row" key={claim.id}>
                <summary>
                  <span className={`claim-kind ${claim.claim_type}`}>
                    {claim.claim_type.replaceAll("_", " ")}
                  </span>
                  <span>{claim.statement}</span>
                  <span className="expand">+</span>
                </summary>
                <div className="claim-detail">
                  <span>
                    <b>Asserted by</b> {claim.asserted_by}
                  </span>
                  <span>
                    <b>Locator</b> {claim.locator.section} / {claim.locator.row}
                  </span>
                  <span>
                    <b>Review</b> {claim.review_status.replaceAll("_", " ")}
                  </span>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="evidence-line">
          <span className="evidence-tag">EVIDENCE LINK</span>
          <span>{evidenceData[0].source_record_id.split(":").at(-1)}</span>
          <strong>{evidenceData[0].relation.toUpperCase()}</strong>
          <span>{evidenceData[0].target_record_id.split(":").at(-1)}</span>
          <small>{evidenceData[0].rationale}</small>
        </div>
      </section>

      <section className="gaps-section" id="gaps">
        <div className="section-heading light-heading">
          <div>
            <span className="section-index">05</span>
            <h2>What we still don’t know</h2>
          </div>
          <p>Open gaps are first-class data, not footnotes hidden by the model.</p>
        </div>

        <div className="gap-grid">
          {inventoryData.gaps.map((gap, index) => (
            <article className="gap-card" key={gap.source_group}>
              <span className="gap-number">0{index + 1}</span>
              <div>
                <div className="gap-title">
                  <h3>{gap.source_group.replaceAll("_", " ")}</h3>
                  <span className={`status-pill status-${gap.status}`}>
                    {gap.status}
                  </span>
                </div>
                <p>{gap.reason}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="next-step">
          <span>NEXT EVIDENCE MILESTONE</span>
          <h3>Connect a point-in-time pre-earnings consensus snapshot.</h3>
          <p>
            This unlocks the first institutional comparison: reported actuals
            versus what the market knew before the release.
          </p>
        </div>
      </section>

      <footer>
        <div>
          <span className="brand-mark">II</span>
          <span>Investment Infra</span>
        </div>
        <p>
          Source-first infrastructure for evidence-grounded investment agents.
        </p>
        <span>
          {outlookReviewData.summary.estimates} estimates ·{" "}
          {outlookReviewData.summary.claims} claims ·{" "}
          {outlookReviewData.summary.open_schema_gaps} schema gap
        </span>
      </footer>
    </main>
  );
}
