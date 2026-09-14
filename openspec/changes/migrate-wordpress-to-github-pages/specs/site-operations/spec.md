# Site Operations Specification

## Purpose

Ensure maintainers can operate the static site safely and that deployment changes preserve recoverability.

## Requirements

### Requirement: Future article authoring is documented and independent of migration

Maintainers MUST be able to add a future article through a documented, predictable file-based workflow using frontmatter and Markdown or retained HTML where appropriate, with images placed at documented paths. The workflow MUST support local preview and the normal repository publishing process without rerunning the WordPress migration.

#### Scenario: A maintainer publishes a new article

- GIVEN a maintainer follows the authoring documentation
- WHEN the maintainer adds an article with required frontmatter and images
- THEN the article MUST be previewable before publication
- AND it MUST be publishable through the normal repository workflow without rerunning migration steps

### Requirement: Build and deployment verification are reproducible

The site MUST have documented, reproducible build tooling suitable for the selected GitHub Pages deployment. Before publication, automated verification MUST include a successful production-equivalent build, manifest comparison, internal-link checks, required-resource checks, and privacy checks.

#### Scenario: Pre-publication verification runs

- GIVEN the approved migration inputs and site source are available in a supported build environment
- WHEN the documented verification procedure runs
- THEN the production-equivalent build MUST succeed
- AND all required route, resource, internal-link, manifest, and privacy checks MUST pass

### Requirement: Deployment verification confirms the live origin

After authorized deployment, verification MUST confirm the canonical homepage, every required page and article route, and every required acquired resource on the deployed origin. The deployed site MUST NOT depend on the former WordPress origin for preserved local media.

#### Scenario: The authorized deployment is verified

- GIVEN the site has been deployed to its intended public origin
- WHEN post-deployment verification runs
- THEN all manifest-required paths MUST resolve successfully on that origin
- AND representative desktop and mobile views MUST load preserved local media without requests to the former WordPress origin

### Requirement: Cutover is owner-authorized and reversible

Cutover, custom-domain changes, DNS changes, WordPress retirement, and backup deletion MUST require separate owner authorization. Before requesting cutover authorization, the migration MUST retain a recoverable WordPress installation or backup, record current domain and hosting settings, reconcile or freeze content changed since export, and document rollback steps. Required route/resource failures, private-material disclosure, or material content or presentation damage MUST stop rollout.

#### Scenario: Cutover readiness is evaluated

- GIVEN the migration is proposed for public cutover
- WHEN readiness evidence is reviewed
- THEN owner authorization MUST be recorded before publishing or changing DNS
- AND retained recovery information, reconciliation status, verification evidence, and rollback instructions MUST be available

#### Scenario: A rollout failure is detected

- GIVEN a required route or resource fails, private material appears, or material damage is discovered during rollout
- WHEN the failure is confirmed
- THEN rollout MUST stop
- AND the documented rollback or containment procedure MUST be initiated

### Requirement: Legacy service retirement remains protected

The former WordPress service MUST remain recoverable through an owner-approved verification window after cutover. WordPress retirement and backup deletion MUST NOT occur as an implicit result of successful deployment.

#### Scenario: Post-cutover verification completes

- GIVEN deployed-site verification has passed
- WHEN the owner-approved verification window has not ended
- THEN the former WordPress recovery path MUST remain available
- AND service retirement or backup deletion MUST require separate owner authorization
