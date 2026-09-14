# Exploration: migrate-wordpress-to-github-pages

**Phase:** explore  
**Date:** 2026-09-14  
**Artifact store:** OpenSpec  
**Evidence:** `openspec/config.yaml`, `README.md`, `.gitignore`, and the user-provided untracked `ltxantardevgt.WordPress.2026-09-14.xml`. The supplied public-homepage observations were used for the visual inventory; no live-site crawl or media download was performed.

## Repository and source validation

- The repository is intentionally near-empty: a one-line README and GitHub-Pages-oriented `.gitignore`; it has no site source, dependency manifest, CI, or test suite.
- The XML is a complete-looking WordPress eXtended RSS 1.2 document: XML declaration, WordPress 6.5.10 generator metadata, a `channel`, WordPress namespaces, and matching closing `channel`/`rss` elements.
- Its channel identifies `<XantarDev />`, `https://xantardev.org`, description `Comunidad Técnica`, and language `gl-ES`. Treat it as the authoritative *content inventory candidate* after later full parser validation, not as a complete asset backup.
- No existing change directory or prior explore artifact existed. The XML was read only and not changed.

## Content inventory

| Content type | Count | Public migration disposition |
|---|---:|---|
| Posts | 22 | 20 are published and public candidates; one draft and one private post require explicit owner direction and must not be published by default. |
| Pages | 2 | Both published: `/xd/` and `/codigo-de-conducta/`. |
| Attachments | 76 | Original image URLs are represented, almost entirely PNG/JPG/JPEG, across `2017/03` through `2026/05`. |
| Other | 1 | A published `wp_global_styles` record for theme `ample`; configuration, not a public content page. |
| Comments | 0 | No `wp:comment` records were exported. |
| Authors | 2 | Public author `xantardev` / XantarDev plus one non-public-record-associated author intentionally not named in public artifacts. |
| Categories | 2 | `eventos` / Eventos and `comunidad` / Comunidad; neither has a parent. |
| Tags | 6 | `.NET` (`net`), Entity Framework, `evento`, NuGet, Selenium, and `xantardev`. |

Published posts are dated from 2017-09-18 through 2026-05-14. Every public post in the export is authored by `xantardev`. Non-public record author details are intentionally omitted from public artifacts. No exported item is sticky. Content mixes Spanish and Galician.

### Public article permalink inventory

All of these are current root-level, trailing-slash paths and should be preserved exactly:

1. `/legaldev/` — 2017-09-18
2. `/resumo-do-ultimo-birrastoming-comeza-o-curso/` — 2017-10-04
3. `/novo-meetup-big-data-e-gis/` — 2018-01-23
4. `/xantardev-06-abril-2018-testing-con-selenium-conociendo-rad-studio-c/` — 2018-03-07
5. `/aniversario-2018/` — 2018-04-23
6. `/summerdev-2018-06/` — 2018-05-31
7. `/xantarj-lo-prometido-es-deuda/` — 2018-09-05
8. `/xantardev-vuelve-el-23f/` — 2019-02-10
9. `/2019-03-marzaldev-gui-testing-y-oauth-en-webs-spa/` — 2019-02-27
10. `/xantardev-iii-aniversario/` — 2019-04-22
11. `/xantardev-datos-y-privacidad-edition/` — 2020-01-13
12. `/san-valentech/` — 2020-02-01
13. `/trabajar-en-remoto/` — 2020-04-07
14. `/lightning-talks/` — 2020-05-03
15. `/seguimos-en-pie/` — 2021-11-19
16. `/xantardev-aniversario-iv-ii/` — 2022-04-26
17. `/lightning-talks-2024/` — 2024-11-17
18. `/lightning-talks-febrero-2025/` — 2025-02-07
19. `/xantoberfest-2025/` — 2025-09-17
20. `/xantardez-desde-2016/` — 2026-05-14

The published pages are `/xd/` ("¿Qué es XantarDev?", 2017-03-16) and `/codigo-de-conducta/` (2018-04-17).

### Non-public records requiring an owner decision

- Draft: source record ID 306 (no public slug). Title, author details, and body are intentionally omitted from public artifacts.
- Private: source record ID 567. Title, slug, body, and other identifying details are intentionally omitted from public artifacts.

Neither record belongs in a public GitHub Pages build unless the owner explicitly authorizes publication. The future URL manifest should still record their status so omission is auditable.

### Source-format observations

- The export contains legacy HTML and newer Gutenberg block comments, not clean Markdown. It includes tables/lists, headings, code blocks with language classes, inline `style` elements, WordPress image classes, external embeds/links, and absolute `http` and `https` internal URLs.
- Posts use attachment IDs for thumbnails; attachment metadata includes generated WordPress sizes such as `medium`, `thumbnail`, and `ample-featured-blog-small`.
- The XML lists original attachment URLs only. Post bodies also reference derivative filenames such as `*-300x225.*` and `*-1024x576.*`; these are separate preservation candidates not counted by the 76 exported originals.

## URL and resource preservation requirements

### Required static routes

