# Design

The site is built for the few seconds a recruiter gives it. The home page answers three questions in order: who is this, what has he built, and how do I reach him. Everything else lives one click away.

## Home page

| Part | Content |
| --- | --- |
| Hero | "Calvin Diao.", the role ("Software engineer, from circuit boards to Chromium."), two buttons and two profile links, the photo with the "Coding is a game." sticker, and four credentials (Chromium, General Motors, Samsung R&D, McMaster) |
| Projects | "Things I've built", with a link to the full write-ups. Five cards: two large, three small. Each card shows the picture, one credential badge, the year and field, the title and one sentence. The whole card links to the project page |
| Contact | A soft orange panel: "Let's talk.", the email address with a copy button, and profile links. It closes every page |

On a 1366 × 768 screen the credentials are visible without scrolling. On phones the name, role and buttons fit the first screen.

## Project pages

The title, one sentence and the demo video (click to load). Below it, in reading order: four key facts, what Calvin built (three highlights and two short paragraphs; the full write-up is one click away), tools and links, how it works (a chain of blocks; orange blocks are Calvin's work, dashed blocks are platforms or off-the-shelf parts), photos, and the next project.

The About page is a plain résumé: experience, education, research, patents, scholarships and awards. The provincial and regional awards are folded under a disclosure. Writing lists the original blog articles.

## Visual system

The site is light only. There is no dark theme.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#FAF9F6` | Page |
| `--paper-2` | `#F2F0EB` | Tags, image placeholders |
| `--card` | `#FFFFFF` | Cards, key facts, the project aside |
| `--ink` | `#1D1C1A` | Text, the primary button |
| `--ink-2`, `--ink-3` | `#55524D`, `#6F6B65` | Secondary text, labels (both meet WCAG AA on paper) |
| `--line` | `#E6E3DC` | Card borders and rules |
| `--accent` | `#E35A12` | The brand mark, the period after the name, badge icons, Calvin's blocks |
| `--accent-ink` | `#B9440B` | Orange text: links, kickers |
| `--accent-soft` | `#FDEFE6` | The contact panel, highlight ticks |

Orange is the only accent and is used sparingly: the brand, what won (badge icons), and the parts Calvin built. Buttons are near-black. The hero has a faint warm glow; everything else is plain paper and white cards with thin borders.

Type: **Archivo** for everything, at its normal width, bold but not heavy for the name and section titles. **Martian Mono** appears only in the Chromium illustration and in code.

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
