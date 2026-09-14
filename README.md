# website

## Migration foundation

WordPress inputs are controlled local material, not site source. Keep exports, exclusion audits, private fingerprints, staging/cache directories, and acquisition logs outside public contracts; the repository ignores the known export and these migration-only paths. See [migration input isolation](docs/migration.md).

The foundation uses Node's built-in test runner and only synthetic fixtures:

```sh
npm test
```

The migration command names are intentionally inert until their dedicated implementation slices and do not read real WXR inputs.
