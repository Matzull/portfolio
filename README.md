# Marcos Portfolio (Astro + Bun)

Data-driven portfolio where content lives in markdown and updates automatically.

## Stack

- Astro
- Bun
- Astro Content Collections (`src/content/*`)
- GitHub Pages workflow (`.github/workflows/deploy.yml`)

## Local Development

```sh
bun install
bun run dev
```

Useful commands:

- `bun run dev` starts local server on `http://localhost:4321`
- `bun run build` builds static output into `dist/`
- `bun run preview` previews built output
- `bun run check` runs Astro checks

## Content Model (Web as Code)

### Add a new project in under 2 minutes

1. Copy `templates/project-template.md`
2. Paste it into `src/content/projects/<your-slug>.md`
3. Fill frontmatter (`title.en`, `title.es`, `summary.en`, `summary.es`, `stack`, `links`)
4. Save and run `bun run dev`

No component changes needed. New projects are auto-rendered in EN and ES pages.

### Add new experience entries

1. Create `src/content/experience/<your-slug>.md`
2. Follow field shape from existing files in `src/content/experience/`
3. Provide bilingual highlights (`highlights.en[]` and `highlights.es[]`)

## Routes

- `/` English (default)
- `/es/` Spanish

## Customize Profile Data

Update `src/data/profile.ts`:

- name, role, location, about text
- skill groups
- contact links

## Deployment (GitHub Pages)

Workflow file: `.github/workflows/deploy.yml`

Steps to enable:

1. Push repository to GitHub
2. In repository settings, set Pages source to `GitHub Actions`
3. Push to `main` to trigger deployment

The Astro `base` path is configured automatically in CI using the repository name.
