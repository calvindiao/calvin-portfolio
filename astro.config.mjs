import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import legacyImages from './scripts/legacy-images.mjs';

export default defineConfig({
  site: process.env.SITE_URL || 'https://calvin-portfolio-g3m.pages.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { processor: unified({ remarkPlugins: [legacyImages] }), shikiConfig: { theme: 'github-dark' } }
});
