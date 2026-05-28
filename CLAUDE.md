# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Plain HTML, CSS, and vanilla JavaScript — no build tools, no package manager, no framework, no compilation step.

## Local Development

```bash
node server.js          # Serves at http://localhost:3000
```

`server.js` is a minimal Node.js HTTP server with MIME types and cache-control headers for local preview. It is not deployed — production runs on Apache (HostGator).

## Deployment

Pushing to `master` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`) that FTP-deploys the entire repo to HostGator at `/najjar.biz/`. The `.htaccess` Apache rewrite rules serve clean URLs (e.g. `/talks/sotm-2022` resolves to `talks/sotm-2022.html`).

## Architecture

The site has two root pages (`index.html`, `profile.html`) and two sub-directories of detail pages:

- `contributions/` — one HTML file per open-source project or contribution
- `talks/` — one HTML file per talk, conference, or event

All pages share a single `style.css` (sub-pages reference it as `../style.css`) and the same CSS custom properties. `script.js` is only included on the two root pages; it handles the sticky nav (hamburger toggle, scroll-shrink, active link tracking via IntersectionObserver) and fade-in animations.

Sub-pages use the `contribution-page` wrapper div. Talk pages additionally add the `talk-page` class. Back-links on sub-pages point to the specific card anchor on `index.html` (e.g. `../#talk-sotm-2022`, `../#contributions`). Talk pages also include a `<nav class="talk-nav">` with `.talk-nav-prev` / `.talk-nav-next` links to adjacent talks.

## Conventions

**CSS variables** (defined in `:root` in `style.css`):
- Colors: `--navy`, `--teal`, `--teal-light`, `--gray`, `--light`, `--white`, `--text`, `--border`
- Utilities: `--radius`, `--shadow`, `--transition`

**Every HTML page must include:**
- `<link rel="canonical" href="https://najjar.biz/...">` — path without `.html` extension
- Google Analytics snippet with tag `G-MZ648EEXYB`
- Open Graph and Twitter Card meta tags
- `<link rel="icon" type="image/svg+xml" href="[../]assets/favicon.svg">`

**New sub-pages** follow the pattern of existing pages in `talks/` or `contributions/`: copy the head boilerplate, set the canonical URL, update OG/Twitter meta, use the `contribution-page` (+ `talk-page` for talks) wrapper, and add a back-link to the appropriate `index.html` anchor.

**No `.html` extension in canonical URLs, `href` links, or `<a>` href attributes** — `.htaccess` handles extension-less serving on production. This applies to internal relative hrefs too (e.g. `contributions/douma-mapping`, not `contributions/douma-mapping.html`). Back-links to `index.html` use `../#anchor`, not `../index#anchor`.

**`profile.html` logo patterns** (all use `:has()` for auto-padding):
- Work experience logos: `.timeline-logo-link` (absolute, top-right) wraps `.timeline-logo` (52×52 px); `.timeline-ext-link` is a secondary external link on the timeline entry
- Education logos: `.education-logo` (60×60 px, `object-fit: contain`, white bg)
- Volunteering logos: `.volunteer-logo` (48×48 px, absolute top-right of `.volunteer-card`)
