# xantardev.org

Static Jekyll site for XantarDev, deployed with GitHub Pages.

## Local preview with Docker

```bash
docker compose up --build
```

Open <http://localhost:4000/xantardev.org/>. The local Docker server uses the same `baseurl` as the current GitHub Pages project URL.

For the future custom domain, change `_config.yml` back to `url: "https://xantardev.org"` and `baseurl: ""` before cutover.

## Crawler discovery

`jekyll-sitemap` generates `sitemap.xml` at the configured project URL: `https://xantardev.github.io/xantardev.org/sitemap.xml`. After publication, submit that URL to Google Search Console; the local build does not establish that it is deployed or indexed.

Jekyll excludes internal `odd/` task documents and previous `_site/` output from builds. The sitemap plugin also generates `/xantardev.org/robots.txt`, but this project-path file cannot govern host-level crawling: policy for `xantardev.github.io/robots.txt` is outside this project's control.

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
