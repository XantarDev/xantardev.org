# Content Migration Specification

## Purpose

Publish the approved public WordPress content faithfully while preventing disclosure of non-public source material.

## Requirements

### Requirement: Only approved public records are published

The public site MUST include the 20 published posts and two published pages identified by the approved source inventory. It MUST exclude source record ID 306 (draft), source record ID 567 (private), and non-page configuration records such as `wp_global_styles`, unless the owner separately authorizes publication. Public artifacts MUST NOT include titles, slugs, author details, bodies, or other identifying details from excluded records.

#### Scenario: Source records have mixed publication statuses

- GIVEN the approved export includes published, draft, private, attachment, and configuration records
- WHEN public site content is produced
- THEN only approved published post and page records MUST be eligible for publication
- AND draft, private, and configuration records MUST NOT appear as public pages or posts

### Requirement: Non-public material is absent from public artifacts

Raw XML input, excluded record bodies, and private-only material MUST NOT appear in committed public site source, generated output, indexes, feeds, downloadable artifacts, or deployment logs. An exclusion audit MAY retain identifiers, statuses, and reasons, but MUST NOT copy excluded bodies into public artifacts.

#### Scenario: Privacy checks inspect publication artifacts

- GIVEN the source inventory includes excluded content
- WHEN public source, generated output, indexes, artifacts, and deployment records are checked
- THEN excluded titles, bodies, and private-only media MUST be absent
- AND the exclusion audit MUST establish the reason for each excluded record without exposing its body

### Requirement: Public content meaning is retained

Each migrated public post and page MUST retain its title, publication date, body meaning, author attribution, and relevant public metadata. Content structures including headings, lists, tables, quotations, code, images, and embeds MUST remain understandable to readers.

#### Scenario: A migrated public record is reviewed

- GIVEN a published WordPress post or page has been migrated
- WHEN its rendered result is compared with approved source evidence
- THEN its title, date, attribution, and meaningful content MUST be present
- AND its supported content structures MUST remain understandable

### Requirement: Lossy content receives safe treatment

When conversion would lose meaningful HTML, Gutenberg-derived markup, or an unsupported embed, the published content MUST retain safe readable HTML or provide an understandable treatment that does not misrepresent the original. The migration MUST NOT execute WordPress or plugin code to render content.

#### Scenario: An unsupported embedded element is encountered

- GIVEN a public record contains markup or an embed that cannot be preserved directly
- WHEN the record is prepared for publication
- THEN the result MUST preserve meaningful readable context or use an understandable fallback
- AND no WordPress or plugin code MUST execute in the published site

### Requirement: Public media is classified before publication

A resource found in the export MUST NOT be published solely because it appears in that export. Media with ambiguous or private-only status MUST be classified before publication, and unresolved classification MUST be escalated rather than disclosed.

#### Scenario: An attachment has uncertain publication status

- GIVEN an attachment is discovered without sufficient evidence that it is public
- WHEN the migration inventory is finalized
- THEN the attachment MUST be excluded from the required public resource set
- AND its ambiguity MUST be recorded for owner resolution
