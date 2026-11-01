# Jornada de Reflexión 2026

Objective: Prepare local, unpublished drafts for the 28 November 2026 event from the user's supplied copy and three CSV proposals. The user supplied a Meetup URL that is still in draft and approved its inclusion in versioned drafts; four approved images remain unavailable. Do not create a publishable post, claim finished artwork, publish, push, or copy private CSV fields.

## Specs
1. S1 — User request (verbatim): "quiero que crees un nuevo evento para el sabado 28 de noviembre. A las 09.50 será la 09:50.- Recepción y bienvenida. Luego crea la agenda y usa el ficheor data\Formulario propuestas 2025-05-16.csv para generar la agenda y los textos de cada una. Usa las skills necesarias para crear tanto la imagen de publicación relaionada con el evento, para ello te dejo el siguiente texto como referencia para creación y publicación y que solo rellenes la agenda con los datos de cada charla:"
2. S2 — User-supplied event copy (verbatim; only fill talk agenda entries):

   XantarDev: Jornada de Reflexión 🤔

   Detalles:

   El próximo sábado 28 de noviembre de 2026 volvemos con un nuevo evento de XantarDev… y esta vez con una particularidad 👀

   Al día siguiente hay elecciones, así que el 28 es oficialmente jornada de reflexión. Y nosotros, que somos gente responsable,
   hemos decidido aprovecharla: vamos a reflexionar sobre tecnología. 🧠

   Aquí no habrá mítines, ni promesas incumplibles, ni encuestas… Solo tres charlas de gente que sabe de lo que habla. Y como mandan
   las normas de la jornada de reflexión: prohibida la propaganda. Si alguien intenta venderte el framework definitivo, el JS de
   la semana o "la última IA que lo cambia todo", lo consideraremos infracción grave. 🚫

   Como siempre, nos juntaremos para lo que mejor sabemos hacer:

   🧠 Charlas técnicas
   🤝 Networking
   🗳️ Y mucha reflexión (la que se pueda hacer con un café en la mano)

   Los ponentes y las temáticas los iremos desvelando en los próximos días… porque algo de campaña sí vamos a hacer, pero solo en
   redes y antes del sábado. 😉

   AGENDA (provisional):

   ```
     •    09:50.- Recepción y bienvenida
     •    10:15.- Charla 1: (por definir)
     •    11:30.- Café y networking ☕
     •    12:15.- Charla 2: (por definir)
     •    13:00.- Charla 3: (por definir)
     •    13:45.- 🎉 Cierre, despedida. ¡Networking!
   ```

   NETWORKING:

   Después del evento llegará uno de los mejores momentos: el xantar 🍻

   Nos iremos a comer o tomar algo cerca para seguir compartiendo ideas, opiniones… y risas. Y tranquilidad: en la mesa se puede
   debatir de tabs vs. espacios sin que sea delito electoral.

   🎟️ Evento gratuito (plazas limitadas)

   Si alguna vez has venido a un XantarDev —o si llevas tiempo queriendo venir— este es un evento perfecto para hacerlo. Y si dudas,
   recuerda: es jornada de reflexión, tienes todo el día para pensártelo. 😄

   ¿Te apuntas? 🚀 [enlace a Meetup]

   Cómo llegar

   Dirección: Nos encontrarás en el CSC de Cornes, cercano a la estación intermodal y al centro de la ciudad.

   Al lado del CSC existe un aparcamiento de larga duración así como zona ORA y zonas blancas cercanas.

   * ¡Compártelo!
     Síguenos en @XantarDev y comparte el evento.
   * Respeta el código
     Échale un ojo a nuestro código de conducta, aplicable en todos los eventos que realizamos. En resumen, respeta.

3. S3 — Exact user-selected scope: "Borrador con pendientes" — "Preparar texto de agenda y prompts visuales; dejar explícitos el enlace y las imágenes pendientes, sin publicar." The CSV is ignored source data with private contact fields; only confirmed public speaker names, talk titles and descriptions belong in drafts. No actual image-generation tool is available in this session.
4. S4 — User correction (verbatim): "la url de meetup es esta https://www.meetup.com/xantardev/events/317197411 aunque aun está en borrador.\nUtiliza la skill xantardev-image-generator para generar las imágenes en base al contexto del evento.\nHe dejado docker arrancado." User explicitly selected "Sí, incluirla en los borradores" after being told that a commit could expose the draft URL in repository history. Never publish or push without later authorization.

