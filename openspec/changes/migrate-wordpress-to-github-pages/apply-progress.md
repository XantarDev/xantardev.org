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

## Route schema and public-record parser slice

- **Work unit / PR boundary:** `route-schema-public-record-parser` (feature-branch-chain, auto-chain; 400-line budget). The final slice measures 302 added and 5 deleted lines (307 changed lines), including task/progress evidence and untracked source/test/schema files.
- **Structured status consumed:** `gentle-ai.sdd-status` v2 reported `applyState: ready`, the repository-local `C:\projects\xantardev.org` workspace, and that workspace as the sole allowed edit root. `actionContext` had no mutation warning; the continued native attempt token was `sha256:37d8e67722fd4ef6709a2c7a4625d73c194eb8a2111e92aafa605dee4796a44d`.
- **Completed persisted tasks:** the RED parser-contract task and the inventory-parser task are marked `- [x]` in `tasks.md`.
- **Implementation:** added the sanitized 20-post/two-page route baseline, a `fast-xml-parser`-backed WXR inventory command, and synthetic-only tests. The parser validates XML/WXR structure, rejects declarations, duplicate source IDs and route/case-fold collisions, requires public slugs, validates the independent baseline, returns deterministic records, and emits an identifier/status/reason-only exclusion audit.
- **Files changed:** `.gitignore`, `package.json`, `package-lock.json`, `migration/public/routes.json`, `scripts/migration/inventory.js`, `scripts/verify/privacy-isolation.js`, `test/privacy-isolation.test.js`, `test/migration/inventory.test.js`, `tasks.md`, and this progress file.
- **Verification:** RED `npm test` failed only because `inventory.js` was intentionally absent. Final `npm test` passed: 6 tests, 0 failures. Tests use invented XML and temporary files only; neither the real WXR export nor any media is used by CI/tests. Parent also ran `npm run migration:inventory -- --input ltxantardevgt.WordPress.2026-09-14.xml --baseline migration/public/routes.json > NUL` as a local non-persisted smoke check; it passed without publishing output.
- **Deviation from design:** no generated public posts/pages, Jekyll configuration, content normalization, asset acquisition, or deployment was added. `npm audit fix` updated the dependency lock after the initial XML parser install reported a transitive critical audit finding; final `npm audit --omit=dev` reports 0 vulnerabilities.
- **Strict TDD:** not enabled by `openspec/config.yaml`; this slice nevertheless recorded RED before implementing GREEN behavior.

### Remaining tasks (exact unchecked lines)

