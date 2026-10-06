# Design

The site is built for the few seconds a recruiter gives it. The home page answers three questions in order: who is this, what has he built, and how do I reach him. Everything else lives one click away.

## Home page

| Part | Content |
| --- | --- |
| Hero | A small round portrait, "Calvin Diao", the role ("Software engineer, from circuit boards to Chromium."), two buttons and two profile links on the left; four credentials (Chromium, General Motors, Samsung R&D, McMaster) as a plain list on the right |
| Projects | "Selected projects", with a link to the full write-ups. Five cards: two large, three small. Each card shows the picture, the year and field, the title, one sentence, and the credential in plain text. The whole card links to the project page |
| Contact | "Contact", the email address with a copy button, and profile links, laid out like an About section. It closes every page |

On a 1366 × 768 screen the credentials are visible without scrolling. On phones the name, role and buttons fit the first screen.

## Project pages

The title, one sentence and the demo video (click to load). Below it, in reading order: four key facts, what Calvin built (three highlights and two short paragraphs; the full write-up is one click away), tools and links, how it works (a chain of blocks; blue blocks are Calvin's work, dashed blocks are platforms or off-the-shelf parts), photos, and the next project.

The About page is a plain résumé: experience, education, research, patents, scholarships and awards. The provincial and regional awards are folded under a disclosure. Writing lists the original blog articles.

## Visual system

The site is light only. There is no dark theme.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#FAFAF9` | Page |
| `--paper-2` | `#F5F5F4` | Tags, image placeholders |
| `--card` | `#FFFFFF` | Cards, the project aside |
| `--ink` | `#1C1917` | Text, the primary button, the favicon |
| `--ink-2`, `--ink-3` | `#57534E`, `#71706B` | Secondary text, labels (both meet WCAG AA on paper) |
| `--line`, `--line-2` | `#E7E5E4`, `#D6D3D1` | Card borders and rules |
| `--accent` | `#2448A6` | Links, highlight ticks, Calvin's blocks, focus rings |

The palette is warm grey and near-black with one deep blue, used only for links and the parts Calvin built. Buttons are near-black or outlined. There are no stickers, glows, tilted pictures or icon badges: plain paper, white cards with hairline borders, and the pictures of the work.

Type: **Inter** for everything, at moderate weights (600 for the name and headings). **Martian Mono** appears only in the Chromium illustration and in code.

Motion: the hero fades in once on load and card pictures zoom slightly on hover. Reduced motion turns all of it off.

## Images

- Project photos are Calvin's originals from the blog.
- `mocap/pose-pairs.jpg` is derived from `mocap/prototype.png`: two poses, each real photo next to its reconstructed skeleton, recomposed as a landscape cover.
- The Chromium cover is an inline SVG (`ChromiumFigure.astro`), an illustration with example values. It is not a shipped browser screen.
- `portrait.jpg` (the round photo in the hero) is a head-and-shoulders crop of `avatar.jpg`, the photo on the About page.
- `public/favicon.svg` is a "CD" monogram on a near-black square; the home-screen icon is rasterized from it.
- `public/share.png` is rendered from the home page hero at 1200 × 630. Re-render it when the hero changes.

## Content rules

Every claim on the site comes from Calvin's original write-ups or About page. The key facts are the values documented in those write-ups, including their limits. Team projects are labeled as team projects, and the block diagrams mark ownership only where the write-up states it.

## References

- [Inter](https://github.com/rsms/inter) and [Martian Mono](https://github.com/evilmartians/mono), SIL Open Font License.
- [Lucide](https://lucide.dev/), ISC license.
