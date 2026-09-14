# Visual Continuity Specification

## Purpose

Maintain a recognizably continuous XantarDev public reading experience rather than introduce an unintended redesign.

## Requirements

### Requirement: Shared site identity is visually continuous

The site MUST preserve the visible XantarDev identity and an Ample-inspired presentation, including the site title, community description, header, primary navigation, typography, and responsive shared layout behavior. The primary navigation MUST expose `/xd/` and `/codigo-de-conducta/`.

#### Scenario: A visitor opens a shared site view

- GIVEN a visitor opens the homepage, a post, or a page
- WHEN the shared header and navigation render
- THEN the XantarDev identity and community description MUST be visible
- AND navigation links to `/xd/` and `/codigo-de-conducta/` MUST be available and resolve

### Requirement: Homepage retains blog-listing behavior

The homepage MUST present public posts in reverse chronological order. Each applicable listing entry MUST support a featured image, title, date, author, category, summary or excerpt, and a link to the full article without distorting its imagery.

#### Scenario: The homepage renders public posts

- GIVEN multiple public posts are available
- WHEN a visitor opens the homepage
- THEN posts MUST be ordered newest first
- AND each applicable post entry MUST provide its identifying metadata, summary, and article link

### Requirement: Content pages render migration-relevant structures legibly

Post and page views MUST present images, headings, lists, tables, quotations, code, legacy HTML, and Gutenberg-derived markup legibly when those structures are present. Shared sidebar and footer behavior MUST be visually consistent with captured public-site references where those elements are present.

#### Scenario: A representative article contains mixed content

- GIVEN a migrated article includes images and structured legacy content
- WHEN a visitor views the article on a supported desktop or mobile viewport
- THEN the content structures MUST remain legible and usable
- AND images MUST retain an appropriate aspect ratio

### Requirement: Visual continuity is assessed against captured references

Before publication authorization, desktop and mobile comparisons MUST cover the homepage, a recent article, an older article, both required pages, and shared navigation, sidebar, and footer states represented in captured WordPress references. Material visual differences MUST be resolved or accepted by the owner before cutover.

#### Scenario: Visual review is prepared for cutover

- GIVEN captured reference views and a production-equivalent rendered site are available
- WHEN visual continuity is reviewed
- THEN each required representative view MUST have a recorded comparison result
- AND unresolved material differences MUST block publication authorization