- [ ] Establish public-input isolation in `.gitignore`, Jekyll exclusions, controlled staging paths, and `docs/migration.md`; ensure raw WXR, private fingerprints, caches, and acquisition logs remain outside public source, while preserving a sanitized public manifest contract. **Start:** empty site checkout. **Done:** prohibited inputs cannot enter source or `_site/`. **Verify:** synthetic prohibited-file/source-output scans and `git status`. **Rollback:** revert only isolation/configuration files. <!-- sdd-owner: implementation -->
- [x] Add RED/GREEN/TRIANGULATE tests and implementation for `scripts/migration/normalize-content.*` that parses HTML rather than regexes, preserves readable legacy/Gutenberg structures, disables literal Liquid evaluation, canonicalizes same-origin HTTP references, and safely handles unsafe schemes, scripts, event handlers, and unsupported embeds. **Start:** approved-record parser exists. **Done:** normalized candidate content is deterministic and safe without plugin execution. **Verify:** `node --test test/migration/normalize-content.test.*` with headings, tables, code, `srcset`, fragments, literal Liquid, and unsafe fixture cases. **Rollback:** revert normalizer and fixtures without changing the parser contract. <!-- sdd-owner: implementation -->
- [ ] Add RED/GREEN/TRIANGULATE tests and implementation for `scripts/migration/discover-assets.*` to produce `migration/public/assets.json` from approved content, public attachment metadata, and captured public HTML/CSS evidence; record exact legacy paths, evidence, classification, disposition, and collision/failure state without publishing ambiguous or private-only media. **Start:** normalized synthetic content and route manifest. **Done:** public asset requirements are auditable and ambiguous resources are escalation-only. **Verify:** tests cover derivatives, lazy attributes, CSS URLs, `srcset`, private-only, and case-collision cases. **Rollback:** revert discovery/manifests while retaining prior public site output. <!-- sdd-owner: implementation -->
- [ ] Add RED/GREEN/TRIANGULATE tests and implementation for `scripts/migration/acquire-assets.*` that downloads only approved manifest URLs to controlled staging with origin/redirect/path validation, bounded retry/size/concurrency, MIME/signature checks, atomic writes, and SHA-256 collision detection. **Start:** classified synthetic asset manifest. **Done:** only verified public bytes can be promoted to `wp-content/uploads/`. **Verify:** stub-server tests cover redirects, timeout, HTML-200, changed bytes, traversal, wrong type, and unavailable derivatives. **Rollback:** delete only newly promoted hash-recorded files and revert the acquisition unit; retain the prior verified tree. <!-- sdd-owner: implementation -->
- [ ] Establish the locked Jekyll build skeleton in `_config.yml`, `Gemfile`, `Gemfile.lock`, `.ruby-version`, `index.html`, and `.github/workflows/verify.yml`; configure canonical HTTPS, empty baseurl, production strict-frontmatter build, explicit non-public output exclusions, and a verify-only PR workflow with no deployment permission. **Start:** tooling commands and public contracts exist. **Done:** a minimal synthetic site builds from pinned dependencies. **Verify:** clean `bundle exec jekyll build --strict_front_matter` and the workflow’s matching local command. **Rollback:** revert the skeleton and workflow without altering migration source evidence. <!-- sdd-owner: implementation -->
- [ ] Implement `_layouts/{default,post,page}.html`, `_includes/{header,footer,sidebar,post-card}.html`, and `assets/css/site.css` as a small local Ample-inspired theme with identity, required navigation, reverse-chronological listing metadata, safe excerpts, responsive layout, focus states, and legible legacy tables/code/images. **Start:** captured visual/license evidence and Jekyll skeleton. **Done:** homepage, post, and page views render required shared behavior without unsupported dynamic links. **Verify:** build smoke fixture plus recorded desktop/mobile comparison matrix for `/`, representative older/recent posts, `/xd/`, and `/codigo-de-conducta/`. **Rollback:** revert theme files as one unit, restoring the prior rendered theme. <!-- sdd-owner: implementation -->
- [ ] Add `scripts/verify/` and `test/verify/` checks that independently compare `_site/` to `migration/public/routes.json` and `migration/public/assets.json`, resolve internal HTML/CSS links and fragments, distinguish external failures, enforce output allowlists/provenance, and validate the sanitized privacy attestation. **Start:** Jekyll skeleton and synthetic manifests. **Done:** a failed route, missing asset, broken local reference, or prohibited output fails verification. **Verify:** `npm run verify -- --site _site` against passing and intentionally broken synthetic sites. **Rollback:** revert verification code/tests only; do not delete evidence or migrated output. <!-- sdd-owner: implementation -->
- [ ] Run the controlled inventory/import pipeline against the owner-approved WXR outside the checkout, reconcile the independent baseline, and promote only deterministic candidate files for `/legaldev/`, `/resumo-do-ultimo-birrastoming-comeza-o-curso/`, `/novo-meetup-big-data-e-gis/`, `/xantardev-06-abril-2018-testing-con-selenium-conociendo-rad-studio-c/`, and `/aniversario-2018/` into `_posts/` within the selected review slice. **Start:** privacy and delivery gates approved. **Done:** files, route-manifest records, and content-review notes agree. **Verify:** build, route checks, and rendered structural review of every listed post. **Rollback:** revert this measured content batch and its manifest updates only. <!-- sdd-owner: implementation -->
- [ ] Promote the next measured `_posts/` batch for `/summerdev-2018-06/`, `/xantarj-lo-prometido-es-deuda/`, `/xantardev-vuelve-el-23f/`, `/2019-03-marzaldev-gui-testing-y-oauth-en-webs-spa/`, and `/xantardev-iii-aniversario/`, splitting again before review if its measured diff exceeds the approved slice budget. **Start:** prior content batch is verified. **Done:** each route retains approved metadata and readable structures. **Verify:** build, manifest checks, and per-page rendered review. **Rollback:** revert only this batch and its manifest records. <!-- sdd-owner: implementation -->
- [ ] Promote the next measured `_posts/` batch for `/xantardev-datos-y-privacidad-edition/`, `/san-valentech/`, `/trabajar-en-remoto/`, `/lightning-talks/`, and `/seguimos-en-pie/`, preserving safe HTML and local references. **Start:** prior content batch is verified. **Done:** the batch is manifest-complete and exclusion scans remain clean. **Verify:** build, privacy, route, link, and per-page content review. **Rollback:** revert only this batch and corresponding manifest updates. <!-- sdd-owner: implementation -->
- [ ] Promote the final measured `_posts/` batch for `/xantardev-aniversario-iv-ii/`, `/lightning-talks-2024/`, `/lightning-talks-febrero-2025/`, `/xantoberfest-2025/`, and `/xantardez-desde-2016/`, splitting before review if actual generated content breaches the approved budget. **Start:** prior content batch is verified. **Done:** all 20 approved posts are present with no draft/private content. **Verify:** complete post baseline comparison, build, and content review. **Rollback:** revert only this batch and its manifest updates. <!-- sdd-owner: implementation -->
- [ ] Promote `xd.html` and `codigo-de-conducta.html` with their explicit root permalinks and approved metadata, then review both rendered pages against public evidence. **Start:** shared layouts and page candidates exist. **Done:** the two required pages render and required navigation resolves. **Verify:** production build, route/link/privacy checks, and desktop/mobile page comparison. **Rollback:** revert the two page sources and their manifest changes only. <!-- sdd-owner: implementation -->
- [ ] Acquire and promote only verified public files from the approved asset manifest into `wp-content/uploads/YYYY/MM/` in measured, hash-recorded path groups; halt rather than substitute when required resources are missing, conflicting, ambiguous, or over the approved footprint. **Start:** public classification, footprint decision, and acquisition checks pass. **Done:** every promoted path has matching evidence, type, bytes, and SHA-256. **Verify:** asset-manifest check plus representative rendered network inspection for old-origin independence. **Rollback:** remove only files introduced by the affected hash-recorded group and restore the prior manifest. <!-- sdd-owner: implementation -->
- [ ] Write `docs/authoring.md` and update `README.md` with the pinned local setup, preview/build/verify commands, frontmatter/permalink example, image placement/alt-text rules, and normal reviewed publishing workflow that never requires WXR import. **Start:** final source layout and commands are stable. **Done:** a maintainer can add a synthetic Markdown article and image on a nondeployed branch. **Verify:** follow the document verbatim through preview and verification. **Rollback:** revert documentation independently of site content. <!-- sdd-owner: implementation -->
- [ ] Write `docs/cutover.md` and add `.github/workflows/deploy.yml` for deployment of the already-verified build artifact with pinned actions, least Pages/OIDC permissions, and an owner-controlled environment; document recovery evidence, content freeze/reconciliation, live-manifest verification, containment, DNS-delay rollback, and the retained WordPress window. **Start:** all pre-publication checks and owner approvals are recorded. **Done:** deployment cannot occur from an unverified PR workflow and rollback is rehearsable. **Verify:** workflow review/dry validation and a documented non-public rollback rehearsal; perform live deployment only after separate owner authorization. **Rollback:** disable/revert deploy workflow or restore the known-good artifact/recorded WordPress hosting as authorized. <!-- sdd-owner: implementation -->

