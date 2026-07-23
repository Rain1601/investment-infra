import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repoRoot = new URL("../../", import.meta.url);

async function readJson(path) {
  return JSON.parse(await readFile(new URL(path, repoRoot), "utf8"));
}

test("page data preserves source and evidence relationships", async () => {
  const [manifest, documents, facts, claims, estimates, evidence, review] =
    await Promise.all([
      readJson("examples/nvidia/manifest.json"),
      readJson("examples/nvidia/records/documents.json"),
      readJson("examples/nvidia/records/facts.json"),
      readJson("examples/nvidia/records/claims.json"),
      readJson("examples/nvidia/records/estimates.json"),
      readJson("examples/nvidia/records/evidence.json"),
      readJson("examples/nvidia/reviews/gaap-income-statement-cross-check.json"),
    ]);

  const documentIds = new Set(documents.map((record) => record.id));
  const recordIds = new Set(
    [...facts, ...claims, ...estimates].map((record) => record.id),
  );

  assert.equal(facts.length, manifest.coverage.extracted_fact_records);
  assert.equal(claims.length, manifest.coverage.extracted_claim_records);
  assert.equal(estimates.length, manifest.coverage.extracted_estimate_records);
  assert.equal(evidence.length, manifest.coverage.evidence_links);
  assert.equal(review.summary.matches, manifest.coverage.cross_checked_metrics);
  assert.ok([...facts, ...claims, ...estimates].every((record) =>
    documentIds.has(record.document_id),
  ));
  assert.ok(evidence.every((link) =>
    recordIds.has(link.source_record_id) && recordIds.has(link.target_record_id),
  ));
});
