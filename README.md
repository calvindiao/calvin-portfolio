# Calvin Diao's portfolio

A custom, two-dimensional engineering workspace built with Astro and TypeScript. Real project imagery and click-to-load demos are the center of the experience. The original technical articles remain available at their existing URLs.

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

`prepare:assets` creates responsive WebP variants, descriptive image metadata, and a share image from the original project assets. It runs automatically before checks, development, and builds. Generated files are ignored by Git.

The build verification checks all page references, image attributes, original article routes, click-to-load videos, preview indexing rules, and the main image size budget.

## Content

- `src/content/projects/`: concise project presentations, including cover, gallery, highlights, and demo links.
- `src/content/writing/`: original Markdown articles and their historical routes.
- `src/assets-originals/`: project photos and diagrams; edit originals here, not generated output.

The source material was migrated from [calvindiao/Blog](https://github.com/calvindiao/Blog), revision `77acb907958fe4a2a18a854d96f6c7dbbd2ccbfb`. No private project repositories or new personal claims were imported. The Chromium overview is a conceptual diagram, not a screenshot of a shipped browser feature.

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

At 390, 768, and 1440 px: check layout overflow, all five project selections, four video entry points, player removal on project changes, image expansion and focus restoration, keyboard tab navigation, reduced motion, legacy article paths, external links, and the actual 404 response. Without JavaScript, introductions, project pages, articles, and YouTube links remain usable.

## Design resources

The visual direction and references are documented in [docs/design.md](docs/design.md). The site uses locally hosted Instrument Sans, Lucide SVG icons, and Motion’s mini animation module for project transitions. Project photos come from the original blog.

## Content license

The original blog's writing and photographs retain its [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) notice. Font packages retain their included open-font licenses. The new site code is licensed under Apache-2.0; see `LICENSE`.