## HTML normalization slice

- **Work unit / PR boundary:** `html-normalization` (feature-branch-chain; auto-chain; 400-line budget).
- **Structured status consumed:** `gentle-ai.sdd-status` v2 reported `applyState: ready`, `nextRecommended: apply`, workspace `C:\projects\xantardev.org`, and that workspace as the allowed edit root. The native attempt was continued under token `sha256:633779ae6c5093a157d43e4ef1a1de5bdfa075e52166dab14396b210eedd9698`; `actionContext` had no mutation warning.
- **Completed persisted task:** the `normalize-content.*` implementation task is marked `- [x]` in `tasks.md` after passing focused and full synthetic tests.
- **Implementation:** added `parse5` 7.2.1 and a fragment normalizer that removes Gutenberg block comments while retaining their markup, strips scripts and event attributes, removes unsafe URL schemes, canonicalizes default-port xantardev.org HTTP(S) URLs in `href`, `src`, `poster`, and `srcset`, and entity-escapes Liquid opening delimiters for literal Jekyll output.
- **Files changed:** `.gitignore`, `package.json`, `package-lock.json`, `scripts/migration/normalize-content.js`, `test/migration/normalize-content.test.js`, `tasks.md`, and this progress file. `.pi/` is now ignored as local Pi runtime state.
- **Verification:** RED `node --test test/migration/normalize-content.test.js` failed only because the normalizer module was absent. GREEN focused test passed: 4 tests, 0 failures. Final `npm test` passed: 10 tests, 0 failures. `npm audit --omit=dev` reported 0 vulnerabilities. All new test inputs are invented HTML; no real WXR, generated posts/pages, or media downloads were used.
- **Deviation from design:** no importer integration, generated content, media acquisition, Jekyll configuration, deployment, or real XML read was added. `data:` URLs are removed rather than supporting an image-data allowlist.
- **Strict TDD:** disabled by `openspec/config.yaml`; this task nevertheless used RED then GREEN coverage across independent readable-structure, URL, unsafe-content, and Liquid cases.
- **Remaining tasks:** the exact unchecked implementation rows remain listed in the preceding cumulative section; this slice leaves all of them unchanged.

