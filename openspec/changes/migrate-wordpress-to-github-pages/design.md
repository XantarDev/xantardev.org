# Design: preserve WordPress content on GitHub Pages

**Change:** migrate-wordpress-to-github-pages · **Phase:** design
**Session:** auto · openspec · ask-on-risk · 400 changed-line review budget
**Scope:** this website repository; no coding-agent package exists here.

## Decision and delivery gates

Build a self-contained Jekyll site using explicit legacy permalinks, an offline Node.js migration pipeline, and a classified resource manifest. Deploy only verified `_site/` output through GitHub Pages Actions. Migration inputs never enter CI or public source. Future authors use Markdown without running the importer.

This document specifies implementation, not completed import, build, download, visual acceptance, or publishing authorization. Full migration will exceed 400 changed lines. After the tasks forecast, the owner selected `auto-chain` with `feature-branch-chain`; implementation must proceed through measured review slices rather than one oversized diff.

Inputs: [proposal](proposal.md), [research](research.md), [exploration](explore.md), [configuration](../../config.yaml), and all four [specification domains](specs/). Existing implementation is only `README.md` and `.gitignore`; there are no application contracts to preserve.

## Architecture and trust boundaries

```text
Controlled workstation, outside checkout
  WXR export + excluded-record audit + private fingerprints
       | parse -> classify -> validate approved inventory
       v
  Public records + bounded public HTML/CSS evidence
       | normalize content       | discover/classify resources
       v                         v
  candidate posts/pages       asset manifest -> verified downloads
       \                         /
        -> privacy/route approval -> public source tree
                                     |
                          locked Jekyll build in CI
                                     |
                       output/link/asset/privacy checks
                                     |
                     owner-gated Pages artifact and deploy
```

Separate acquisition/import from the normal build. Neither Jekyll nor CI fetches WordPress or reads WXR. A failed or ambiguous migration stage leaves the previous approved public tree unchanged; candidate output is staged outside the checkout and promoted only after checks.

### Planned files and responsibilities

| Paths | Responsibility |
|---|---|
| `_config.yml`, `Gemfile`, `Gemfile.lock`, `.ruby-version` | Canonical HTTPS origin, empty baseurl, fixed compatible Jekyll/Ruby dependency set |
| `_posts/*.{html,md}`, `xd.html`, `codigo-de-conducta.html` | Public content, explicit permalinks and metadata |
| `index.html`, `_layouts/{default,post,page}.html` | Reverse-date homepage and shared reader views |
| `_includes/{header,footer,sidebar,post-card}.html`, `assets/css/site.css` | Evidence-based Ample-inspired presentation |
| `wp-content/uploads/YYYY/MM/*` | Verified originals, variants, downloads at exact legacy paths |
| `scripts/migration/`, `scripts/verify/`, `test/`, `package.json`, lockfile | Node import, acquisition, verification, synthetic tests |
| `migration/public/{routes,assets}.json` | Versioned public evidence/coverage contracts, excluded from Jekyll output |
| `docs/{authoring,migration,cutover}.md` | Maintainer workflow, reproduction and rollback |
| `.github/workflows/{verify,deploy}.yml` | Verify-only PR path and separately authorized deployment |
| `.gitignore`, `README.md` | Input exclusions, quick start, correct lockfile guidance |

Jekyll configuration excludes scripts, tests, migration manifests, docs, OpenSpec, dependency files, and local input/cache trees. An independent output allowlist verifies that exclusions actually worked. Ignore the known root XML immediately during implementation; move it outside the checkout only with permission. Do not delete or alter the original export.

## Contracts and transformation rules

### Route manifest

Versioned JSON contains `schemaVersion`, source inventory digest, and sorted entries with `sourceId`, `kind`, `sourcePath`, `destinationPath`, `outputFile`, public `evidence`, `disposition`, and verification status. Required dispositions distinguish `required-public`, `unsupported`, `collision`, and `failed`; excluded IDs/statuses/reasons belong in a separate controlled audit, not public content. No private titles, bodies, URLs, or author details enter diagnostics.

The mandatory baseline is `/` plus exactly the 20 post paths and two page paths enumerated in public-url-preservation/spec.md. Store this approved baseline independently of importer output: comparing output only with a manifest derived from that same output would miss dropped records. Parse full WXR and compare IDs/types/statuses/routes/counts; an inventory discrepancy blocks promotion.

Each migrated record has explicit `permalink: /legacy-slug/`, `layout`, safely serialized `title`, date, public author, categories/tags as applicable, source ID, optional featured image, and explicit excerpt. Map `/slug/` to `slug/index.html`, and `/` to `index.html`. Do not derive historical URLs from dates, titles, or Jekyll defaults. Reject duplicate routes, collisions with assets/homepage, invalid path segments and filesystem case-fold collisions before writing.

