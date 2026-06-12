# najjar.biz

Personal website for **Omran Najjar** — Humanitarian and Development Technologist, based in Douma, Syria and Berlin, Germany.

🌐 **[najjar.biz](https://najjar.biz)**

Built with plain HTML, CSS, and vanilla JavaScript. No build tools. No dependencies. No compilation step.

---

## Structure

| Path | Description |
|---|---|
| `index.html` | Main page — hero, values, profile snapshot, contributions carousel, talks carousel, contact |
| `profile.html` | Full profile — work experience, technical skills, education, certifications, volunteering |
| `contributions/fair.html` | fAIr — HOT's open-source AI-assisted mapping platform |
| `contributions/osm-syria.html` | OSM Syria — open mapping community for Syria |
| `contributions/douma-mapping.html` | Douma Mapping — community drone mapping initiative |
| `contributions/douma-3d-model.html` | Douma 3D Model — interactive 3D reconstruction viewer |
| `talks/` | 18 individual talk, event, and interview pages |

---

## Talks & Events

| File | Event |
|---|---|
| `opencage-osm-syria-2026.html` | OpenCage Interview — OpenStreetMap Syria (2026) |
| `osm-syria-damascus-2025.html` | OSM Syria — In-person Meeting, Damascus (2025) |
| `hits25.html` | Humanitarian Demining Innovation & Technology Summit (2025) |
| `fair-training-nairobi-2025.html` | fAIr Training Workshop — OSM Kenya Mappers (2025) |
| `osm-syria-meeting-1-2025.html` | OSM Syria Community Meeting (2025) |
| `foss4g-europe-2025.html` | FOSS4G Europe 2025 |
| `foss4g-2025.html` | FOSS4G 2025 |
| `sotm-2025-fairswipe.html` | State of the Map 2025 — FairSwipe |
| `geoai-hack-2025.html` | GeoAI Hack 2025 |
| `ai-action-summit-2025.html` | AI Action Summit 2025 |
| `ml4eo-2024.html` | ML4EO 2024 |
| `sotm-europe-2024.html` | State of the Map Europe 2024 |
| `open-mapping-guru-2024.html` | Open Mapping Guru 2024 |
| `changenow-2024.html` | ChangeNOW 2024 |
| `civicus-interview-2023.html` | CIVICUS Interview — AI Biases & Transparency (2023) |
| `dagstuhl-2022.html` | Dagstuhl Seminar — AI for the Social Good (2022) |
| `hot-tech-talk-fair-2022.html` | HOT Tech Talk — fAIr (2022) |
| `sotm-2022.html` | State of the Map 2022 |
| `omdena-testimonial.html` | Omdena Testimonial (2022) |

---

## Local Development

```bash
node server.js   # http://localhost:3000
```

`server.js` is a minimal Node.js HTTP server (no install needed). Not deployed — production runs on Apache.

---

## Deployment

Pushing to `master` triggers a GitHub Actions workflow that FTP-deploys to HostGator at `najjar.biz`. Apache `.htaccess` rewrite rules serve clean URLs (e.g. `/talks/sotm-2022` → `talks/sotm-2022.html`).
