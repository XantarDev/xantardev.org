# xantardev.org

Static Jekyll site for XantarDev, deployed with GitHub Pages.

## Local preview with Docker

```bash
docker compose up --build
```

Open <http://localhost:4000/>. The local Docker server uses the empty `baseurl` configured for the custom domain, `https://xantardev.org`.

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