Preserve source publication dates using WXR local/GMT fields with documented timezone handling; verify calendar dates against the baseline. Configure Europe/Madrid only after checking source/live evidence. Disable future/draft publishing by default; unexpected future-dated approved records require reconciliation rather than silent omission. Author/category metadata is plain text unless its destination is supported; do not generate archive/feed routes or search/comment controls.

### Importer pipeline

Use Node.js, already available, with pinned namespace-aware XML and HTML parser dependencies, JSON/YAML serialization, and `node --test`. Select maintained parser versions during tooling setup; disable DTD/external entity resolution and reject unsupported declarations. Never parse XML or HTML with regex alone. Set input-size limits and emit sanitized error codes/record IDs, not parser source excerpts.

1. Validate full WXR channel identity and namespaces; reject malformed input and duplicate IDs.
2. Filter by both type (`post`/`page`) and status (`publish`), then require the approved public inventory. Attachments and configuration records cannot become posts.
3. Resolve only needed public authors, taxonomy and thumbnail metadata. Do not copy arbitrary metadata, credentials, emails, or serialized configuration.
4. Preserve public body HTML by default in `.html` posts/pages; forced Markdown conversion adds unnecessary loss. New articles use Markdown. Strip Gutenberg comments while retaining readable block markup.
5. Parse HTML to normalize canonical-site HTTP references into same-origin paths without changing path case or filenames. Handle `src`, `href`, `srcset`, poster and CSS URL references. Retain valid fragments and non-dynamic resource query semantics; classify query aliases rather than mistaking a successful homepage response for preservation.
6. Remove executable scripts, event handlers and unsafe URL schemes; review inline styles and supported iframe origins explicitly. Replace unsupported embeds/shortcodes with readable context and an approved safe external link, never plugin execution. Record every material transformation for human review.
7. Protect imported text from Liquid evaluation using per-document Liquid disabling supported by the pinned Jekyll version; test literal Liquid syntax in content. Escape metadata/excerpts in templates and avoid deriving excerpts by blindly truncating HTML.
8. Write deterministic UTF-8 files sorted by stable source IDs/routes, using stable serialization and no wall-clock fields. Track owned files and hashes; refuse to overwrite hand-edited output on rerun without an explicit reconciliation decision.

Raw HTML preservation does not mean unreviewed active content. Review every one of the 22 rendered content pages for text and structural fidelity after normalization.

### Resource inventory and acquisition

Asset JSON entries contain exact `path`, approved source URL, evidence references, classification (`public`, `private-only`, `ambiguous`), disposition, expected/observed MIME, bytes, SHA-256, acquisition result, and output verification. Keep private-only and ambiguous entries in controlled inventory; public manifests contain public evidence only. A sanitized aggregate report connects public coverage to exclusion counts without disclosing private names.

Discover references from every approved post/page, published-record attachment metadata, featured images, and all 23 public views including shared sidebar/footer. Parse live `srcset`, lazy image attributes, inline styles and referenced CSS `url()` values. Follow discovered public upload dependencies to a fixed point; record unavailable evidence and unresolved coverage gaps. The 76 attachment originals and 103 XML references are starting observations, not acceptance totals.

A public page reference or explicit owner classification establishes public eligibility. An attachment status, parent ID, or successful HTTP request alone is insufficient evidence. Classify unreferenced originals and private-associated media before acquisition/publication; escalate ambiguity. Keep originals related to public referenced derivatives in the inventory for evidence-based classification, not automatic exclusion or publication.

Download only manifest-approved URLs from an explicit origin allowlist into controlled staging. Apply bounded concurrency, timeout, size limits and bounded retries; validate redirect targets on every hop, rejecting non-HTTP schemes, credentials and private-network destinations. Preserve destination path exactly; strip query strings only for canonical identity when evidence establishes the same resource. Reject traversal, encoded separators, double-decoding hazards, unexpected path prefixes and destination collisions, including Windows case-insensitive collisions.

Validate response success, file signatures/decodability for images, expected resource type and nonempty bytes. Reject HTML error documents even with HTTP 200. Different bytes for one destination are a blocking collision. Reuse an existing file only when its recorded hash matches. Write atomically; record failed acquisitions without publishing partial files. Do not regenerate missing derivatives or rewrite away preservation obligations. An unavailable required asset blocks cutover pending owner resolution.

## Privacy architecture and existing evidence risk

Use defense in depth: outside-checkout source input, ignore rules, publish-status allowlist, controlled staging, sanitized audits/logs, public source scanning, explicit build exclusions and output allowlist. Synthetic fixtures use invented draft/private text; real excluded bodies never enter tests.

