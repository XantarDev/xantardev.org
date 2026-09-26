# SEO discoverability

Objective: Improve search and AI-crawler discoverability of the existing Jekyll site without changing its public host or publishing anything.

Problem: The site has centralized social/canonical metadata but lacks an explicit crawl discovery policy, article structured data, and consistently meaningful summaries. AI search also depends on accessible, descriptive HTML, not a guaranteed special crawler file.

Scope: Current GitHub Pages project URL remains configured. Add verified sitemap/robots discovery signals; improve semantic titles, summaries and article metadata in shared templates and representative content. Avoid bulk rewriting posts, speculative `llms.txt`, invented claims, or custom-domain cutover. No push until the owner reviews local changes. Preserve existing routes and design.

TDD: off (no project/session TDD configuration found); runner: `docker compose run --rm site bundle exec jekyll build` when available, plus targeted inspection of generated HTML. Ruby/Bundler unavailable on host; Docker present. If Docker fails, report unavailable checks rather than claiming success.

Delivery: ask-on-risk; forecast ~160 authored changed lines, excluding generated `_site/`. Branch: `feat/seo-discoverability` from `main` at `1e45b48`. Target: reviewable local work-unit commits, no push or PR.

## Tasks
- [x] SEO-1: Enable sitemap and exclude internal task/build directories. Checks: Docker Jekyll build passed; fresh build confirmed project-host sitemap, plugin-generated robots sitemap pointer, no `odd/` output or sitemap entry; independent verifier confirmed. Project-path robots does not set host policy. Commit: `932b8c6` (`feat(seo): publish sitemap without internal task pages`). Assessment: unassessable (native assess returned empty output); independent verification passed.
- [x] SEO-2: Add descriptive home intro, post summaries, Article JSON-LD and semantic heading/date markup, correcting a legacy duplicate H1. Checks: Docker Jekyll build passed; 26 generated HTML pages with one H1 each, 20 parseable Article JSON-LD descriptions matching nonempty meta descriptions (<=160 characters), sitemap excludes `odd/`; independent verifier found duplicate H1, fix applied and rebuild/readback passed. Commits: `d3fb083` (`feat(seo): add article context and descriptive summaries`), `6d0d836` (`fix(seo): keep sharing heading below article title`). Assessment: unassessable (native assess empty output); native START refused before lineage (candidate-target-projection-drift); independent verifier plus focused spot check used as fallback.

## Progress
- Exploration mapped `_config.yml`, `_includes/head.html`, layouts, homepage, and GitHub Pages dependencies. `jekyll-sitemap` is in the locked `github-pages` dependency tree; generated sitemap and project-path robots were verified locally.
- User selected both URLs without migrating: retain current canonical configuration until a later cutover decision.
- Docker Desktop started; both work units committed locally. Current titles do not cover HTML-sensitive JSON-LD escaping; no published URL, indexing, Google Search Console or AI crawler behavior checked. RDD native assessment/START unavailable; no lineage/approval or review receipt. No push or PR; next: owner reviews local diff before any push.
