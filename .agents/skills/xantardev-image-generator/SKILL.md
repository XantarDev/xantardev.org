---
name: xantardev-image-generator
description: "Trigger: ilustración de eventos XantarDev, generar imagen de evento, prompt de ilustración, cartel de evento. Prepara el prompt visual maestro con datos confirmados y genera imágenes solo si hay una herramienta disponible."
---

# XantarDev image generator

## Activation Contract

- Activate for XantarDev event illustration prompts or requested image generation.
- Do not activate for publishing posts, writing event announcements, or uploading media.

## Hard Rules

- Read `assets/prompt-template.md`; preserve its wording, replacing only the four bracketed placeholders.
- Use confirmed context or explicit user values. Never invent event names, cultural details, food, or landmarks.
- Ask only for missing contextual variables: `NOMBRE_EVENTO`, `ELEMENTO_CULTURAL_O_LOCAL`, `GASTRONOMIA_O_ELEMENTO`, `MONUMENTOS_O_PAISAJE`.
- Never claim image generation without an actual image-generation tool and a successful result. Do not publish or modify project content.

## Decision Gates

| Situation | Action |
| --- | --- |
| Required variable missing or ambiguous | Ask only for that value or clarification before substitution. |
| Prompt requested, or mode unspecified | Return the completed prompt without invoking an image tool. |
| Image requested, tool unavailable | Return the prompt and state that image generation is unavailable. |
| Image requested, actual tool available | Submit the completed prompt; report failures honestly. |

## Execution Steps

1. Extract the four values from the request and established context; resolve only missing details.
2. Read the template and substitute each placeholder once, retaining punctuation and quotation marks.
3. Check that no template placeholders remain and that the title matches `NOMBRE_EVENTO` exactly.
4. For image mode, use an available image tool only after the values are confirmed. Inspect the result when possible: verify title spelling, lettering legibility, and the requested scene. Report defects or inability to inspect; never promise perfect AI-rendered text.

## Output Contract

- Return the exact completed prompt, clearly separated from commentary.
- Include an image artifact only when actually generated; identify any generation failure, unverified lettering, or visible mismatch.
- Do not claim files were saved, uploaded, or published without evidence.

## References

- `assets/prompt-template.md`: authoritative master prompt with four contextual placeholders.
