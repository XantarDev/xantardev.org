# Proposal: migrate WordPress to GitHub Pages

**Change:** `migrate-wordpress-to-github-pages`  
**Phase:** proposal  
**Status:** proposed from confirmed product handoff  
**Execution:** auto · OpenSpec · ask-on-risk · 400 changed-line review budget

## Intent and problem

Replace the owner's WordPress site with a Jekyll site on GitHub Pages while keeping the public reading experience, historical links, and community identity intact. Readers arriving from social media or third-party links must still reach the same published articles, pages, and upload resources. Maintainers must be able to publish future articles through a small, predictable file-based workflow rather than operate WordPress.

The repository currently has no site implementation or build pipeline. The official export supplies content but not a complete media backup or theme: generated image variants and live layout details require additional public-site evidence. Treating the XML as a ready-to-publish site would risk broken media, changed presentation, and disclosure of non-public content.

## Proposed outcome

Use **Jekyll**, with explicit WordPress-compatible permalinks and static upload paths, on **GitHub Pages**. No concrete engine blocker was identified. Preserve legacy HTML when conversion to Markdown would lose meaning; use Markdown/frontmatter for straightforward future authoring. Build and deployment details belong to design, not this proposal.

This proposal follows the confirmed decisions in [preproposal.md](preproposal.md), superseding exploration's unresolved questions about query aliases and private content. No new product interview or publication authorization is inferred.

## Scope and migration boundary

| Area | Included |
|---|---|
| Source | `ltxantardevgt.WordPress.2026-09-14.xml`, subject to full parser validation; public live HTML/CSS and resource discovery supplement it, not replace its publication inventory. |
| Public content | 20 published posts and two published pages identified in exploration; preserve titles, dates, body meaning, attribution, and relevant metadata. |
| Required routes | `/`, all 20 root-level trailing-slash post paths listed in exploration, `/xd/`, and `/codigo-de-conducta/`. |
| Resources | Public `/wp-content/uploads/YYYY/MM/<filename>` resources discovered from XML, attachment metadata, and live public pages, including original files, resized images, `srcset` variants, linked downloads, featured images, and widget media. |
| Presentation | Close Ample-inspired reproduction: site identity, header/navigation, reverse-chronological blog listing, metadata, images, summaries, article/page layout, typography, and responsive sidebar/footer behavior. |
| Operations | Reproducible import, asset acquisition, source-to-output manifests, build/link/privacy verification, authoring instructions, and controlled cutover/rollback plan. |

### Non-goals

- WordPress query-string aliases (`?p=`, `?page_id=`), dynamic search, admin/login, comments, XML-RPC, or plugin execution.
- Publishing the draft or private post, or treating `wp_global_styles` as a public page.
- A visible redesign, editorial rewriting, a new CMS, or a proxy layer for legacy dynamic behavior.
- New category/tag/author/archive/feed routes as a preservation commitment. These are outside the confirmed boundary; navigation must not introduce broken local links to omitted routes.
- Preserving arbitrary external services or proving the existence of undiscoverable upload URLs. Unresolved evidence gaps must be documented, not presented as complete coverage.

## Preservation and privacy approach

1. Parse the export and validate publication status before emitting content. Use a published post/page allowlist rather than importing every record. Retain stable source IDs in controlled audit data for traceability.
2. Establish a route/resource manifest before import. Record source evidence, exact destination path, disposition, and verification result. Separate mandatory public entries, excluded records, unsupported route classes, and acquisition failures.
3. Set explicit root-level trailing-slash permalinks. Preserve resource directory, filename, case, and extension under `wp-content/uploads/`; normalize internal HTTP links to the canonical HTTPS origin without changing required paths.
4. Inventory all migrated public posts/pages and shared live layout media, not only the representative research samples. The 76 attachment originals and 103 XML upload references are discovery evidence, not a final asset count. Include derivatives found through live `srcset`, CSS, and featured/sidebar images.
5. Acquire resources deterministically and verify that each required path serves the intended usable file, not an error page. Rewriting a body reference does not remove the obligation to retain its discovered legacy resource path. Missing resources or conflicting paths block cutover until resolved or explicitly escalated to the owner.
6. Keep raw XML and excluded content out of public repository commits, generated site files, feeds, indexes, downloadable artifacts, and deployment logs. Audit exclusions without copying private bodies. Do not publish an attachment solely because it is exported: classify uncertain/private-only media before inclusion and escalate ambiguity rather than disclose it.

## Affected areas

- New Jekyll configuration, layouts, includes, styles, homepage, and page/post sources.
- Import and resource-acquisition tooling plus controlled migration manifests.
- Static upload tree and generated migrated content.
- Build/deployment configuration, verification checks, and maintainer documentation.
- Later hosting/custom-domain settings and WordPress operational retention; no DNS or hosting changes occur in this phase.

## Acceptance criteria

