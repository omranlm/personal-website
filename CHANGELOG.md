# Personal Website Changelog

Work sessions, newest first. The early sessions are summarised from the project's
git history (85 commits, 19 May – 26 Oct 2026); the latest ones were written as
the work happened.

## Session 9 — 2026-10-26

### OSM Syria website is now live
- `contributions/osm-syria.html` — `openstreetmap.sy` no longer described as a "coming soon" placeholder
- Header badge: "Coming soon" / "قريباً" → "Official website" / "الموقع الرسمي"
- Overview paragraph (EN + AR) rewritten: the domain is now the official community website, volunteer-built and maintained

---

## Session 8 — 2026-10-14 → 10-22

### Domain migration — najjar.biz → omran.blog
- Canonical, Open Graph and Twitter URLs rewritten across every page
- GitHub Actions deploy target changed to `/omran.blog/`
- HTTP → HTTPS enforced with a 301 redirect in `.htaccess`
- `CLAUDE.md` and `README.md` updated to the new domain

### fAIr engagement closed
- `contributions/fair.html` and the `profile.html` timeline: "May 2021 – Present" → "May 2021 – Oct 2026"

### Training Tracks page
- New `gis-training/` section — bilingual (EN + AR) canvas timeline of Phase 1 for the Ministry of Emergency and Disaster Management's Damage Assessment and Recovery Department: GIS and drone tracks, three levels, gate tests, acceptance test and final report
- Schedule recalculates from any chosen Day 1, skipping Friday–Saturday weekends, with a live calendar and hover tooltips

### Custom error pages (403 / 404)
- **`403.html`** — branded "access denied" fallback (used for any forbidden path)
- **`404.html`** — branded "page not found" fallback
- Both pages: `noindex, nofollow`, GA consent snippet, favicon, and **root-absolute** asset paths (`/style.css`) — required because an `ErrorDocument` is rendered at the URL that failed, so relative paths would resolve against that URL and 404
- `.htaccess`: added `ErrorDocument 403 /403.html`, `ErrorDocument 404 /404.html`, plus `Options -Indexes` and `DirectoryIndex index.html index.htm`
- `style.css`: new `.error-page` block (badge, heading, action buttons, footnote) with a stacked mobile layout

### Fixed 403 on `/gis-training/`
- Cause: the `gis-training/` folder contained `Training_Tracks.html` but no `index` file, so Apache returned 403 (directory listing disabled) instead of serving the page
- Renamed `gis-training/Training_Tracks.html` → `gis-training/index.html` — `/gis-training/` now resolves through `DirectoryIndex`
- Added the standard head boilerplate to that page: canonical `https://omran.blog/gis-training/`, description, favicon, GA snippet, OG/Twitter meta, and the consent script

### Local preview parity
- `server.js` now serves `<dir>/index.html` for directory URLs, mirroring Apache's `DirectoryIndex`

---

## Session 7 — 2026-09-10 → 10-01

### OSM Syria Community Kit
- New `contributions/osm-syria-community-kit.html` — a self-contained design kit page holding social banners (X/Bluesky/Mastodon, Instagram, LinkedIn profile and page, Facebook, GitHub, Google Form header), business card, sticker sheet, A3/A4 posters, T-shirt, standee and a visual-identity board (palette, typography, graphic elements, voice)
- Linked from the OSM Syria page's link list
- Refined through follow-up design passes (19 Sep onwards), including a 30 MB Douma animation added to `assets/` and `.gitignore` updates

### New talk page — OSM Syria meeting, Damascus (26 Sep 2026)
- `talks/osm-syria-damascus-2026.html` with a two-photo gallery, plus a carousel card on `index.html`
- Covers community governance, registering a local chapter, the new website and the secured domain

### openstreetmap.sy added
- OSM Syria page: "official website" row in the header with a globe icon and a "Coming soon" badge, a primary link in the Links list, and a paragraph about the secured domain
- Damascus 2026 talk page updated to link the domain

---

## Session 6 — 2026-07-30 → 08-16

### New event page — AI for Good, Geneva 2026
- `talks/ai-for-good-geneva-2026.html` with two photos, a carousel card on `index.html` and tag styling
- The OpenCage page's previous-talk link now points to the new event

