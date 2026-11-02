---
name: xantardev-event-publisher
description: "Trigger: preparar evento XantarDev, redactar post de evento, crear cartel y tarjetas de charlas, generar JSON de redes sociales. Draft an event post, real artwork and per-talk social copy without publishing."
license: Apache-2.0
metadata:
  author: xantardev
  version: "1.0"
---

## Activation Contract

- Activate for reusable event drafting: Jekyll post, approved cover, one real social card per talk, and social JSON.
- Do not activate for illustration-only requests; use `../xantardev-image-generator/SKILL.md` instead. Never create an event merely to demonstrate this skill.

## Hard Rules

- Require confirmed event title, event date, start/end times, every talk's title/description/speaker, and Meetup registration URL. Clarify timezone if not Europe/Madrid and ambiguous end dates. Sponsorship is optional.
- Write instructions in English; write post/social copy in the requested language, default Spanish. Preserve confirmed proper names and talk titles. Never borrow anniversary, venue, pricing, capacity, timetable, food, bios, or networking claims from the sample.
- An invocation explicitly asking to create the event post/artifacts authorizes writing the requested post/media/JSON artifacts; do not ask for redundant approval. Otherwise request explicit authorization before writing them. Never automatically commit, push, deploy, publish, or post to social networks; those external actions require separate explicit authorization.
- Validate the supplied registration URL as an actual HTTPS Meetup event registration URL: require the exact host `meetup.com` or `www.meetup.com`, an event-specific `/events/<event-id>/` path, and no embedded credentials; confirm its destination matches the supplied event rather than inventing or repairing it. Safely serialize/escape user text for each written context (JSON, YAML, Markdown, HTML attributes and Liquid); keep user content literal, never executable Liquid or injected frontmatter/markup.
- Filename date is PUBLICATION date, not event date. At authorization, derive the actual publication date/time from a Europe/Madrid-aware clock; never infer it from the event or stale context. Ask if the clock is unavailable or scheduling is intended.
- Save approved real images before referencing them. Never fabricate paths, tool success, portraits, or verified typography. Exclude `rrss/` from Jekyll output; preserve other exclusions.

## Decision Gates

| Situation | Action |
| --- | --- |
| Required facts missing | Ask only for missing facts; do not draft claims. |
| No sponsor supplied | Omit post sponsor section; set JSON `sponsor` to `""`. |
| Sponsor supplied | Confirm name/link and wording; do not infer benefits or reuse site sponsors. |
| Cover needed | Read image skill and template; confirm its four contextual values. Explicitly request image mode (default is prompt-only); obtain approval of real cover. |
| No image tool | Request actual supplied cover and talk images, or return blocked with prepared prompts; do not write a supposedly complete post/JSON. |
| Text wrong or cannot inspect artwork | Report failure/unverified typography; obtain corrected artwork before completion. |

## Execution Steps

1. Read `_posts/2026-05-14-xantardez-desde-2016.md` for structure only, plus the image skill. Confirm inputs and authorization.
2. Use `assets/post-template.md`; derive publication timestamp at authorization and a unique slug. Propose `_posts/YYYY-MM-DD-slug.md` and matching `rrss/YYYY-MM-DD-slug.json` (post basename without `.md`). Never overwrite without approval.
3. Create/request the cover through the existing image skill. For EACH talk, use `assets/talk-card-prompt.md` with confirmed illustration theme, exact title, speaker and event date. Inspect spelling, accents, legibility, clipping and factual agreement; report defects, never silently accept them.
4. Save approved artwork under `wp-content/uploads/YYYY/MM/` using publication year/month and distinct descriptive filenames. Verify each real file exists and opens before adding frontmatter `image`, relative_url body images with meaningful alt, or JSON paths.
5. Draft event details and every talk description; include confirmed sponsor section only when supplied. Do not invent individual talk times.
6. Follow `assets/rrss-example.json`: exactly one X and one LinkedIn draft per talk, each with the registration URL and its matching saved card. Use plain JSON, no Liquid, comments, secrets or placeholders. Keep X within 280 characters (count URLs as 23); shorten rather than silently thread.
7. Parse JSON; verify talk counts, URL/image agreement, actual assets, publication/event distinction, frontmatter and unresolved placeholders. Run `git diff --check`; confirm `_config.yml` excludes `rrss/`. If build tooling exists, build to an isolated destination and verify no rrss output; otherwise report validation unavailable.

## Output Contract

- Return created/changed paths, per-talk draft counts, image/typography approval evidence, checks and unresolved gaps. Distinguish prompts from saved images; never claim completion with missing real artwork.
- Report registry refresh needed via `/skill-registry:refresh` when available; do not edit unrelated registry files without authorization.

## References

- `assets/post-template.md`
- `assets/talk-card-prompt.md`
- `assets/rrss-example.json`
- `../xantardev-image-generator/SKILL.md`
- `../../../_posts/2026-05-14-xantardez-desde-2016.md`
