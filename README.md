# marcogoedert.com

Personal site: [marcogoedert.com](https://marcogoedert.com)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06b6d4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/tested_with-Vitest-6e9f18?logo=vitest&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&logoColor=white)

## Stack

| Layer     | Technology                                    |
| --------- | --------------------------------------------- |
| Framework | Next.js 15 (App Router, RSC)                  |
| Language  | TypeScript 5.9                                |
| Styling   | Tailwind CSS 3.4 + CSS custom properties      |
| Animation | Framer Motion 12                              |
| Fonts     | Geist, Geist Mono, Fraunces (via `next/font`) |
| Content   | JSON files validated with Zod                 |
| Analytics | Vercel Analytics                              |
| Testing   | Vitest + Testing Library + jest-axe           |
| CI/CD     | GitHub Actions + Vercel                       |

## Pages

| Route      | Description           |
| ---------- | --------------------- |
| `/`        | Home                  |
| `/about`   | Bio + work experience |
| `/contact` | Social links          |
| `/hear`    | Music and listening   |
| `/watch`   | Films and series      |
| `/read`    | Books                 |
| `/cv`      | Curriculum vitae      |

## Features

- **Light/dark theme**: cookie-based with FOUC prevention via inline `<script>` in `<head>`
- **Particle canvas**: interactive animated background, light/dark aware, persists across all routes
- **Page transitions**: Framer Motion animated route changes
- **File-based content**: `content/*.json` with Zod schemas, no CMS
- **SEO**: dynamic metadata, OG image, `sitemap.ts`, `robots.ts`
- **Accessibility**: semantic HTML, keyboard navigation, axe-tested components

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run lint       # ESLint
npm run format     # Prettier check
npm run test       # Vitest (single run)
npm run test:watch # Vitest (watch mode)
```

## Project structure

```
app/                    # Next.js App Router pages
  (about|contact|cv|hear|read|watch)/page.tsx
  layout.tsx            # root layout: theme FOUC script, Shell, PageTransition
  globals.css           # CSS custom properties (light/dark schemes)

components/
  canvas/               # ParticleCanvas
  layout/               # Shell, PageTransition, AnimatedSection
  nav/                  # TopNav, CornerNav
  sections/             # WorkExperienceList, SocialLinks, ContactRow
  ui/                   # Card, BookCard
  ThemeToggle.tsx

content/                # JSON data files (experiences, projects, media lists)
hooks/                  # useColorScheme, useSpotlight
lib/                    # content loaders, Zod schemas
.github/workflows/      # ci.yml: lint + format + test + build on PRs (3 parallel jobs)
```

## Deployment

Deployed on Vercel. Every push to `main` triggers an automatic build and deployment.