## HTML normalization hardening

- **Work unit:** `html-normalization-hardening` under token `sha256:6995b0e4744a3f30461dfeefe18fa333276bf59ae06a4325eb14c459c2f01f0b`.
- **Trigger:** independent verifier found blocking static gaps after native review was declined for this candidate: obfuscated executable schemes, `srcdoc`, and `template` content traversal.
- **Implementation:** URL scheme checks now decode numeric entities/control whitespace before protocol validation, `srcdoc` is dropped, and `template.content` is sanitized recursively.
- **Verification:** `npm test` passed: 11 tests, 0 failures. `npm audit --omit=dev` reported 0 vulnerabilities.
- **Remaining advisory:** robust standards-complete `srcset` parsing with comma-containing URLs remains a later hardening item; current importer rejects unsafe candidates and handles the WordPress-style candidates observed so far.

## HTML normalization URL-attribute hardening

- **Work unit:** `html-normalization-url-attribute-hardening` under token `sha256:0367448473c097290d551278b1c0921d94ed657c34b77c386229d5b8aa29f6de`.
- **Trigger:** follow-up verifier advisories on additional URL-bearing attributes and invalid numeric entity handling.
- **Implementation:** sanitizer now covers `action`, `formaction`, and object `data` attributes, and strips replacement characters from scheme probes so malformed entity obfuscation cannot hide executable protocols.
- **Verification:** `npm test` passed: 11 tests, 0 failures. `npm audit --omit=dev` reported 0 vulnerabilities.
