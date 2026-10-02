# Design

The site is built for the few seconds a recruiter gives it. The home page answers three questions in order: who is this, what has he built, and how do I reach him. Everything else lives one click away.

## Home page

| Part | Content |
| --- | --- |
| Hero | Full screen on the dark stage. "Hi, I'm Calvin Diao.", the role ("Software engineer, from circuit boards to Chromium."), one sentence listing what he has built, two buttons, the photo with the "Coding is a game." sticker, and four credentials (Chromium, General Motors, Samsung R&D, McMaster) |
| Projects | "Things I've built." Five cards: two large, three small. Each card shows the picture, one credential badge, the year and field, the title, one sentence and the tools. The whole card links to the project page |
| Contact | Back on the stage: "Let's talk.", the email address with a copy button, and profile links. It closes every page |

The hero fits a 1366 × 768 screen, credentials included. On phones the name, role and buttons fit the first screen.

## Project pages

A dark header with the title, one sentence and the demo video (click to load), which overlaps onto the paper. Below it, in reading order: four key facts, what Calvin built (highlights, then the write-up), tools and links, how it works (a chain of blocks; orange-topped blocks are Calvin's work, dashed blocks are platforms or off-the-shelf parts), photos, and the next project.

The About page is a plain résumé: experience, education, research, patents, scholarships and awards. Writing lists the original blog articles.

## Visual system

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--paper` | `#F4F3EE` | `#131512` | Page |
| `--card` | `#FFFFFF` | `#1B1E1A` | Project cards, the project aside |
| `--ink` | `#121412` | `#EDEEE8` | Text, rules |
| `--accent` | `#B23C0B` | `#FF8A52` | Links and labels on paper |
| `--stage` | `#10120F` | `#0B0C0B` | The dark bands: masthead, page heroes, contact |
| `--spark` | `#FF6B2C` | same | Buttons, badges, the brand mark |

Copper orange is the only accent. It marks what to click and what won (the badges), and appears as the period after the name. The stage carries a faint perfboard dot grid and a warm glow; the paper stays plain.

Type: **Archivo** (variable width and weight) for display and body, set expanded and heavy for the name and section titles. **Martian Mono** is used only for small labels: years, fields and tools.

Motion: the hero rises in once on load, cards lift on hover, and the sticker straightens when the photo is hovered. Reduced motion turns all of it off.

## Images

- Project photos are Calvin's originals from the blog.
- `mocap/pose-pairs.jpg` is derived from `mocap/prototype.png`: two poses, each real photo next to its reconstructed skeleton, recomposed as a landscape cover.
- The Chromium cover is an inline SVG (`ChromiumFigure.astro`), an illustration with example values. It is not a shipped browser screen.
- The panda mark (`Panda.astro`, `public/favicon.svg`) is redrawn from the techliker.com favicon. It also appears in Calvin's own PCB silkscreen.
- `public/share.png` is rendered from the home page hero at 1200 × 630. Re-render it when the hero changes.

## Content rules

Every claim on the site comes from Calvin's original write-ups or About page. The key facts are the values documented in those write-ups, including their limits. Team projects are labeled as team projects, and the block diagrams mark ownership only where the write-up states it.

## References

- [Archivo](https://github.com/Omnibus-Type/Archivo) and [Martian Mono](https://github.com/evilmartians/mono), SIL Open Font License.
- [Lucide](https://lucide.dev/), ISC license.
