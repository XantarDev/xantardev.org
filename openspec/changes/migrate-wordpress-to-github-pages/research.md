# Research: migrate-wordpress-to-github-pages

**Phase:** research  
**Date:** 2026-09-14  
**Artifact store:** OpenSpec  
**Selected class:** open-web  
**Status:** completed by parent fallback after `sdd-research` child reported missing child-local web tools and OpenSpec scope mismatch.

## Tool calls and sources

| ID | Tool | Source URL / input | Purpose |
|---|---|---|---|
| S1 | `web_search` | `site:xantardev.org xantardev.org XantarDev Comunidad Técnica`; `site:xantardev.org/wp-content/uploads xantardev.org WordPress uploads XantarDev` | Discover public site pages and indexed upload references. |
| S2 | `source_check` | Claim about WordPress/Ample/public routes constrained to `xantardev.org` | Cross-check site identity; result was low-confidence for theme/version because search snippets do not expose head markup. |
| S3 | `fetch_content` raw | `https://xantardev.org/` | Capture homepage HTML and WordPress/theme references. |
| S4 | `fetch_content` raw | `https://xantardev.org/xantoberfest-2025/` | Capture representative recent post HTML and image derivative references. |
| S5 | `fetch_content` raw | `https://xantardev.org/legaldev/` | Capture representative older post HTML. |
| S6 | `fetch_content` raw | `https://xantardev.org/xd/` | Capture representative page HTML. |
| S7 | `fetch_content` raw | `https://xantardev.org/codigo-de-conducta/` | Capture code-of-conduct page HTML. |
| S8 | `fetch_content` raw | `https://xantardev.org/wp-content/themes/ample/style.css` | Capture current theme stylesheet evidence. |
| S9 | `get_search_content` | Response `mu1ohpor0qgelc`, homepage and CSS passages | Extract exact passages for claims. |
| S10 | local XML scan | `ltxantardevgt.WordPress.2026-09-14.xml` | Count upload references, attachment originals, and derivative references. |

Retrieval time: 2026-09-14 in this Pi session. Publisher/site identity: `xantardev.org`, owned by the user per project instruction.

## Claims and evidence

### C1 — The live site is WordPress using the Ample theme

Evidence:

- S3/S9 homepage head contains `wp-content/themes/ample/style.css?ver=6.5.10` and `<meta name="generator" content="WordPress 6.5.10" />`.
- S8/S9 theme stylesheet begins with `Theme Name: Ample`, `Author: ThemeGrill`, and theme metadata.

Migration consequence: reproduce an Ample-inspired static layout instead of inventing a new design. Keep the visible identity, typography, spacing, header/nav structure, listing cards, article layout, and sidebar/footer behavior close to the current site.

### C2 — Header/navigation public routes are `/xd/` and `/codigo-de-conducta/`

Evidence:

- S3/S9 homepage body contains `<h1 id="site-title">` linking to `https://xantardev.org/`, site title `&lt;XantarDev /&gt;`, description `Comunidad Técnica`, and menu links to `https://xantardev.org/xd/` and `https://xantardev.org/codigo-de-conducta/`.

Migration consequence: keep those page paths root-level with trailing slash and keep them in the main nav.

### C3 — Homepage is a blog listing of post cards with metadata, featured images, summaries, and read-more links

Evidence:

- S3/S9 homepage contains repeated `<article id="post-..." class="post ... hentry category-eventos">` blocks.
- The Xantoberfest listing block contains title link `/xantoberfest-2025/`, author `XantarDev`, date metadata, category `Eventos`, featured image `wp-content/uploads/2025/09/image-2-710x300.png`, summary text, and a `Read more` button.

Migration consequence: Jekyll index should render a post collection in reverse chronological order with title, date, category, author, featured image when available, excerpt, and read-more CTA.

### C4 — Article pages use WordPress/Gutenberg HTML and multiple image size variants

Evidence:

