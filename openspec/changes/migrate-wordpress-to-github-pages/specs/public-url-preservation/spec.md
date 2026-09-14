# Public URL Preservation Specification

## Purpose

Preserve the confirmed public static URL boundary when the site moves from WordPress to GitHub Pages.

## Requirements

### Requirement: Required content routes remain available

The deployed site MUST serve the homepage `/`, the published pages `/xd/` and `/codigo-de-conducta/`, and each of these root-level trailing-slash article paths:

`/legaldev/`, `/resumo-do-ultimo-birrastoming-comeza-o-curso/`, `/novo-meetup-big-data-e-gis/`, `/xantardev-06-abril-2018-testing-con-selenium-conociendo-rad-studio-c/`, `/aniversario-2018/`, `/summerdev-2018-06/`, `/xantarj-lo-prometido-es-deuda/`, `/xantardev-vuelve-el-23f/`, `/2019-03-marzaldev-gui-testing-y-oauth-en-webs-spa/`, `/xantardev-iii-aniversario/`, `/xantardev-datos-y-privacidad-edition/`, `/san-valentech/`, `/trabajar-en-remoto/`, `/lightning-talks/`, `/seguimos-en-pie/`, `/xantardev-aniversario-iv-ii/`, `/lightning-talks-2024/`, `/lightning-talks-febrero-2025/`, `/xantoberfest-2025/`, and `/xantardez-desde-2016/`.

#### Scenario: Published content route is requested

- GIVEN a visitor requests any required content route
- WHEN the deployed site responds
- THEN the response MUST be successful at that exact path
- AND the route MUST render the corresponding public content

### Requirement: Public upload resources retain their legacy paths

The deployed site MUST serve every required public resource discovered from the approved XML export, attachment metadata, migrated content, live public HTML, and live shared layout references. Each resource MUST retain its `/wp-content/uploads/YYYY/MM/<filename>` path, including its date directory, filename case, and extension.

#### Scenario: Discovered original or derivative resource is requested

- GIVEN the resource manifest marks an upload resource as required
- WHEN its legacy path is requested from the deployed origin
- THEN the response MUST be successful
- AND the served resource MUST be usable rather than an error document or unrelated file

### Requirement: Resource preservation is auditable

The migration MUST maintain a source-to-output manifest that identifies each mandatory content route and resource, its source evidence, destination path, disposition, and verification result. The manifest MUST distinguish required public entries, excluded records, unsupported route classes, acquisition failures, and path collisions.

#### Scenario: Manifest verification completes before cutover

- GIVEN the migration inventory and generated site output are available
- WHEN required routes and resources are compared with the manifest
- THEN every required entry MUST have a successful verification result
- AND no unexplained omission, acquisition failure, or path collision MAY remain

### Requirement: Local references remain resolvable

Migrated content and shared site UI MUST NOT introduce unresolved internal page or asset references. Internal references to preserved WordPress resources MUST use the canonical HTTPS origin or an equivalent same-origin path without changing the required resource path. Unsupported dynamic WordPress behaviors MUST be absent from visible local navigation or explicitly presented as unsupported rather than linked as working local functionality.

#### Scenario: Internal-link verification examines generated output

- GIVEN the generated site contains migrated content and shared UI
- WHEN internal page and asset references are checked
- THEN each reference MUST resolve to a supported local route or resource
- AND external-link failures MUST be reported separately from local preservation failures

### Requirement: Dynamic WordPress URLs remain outside the preservation boundary

The migration MUST NOT represent WordPress query-string aliases, dynamic search, admin, login, comments, XML-RPC, plugin behavior, or unenumerated archive/feed routes as preserved functionality. The migration MAY document these exclusions.

#### Scenario: A legacy query URL is evaluated

- GIVEN a WordPress query-string alias such as `/?p=123` or `/?page_id=2`
- WHEN preservation compliance is evaluated
- THEN the alias MUST NOT be counted as a required preserved route
