import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "..");

async function readJson(relativePath) {
  return JSON.parse(
    await readFile(resolve(repoRoot, relativePath), "utf8"),
  );
}

const [
  manifest,
  inventory,
  sources,
  documents,
  facts,
  claims,
  estimates,
  evidence,
  crossCheck,
  outlookReview,
] = await Promise.all([
  readJson("examples/nvidia/manifest.json"),
  readJson("examples/nvidia/source-inventory.json"),
  readJson("examples/nvidia/records/sources.json"),
  readJson("examples/nvidia/records/documents.json"),
  readJson("examples/nvidia/records/facts.json"),
  readJson("examples/nvidia/records/claims.json"),
  readJson("examples/nvidia/records/estimates.json"),
  readJson("examples/nvidia/records/evidence.json"),
  readJson("examples/nvidia/reviews/gaap-income-statement-cross-check.json"),
  readJson("examples/nvidia/reviews/management-outlook-normalization.json"),
]);

const outputPath = resolve(webRoot, "generated/nvidia.json");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      manifest,
      inventory,
      sources,
      documents,
      facts,
      claims,
      estimates,
      evidence,
      crossCheck,
      outlookReview,
    },
    null,
    2,
  )}\n`,
);

console.log("Synced canonical NVIDIA records for the web build.");
