# Pre-proposal: migrate-wordpress-to-github-pages

**Status:** confirmed  
**Date:** 2026-09-14

## Confirmed decisions

- Migration source: official WordPress XML export, currently `ltxantardevgt.WordPress.2026-09-14.xml` at repository root.
- Static site engine: Jekyll is accepted as the proposed default unless proposal/design finds a blocking reason.
- Hosting target: GitHub Pages.
- Preserve URL boundary: static public URLs only.
  - Preserve `/`.
  - Preserve all published post root-level trailing-slash paths from the export.
  - Preserve published pages `/xd/` and `/codigo-de-conducta/`.
  - Preserve public resources under `/wp-content/uploads/YYYY/MM/<filename>` discovered from XML/live HTML.
- Not required: WordPress query-string aliases, dynamic search, dynamic admin/login/comments/XML-RPC/plugin behavior.
- Non-public content: exclude both the draft and private post from public output.
- Live public capture: authorized, including media inventory/acquisition planning.
- Design goal: maintain current WordPress Ample-inspired design closely enough to avoid a visible redesign.
- Future authoring goal: adding a new article manually must be simple, preferably by adding a Markdown/HTML file with frontmatter and images in a predictable folder.

## Proposal constraints

- No accidental publication of draft/private records.
- No broken public static article/page/resource URLs after cutover.
- Generated content must be auditable via a source-to-output URL manifest.
- Implementation must remain reviewable; split if forecast exceeds the 400-line review budget.

## Inputs for proposal

- `openspec/config.yaml`
- `openspec/changes/migrate-wordpress-to-github-pages/explore.md`
- `openspec/changes/migrate-wordpress-to-github-pages/research.md`
- `ltxantardevgt.WordPress.2026-09-14.xml`