### Community map — MapLibre update
- MapLibre GL JS bumped on the OSM Syria community map

---

## Session 5 — 2026-07-16

### New colour palette
- Site-wide palette refresh in `style.css`, applied to the Douma 3D model page as well

### 3D viewer tutorial rework
- Simpler, shorter onboarding tutorial on `contributions/douma-3d-model.html`

### Cookie banner and local server fixes
- Consent banner tweaks
- `server.js` gained the clean-URL fallback (`/page` → `page.html`) so local preview matches production

---

## Session 4 — 2026-06-24

### Talk image lightbox
- New `lightbox.js`: click or Enter opens a full-size gallery, arrow keys / buttons page through a talk's photos, Escape closes, captions come from `alt`
- Wired into the talk pages, with 109 lines of supporting CSS

### Profile page scrolling
- `body.profile-page` class plus scrolling styles for long profile sections on narrow screens

### Community map layers refreshed
- Replaced the member GeoJSON layers with the 2026-06-02 datasets; primary and secondary layers now dated in their filenames, older copies moved to `assets/backup/`

---

## Session 3 — 2026-06-01 → 06-12

### GDPR cookie consent banner
- New `cookie-consent.js` with Google Consent Mode v2: analytics denied by default until the visitor accepts
- "Ok for anonymous cookies" accept, "More details" panel explaining what is stored, and a decline option
- Follow-ups: consistent accept label, decline kept inside the expanded panel but visible on mobile, consent date/time recorded in `localStorage`

### Hero location order
- Douma → Berlin order flipped, reverted, then re-applied with Berlin first

### New interview page — OpenCage (2026)
- `talks/opencage-osm-syria-2026.html`, with two details trimmed afterwards

### README rewrite
- Structure table, talks table, local development and deployment sections brought up to date

---

## Session 2 — 2026-05-22 → 05-28

### Clean URLs
- Stripped `.html` extension from all internal relative `href` attributes across 23 HTML files
- Stripped `/index` from all `../index#` and `../index"` back-link patterns across 20 files
- Result: all internal navigation now uses clean paths (e.g. `contributions/douma-mapping`, `../#talks`)

---

### Talks & Events section
- Card carousel on `index.html` linking every talk
- Each talk page got prev/next navigation to adjacent talks
- `.htaccess` rewrite rules for extension-less URLs (`/talks/sotm-2022` → `talks/sotm-2022.html`)

---

### New Event Page — Dagstuhl Seminar 2022
**File:** `talks/dagstuhl-2022.html`
- Dagstuhl Seminar 22091 — *AI for the Social Good*
- Feb 27 – Mar 4, 2022, Schloss Dagstuhl, Germany
- Role: Participant (Invited), 22 invitees
- Links: DOI `https://doi.org/10.4230/DagRep.12.2.134` + official Dagstuhl page
- Featured image: `assets/talks/ai-for-good-seminar-dagstuhl.jpg`
- Tags: AI · Humanitarian Tech · Social Good · Machine Learning

**Updated:** `talks/sotm-2022.html` — "next" nav link now points to `dagstuhl-2022` instead of All Talks

**Updated:** `index.html` — carousel card added for Dagstuhl 2022

---

### Hero Role Update
**Files:** `index.html`, `profile.html`
- Role changed to **"Humanitarian and Development Technologist"** (no org name)
- Removed second subtitle line (HOT position) from hero on both pages
- Updated page title, meta description, OG and Twitter card meta tags accordingly

---

### HOT Profile Button Moved
**Files:** `index.html`, `profile.html`
- Removed HOT profile button from the hero section in `index.html`
- Added HOT profile link (`.timeline-ext-link`) to the HOT work experience entry in `profile.html`

---

### Education Section — University Logos
**File:** `profile.html`
- Added logos to all three education entries:
  - **Arden University** — external CDN SVG
  - **Gaziantep University** — `assets/gaziantep-university.png`
  - **Damascus University** — `assets/Damascus_University.png`

**File:** `style.css`
- `.education-logo`: 60×60 px, `object-fit: contain`, white background, subtle border