- S4/S9 recent post body contains `body class="post-template-default single single-post postid-737..."`.
- S4/S9 includes an image link to `wp-content/uploads/2025/09/image-2.png` and an `<img>` source `image-2-1024x576.png` with `srcset` variants `image-2-300x169.png`, `image-2-768x432.png`, `image-2-1536x864.png`, and the original `image-2.png`.
- S4/S9 also shows sidebar/widget sponsor media references under `wp-content/uploads/2025/09/image-1-1024x322.png` and variants.

Migration consequence: the importer should preserve HTML when Markdown conversion is lossy, preserve or rewrite `srcset` deterministically, and acquire every referenced `/wp-content/uploads/...` path, not only WordPress attachment originals.

### C5 — The XML export alone is not a complete asset universe

Evidence:

- S10 XML scan found 103 distinct upload references in XML content, 76 unique `<wp:attachment_url>` originals, and 15 derivative filename references matching `-WIDTHxHEIGHT.ext`.
- S4 live HTML shows additional generated derivatives in `srcset`, including several sizes for a single image.

Migration consequence: build a URL/resource manifest from both XML and live HTML, then download/verify assets into `wp-content/uploads/...` before cutover.

### C6 — Search/query URL behavior is outside the selected preservation boundary

Evidence:

- Owner decision after explore: static URLs only. Preserve published post/page root paths and `/wp-content/uploads/...` resource paths; do not require WordPress query-string URLs, search query behavior, or dynamic server-side routes.

Migration consequence: GitHub Pages-only deployment is acceptable. `/?p=...`, `/?page_id=...`, and search query behavior may be documented as unsupported legacy dynamic behavior unless a later decision adds redirects/proxy support.

### C7 — Non-public export records must remain unpublished

Evidence:

- Explore artifact identified one draft record and one private record by source IDs only; titles, slugs, author details, and bodies are intentionally omitted from public artifacts.
- Owner decision after explore: exclude both.

Migration consequence: importer must filter to published posts/pages only by default and should emit an audit note for excluded non-public records.

## Static URL preservation boundary

Must preserve:

- Published post paths listed in `explore.md`.
- Published page paths `/xd/` and `/codigo-de-conducta/`.
- Public static asset/resource paths under `/wp-content/uploads/YYYY/MM/<filename>` discovered from XML content, attachment metadata, and representative live HTML.
- Root homepage `/`.

Not required in this migration unless later changed:

- WordPress query string aliases like `/?p=123` or `/?page_id=2`.
- Dynamic search query behavior.
- Server-side WordPress admin, comments, login, XML-RPC, or plugin behavior.

Open design question for proposal/design:

- Whether to generate static category/tag/author/archive/feed pages as convenience routes. They are static and feasible, but not part of the strict owner-selected preservation boundary unless listed as public static URLs to preserve.

## Design implications

Recommended engine remains **Jekyll**:

- Native GitHub Pages support.
- Simple manual authoring with `_posts/YYYY-MM-DD-slug.md` and frontmatter.
- Root-level post permalinks can be set with `permalink: /slug/`.
- Static assets can live at `wp-content/uploads/...` to preserve URLs.

Implementation should be split into reviewable work units:

1. Site skeleton/theme: layouts, CSS, navigation, homepage listing, article/page templates.
2. Migration tooling: XML parser/importer, content filters, URL manifest generation, Markdown/HTML output.
3. Asset acquisition: download/verify `/wp-content/uploads/...` paths from manifest.
4. Generated content import: posts/pages/assets from the export.
5. Verification: build, URL manifest comparison, internal links, asset existence, no non-public records.

## Proposal readiness

`proposal_ready: true`

Resolved product decisions:

- Source is the official WordPress XML export already present in the repository root.
- Exclude draft/private records.
- Preserve static URLs only.
- Capture/use live public HTML/CSS and media references.
- Jekyll remains the proposed engine.

Known risks for proposal:

- Local Ruby/Bundler/Jekyll toolchain is not currently available in this environment.
- Full media download can be large; implementation should first generate a manifest and then fetch assets deterministically.
- Exact visual parity is approximate unless screenshots are added later; current evidence is HTML/CSS based.