## Tasks
- [x] T1 (S1-S3; delegated): Created `odd/drafts/jornada-reflexion-2026.md` with the three CSV proposals mapped in row order, only agenda filled, no contact fields or `_posts` edits. Worker structural check and parent readback passed; `git diff --cached --check` passed. Commit: `cd24878` (`docs(event): draft reflection event agenda`). Native assessment unavailable due untracked selection; medium fallback, self-verification stands.
- [x] T2 (S1-S3; delegated): Created `odd/drafts/jornada-reflexion-2026-prompts.md` (cover + 3 talk-card prompts) and `rrss/jornada-reflexion-2026.json` (3 X + 3 LinkedIn drafts), all real resource links null. Same commit carries `_config.yml` rrss exclusion to avoid public drafts. JSON/privacy/length structural checks and worker verification passed. Commit: `4abca69` (`docs(event): prepare private social and artwork drafts`). Native assessment unassessable; attempted START refused before authority (baseRef first abbreviated, then retained-selection mismatch); independent verifier required for escalated security item 2.
- [x] T3 (S1-S3; independent check): Independent verifier passed per-spec source fidelity, exact agenda mapping, JSON shape, null resources, privacy and same-commit rrss exclusion. Prior isolated Jekyll fixture for the identical rrss exclusion passed; current Docker engine unavailable, so no current build or deployment proof. `git diff --check` passed with only an existing LF/CRLF warning. Commit: this task-document closeout commit (recorded in Git history).
- [x] T4 (S4; delegated): Included exact user Meetup URL in draft body and 7 JSON URL fields, copy explicitly marks registration as not public. Worker validated unchanged agenda, JSON and 3 X weighted limits (270/269/265), status draft and image fields null; `git diff --cached --check` passed. Commit: `5ed2295` (`docs(event): add pending Meetup link to drafts`).
- [ ] T5 (S4; blocked): Generate and inspect a real cover and three real talk cards through xantardev-image-generator when a genuine image-generation tool or approved supplied artwork is available. Until then keep existing four prompts and null image paths; no fabricated images. Awaiting image tool or supplied approved images.
- [x] T6 (S4; checking): Fresh production Jekyll build in isolated project-local destination passed; verified `_site`-equivalent output has index and neither `odd/` nor `rrss/`, and sitemap lacks the draft slug. Build temporary output removed; existing unrelated changes preserved. Commit: this task-document closeout commit (recorded in Git history).

## Log
L1 — User's original request is quoted verbatim in S1 and S2 above, including the entire supplied event copy.
L2 — User chose "Borrador con pendientes" over waiting for resources. Missing real Meetup registration URL and four generated/approved images are explicitly deferred, not invented. Existing unrelated uncommitted changes in `.gitignore`, `README.md`, `.agents/` must not be staged; `_config.yml` rrss exclusion is relevant and was committed WITH the RRSS draft. Publication date remains unset until a real post is authorized.
L3 — Evidence: CSV has exactly three proposals; row order is Unai Zorrilla Castro, Lorena Méndez Otero, Curro Raya. `data/` is ignored by `.gitignore`; do not persist contact emails or portraits. 2026-11-28 is a Saturday in Europe/Madrid. No image-generation tool is available.
L4 — TDD: no meaningful deterministic RED for editorial drafts; validate source-derived names/titles, JSON shape, excluded-site output and absence of private data. Delivery: ask-on-risk, forecast ~240 authored changed lines, branch `feat/jornada-reflexion-2026`; do not push. Existing unrelated work is preserved.
L5 — T1 completed in `cd24878`; 60 authored changed lines. Candidate assessment returned nativeRisk unassessable (untracked files require selection), no independent verifier per medium fallback. No image asset or Meetup URL exists.
L6 — T2 completed in `4abca69`; 131 authored changed lines including rrss/ Jekyll exclusion. Candidate high risk item 2 by agent escalation; native START pre-authority failed (baseRef shortened, then selection mismatch); no lineage/receipt. Other prior user changes remain untouched.
L7 — Independent verifier passed S1/S2/S3 for unpublished drafts. `docker info` failed this turn: Docker Desktop Linux engine unavailable. Same `_config.yml` exclusion passed an isolated Jekyll fixture in the preceding session; no current/deployed build proof, not asserted. No actual image or Meetup link was created; never claim final publication. Human decision needed to supply event-specific Meetup URL and four approved images before preparing `_posts/` content and social payloads. Do not push without user authorization.
L8 — User said verbatim: "la url de meetup es esta https://www.meetup.com/xantardev/events/317197411 aunque aun está en borrador.\nUtiliza la skill xantardev-image-generator para generar las imágenes en base al contexto del evento.\nHe dejado docker arrancado." The user chose "Sí, incluirla en los borradores" after explicit warning that a committed draft URL could be visible in repository history. Docker Linux engine responds; no image-generation tool is callable in this session (`gemini`, ImageMagick and Inkscape absent; Pi has only read/write/fetch tools). Existing visual prompts are not images.
L9 — T4 committed as `5ed2295`. Seven URL fields now contain the user's exact URL, all imagery stays null; the link is not independently verified because Meetup is still in draft.
L10 — T6: `docker compose run --rm -e JEKYLL_ENV=production site sh ... bundle exec jekyll build --destination <isolated project-local output>` passed. Fresh output contained `index.html`, no `odd/` or `rrss/`, and sitemap no draft slug. T5 remains blocked on actual image-generation tool or four approved supplied assets; no `_posts` entry or push authorized.
