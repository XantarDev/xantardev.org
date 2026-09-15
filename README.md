# xantardev.org

Static Jekyll site for XantarDev, deployed with GitHub Pages.

## Local preview with Docker

```bash
docker compose up --build
```

Open <http://localhost:4000/xantardev.org/>. The local Docker server uses the same `baseurl` as the current GitHub Pages project URL.

For the future custom domain, change `_config.yml` back to `url: "https://xantardev.org"` and `baseurl: ""` before cutover.
