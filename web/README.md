# Investment Infra web

Evidence-first interface for the NVIDIA example dataset.

The page imports the canonical JSON records from `../examples/nvidia`. It does
not maintain a second copy of the investment data.

## Local development

```bash
pnpm install
pnpm dev
```

## Validation

```bash
pnpm test
pnpm build
```

## Vercel

Create a Vercel project from the repository and set its Root Directory to
`web`. The standard Next.js framework preset and build command are detected
automatically. The full repository must remain available during the build
because the page imports the NVIDIA records from `examples/nvidia`.
