// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const inGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
	site: 'https://matzull.github.io',
	base: inGitHubActions && repoName ? `/${repoName}` : '/',
	output: 'static',
	integrations: [sitemap()],
});
