import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/ui';

type LocalizedText = {
  en: string;
  es: string;
};

type ProjectView = {
  slug: string;
  title: string;
  summary: string;
  featured: boolean;
  status: string;
  publishedAt: string;
  stack: string[];
  links?: {
    github?: string;
    demo?: string;
    article?: string;
  };
};

type ExperienceView = {
  slug: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  stack: string[];
};

type PostView = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  repository: string;
};

const t = (value: LocalizedText, locale: Locale) => value[locale];

export const getProjects = async (locale: Locale): Promise<ProjectView[]> => {
  const entries = await getCollection('projects');

  return entries
    .sort((a, b) => {
      if (a.data.featured !== b.data.featured) {
        return Number(b.data.featured) - Number(a.data.featured);
      }

      return Date.parse(b.data.publishedAt) - Date.parse(a.data.publishedAt);
    })
    .map((entry) => ({
      slug: entry.slug,
      title: t(entry.data.title, locale),
      summary: t(entry.data.summary, locale),
      featured: entry.data.featured,
      status: entry.data.status,
      publishedAt: entry.data.publishedAt,
      stack: entry.data.stack,
      links: entry.data.links,
    }));
};

export const getExperience = async (locale: Locale): Promise<ExperienceView[]> => {
  const entries = await getCollection('experience');

  return entries
    .sort((a, b) => Date.parse(b.data.startDate) - Date.parse(a.data.startDate))
    .map((entry) => ({
      slug: entry.slug,
      role: t(entry.data.role, locale),
      company: entry.data.company,
      location: entry.data.location,
      startDate: entry.data.startDate,
      endDate: entry.data.endDate,
      highlights: entry.data.highlights[locale],
      stack: entry.data.stack,
    }));
};

export const getPosts = async (locale: Locale): Promise<PostView[]> => {
  const entries = await getCollection('posts');

  return entries
    .sort((a, b) => Date.parse(b.data.publishedAt) - Date.parse(a.data.publishedAt))
    .map((entry) => ({
      slug: entry.slug,
      title: t(entry.data.title, locale),
      summary: t(entry.data.summary, locale),
      publishedAt: entry.data.publishedAt,
      readingTime: entry.data.readingTime,
      tags: entry.data.tags,
      repository: entry.data.repository,
    }));
};
