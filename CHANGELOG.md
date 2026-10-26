# Personal Website Changelog

## Session 4 — 2026-10-26

### OSM Syria website is now live
- [contributions/osm-syria.html](contributions/osm-syria.html) — `openstreetmap.sy` no longer described as a "coming soon" placeholder
- Header badge: "Coming soon" / "قريباً" → "Official website" / "الموقع الرسمي"
- Overview paragraph (EN + AR) rewritten: the domain is now the official community website, volunteer-built and maintained

---

## Session 3 — 2026-10-22

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

## Session 2 — 2026-05-28

### Clean URLs
- Stripped `.html` extension from all internal relative `href` attributes across 23 HTML files
- Stripped `/index` from all `../index#` and `../index"` back-link patterns across 20 files
- Result: all internal navigation now uses clean paths (e.g. `contributions/douma-mapping`, `../#talks`)

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