A controlled pre-publication checker compares source/output text (including decoded/normalized HTML), filenames and media hashes against excluded records and private-only resource evidence. Keep titles, distinctive body fragments, fingerprints and detailed findings outside the repository. Report only record ID, reason and pass/fail. Hash-only exact matching is insufficient for transformed text; combine fragment checks with source-provenance and emitted-record allowlists. Persist a sanitized attestation tied to source-tree and output digests; rerun controlled checks if imported content or media changes. CI verifies the public structural/provenance rules and attestation applicability without receiving raw XML or private fingerprints.

**Privacy resolution:** after design identified that public artifacts quoted excluded record titles, the owner selected public-artifact sanitization. OpenSpec artifacts now reference excluded source records by source IDs only. Excluding `openspec/` from `_site/` still prevents web delivery, but public repository safety also requires keeping the raw WXR and any private fingerprints outside commits, CI logs, generated manifests, and deployment artifacts. Do not delete or rewrite history without separate authorization if private material is ever committed or published.

## Ample-inspired layout strategy

Research establishes `<XantarDev />`, `Comunidad Técnica`, Ample/ThemeGrill styling, Roboto/Font Awesome usage, two navigation destinations, metadata-rich article cards, featured derivatives and sponsor widgets. It does not establish exact dimensions, colors or responsive breakpoints; do not invent those as verified facts.

Capture bounded public HTML/CSS and desktop/mobile screenshots for `/`, `/xantoberfest-2025/`, `/legaldev/`, `/xd/`, and `/codigo-de-conducta/`. Record viewport, capture date, relevant selectors, computed typography/spacing, sidebar position and menu/footer states. Keep approved public visual evidence separate from raw WXR. Compare the same viewports in the static build, including open mobile navigation and long-content/table/code behavior.

Implement a small local theme rather than loading the WordPress stylesheet wholesale: shared semantic header/nav, main content/sidebar wrapper, article cards, page/post content and footer. Order all 20 homepage entries newest-first initially; no pagination route commitment is introduced. Preserve applicable featured imagery, aspect ratios, excerpts, dates, authors and categories. Scope legacy block/table/code styles to content; ensure overflow handling, focus states and accessible mobile navigation. Never display working-looking links to omitted archives or search.

Record theme/font/icon licenses before bundling third-party material and retain required attribution. Prefer licensed local assets or compatible replacements over runtime WordPress/external font dependencies. Owner visual review must resolve material differences; HTML/CSS evidence alone is not parity acceptance.

## Build and verification

Choose GitHub Actions artifact deployment over implicit branch builds so the tested dependency lock and verification gates govern the actual published bytes. Pin Ruby, Bundler, Jekyll and Node versions during setup, commit both lockfiles, and update `.gitignore`'s obsolete lockfile advice. Keep plugins minimal; no custom server behavior is required. Build with `JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter`; document matching local preview via `bundle exec jekyll serve`.

| Layer | Required evidence |
|---|---|
| Unit | Mixed-status WXR, malformed XML/entities, missing/duplicate IDs, baseline mismatch, date conversion, literal Liquid, unsafe HTML, srcset, path traversal/case collision, sanitization and log redaction |
| Import integration | Synthetic WXR to deterministic staged content/manifests; repeated run unchanged; failed validation produces no promoted output; edited files protected |
| Acquisition integration | Stub HTTP server: redirects, timeout/retry, wrong MIME, HTML-200, missing derivatives, changed bytes, ambiguous/private resources never downloaded |
| Real production build | Establish Ruby/Bundler locally or documented supported container; clean dependency install and actual successful Jekyll build; CI alone does not justify claiming an unrun local build |
| Routes/resources | Independent approved 23-route baseline mapped to correct rendered identities; all required assets exist at exact case-sensitive paths with matching bytes/types/hashes |
| Internal references | Parse every generated HTML/CSS page for links, fragments, images/srcset, downloads and styles; resolve relative/canonical URLs, detect omitted dynamic classes, report external failures separately |
| Privacy | Controlled real-input preflight plus public-source/output allowlist, prohibited-file checks, record provenance, sanitized attestation; inspect artifact contents and logs before upload |
| Content/visual | Review all 22 content pages; desktop/mobile reference matrix for five representative views and shared states, with owner disposition of differences |
| Authoring | Maintainer creates a sample Markdown article/image on a nondeployed branch, previews it, runs verification and follows the documented PR workflow without import |
| Live origin | After authorization, GET all required routes/resources, verify corresponding content and resource hashes/types, inspect desktop/mobile network requests for old-origin dependence |

Planned command interfaces: `npm test`, `npm run migration:inventory -- --input <outside-path>`, `npm run migration:import -- --input <outside-path>`, `npm run migration:assets`, and `npm run verify -- --site _site`. Tooling tasks define flags and fixtures before implementation; these commands do not exist yet. No existing runner or build has been executed in design.

