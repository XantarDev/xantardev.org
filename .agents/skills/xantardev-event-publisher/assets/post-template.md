# Post drafting template

Replace every placeholder, serialize frontmatter strings with YAML-safe quoting, and remove these instructions before saving. The filename and `date` use the authorized publication timestamp in Europe/Madrid, NOT the event date. Use the requested language (Spanish by default). Do not copy legacy `source_id` values.

```markdown
---
layout: post
title: "{{EVENT_TITLE}}"
date: "{{PUBLICATION_TIMESTAMP_WITH_OFFSET}}"
permalink: "/{{SLUG}}/"
author: "xantardev"
categories: ["eventos"]
tags: []
excerpt: "{{FACTUAL_SHORT_SUMMARY}}"
description: "{{FACTUAL_DESCRIPTION}}"
image: "/wp-content/uploads/{{PUBLICATION_YEAR}}/{{PUBLICATION_MONTH}}/{{SAVED_COVER_FILENAME}}"
---

![{{MEANINGFUL_COVER_ALT}}]({{ '/wp-content/uploads/{{PUBLICATION_YEAR}}/{{PUBLICATION_MONTH}}/{{SAVED_COVER_FILENAME}}' | relative_url }})

## Detalles

{{EVENT_TITLE}} — {{EVENT_DATE}}, {{START_TIME}}–{{END_TIME}} ({{CONFIRMED_TIMEZONE}}).

## Charlas

### {{TALK_TITLE}} — {{SPEAKER}}

{{CONFIRMED_TALK_DESCRIPTION}}

![{{MEANINGFUL_TALK_CARD_ALT}}]({{ '/wp-content/uploads/{{PUBLICATION_YEAR}}/{{PUBLICATION_MONTH}}/{{SAVED_TALK_CARD_FILENAME}}' | relative_url }})

## Inscripción

[Inscríbete en Meetup]({{MEETUP_URL}})

[Consulta nuestro código de conducta]({{ '/codigo-de-conducta/' | relative_url }}).
```

Repeat the talk block for every talk. Replace the inner path placeholders while retaining final Jekyll Liquid expressions; no template placeholders may remain. Add venue, individual times or other claims only when confirmed. Insert a sponsor section only when sponsorship is supplied and confirmed; otherwise omit it entirely. Set frontmatter `image` to the same saved cover path used in the body. Verify image alt describes the actual artwork, not a guessed scene.
