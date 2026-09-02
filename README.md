# PlantCareInfra

AWS CDK (TypeScript) app that deploys the Rust lambda from the
[`PlantCare`](../PlantCare) repository.

## What it creates

`PlantCareInfraStack` (`lib/plant_care_infra-stack.ts`):

- **`PlantCareFunction`** – the Rust lambda. [`cargo-lambda-cdk`](https://www.npmjs.com/package/cargo-lambda-cdk)
  runs `cargo lambda build --release` against `../PlantCare/Cargo.toml` during
  `cdk synth` and ships the resulting `bootstrap` binary on the
  `provided.al2023` runtime.
- **Function URL** – a public (`AuthType: NONE`) HTTPS endpoint, since the
  handler is built with `lambda_http`. The URL is a stack output.
- **Log group** – 1‑week retention.

## Layout

The two repos are expected to sit side by side:

```text
PlantCareTracking/
  PlantCare/        <- the Rust lambda
  PlantCareInfra/   <- this CDK app
```

If your checkout differs, point at the Rust project explicitly:

```bash
export PLANT_CARE_MANIFEST_PATH=/abs/path/to/PlantCare/Cargo.toml
```

## Prerequisites

- Node.js + `npm install`
- [Rust](https://www.rust-lang.org/tools/install) and
  [Cargo Lambda](https://www.cargo-lambda.info/guide/installation.html) – used
  by `cdk synth`/`cdk deploy` to compile the lambda
- AWS credentials in the environment (`aws configure` / SSO), and a
  one‑time `npx cdk bootstrap` per account+region

## Commands

- `npm run build` – compile TypeScript
- `npm test` – jest unit tests (synthesizes the stack)
- `npx cdk synth` – emit the CloudFormation template (also builds the lambda)
- `npx cdk diff` – diff against the deployed stack
- `npx cdk deploy` – deploy to the account/region from your current AWS credentials