1. Preserve each published page and article canonical root-level path above, including its trailing slash.
2. Preserve legacy WordPress query URLs recorded in item GUIDs, notably `/?p=<post-id>` and `/?page_id=<page-id>`, if the requirement truly covers all externally linked URLs. A static host cannot generally redirect arbitrary query strings without edge/proxy support; the exact expected behavior needs an explicit decision.
3. Preserve `/wp-content/uploads/YYYY/MM/<filename>` for every acquired original asset, retaining case, extension, and date directory. Both HTTP and HTTPS source links occur in content, so migrated HTML should normalize internal links to HTTPS while the canonical destination remains the same path.
4. Inventory and serve every referenced resized derivative that exists on the live site, or rewrite the migrated references and provide redirects/aliases where feasible. The export alone cannot prove the complete derivative set.
5. Preserve category, tag, author, feed, and search routes only after their externally visible URL forms are captured from the live site. Likely WordPress conventions include category/tag/author archives, `/feed/`, and query-based search, but they are not authoritatively enumerated by this export.

### Verification consequence

Later implementation must generate a source-to-output URL manifest before deployment. It needs canonical content paths, legacy IDs/query paths, attachment originals, in-body asset references, thumbnail derivatives, and archive/feed/search decisions. Validate output routes, internal links, and asset existence against that manifest before changing DNS or publishing.

## Visual inventory

The supplied homepage inspection establishes these current design constraints:

- WordPress 6.5.10 using the **Ample** theme.
- Roboto typography and Font Awesome iconography.
- A header/navigation that exposes `/xd/` and `/codigo-de-conducta/`.
- A blog-style homepage listing posts.

The export corroborates the theme through `ample_page_layout` metadata and `ample-featured-blog-small` thumbnails. Event posts consistently begin with wide promotional imagery and include sponsor logos, so listing cards must support a featured image, title, date, and excerpt/summary without distorting image proportions. Article pages need reliable rendering for images, headings, lists, tables, quotes, code, old HTML, and Gutenberg-derived markup.

No local theme stylesheet, screenshot, footer/sidebar markup, menu export, or public HTML capture is stored in this repository. Header structure, color values, spacing, breakpoint behavior, sidebar presence, footer content, and exact listing-card treatment therefore remain **unverified** and must be captured from the public site before design acceptance.

## Engine assessment

**Recommendation: retain Jekyll as the provisional engine.** It is the repository configuration's stated choice, aligns with GitHub Pages, supports hand-authored Markdown/front matter, and can emit root-level permalink paths for pages and posts. The current `.gitignore` is already Jekyll/GitHub-Pages oriented.

The engine does not solve every preservation need: GitHub Pages is static, while WordPress search and arbitrary query-string routes are dynamic. Jekyll also does not convert this heterogeneous XML safely by itself; a deliberate importer/normalizer and manifest verification are needed later. The environment described in `openspec/config.yaml` lacks Ruby, Bundler, and Jekyll, so local build validation requires a separate tooling setup step.

No alternate engine has a concrete advantage at this stage. A different generator would add an Actions-based build/deployment requirement while leaving the difficult issues—asset acquisition, source normalization, and dynamic URL policy—unchanged.

## Risks and decisions needed

| Risk | Impact | Required decision / mitigation |
|---|---|---|
| The exact asset universe is larger than the 76 attachment originals because posts reference WordPress-generated derivatives. | Broken historic images or social links. | Capture a URL manifest and acquire/verify assets before cutover; do not bulk-download during exploration. |
| GitHub Pages cannot natively match server-side WordPress search or arbitrary `?p=`/`?s=` behavior. | Strict “every URL” preservation is impossible without a defined fallback. | Owner must choose static alias coverage only, an edge/proxy redirect layer, or a revised preservation boundary. |
| Draft/private records exist in the source export. | Accidental disclosure if migration scripts publish all posts. | Owner must explicitly authorize inclusion; default is exclusion. |
| Source is mixed legacy HTML and Gutenberg markup with embedded styling and external links. | Mechanical conversion can alter semantics, styling, and links. | Design an idempotent importer with a content-review queue and preserve raw HTML where Markdown conversion is lossy. |
| Exact live visual details have not been captured in repository evidence. | A close visual reproduction cannot be objectively accepted. | Capture homepage, article, page, mobile, and any sidebar/footer states before final design. |
| No local Jekyll toolchain or test runner exists. | Build and migration checks cannot yet run locally. | Establish pinned Ruby/Bundler/Jekyll tooling and focused manifest/link checks before apply. |

## Recommended next step

Proceed to **proposal** only after the owner answers these publishing and routing decisions:

1. Exclude the identified draft and private posts, or explicitly approve either for public publication?
2. Does “preserve every existing public URL” require working `?p=`, `?page_id=`, search-query, author/category/tag, and feed URLs, and is an edge/proxy redirect layer acceptable if static GitHub Pages alone cannot supply them?
3. May the next phase capture the live site’s representative HTML/CSS/screenshots and produce a complete URL manifest, while still deferring bulk media download?

Once resolved, proposal should define the migration boundary, cutover strategy, authorization-safe content set, and acceptance evidence. Design should then specify the Ample-inspired templates and importer/asset-manifest architecture; implementation should be split into reviewable work units below the 400-line review budget.
