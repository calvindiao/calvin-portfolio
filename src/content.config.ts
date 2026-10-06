import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const node = z.object({ kind: z.string(), title: z.string(), detail: z.string(), mine: z.boolean().optional() });
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(), shortTitle: z.string(), summary: z.string(), context: z.string(),
    year: z.number(), order: z.number(), field: z.string(),
    cover: z.string(), coverAlt: z.string(), gallery: z.array(z.string()),
    highlights: z.array(z.string()).max(3), tools: z.array(z.string()),
    // Shown on the home page card: the one credential a recruiter should see first.
    badge: z.string(),
    // A left-to-right signal chain. links[i] labels the arrow from nodes[i] to nodes[i + 1].
    system: z.object({ nodes: z.array(node).min(2), links: z.array(z.string()), note: z.string().optional() })
      .refine(system => system.links.length === system.nodes.length - 1, 'system.links needs one label per arrow'),
    specs: z.array(z.object({ parameter: z.string(), condition: z.string().optional(), value: z.string(), unit: z.string().optional() })),
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
