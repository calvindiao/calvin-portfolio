# Calvin Diao's portfolio

Calvin's portfolio, built for the few seconds a recruiter gives it. The site is light and says little: the home page has a short hero (name, one-line role, photo, four credentials), five project cards (picture, credential badge, title, one sentence), and contact. Each card opens a project page with the demo video, key facts, what Calvin built in two short paragraphs, how it works, and photos. Built with Astro and TypeScript. The original technical articles remain available at their existing URLs.

## Local development

Use Node 24 (`nvm use`) and the committed lockfile.

```sh
npm ci
npm run dev
```

```sh
npm run check
npm run build
npm run preview
```

`prepare:assets` creates responsive WebP variants, descriptive image metadata, and the home-screen icon from the original assets. It runs automatically before checks, development, and builds. Generated files are ignored by Git.

The build verification checks all page references, image attributes, original article routes, click-to-load videos, preview indexing rules, the five home page cards and their links, every project's block diagram and key facts, the share image, and the main image size budget.

## Content

- `src/content/projects/`: one file per project. Besides the cover, gallery, highlights and demo links, each has a `badge` (the credential on its home page card, with an icon), a `context` line, a `system` chain for "How it works" (nodes and arrow labels; `mine: true` marks Calvin's blocks) and four `specs` for the key facts. `order` sets the card order; the first two cards are large.
- `src/content/writing/`: original Markdown articles and their historical routes.
- `src/data/site.ts`: email, links, and the four credentials under the hero.
- `src/data/profile.ts`: experience, education, research, patents, and awards for the About page.
- `src/assets-originals/`: project photos and diagrams; edit originals here, not generated output. `mocap/pose-pairs.jpg` is a landscape recomposition of `mocap/prototype.png`.
- `public/share.png`: the 1200 × 630 link-preview image, rendered from the home page hero. Re-render it when the hero changes.
- `public/favicon.svg`: the panda on the orange brand square; the home-screen icon is rasterized from it.

The source material was migrated from [calvindiao/Blog](https://github.com/calvindiao/Blog), revision `77acb907958fe4a2a18a854d96f6c7dbbd2ccbfb`. No private project repositories or new personal claims were imported. The Chromium cover is an illustration with example values, not a screenshot of a shipped browser feature.

Article URLs retained: `/ar-panoramic-calling/`, `/gsoc/`, `/wearable-rehab-mocap/`, `/smart-car-2021/`, `/smart-car-2020/`, and `/2020/03/24/hello-world/`.

## Independent Cloudflare preview

Live preview: [calvin-portfolio-g3m.pages.dev](https://calvin-portfolio-g3m.pages.dev). Cloudflare Pages is connected to this repository and deploys `main` automatically.

Create a separate Cloudflare Pages project named `calvin-portfolio`. Use Node 24, the `main` branch, build command `npm run build`, and output directory `dist`.

For an authenticated direct deployment:

```sh
SITE_URL=https://calvin-portfolio-g3m.pages.dev npm run build
npm run deploy:preview
```

If Cloudflare assigns another hostname, set `SITE_URL` to that actual HTTPS origin and rebuild before publishing. Do not connect `techliker.com` during preview acceptance.

The preview intentionally uses a robots disallow rule, a `noindex, nofollow` meta tag, and an `X-Robots-Tag` header. A later production-domain migration must update `SITE_URL` and deliberately remove all three preview indexing restrictions. `404.html` ensures missing paths return a real not-found page instead of the Cloudflare SPA fallback.

GitHub Actions validates pull requests and `main` under Node 24. Cloudflare builds with `NODE_VERSION=24`, `ASTRO_TELEMETRY_DISABLED=1`, and the actual `SITE_URL`.

## Browser acceptance

At 390, 768, 1024, and 1440 px: check layout overflow, that the hero's credentials are visible on a 1366 × 768 screen, that a click anywhere on a project card opens its page, the video on each project page (starting one demo closes any other), image expansion and focus restoration, reduced motion, legacy article paths, external links, and the actual 404 response. Without JavaScript, the hero, cards, project pages, articles, and YouTube links remain usable.

## Design resources

The concept, page structure, tokens and references are documented in [docs/design.md](docs/design.md). The site uses locally hosted Archivo (Martian Mono only inside the Chromium illustration and code) and Lucide SVG icons; the hero's entrance animation is plain CSS. Project photos come from the original blog, and the panda mark is redrawn from the techliker.com favicon.

## Content license

The original blog's writing and photographs retain its [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) notice. Font packages retain their included open-font licenses. The new site code is licensed under Apache-2.0; see `LICENSE`.