---

### Work Experience — Company Logos
**File:** `profile.html`
- Added clickable logos (`.timeline-logo-link`) to 6 work experience entries:
  - HOT → `https://www.hotosm.org`
  - Plan International → `https://www.plan-international.org`
  - Creative Associates → `https://www.creativedc.com`
  - otelz.com → `https://www.otelz.com`
  - nPario → `https://www.npario.com`
  - Technopack → `https://www.technopackllc.com/`
- Technopack logo has a dark background (`style="background:#1a1a2e;"`) for its transparent SVG

**File:** `style.css`
- `.timeline-logo-link`: `position: absolute`, top-right, hover scale + shadow
- `.timeline-logo`: 52×52 px, `object-fit: contain`, white background, border
- `.timeline-item:has(.timeline-logo)`: auto `padding-right: 68px` via `:has()` selector

---

### Volunteering Section — Organisation Logos
**File:** `profile.html`
- Added logos to all three volunteering entries:
  - **OSM Syria** — `assets/osm-syria-logo.svg` → `contributions/osm-syria`
  - **SSNORG** — `assets/ssnorg-logo.png` → `https://ssnorg.org/`
  - **GAV4RD** — `assets/gav4rd-logo.jpg` → `https://www.gav4rd.org/`

**File:** `style.css`
- `.volunteer-card`: `position: relative` added
- `.volunteer-card:has(.volunteer-logo)`: auto `padding-right: 5rem`
- `.volunteer-logo`: `position: absolute`, top-right of card, 48×48 px, hover scale

---

### Douma Mapping Page — 3D Viewer CTA
**File:** `contributions/douma-mapping.html`
- "Open full 3D viewer" button replaced with a prominent `.viewer-cta` CTA block
- Teal gradient background (`#0c7c70` → `#006560`), icon, title (EN+AR), subtitle, arrow
- Hover: lift (`translateY(-2px)`) + deeper shadow

---

### Douma 3D Model Page
**File:** `contributions/douma-3d-model.html`
- "Got it" label in the navigation tutorial dismiss button changed to **"Close"**

---

### OSM Syria Page — Community Map Link
**File:** `contributions/osm-syria.html`
- Community Map section (EN + AR) now includes a link to the live HOT uMap:
  `https://umap.hotosm.org/en/map/osm-syria-community_133#5/41.310824/31.025391`

---

### Douma Area — ~13 km² → ~15 km²
**Files:** `index.html`, `contributions/douma-mapping.html`
- Updated Douma coverage area from `~13 km²` to `~15 km²` (EN and AR) in all occurrences

---

### CLAUDE.md
- Added `CLAUDE.md` documenting the stack, local server, FTP deploy and page conventions, then updated it for the clean-URL and logo work above

---

## Session 1 — 2026-05-19 → 05-21

### Initial site
- `index.html` — hero with photo, values, profile snapshot, contributions, contact, footer
- `profile.html` — full CV: work experience timeline, technical skills, education, certifications, volunteering
- Single `style.css` with CSS custom properties; `script.js` for sticky nav, hamburger, scroll-shrink and fade-ins
- `assets/` — favicon, profile and banner images, logos, CV PDF
- Google Analytics snippet, `robots`/OG/Twitter meta on every page, © and GitHub link in the footer

### Contribution pages
- `contributions/fair.html` — HOT's fAIr platform
- `contributions/osm-syria.html` — bilingual (EN + AR) OSM Syria community page with a member map
- `contributions/douma-mapping.html` — Douma drone mapping story
- `contributions/douma-3d-model.html` — interactive 3D reconstruction viewer built on `model-viewer`

### Douma 3D viewer build-out
- GLB moved to Cloudflare R2 to bypass HostGator throttling
- Compressed banner and model assets, added caching, a loading spinner and control hints
- Navigation tutorial overlay plus a video tutorial, with a "give up after 4 minutes" escape hatch and a report option

### Local server
- New `server.js` — MIME types, per-extension cache-control and ETag/Last-Modified 304 responses

### Deployment
- GitHub Actions FTP deploy to HostGator (first on release, then on every push to `master`)
