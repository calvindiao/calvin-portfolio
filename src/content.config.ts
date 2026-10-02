import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(), shortTitle: z.string(), summary: z.string(),
    year: z.number(), order: z.number(), field: z.string(),
    cover: z.string(), coverAlt: z.string(), gallery: z.array(z.string()),
    highlights: z.array(z.string()).max(3), tools: z.array(z.string()),
    video: z.string().optional(), contributions: z.url().optional(),
    code: z.url().optional(), article: z.string()
  })
});
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(), date: z.string(), updated: z.string().optional(),
    legacyPath: z.string(), project: z.string().optional()
  })
});
export const collections = { projects, writing };