PR CI performs tests, build and static checks without deployment permission or real private inputs. Deployment uses the same verified output artifact, minimal Pages/OIDC permissions, pinned action revisions and an owner-controlled environment gate. Do not enable public preview publication implicitly. Measure total bytes, largest asset, file count and build time against current GitHub Pages/repository limits before approving bulk acquisition and deployment; any concrete limit blocker returns for an owner decision.

## Authoring, cutover and rollback

Authoring documentation provides `_posts/YYYY-MM-DD-slug.md` with title, date/timezone, layout, explicit root permalink, public author/category, excerpt and optional featured image. Add new images under documented dated uploads paths with collision checks and alt text; preserve existing migration manifests as the historical baseline while verifying new routes normally. Preview and submit a normal reviewed commit; no XML, WordPress credentials or import rerun is needed.

Before cutover: capture recoverable WordPress backup and domain/hosting settings; freeze content or reconcile live changes since export; complete route/resource/privacy/content/visual evidence; record output digest, tool versions, footprint and owner approvals. Keep hosting restoration instructions and backup access in controlled operational records, not public docs.

Only after publication/custom-domain/DNS authorization, configure Pages with `url: https://xantardev.org`, `baseurl: ''`, the approved domain configuration and HTTPS. Check current DNS/TLS prerequisites at execution time; do not invent records here. Run complete live verification, not only homepage smoke tests. Keep WordPress recoverable for the owner-approved window.

Required-path failure, disclosure or material rendering damage stops rollout. Restore recorded DNS/hosting to retained WordPress or revert to a known-good Pages artifact; rehearse the rollback checklist before cutover and document DNS propagation delay. Disclosure also requires disabling/removing affected public artifacts, assessing logs/caches/history and authorized cleanup. Retirement and backup deletion require separate consent.

## Alternatives and tradeoffs

| Decision | Benefit | Cost / rejected alternative |
|---|---|---|
| Explicit Jekyll permalinks | Native static output and simple manual authoring | More frontmatter than defaults; defaults risk dated URLs |
| HTML-first historical import | Preserves mixed WordPress structures | Needs sanitization/CSS and human review; wholesale Markdown conversion is lossy |
| Offline Node migration | Uses available runtime and keeps private input out of CI | Adds a second toolchain alongside Ruby |
| Exact-path asset copies | Preserves external links independently of body rewriting | Larger media footprint; originals-only or rewritten links omit derivatives |
| Local Ample-inspired theme | Small auditable static presentation | Requires evidence capture and comparison; wholesale theme reuse adds PHP/runtime/license complexity |
| Actions artifact deployment | Verified locked build equals deployed output | More workflow setup than branch Pages; authorization remains explicit |

## Work units and review budget

Estimates include tests and owning documentation, not just handwritten runtime code. Actual additions plus deletions must be measured before each review. Target at most 350 lines per unit to leave correction room; split further when estimates fail.

| Candidate unit | Estimated changed lines | Boundary |
|---|---:|---|
| Input isolation, privacy gate and synthetic harness | 180–320 | Ignore/output rules, privacy tests, handling docs |
| Route/schema and public-record parser | 250–350 | Parsing/filtering and tests; split schema/parser if needed |
| HTML normalization | 250–350 | Transformations, fixtures and review notes |
| Asset discovery/classification | 250–350 | Evidence rules and tests |
| Asset downloader | 250–350 | Safe fetching, bytes validation and tests |
| Locked Jekyll skeleton | 150–280 | Config, dependency/workflow base, build smoke test |
| Shared theme and listing | 250–350 each | Separate shared structure from content/responsive styling |
| Output/link verification | 250–350 each | Separate route/resource checks from link/privacy checks |
| Generated posts/pages and manifests | Unknown; likely several thousand | Batch by measured lines; generated text is not exempt |
| Acquired assets | Unknown binary bytes/count | Separate byte/count/hash/contact-sheet evidence; no zero-cost assumption |
| Deploy/authoring/cutover procedures | 200–350 | Tests and documented rehearsal with operational gates |

Total exceeds one 400-line review by a wide margin even before generated content. Chain strategy is selected as `feature-branch-chain` after the tasks forecast. `size:exception` was not accepted. Lockfiles, snapshots and privacy remediation also count. Keep tests/docs with their owning behavior in any subsequently approved plan.

## Next phase and unresolved gates

Proceed to implementation only through the selected chained delivery strategy, with the following explicit gates preserved: raw WXR/public-history privacy handling; complete public resource classification and footprint; reproducible Ruby toolchain; captured visual evidence/license review; content reconciliation; and owner-controlled publishing/DNS/retirement decisions. No unresolved technical choice justifies publishing ambiguous material or silently widening route scope.