- [ ] Full XML parsing confirms the baseline of 20 public posts and two public pages; any inventory discrepancy is investigated before publication.
- [ ] The homepage and all 22 required content routes resolve successfully at their exact paths in generated output and after authorized deployment.
- [ ] Every required discovered upload path resolves to its intended usable resource; the source-to-output manifest has no unexplained omissions, failed downloads, or path collisions.
- [ ] All internal links and asset references in migrated content and templates resolve, or are explicitly classified as unsupported legacy behavior and removed/replaced in the visible UI. External failures are reported separately.
- [ ] Draft/private records and private-only material are absent from public source, build output, indexes, and deployment artifacts; controlled exclusion checks demonstrate this without exposing their bodies.
- [ ] All migrated articles/pages receive content review for text, headings, lists, tables, code, images, and embeds where present; lossy conversion or unsupported embeds receive a safe, understandable treatment.
- [ ] Desktop and mobile comparisons against captured WordPress references cover homepage, recent and older articles, both pages, and shared navigation/sidebar/footer. The owner accepts close visual continuity rather than an unintended redesign.
- [ ] A reproducible Jekyll build succeeds with documented tooling, and automated route/resource/link/privacy checks pass. Missing local Ruby/Bundler/Jekyll is resolved before claiming build validation.
- [ ] A maintainer can follow a documented example to add one article with frontmatter and images, preview it, and publish through the normal repository workflow without rerunning the migration.
- [ ] Cutover evidence and a tested/documented rollback procedure are reviewed before the owner authorizes publication or DNS changes.

## Cutover and rollback

Before cutover, retain a recoverable WordPress installation/backup and record existing domain/hosting settings. Establish a content freeze or reconcile changes since the export; do not silently overwrite newer live content. Complete the manifest, public-page visual comparisons, privacy checks, and production-equivalent build verification before requesting owner authorization.

After authorization, configure GitHub Pages and the custom domain/HTTPS as specified in design. Verify the canonical homepage, every required page/post path, and the complete acquired resource manifest on the deployed origin. Check representative desktop/mobile pages and confirm that public content no longer depends on the old WordPress origin for local media.

If required routes/resources fail, private material appears, or the build materially damages content/presentation, stop rollout and restore the recorded domain/hosting configuration to the retained WordPress service, or revert to the last known-good Pages deployment when applicable. DNS rollback is not instantaneous; retain the old service through an owner-approved verification window. For disclosure, remove the exposed artifacts and follow containment steps as well as restoring service. WordPress retirement and backup deletion require separate authorization.

## Risks and mitigations

| Risk | Mitigation / gate |
|---|---|
| Incomplete media inventory or unavailable derivatives | Crawl the bounded public content set, compare manifests, and block unresolved required-resource failures before cutover. |
| Accidental disclosure from export or attachments | Publication allowlist, controlled raw input, media classification, and checks of public source/output. |
| HTML/Gutenberg conversion changes content | Preserve HTML when needed and review every migrated page; do not execute WordPress/plugin code. |
| Visual evidence lacks screenshots | Capture desktop/mobile reference states before design acceptance; HTML/CSS research alone does not prove parity. |
| Theme/font/icon reuse obligations | Verify licenses and preserve required attribution or use compatible replacements before bundling assets. |
| Missing build tooling or hosting limits | Establish reproducible tooling; measure asset/build footprint against current Pages limits during design and escalate concrete blockers. |
| Source changes during migration | Freeze or reconcile live changes before final manifest sign-off. |
| Large generated-content and asset diff | Forecast total review workload and obtain a delivery decision before producing oversized implementation changes. |

## Review-workload strategy

Keep this proposal documentation-only. At tasks/design time, estimate handwritten code, generated content, media, and verification evidence separately and report total changed lines plus binary/media volume. Generated content is not silently exempt from the 400-line review budget.

Candidate review units are site skeleton/theme, import/privacy tooling, resource acquisition, content import, and verification/authoring/cutover documentation; these are planning boundaries, not an approved PR chain. Keep tests and relevant documentation with their owning behavior. Reviewers should inspect transformation rules and privacy filters first, then manifests and representative rendered output, with complete automated coverage of mandatory URLs.

A full migration is likely to exceed 400 changed lines. Under **ask-on-risk**, the parent paused after task forecasting and the owner selected `auto-chain` with `feature-branch-chain`; `size:exception` was not accepted. Publishing, destructive operations, privacy ambiguity, and scope expansion remain human-controlled gates even in auto mode.

## Next phase

Proceed to specification, then design of the importer, manifests, templates, tooling, and deployment verification. This phase implements nothing and makes no claim that assets have been downloaded, a Jekyll build has run, or DNS has changed.

## Evidence

- [Project standards](../../config.yaml)
- [Exploration and exact public route inventory](explore.md)
- [Open-web research and source references](research.md)
- [Confirmed product handoff](preproposal.md)
