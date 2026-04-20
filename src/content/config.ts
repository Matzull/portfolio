import { defineCollection, z } from 'astro:content';

const localizedText = z.object({
  en: z.string().min(1),
  es: z.string().min(1),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: localizedText,
    summary: localizedText,
    featured: z.boolean().default(false),
    status: z.enum(['planned', 'in-progress', 'completed']).default('completed'),
    publishedAt: z.string().min(1),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        article: z.string().url().optional(),
      })
      .optional(),
  }),
});

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    role: localizedText,
    company: z.string().min(1),
    location: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    highlights: z.object({
      en: z.array(z.string()).min(1),
      es: z.array(z.string()).min(1),
    }),
    stack: z.array(z.string()).default([]),
  }),
});

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: localizedText,
    summary: localizedText,
    publishedAt: z.string().min(1),
    readingTime: z.string().min(1),
    tags: z.array(z.string()).default([]),
    repository: z.string().url(),
  }),
});

export const collections = {
  projects: projectCollection,
  experience: experienceCollection,
  posts: postCollection,
};
