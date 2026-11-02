# xantardev.org

Static Jekyll site for XantarDev, deployed with GitHub Pages.

## Local preview with Docker

```bash
docker compose up --build
```

Open <http://localhost:4000/>. The local Docker server uses the empty `baseurl` configured for the custom domain, `https://xantardev.org`.

## Event illustration skill

In Pi, run `/reload` after adding or changing the project skill, then request a prompt with:

```text
/skill:xantardev-image-generator Create a prompt for XantarDev 2027. Local element: Galician hórreo. Food: pulpo á feira. Background: Santiago de Compostela Cathedral.
```

Provide the event name, local or cultural element, food or gathering element, and landmark or landscape; the skill asks for any missing details. It returns a ready-to-use illustration prompt by default. To request an image, say so explicitly: image generation requires an available image tool, and any rendered event title must be checked for spelling. The skill does not publish a post or upload media. See [the skill instructions](.agents/skills/xantardev-image-generator/SKILL.md).

### Publish an event draft

After `/reload`, invoke the [event publisher skill](.agents/skills/xantardev-event-publisher/SKILL.md) with the event title, date, start and end times, each talk's title, description and speaker, and the real HTTPS Meetup registration URL. Sponsorship is optional. For example (fictional event and speaker):

```text
/skill:xantardev-event-publisher Create a draft for "XantarDev Demo 2027" on 12 June 2027, from 10:00 to 13:00 (Europe/Madrid).
Talk: "Testing APIs with Playwright". Description: "A practical introduction to API tests and reporting with Playwright." Speaker: "Example Speaker".
Meetup registration URL: <replace with the real HTTPS Meetup event URL>. No sponsor.
```

Replace the example URL and details with confirmed data before using it. The skill prepares a Jekyll post, a cover using `xantardev-image-generator`, one social card per talk, and one X and one LinkedIn draft per talk in `rrss/YYYY-MM-DD-slug.json` (the **post publication date and slug**, not the event date). `rrss/` is excluded from the public site. Real images require an available image tool or supplied artwork; prompts alone are not images. Nothing is automatically posted to social networks, committed or pushed.

## Crawler discovery

`jekyll-sitemap` generates `sitemap.xml` at the configured custom-domain URL: `https://xantardev.org/sitemap.xml`. After publication, submit that URL to Google Search Console; the local build does not establish that it is deployed or indexed.

Jekyll excludes internal `odd/` task documents and previous `_site/` output from builds. The sitemap plugin also generates `https://xantardev.org/robots.txt` at the host root, where it governs crawling for `xantardev.org` after publication.

## Social sharing metadata

Default SEO/Open Graph/Twitter metadata is generated from `_includes/head.html` using `_config.yml` values.

Per page or post you can override:

```yaml
description: "Short text for search engines and social cards"
image: "/wp-content/uploads/example/image.jpg"
social_image: "/assets/img/custom-social-card.png"
canonical_url: "https://xantardev.org/custom-url/"
noindex: true
```

Use `social_image` when the social preview image should be different from the article image. Relative image paths are converted to absolute URLs with the configured `url` and `baseurl`.
