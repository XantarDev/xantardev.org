# Migration input isolation

Keep the WordPress export and any exclusion audit outside the public migration contract. The known local export, WXR files, private fingerprints, audits, staging/cache directories, and acquisition logs are ignored by Git.

`migration/public/` is reserved for sanitized route and asset manifests. It must never contain excluded titles, bodies, URLs, author details, or private media evidence.

Run `npm test` to exercise synthetic-only privacy checks. The migration command names are intentionally inert until their later implementation slices; they do not consume WXR input in this foundation slice.
