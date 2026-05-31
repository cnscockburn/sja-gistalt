# Security & Code Quality

## Quality pipeline

CI runs on every push and pull request to `master` (see `.github/workflows/ci.yml`).
Run the same checks locally with:

```bash
npm run ci          # typecheck + lint + format check + content validation
npm run audit:deps  # dependency vulnerability audit (high severity gate)
```

Individual steps:

| Command                    | Purpose                                                |
| -------------------------- | ------------------------------------------------------ |
| `npm run typecheck`        | `tsc --noEmit`, strict mode                            |
| `npm run lint`             | ESLint (expo config), zero warnings allowed            |
| `npm run format:check`     | Prettier formatting verification                       |
| `npm run validate:content` | Validates every scenario JSON against the schema rules |
| `npm run audit:deps`       | `npm audit --audit-level=high`                         |

## Dependency audit policy

The CI gate fails on **high** and **critical** vulnerabilities. Moderate and low findings
are reviewed but do not block, because the current moderate findings are all in
**development-time tooling that never ships in the app bundle**.

### Known accepted findings

As of the last audit there are 11 **moderate** findings and **0 high/critical**. All stem
from two advisories, both in development/build tooling only:

- **esbuild `<=0.24.2` (moderate, GHSA-67mh-4wv8-2f99)** — esbuild's local dev server
  accepts cross-origin requests. Surfaces via `esbuild`, `vite`, and `vite-node` (pulled in
  by `tsx` to run the content validator). Dev-only, not shipped to devices.

- **uuid `<11.1.1` (moderate, GHSA-w5hq-g745-h8pq)** — missing buffer bounds check in
  v3/v5/v6 when `buf` is provided. Surfaces via `xcode` → `@expo/config-plugins` → the
  Expo CLI build toolchain. Dev/build-only, not shipped to devices. The fix requires
  downgrading to `expo@46` (breaking change), so the risk is accepted pending an Expo SDK
  upgrade that resolves it upstream.

Re-evaluate accepted findings whenever the Expo SDK or `tsx` is upgraded.

## Secrets & sensitive data

- No secrets are committed. Signing keys (`*.jks`, `*.p8`, `*.p12`, `*.key`,
  `*.mobileprovision`) and `.env*` files are gitignored.
- `.claude/settings.local.json` (local machine settings) is gitignored.
- The app stores only non-sensitive data locally (game settings and the in-progress session)
  via AsyncStorage. No personal or patient data is collected or transmitted.

## Reporting

This is a private repository. Raise security concerns directly with the repository owner.
