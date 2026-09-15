# xantardev.org

Static Jekyll migration of the XantarDev WordPress site.

## Local preview with Docker

```bash
docker compose up --build
```

Open <http://localhost:4000/xantardev.org/>. The local Docker server uses the same `baseurl` as the current GitHub Pages project URL.

For the future custom domain, change `_config.yml` back to `url: "https://xantardev.org"` and `baseurl: ""` before cutover.

## Migration foundation

WordPress inputs are controlled local material, not site source. Keep exports, exclusion audits, private fingerprints, staging/cache directories, and acquisition logs outside public contracts; the repository ignores the known export and these migration-only paths. See [migration input isolation](docs/migration.md).

The foundation uses Node's built-in test runner and only synthetic fixtures:

```sh
npm test
```

The migration command names are intentionally inert until their dedicated implementation slices and do not read real WXR inputs.
