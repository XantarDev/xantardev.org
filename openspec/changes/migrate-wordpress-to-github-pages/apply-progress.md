# Apply progress: migrate WordPress to GitHub Pages

## Foundation privacy/isolation slice

- **Work unit:** `foundation-privacy-isolation` (feature-branch-chain; 400-line budget)
- **Structured status consumed:** `gentle-ai.sdd-status` v2 reported `applyState: ready`, repository-local workspace `C:\projects\xantardev.org`, and that workspace as the allowed edit root.
- **Action-context warning:** The required attempt settlement is blocked by native untracked-file accounting. It requires an explicit `--untracked-scope=select` ruling and the reported expected inventory digest before another runtime attempt or test correction can proceed.
- **Task checkboxes:** No task is marked complete. The input-isolation task still requires Jekyll exclusions in its later site-skeleton slice, and the tooling task cannot be completed while its focused test remains failing.

### Work performed before the runtime block

- Added Git ignores for the known WordPress export, WXR files, and controlled migration private/fingerprint/audit/staging/cache/log paths.
- Added a synthetic Node `node --test` harness, privacy scanner, inert migration command placeholders, sanitized public-manifest directory documentation, and input-isolation documentation.
- No real WXR was read, altered, or imported; no media was downloaded; no GitHub Pages deployment was configured.

### Files changed

- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`
- `docs/migration.md`
- `migration/public/README.md`
- `scripts/migration/not-ready.js`
- `scripts/verify/privacy-isolation.js`
- `test/privacy-isolation.test.js`

### Verification evidence

- Ran `npm test` under attempt token `sha256:4ad279178e848261ba43cda519a442ec0830c745e145f25765418f18fd66c344`.
- Result: failed: 2 passed, 1 failed. The synthetic acquisition log is caught by the broader private-migration-path rule before the test's expected acquisition-log classification.
- The required `sdd-attempt settle` call returned `blocked: undeclared_untracked`; its required inventory digest is `sha256:9dca3aee292ed1d95324744af9602d6f40ee7c0aa4d1a30d2e4691e6f55fb702`.

### Remaining tasks

- [ ] Establish public-input isolation in `.gitignore`, Jekyll exclusions, controlled staging paths, and `docs/migration.md`; ensure raw WXR, private fingerprints, caches, and acquisition logs remain outside public source, while preserving a sanitized public manifest contract. **Start:** empty site checkout. **Done:** prohibited inputs cannot enter source or `_site/`. **Verify:** synthetic prohibited-file/source-output scans and `git status`. **Rollback:** revert only isolation/configuration files. <!-- sdd-owner: implementation -->
- [ ] Add pinned Node migration/test tooling in `package.json`, its committed lockfile, and `test/` using `node --test`; define the documented `migration:inventory`, `migration:import`, `migration:assets`, and `verify` command interfaces without consuming real WXR in CI. **Start:** no package or test runner. **Done:** synthetic tests run deterministically. **Verify:** `npm test` on invented fixtures. **Rollback:** revert the tooling work unit and lockfile together. <!-- sdd-owner: implementation -->

### Deviation from design

No Jekyll configuration was added because the selected foundation slice's allowed edit surfaces exclude `_config.yml`; output exclusions remain for the later locked Jekyll skeleton task.

## Corrective attempt: foundation privacy/isolation

- Reset authorized by owner after the first failed attempt consumed its 1/1 attempt budget.
- New attempt token: `sha256:0c6ea02b5491720fa79bdd3654fc5e0e37b0134fe7ea09e7d3af69b398f20fac`.
- Corrected the synthetic acquisition-log classification and set `package.json` to ES module mode to remove the Node test warning.
- Verification: `npm test` passed — 3 tests passed, 0 failed.
- Completed task: Node migration/test tooling and command-interface foundation.
- Still pending: full Jekyll output exclusions belong to the later locked Jekyll skeleton slice; no real WXR import or media download was performed.
